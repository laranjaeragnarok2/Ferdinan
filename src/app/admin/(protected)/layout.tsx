import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await getServerSession(authOptions);
    const adminEmails = (process.env.ADMIN_EMAIL || '').split(',').map(e => e.trim().toLowerCase());

    if (!session || !session.user?.email || !adminEmails.includes(session.user.email.toLowerCase())) {
        redirect('/admin/login');
    }

    return <>{children}</>;
}
