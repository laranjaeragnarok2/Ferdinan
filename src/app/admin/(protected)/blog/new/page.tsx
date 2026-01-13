'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Save, Eye, Upload, X } from 'lucide-react';
import Link from 'next/link';
import { Switch } from '@/components/ui/switch';
import RichTextEditor from '@/components/RichTextEditor';
import imageCompression from 'browser-image-compression';

export default function NewPostPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
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

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploadingImage(true);
        try {
            // Comprimir imagem antes de enviar
            const options = {
                maxSizeMB: 0.8, // Menos de 1MB para garantir que a Vercel aceite
                maxWidthOrHeight: 1920,
                useWebWorker: true,
                fileType: 'image/webp' // Converter para WebP para melhor performance
            };

            const compressedFile = await imageCompression(file, options);
            const formData = new FormData();
            formData.append('file', compressedFile);

            const response = await fetch('/api/blog/upload', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                setFormData((prev) => ({ ...prev, coverImage: data.url }));
            } else {
                const error = await response.json();
                alert(`Erro no upload: ${error.error || 'Falha ao processar imagem'}`);
            }
        } catch (error) {
            console.error('Error uploading image:', error);
            alert('Erro ao processar imagem. Tente uma imagem menor ou em outro formato.');
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
        setLoading(true);

        try {
            const response = await fetch('/api/blog/posts', {
                method: 'POST',
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
                alert('Erro ao criar post');
            }
        } catch (error) {
            console.error('Error creating post:', error);
            alert('Erro ao criar post');
        } finally {
            setLoading(false);
        }
    };

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
                            Novo Post
                        </h1>
                    </div>
                    <div className="flex gap-3">
                        <Button
                            variant="outline"
                            onClick={() => window.open('/blog', '_blank')}
                        >
                            <Eye className="mr-2 h-4 w-4" />
                            Preview
                        </Button>
                        <Button
                            onClick={handleSubmit}
                            disabled={loading || !formData.title || !formData.content}
                            className="bg-primary hover:bg-primary/90"
                        >
                            <Save className="mr-2 h-4 w-4" />
                            {loading ? 'Salvando...' : 'Salvar Post'}
                        </Button>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Coluna principal - Editor */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Título */}
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
                                            placeholder="Digite o título do post..."
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
                                            placeholder="Breve descrição do post..."
                                            className="mt-2"
                                            rows={3}
                                            required
                                        />
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Editor de conteúdo */}
                            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                                <CardHeader>
                                    <CardTitle>Conteúdo *</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <RichTextEditor
                                        content={formData.content}
                                        onChange={(content) =>
                                            setFormData((prev) => ({ ...prev, content }))
                                        }
                                        placeholder="Escreva o conteúdo do post aqui..."
                                    />
                                    <p className="text-xs text-muted-foreground mt-2">
                                        Use a barra de ferramentas para formatar seu texto
                                    </p>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Sidebar - Metadados */}
                        <div className="space-y-6">
                            {/* Status */}
                            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                                <CardHeader>
                                    <CardTitle>Status</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-center justify-between">
                                        <Label htmlFor="published">Publicar imediatamente</Label>
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

                            {/* Imagem de capa */}
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

                            {/* Autor */}
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

                            {/* Tags */}
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
