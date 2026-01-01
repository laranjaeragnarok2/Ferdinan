import { withAuth } from 'next-auth/middleware';

export default withAuth({
    callbacks: {
        authorized: ({ token }) => {
            if (!token?.email) return false;
            const adminEmails = (process.env.ADMIN_EMAIL || '').split(',').map(e => e.trim().toLowerCase());
            return adminEmails.includes(token.email.toLowerCase());
        },
    },
    pages: {
        signIn: '/admin/login',
    },
});

export const config = {
    matcher: ['/admin/blog/:path*'],
};
