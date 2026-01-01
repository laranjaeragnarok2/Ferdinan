'use client';

import { useEffect, useState } from 'react';
import { useSession, signOut } from 'next-auth/react';

// Forçar renderização dinâmica
export const dynamic = 'force-dynamic';
import { BlogPost } from '@/types/blog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Edit, Trash2, Eye, EyeOff, Plus, LogOut } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function AdminBlogPage() {
    const { data: session } = useSession();
    const router = useRouter();
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPosts();
    }, []);

    async function fetchPosts() {
        try {
            const response = await fetch('/api/blog/posts');
            const data = await response.json();
            setPosts(data.posts);
        } catch (error) {
            console.error('Error fetching posts:', error);
        } finally {
            setLoading(false);
        }
    }

    async function handleDelete(slug: string) {
        if (!confirm('Tem certeza que deseja deletar este post?')) {
            return;
        }

        try {
            const response = await fetch(`/api/blog/posts/${slug}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                fetchPosts(); // Recarregar lista
            } else {
                alert('Erro ao deletar post');
            }
        } catch (error) {
            console.error('Error deleting post:', error);
            alert('Erro ao deletar post');
        }
    }

    async function togglePublished(post: BlogPost) {
        try {
            const response = await fetch(`/api/blog/posts/${post.slug}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ published: !post.published }),
            });

            if (response.ok) {
                fetchPosts(); // Recarregar lista
            } else {
                alert('Erro ao atualizar status');
            }
        } catch (error) {
            console.error('Error updating post:', error);
            alert('Erro ao atualizar status');
        }
    }

    const publishedCount = posts.filter((p) => p.published).length;
    const draftCount = posts.filter((p) => !p.published).length;

    return (
        <div className="min-h-screen bg-background p-8">
            <div className="container mx-auto max-w-7xl">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                            Painel do Blog
                        </h1>
                        <p className="text-muted-foreground mt-2">
                            Bem-vindo, {session?.user?.name}
                        </p>
                    </div>
                    <div className="flex gap-3">
                        <Link href="/blog">
                            <Button variant="outline">
                                <Eye className="mr-2 h-4 w-4" />
                                Ver Blog
                            </Button>
                        </Link>
                        <Link href="/admin/blog/new">
                            <Button className="bg-primary hover:bg-primary/90">
                                <Plus className="mr-2 h-4 w-4" />
                                Novo Post
                            </Button>
                        </Link>
                        <Button variant="ghost" onClick={() => signOut()}>
                            <LogOut className="mr-2 h-4 w-4" />
                            Sair
                        </Button>
                    </div>
                </div>

                {/* Estatísticas */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                        <CardHeader>
                            <CardDescription>Total de Posts</CardDescription>
                            <CardTitle className="text-3xl">{posts.length}</CardTitle>
                        </CardHeader>
                    </Card>

                    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                        <CardHeader>
                            <CardDescription>Publicados</CardDescription>
                            <CardTitle className="text-3xl text-green-500">
                                {publishedCount}
                            </CardTitle>
                        </CardHeader>
                    </Card>

                    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                        <CardHeader>
                            <CardDescription>Rascunhos</CardDescription>
                            <CardTitle className="text-3xl text-yellow-500">
                                {draftCount}
                            </CardTitle>
                        </CardHeader>
                    </Card>
                </div>

                {/* Tabela de posts */}
                <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle>Todos os Posts</CardTitle>
                        <CardDescription>
                            Gerencie seus posts do blog
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {loading ? (
                            <p className="text-center py-8 text-muted-foreground">
                                Carregando...
                            </p>
                        ) : posts.length === 0 ? (
                            <p className="text-center py-8 text-muted-foreground">
                                Nenhum post criado ainda. Crie seu primeiro post!
                            </p>
                        ) : (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Título</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Tags</TableHead>
                                        <TableHead>Data</TableHead>
                                        <TableHead className="text-right">Ações</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {posts.map((post) => (
                                        <TableRow key={post.id}>
                                            <TableCell className="font-medium">
                                                {post.title}
                                            </TableCell>
                                            <TableCell>
                                                <Badge
                                                    variant={post.published ? 'default' : 'secondary'}
                                                    className={
                                                        post.published
                                                            ? 'bg-green-500/20 text-green-500'
                                                            : 'bg-yellow-500/20 text-yellow-500'
                                                    }
                                                >
                                                    {post.published ? 'Publicado' : 'Rascunho'}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex flex-wrap gap-1">
                                                    {post.tags.slice(0, 2).map((tag) => (
                                                        <Badge
                                                            key={tag}
                                                            variant="outline"
                                                            className="text-xs"
                                                        >
                                                            {tag}
                                                        </Badge>
                                                    ))}
                                                    {post.tags.length > 2 && (
                                                        <Badge variant="outline" className="text-xs">
                                                            +{post.tags.length - 2}
                                                        </Badge>
                                                    )}
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-muted-foreground text-sm">
                                                {new Date(post.publishedAt).toLocaleDateString('pt-BR')}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => togglePublished(post)}
                                                        title={
                                                            post.published ? 'Despublicar' : 'Publicar'
                                                        }
                                                    >
                                                        {post.published ? (
                                                            <EyeOff className="h-4 w-4" />
                                                        ) : (
                                                            <Eye className="h-4 w-4" />
                                                        )}
                                                    </Button>
                                                    <Link href={`/admin/blog/edit/${post.id}`}>
                                                        <Button variant="ghost" size="sm">
                                                            <Edit className="h-4 w-4" />
                                                        </Button>
                                                    </Link>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => handleDelete(post.slug)}
                                                        className="text-destructive hover:text-destructive"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
