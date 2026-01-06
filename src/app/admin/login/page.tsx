'use client';

import { signIn } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Chrome } from 'lucide-react';

export default function AdminLoginPage() {
    const handleGoogleSignIn = () => {
        signIn('google', { callbackUrl: '/admin' });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background p-4">
            <Card className="w-full max-w-md border-border/50 bg-card/50 backdrop-blur-sm">
                <CardHeader className="space-y-1 text-center">
                    <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                        Painel Administrativo
                    </CardTitle>
                    <CardDescription className="text-muted-foreground">
                        Faça login para gerenciar o blog
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Button
                        onClick={handleGoogleSignIn}
                        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-6 text-lg"
                        size="lg"
                    >
                        <Chrome className="mr-2 h-5 w-5" />
                        Entrar com Google
                    </Button>
                    <p className="text-xs text-center text-muted-foreground">
                        Apenas usuários autorizados podem acessar
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
