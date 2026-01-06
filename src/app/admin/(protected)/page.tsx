'use client';

import { useSession, signOut } from 'next-auth/react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Newspaper, LogOut, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboard() {
    const { data: session } = useSession();

    return (
        <div className="min-h-screen bg-background p-8">
            <div className="container mx-auto max-w-4xl">
                <div className="flex items-center justify-between mb-12">
                    <div>
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                            Painel Administrativo
                        </h1>
                        <p className="text-muted-foreground mt-2">
                            Bem-vindo, {session?.user?.name}
                        </p>
                    </div>
                    <Button variant="ghost" onClick={() => signOut()}>
                        <LogOut className="mr-2 h-4 w-4" />
                        Sair
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <Link href="/admin/blog" className="block group">
                        <Card className="h-full border-border/50 bg-card/50 backdrop-blur-sm transition-all hover:border-primary/50 hover:bg-primary/5">
                            <CardHeader>
                                <div className="p-3 w-fit rounded-xl bg-blue-500/10 text-blue-500 mb-4 group-hover:scale-110 transition-transform">
                                    <Newspaper className="w-8 h-8" />
                                </div>
                                <CardTitle className="text-2xl">Gerenciar Blog</CardTitle>
                                <CardDescription>
                                    Crie, edite e publique postagens para o blog da Ferdinand.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center text-primary font-medium">
                                    Acessar Painel <ArrowRight className="ml-2 w-4 h-4" />
                                </div>
                            </CardContent>
                        </Card>
                    </Link>

                    <Link href="/admin/proposal" className="block group">
                        <Card className="h-full border-border/50 bg-card/50 backdrop-blur-sm transition-all hover:border-orange-500/50 hover:bg-orange-500/5">
                            <CardHeader>
                                <div className="p-3 w-fit rounded-xl bg-orange-500/10 text-orange-500 mb-4 group-hover:scale-110 transition-transform">
                                    <FileText className="w-8 h-8" />
                                </div>
                                <CardTitle className="text-2xl">Proposta Comercial</CardTitle>
                                <CardDescription>
                                    Personalize a proposta comercial e gere PDFs para clientes.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center text-orange-500 font-medium">
                                    Acessar Dashboard <ArrowRight className="ml-2 w-4 h-4" />
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                </div>
            </div>
        </div>
    );
}
