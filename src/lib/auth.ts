import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { logAuditAction } from './audit';

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    callbacks: {
        async signIn({ user }) {
            // Permitir múltiplos emails de admin separados por vírgula
            const adminEmails = (process.env.ADMIN_EMAIL || '').split(',').map(e => e.trim().toLowerCase());
            const isAllowed = !!user.email && adminEmails.includes(user.email.toLowerCase());

            if (isAllowed) {
                await logAuditAction('ADMIN_SIGN_IN_SUCCESS', user.email!, 'INFO', { name: user.name });
            } else {
                await logAuditAction('ADMIN_SIGN_IN_ATTEMPT', user.email || 'unknown', 'SECURITY', { 
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
