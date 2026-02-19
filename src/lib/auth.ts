import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

// Auditoria local silenciosa (Removida dependência de Firebase)
const logAuditLocal = (action: string, email: string, level: string, meta: any) => {
    console.log(`[AUDIT_LOG][${level}] ${action} for ${email}`, meta);
};

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    callbacks: {
        async signIn({ user }) {
            const adminEmails = (process.env.ADMIN_EMAIL || '').split(',').map(e => e.trim().toLowerCase());
            const isAllowed = !!user.email && adminEmails.includes(user.email.toLowerCase());

            if (isAllowed) {
                logAuditLocal('ADMIN_SIGN_IN_SUCCESS', user.email!, 'INFO', { name: user.name });
            } else {
                logAuditLocal('ADMIN_SIGN_IN_ATTEMPT', user.email || 'unknown', 'SECURITY', { 
                    attemptedEmail: user.email,
                    status: 'BLOCKED'
                });
            }

            return isAllowed;
        },
        async session({ session, token }) {
            return session;
        },
    },
    pages: {
        signIn: '/admin/login',
        error: '/admin/login',
    },
    secret: process.env.NEXTAUTH_SECRET,
    trustHost: true,
};
