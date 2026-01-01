'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { BlogPost } from '@/types/blog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Save, Upload, X } from 'lucide-react';
import Link from 'next/link';
import { Switch } from '@/components/ui/switch';

export default function EditPostPage() {
    const params = useParams();
    const router = useRouter();
    const postId = params.id as string;

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [post, setPost] = useState<BlogPost | null>(null);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        content: '',
        coverImage: '',
        authorName: '',
        tags: [] as string[],
        published: false,
    });
    const [tagInput, setTagInput] = useState('');
    const [uploadingImage, setUploadingImage] = useState(false);

    useEffect(() => {
        fetchPost();
    }, [postId]);

    async function fetchPost() {
        try {
            const response = await fetch(`/api/blog/posts?id=${postId}`);
            if (response.ok) {
                const data = await response.json();
                const foundPost = data.posts?.[0]; // Agora retorna um array com um único post do ID solicitado

                if (foundPost) {
                    setPost(foundPost);
                    setFormData({
                        title: foundPost.title,
                        description: foundPost.description,
                        content: foundPost.content,
                        coverImage: foundPost.coverImage,
                        authorName: foundPost.author?.name || '',
                        tags: foundPost.tags || [],
                        published: foundPost.published,
                    });
                } else {
                    console.error('Post not found in response');
                }
            } else {
                const errorData = await response.json().catch(() => ({}));
                console.error('Error response from API:', response.status, errorData);
            }
        } catch (error) {
            console.error('Error fetching post:', error);
        } finally {
            setLoading(false);
        }
    }

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploadingImage(true);
        try {
            const formDataUpload = new FormData();
            formDataUpload.append('file', file);

            const response = await fetch('/api/blog/upload', {
                method: 'POST',
                body: formDataUpload,
            });

            if (response.ok) {
                const data = await response.json();
                setFormData((prev) => ({ ...prev, coverImage: data.url }));
            } else {
                alert('Erro ao fazer upload da imagem');
            }
        } catch (error) {
            console.error('Error uploading image:', error);
            alert('Erro ao fazer upload da imagem');
        } finally {
            setUploadingImage(false);
        }
    };

    const handleAddTag = () => {
        if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
            setFormData((prev) => ({
                ...prev,
                tags: [...prev.tags, tagInput.trim()],
            }));
            setTagInput('');
        }
    };

    const handleRemoveTag = (tag: string) => {
        setFormData((prev) => ({
            ...prev,
            tags: prev.tags.filter((t) => t !== tag),
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!post) return;

        setSaving(true);
        try {
            const response = await fetch(`/api/blog/posts/${post.slug}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: formData.title,
                    description: formData.description,
                    content: formData.content,
                    coverImage: formData.coverImage,
                    author: {
                        name: formData.authorName || 'Admin',
                    },
                    tags: formData.tags,
                    published: formData.published,
                }),
            });

            if (response.ok) {
                router.push('/admin/blog');
            } else {
                const errorData = await response.json().catch(() => ({}));
                const errorMessage = errorData.error || response.statusText || 'Erro desconhecido';
                alert(`Erro ao atualizar post: ${errorMessage} (Status: ${response.status})`);
            }
        } catch (error: any) {
            console.error('Error updating post:', error);
            alert(`Erro na requisição: ${error.message}`);
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <p className="text-muted-foreground">Carregando...</p>
            </div>
        );
    }

    if (!post) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">Post não encontrado</h1>
                    <Link href="/admin/blog">
                        <Button>Voltar ao painel</Button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background p-8">
            <div className="container mx-auto max-w-5xl">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <Link href="/admin/blog">
                            <Button variant="ghost" size="sm">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Voltar
                            </Button>
                        </Link>
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                            Editar Post
                        </h1>
                    </div>
                    <Button
                        onClick={handleSubmit}
                        disabled={saving || !formData.title || !formData.content}
                        className="bg-primary hover:bg-primary/90"
                    >
                        <Save className="mr-2 h-4 w-4" />
                        {saving ? 'Salvando...' : 'Salvar Alterações'}
                    </Button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Coluna principal */}
                        <div className="lg:col-span-2 space-y-6">
                            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                                <CardHeader>
                                    <CardTitle>Informações Básicas</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div>
                                        <Label htmlFor="title">Título *</Label>
                                        <Input
                                            id="title"
                                            value={formData.title}
                                            onChange={(e) =>
                                                setFormData((prev) => ({ ...prev, title: e.target.value }))
                                            }
                                            className="mt-2 text-lg font-semibold"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="description">Descrição *</Label>
                                        <Textarea
                                            id="description"
                                            value={formData.description}
                                            onChange={(e) =>
                                                setFormData((prev) => ({
                                                    ...prev,
                                                    description: e.target.value,
                                                }))
                                            }
                                            className="mt-2"
                                            rows={3}
                                            required
                                        />
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                                <CardHeader>
                                    <CardTitle>Conteúdo *</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <Textarea
                                        value={formData.content}
                                        onChange={(e) =>
                                            setFormData((prev) => ({ ...prev, content: e.target.value }))
                                        }
                                        className="min-h-[400px] font-mono text-sm"
                                        required
                                    />
                                </CardContent>
                            </Card>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                                <CardHeader>
                                    <CardTitle>Status</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-center justify-between">
                                        <Label htmlFor="published">Publicado</Label>
                                        <Switch
                                            id="published"
                                            checked={formData.published}
                                            onCheckedChange={(checked) =>
                                                setFormData((prev) => ({ ...prev, published: checked }))
                                            }
                                        />
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                                <CardHeader>
                                    <CardTitle>Imagem de Capa</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {formData.coverImage ? (
                                        <div className="relative">
                                            <img
                                                src={formData.coverImage}
                                                alt="Cover"
                                                className="w-full h-40 object-cover rounded-lg"
                                            />
                                            <Button
                                                variant="destructive"
                                                size="sm"
                                                className="absolute top-2 right-2"
                                                onClick={() =>
                                                    setFormData((prev) => ({ ...prev, coverImage: '' }))
                                                }
                                            >
                                                <X className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    ) : (
                                        <div>
                                            <Label
                                                htmlFor="cover-upload"
                                                className="cursor-pointer flex flex-col items-center justify-center h-40 border-2 border-dashed border-border/50 rounded-lg hover:border-primary/50 transition-colors"
                                            >
                                                <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                                                <span className="text-sm text-muted-foreground">
                                                    {uploadingImage ? 'Enviando...' : 'Clique para fazer upload'}
                                                </span>
                                            </Label>
                                            <Input
                                                id="cover-upload"
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImageUpload}
                                                className="hidden"
                                                disabled={uploadingImage}
                                            />
                                        </div>
                                    )}
                                </CardContent>
                            </Card>

                            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                                <CardHeader>
                                    <CardTitle>Autor</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <Input
                                        value={formData.authorName}
                                        onChange={(e) =>
                                            setFormData((prev) => ({ ...prev, authorName: e.target.value }))
                                        }
                                        placeholder="Nome do autor"
                                    />
                                </CardContent>
                            </Card>

                            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                                <CardHeader>
                                    <CardTitle>Tags</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex gap-2">
                                        <Input
                                            value={tagInput}
                                            onChange={(e) => setTagInput(e.target.value)}
                                            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                                            placeholder="Adicionar tag..."
                                        />
                                        <Button type="button" onClick={handleAddTag} size="sm">
                                            +
                                        </Button>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {formData.tags.map((tag) => (
                                            <Badge
                                                key={tag}
                                                variant="secondary"
                                                className="cursor-pointer hover:bg-destructive/20"
                                                onClick={() => handleRemoveTag(tag)}
                                            >
                                                {tag}
                                                <X className="ml-1 h-3 w-3" />
                                            </Badge>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
