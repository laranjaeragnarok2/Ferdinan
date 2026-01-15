'use client';

import { BlogPost } from '@/types/blog';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface BlogCardProps {
    post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
    const publishedDate = new Date(post.publishedAt).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
    });

    // Calcular tempo de leitura (aproximado)
    const wordsPerMinute = 200;
    const wordCount = post.content.split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / wordsPerMinute);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ y: -5 }}
        >
            <Link href={`/blog/${post.slug}`}>
                <Card className="h-full overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all duration-300 group">
                    {/* Imagem de capa */}
                    {post.coverImage && (
                        <div className="relative h-48 w-full overflow-hidden">
                            <Image
                                src={post.coverImage}
                                alt={post.title}
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                className="object-cover transition-transform duration-300 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                        </div>
                    )}

                    <CardHeader>
                        <div className="flex flex-wrap gap-2 mb-2">
                            {post.tags.map((tag) => (
                                <Badge
                                    key={tag}
                                    variant="secondary"
                                    className="bg-primary/10 text-primary hover:bg-primary/20"
                                >
                                    {tag}
                                </Badge>
                            ))}
                        </div>

                        <CardTitle className="text-2xl font-bold group-hover:text-primary transition-colors line-clamp-2">
                            {post.title}
                        </CardTitle>

                        <CardDescription className="text-muted-foreground line-clamp-3">
                            {post.description}
                        </CardDescription>
                    </CardHeader>

                    <CardContent>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                <span>{publishedDate}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                <span>{readingTime} min de leitura</span>
                            </div>
                        </div>

                        {post.author && (
                            <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border/50">
                                {post.author.avatar && (
                                    <Image
                                        src={post.author.avatar}
                                        alt={post.author.name}
                                        width={32}
                                        height={32}
                                        className="rounded-full"
                                    />
                                )}
                                <span className="text-sm font-medium">{post.author.name}</span>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </Link>
        </motion.div>
    );
}
