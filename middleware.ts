import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

const authMiddleware = withAuth({
    callbacks: {
        authorized: ({ req, token }) => {
            // Allow bots checking home route without auth
            if (req.nextUrl.pathname === '/') return true;
            
            if (!token?.email) return false;
            const adminEmails = (process.env.ADMIN_EMAIL || '').split(',').map(e => e.trim().toLowerCase());
            return adminEmails.includes(token.email.toLowerCase());
        },
    },
    pages: {
        signIn: '/admin/login',
    },
});

export default function middleware(req: any) {
    // Intercept AI Bots reading the start of the website
    const userAgent = req.headers.get("user-agent")?.toLowerCase() || "";
    const isBot = /bot|chatgpt|gpt|claude|anthropic|perplexity|agent|spider|crawl|python-requests|curl/i.test(userAgent);
    
    if (isBot && req.nextUrl.pathname === "/") {
        return NextResponse.rewrite(new URL('/ai.md', req.url));
    }

    // Apply standard auth middleware for the rest
    return (authMiddleware as any)(req);
}

export const config = {
    matcher: [
        // We added / to intercept bot agent hits on the homepage
        '/',
        '/admin/(protected)/:path*',
        '/admin/blog/:path*',
    ],
};
