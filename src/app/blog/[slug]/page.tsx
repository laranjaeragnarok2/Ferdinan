import { getPostBySlug } from '@/lib/mdx';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { FadeInOnScroll } from '@/components/animations/FadeInOnScroll';

export const revalidate = 60;

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    console.log('Rendering blog post strategy for:', slug);
    const result = await getPostBySlug(slug);
    if (result) {
        console.log('Post found, content length:', result.content.length);
    } else {
        console.log('Post not found for slug:', slug);
    }

    if (!result) {
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

    const post = result.data;
    const publishedAt = post.publishedAt || new Date().toISOString();
    const publishedDate = new Date(publishedAt).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
    });

    const wordsPerMinute = 200;
    const contentText = result.content || '';
    const wordCount = contentText.split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / wordsPerMinute);

    return (
        <div className="flex flex-col min-h-screen bg-background">
            <Header />

            <main className="flex-grow">
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
                        <Link
                            href="/blog"
                            className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-8"
                        >
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Voltar para o blog
                        </Link>

                        <div className="flex flex-wrap gap-2 mb-6">
                            {post.tags?.map((tag: string) => (
                                <Badge
                                    key={tag}
                                    variant="secondary"
                                    className="bg-primary/10 text-primary"
                                >
                                    {tag}
                                </Badge>
                            ))}
                        </div>

                        <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                            {post.title}
                        </h1>

                        <p className="text-xl text-muted-foreground mb-8">{post.description}</p>

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
                        </div>

                        <div className="prose prose-lg prose-invert max-w-none
                            prose-headings:text-foreground
                            prose-p:text-foreground/90
                            prose-a:text-primary hover:prose-a:text-primary/80
                            prose-strong:text-foreground
                            prose-code:text-primary
                            prose-pre:bg-card/50
                            prose-img:rounded-lg">
                            <div dangerouslySetInnerHTML={{ __html: contentText }} />
                        </div>
                    </FadeInOnScroll>
                </article>
            </main>

            <Footer />
        </div>
    );
}
