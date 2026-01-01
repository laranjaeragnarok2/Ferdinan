'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { BlogPost } from '@/types/blog';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, Share2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { FadeInOnScroll } from '@/components/animations/FadeInOnScroll';

export default function BlogPostPage() {
    const params = useParams();
    const slug = params.slug as string;
    const [post, setPost] = useState<BlogPost | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchPost() {
            try {
                const response = await fetch(`/api/blog/posts/${slug}`);
                if (response.ok) {
                    const data = await response.json();
                    setPost(data.post);
                }
            } catch (error) {
                console.error('Error fetching post:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchPost();
    }, [slug]);

    const handleShare = async () => {
        if (navigator.share && post) {
            try {
                await navigator.share({
                    title: post.title,
                    text: post.description,
                    url: window.location.href,
                });
            } catch (error) {
                console.error('Error sharing:', error);
            }
        } else {
            // Fallback: copiar URL
            navigator.clipboard.writeText(window.location.href);
            alert('Link copiado para a área de transferência!');
        }
    };

    if (loading) {
        return (
            <div className="flex flex-col min-h-screen bg-background">
                <Header />
                <main className="flex-grow flex items-center justify-center">
                    <p className="text-muted-foreground">Carregando...</p>
                </main>
                <Footer />
            </div>
        );
    }

    if (!post) {
        return (
            <div className="flex flex-col min-h-screen bg-background">
                <Header />
                <main className="flex-grow flex items-center justify-center">
                    <div className="text-center space-y-4">
                        <h1 className="text-3xl font-bold">Post não encontrado</h1>
                        <Link href="/blog">
                            <Button variant="outline">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Voltar para o blog
                            </Button>
                        </Link>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    const publishedDate = new Date(post.publishedAt).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
    });

    const wordsPerMinute = 200;
    const wordCount = post.content.split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / wordsPerMinute);

    return (
        <div className="flex flex-col min-h-screen bg-background">
            <Header />

            <main className="flex-grow">
                {/* Hero com imagem de capa */}
                {post.coverImage && (
                    <div className="relative h-[400px] w-full">
                        <Image
                            src={post.coverImage}
                            alt={post.title}
                            fill
                            className="object-cover"
                            priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                    </div>
                )}

                <article className="container mx-auto max-w-4xl px-4 py-12">
                    <FadeInOnScroll>
                        {/* Breadcrumb */}
                        <Link
                            href="/blog"
                            className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-8"
                        >
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Voltar para o blog
                        </Link>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-6">
                            {post.tags.map((tag) => (
                                <Badge
                                    key={tag}
                                    variant="secondary"
                                    className="bg-primary/10 text-primary"
                                >
                                    {tag}
                                </Badge>
                            ))}
                        </div>

                        {/* Título */}
                        <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                            {post.title}
                        </h1>

                        {/* Descrição */}
                        <p className="text-xl text-muted-foreground mb-8">{post.description}</p>

                        {/* Meta informações */}
                        <div className="flex flex-wrap items-center gap-6 pb-8 border-b border-border/50 mb-8">
                            {post.author && (
                                <div className="flex items-center gap-3">
                                    {post.author.avatar && (
                                        <Image
                                            src={post.author.avatar}
                                            alt={post.author.name}
                                            width={48}
                                            height={48}
                                            className="rounded-full"
                                        />
                                    )}
                                    <div>
                                        <p className="font-semibold">{post.author.name}</p>
                                        <p className="text-sm text-muted-foreground">Autor</p>
                                    </div>
                                </div>
                            )}

                            <div className="flex items-center gap-1 text-muted-foreground">
                                <Calendar className="h-4 w-4" />
                                <span className="text-sm">{publishedDate}</span>
                            </div>

                            <div className="flex items-center gap-1 text-muted-foreground">
                                <Clock className="h-4 w-4" />
                                <span className="text-sm">{readingTime} min de leitura</span>
                            </div>

                            <Button
                                variant="outline"
                                size="sm"
                                onClick={handleShare}
                                className="ml-auto"
                            >
                                <Share2 className="h-4 w-4 mr-2" />
                                Compartilhar
                            </Button>
                        </div>

                        {/* Conteúdo */}
                        <div
                            className="prose prose-lg prose-invert max-w-none
                prose-headings:text-foreground
                prose-p:text-foreground/90
                prose-a:text-primary hover:prose-a:text-primary/80
                prose-strong:text-foreground
                prose-code:text-primary
                prose-pre:bg-card/50
                prose-img:rounded-lg"
                            dangerouslySetInnerHTML={{ __html: post.content }}
                        />
                    </FadeInOnScroll>
                </article>
            </main>

            <Footer />
        </div>
    );
}
