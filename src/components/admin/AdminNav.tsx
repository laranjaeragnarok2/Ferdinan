'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Newspaper, FileText, LayoutDashboard, LogOut } from 'lucide-react';
import { signOut } from 'next-auth/react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export function AdminNav() {
    const pathname = usePathname();

    const navItems = [
        {
            href: '/admin',
            label: 'Dashboard',
            icon: LayoutDashboard,
        },
        {
            href: '/admin/blog',
            label: 'Blog',
            icon: Newspaper,
        },
        {
            href: '/admin/proposal',
            label: 'Propostas',
            icon: FileText,
        },
    ];

    return (
        <nav className="border-b border-border/50 bg-card/50 backdrop-blur-md sticky top-0 z-50">
            <div className="container mx-auto max-w-7xl px-4">
                <div className="flex h-16 items-center justify-between">
                    <div className="flex items-center gap-8">
                        <Link href="/admin" className="font-bold text-xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                            Ferdinan Admin
                        </Link>

                        <div className="flex items-center gap-1">
                            {navItems.map((item) => {
                                const Icon = item.icon;
                                const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));

                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className={cn(
                                            "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                                            isActive
                                                ? "bg-primary/10 text-primary"
                                                : "text-muted-foreground hover:text-foreground hover:bg-accent"
                                        )}
                                    >
                                        <Icon className="w-4 h-4" />
                                        {item.label}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>

                    <Button variant="ghost" size="sm" onClick={() => signOut()} className="text-muted-foreground">
                        <LogOut className="w-4 h-4 mr-2" />
                        Sair
                    </Button>
                </div>
            </div>
        </nav>
    );
}
