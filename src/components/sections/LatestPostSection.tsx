'use client';

import { useState, useEffect } from 'react';
import { BlogPost } from '@/types/blog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Calendar, Clock } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const LatestPostSection = () => {
    const [post, setPost] = useState<BlogPost | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLatestPost = async () => {
            try {
                const response = await fetch('/api/blog/posts?published=true&limit=1');
                if (response.ok) {
                    const data = await response.json();
                    console.log('Latest post data:', data);
                    if (data.posts && data.posts.length > 0) {
                        setPost(data.posts[0]);
                    } else {
                        console.log('No published posts found for the homepage spotlight.');
                    }
                }
            } catch (error) {
                console.error('Error fetching latest post:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchLatestPost();
    }, []);

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-12">
                <div className="h-[400px] w-full animate-pulse bg-muted/20 rounded-3xl" />
            </div>
        );
    }

    if (!post) return null;

    return (
        <section className="py-12 bg-background relative overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold font-headline tracking-tight text-foreground flex items-center gap-2">
                        <span className="w-2 h-8 bg-primary rounded-full" />
                        Último do <span className="text-primary text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-600">Blog</span>
                    </h2>
                    <Link href="/blog" className="text-sm font-semibold text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 group">
                        Ver todos <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>

                <Link href={`/blog/${post.slug}`} className="block">
                    <Card className="overflow-hidden border-muted/40 bg-card/50 backdrop-blur-md hover:border-primary/40 transition-all duration-500 group cursor-pointer shadow-2xl">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                            {/* Imagem */}
                            <div className="relative h-[300px] lg:h-[450px] overflow-hidden">
                                {post.coverImage ? (
                                    <Image
                                        src={post.coverImage}
                                        alt={post.title}
                                        fill
                                        sizes="(max-width: 1024px) 100vw, 50vw"
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gradient-to-br from-muted/50 to-muted flex items-center justify-center">
                                        <span className="text-muted-foreground font-medium">Sem imagem de capa</span>
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent lg:hidden" />
                            </div>

                            {/* Conteúdo */}
                            <CardContent className="p-8 lg:p-12 flex flex-col justify-center">
                                <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-muted-foreground">
                                    <span className="flex items-center gap-1.5 px-3 py-1 bg-primary/10 text-primary rounded-full font-bold text-[10px] uppercase tracking-wider">
                                        Novidade
                                    </span>
                                    <span className="flex items-center gap-1.5">
                                        <Calendar className="w-4 h-4 opacity-70" />
                                        {new Date(post.publishedAt).toLocaleDateString('pt-BR', {
                                            day: 'numeric',
                                            month: 'long'
                                        })}
                                    </span>
                                </div>

                                <h3 className="text-3xl lg:text-4xl font-bold mb-6 text-foreground group-hover:text-primary transition-colors leading-tight">
                                    {post.title}
                                </h3>

                                <p className="text-lg text-muted-foreground mb-8 line-clamp-3 leading-relaxed">
                                    {post.description}
                                </p>

                                <div className="mt-auto flex items-center gap-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary">
                                            {post.author?.name?.charAt(0) || 'A'}
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-foreground leading-none">
                                                {post.author?.name || 'Ferdinan'}
                                            </p>
                                            <p className="text-xs text-muted-foreground mt-1">Autor do post</p>
                                        </div>
                                    </div>

                                    <div className="ml-auto">
                                        <div className="inline-flex items-center justify-center rounded-md text-sm font-bold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 text-primary hover:bg-primary/5 gap-2 group/btn">
                                            Ler Agora
                                            <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </div>
                    </Card>
                </Link>
            </div>
        </section>
    );
};

export default LatestPostSection;
