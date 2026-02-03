import { getPosts } from '@/lib/mdx';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, ArrowRight, User } from 'lucide-react';
import { FadeInOnScroll } from '@/components/animations/FadeInOnScroll';

export const metadata = {
    title: 'Blog | Ferdinan - Growth & High Performance',
    description: 'Insights, estratégias e guias práticos sobre Growth Hacking, Vendas B2B e Gestão de Alta Performance.',
};

export default async function BlogListingPage() {
    const allPosts = await getPosts();
    const publishedPosts = allPosts.filter((post) => post.published);

    return (
        <div className="flex flex-col min-h-screen bg-background relative overflow-hidden">
            {/* Background Gradients */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl opacity-50" />
                <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl opacity-50" />
            </div>

            <Header />

            <main className="flex-grow pt-32 pb-20 relative z-10">
                <div className="container mx-auto px-4">

                    {/* Hero Section */}
                    <div className="text-center max-w-3xl mx-auto mb-20 space-y-6">
                        <FadeInOnScroll>
                            <Badge variant="secondary" className="mb-4 bg-primary/10 text-primary border-primary/20 px-4 py-1.5 text-sm uppercase tracking-wide">
                                Nosso Blog
                            </Badge>
                            <h1 className="text-4xl md:text-6xl font-bold font-headline mb-6 tracking-tight">
                                Insights para <br />
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-orange-500 to-amber-500">
                                    Crescimento Exponencial
                                </span>
                            </h1>
                            <p className="text-xl text-muted-foreground leading-relaxed">
                                Estratégias validadas, estudos de caso e hacks de gestão para escalar sua operação sem sacrificar a qualidade.
                            </p>
                        </FadeInOnScroll>
                    </div>

                    {publishedPosts.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {publishedPosts.map((post, index) => (
                                <FadeInOnScroll key={post.slug} delay={index * 0.1}>
                                    <Link href={`/blog/${post.slug}`} className="group h-full block">
                                        <Card className="h-full flex flex-col overflow-hidden border-border/50 bg-card/40 backdrop-blur-sm hover:border-primary/50 hover:bg-card/60 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-1">
                                            {/* Image Container */}
                                            <div className="relative h-56 w-full overflow-hidden">
                                                {post.coverImage ? (
                                                    <Image
                                                        src={post.coverImage}
                                                        alt={post.title}
                                                        fill
                                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full bg-gradient-to-br from-secondary/50 to-secondary flex items-center justify-center">
                                                        <span className="text-muted-foreground font-medium">Ferdinan Blog</span>
                                                    </div>
                                                )}
                                                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-60" />

                                                {/* Tags Overlay */}
                                                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                                                    {post.tags?.slice(0, 2).map(tag => (
                                                        <span key={tag} className="px-2.5 py-1 bg-background/80 backdrop-blur text-xs font-semibold rounded-md border border-border/50 text-foreground">
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>

                                            <CardHeader className="space-y-2 pb-2">
                                                <div className="flex items-center gap-3 text-xs text-muted-foreground mb-1">
                                                    <span className="flex items-center gap-1">
                                                        <Calendar className="w-3.5 h-3.5 text-primary" />
                                                        {new Date(post.publishedAt).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' })}
                                                    </span>
                                                    {/* Opcional: tempo de leitura fake ou real se tivermos calculado */}
                                                    <span className="flex items-center gap-1">
                                                        <Clock className="w-3.5 h-3.5 text-primary" />
                                                        5 min de leitura
                                                    </span>
                                                </div>
                                                <h2 className="text-xl font-bold font-headline leading-tight group-hover:text-primary transition-colors">
                                                    {post.title}
                                                </h2>
                                            </CardHeader>

                                            <CardContent className="flex-grow">
                                                <p className="text-muted-foreground line-clamp-3 text-sm leading-relaxed">
                                                    {post.description}
                                                </p>
                                            </CardContent>

                                            <CardFooter className="pt-0 border-t border-border/10 mt-auto p-6 flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-bold text-primary">
                                                        {post.author?.name?.charAt(0) || 'F'}
                                                    </div>
                                                    <span className="text-xs font-medium text-muted-foreground">
                                                        {post.author?.name || 'Equipe Ferdinan'}
                                                    </span>
                                                </div>
                                                <span className="text-sm font-semibold text-primary flex items-center gap-1 group/link">
                                                    Ler artigo <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-1" />
                                                </span>
                                            </CardFooter>
                                        </Card>
                                    </Link>
                                </FadeInOnScroll>
                            ))}
                        </div>
                    ) : (
                        <FadeInOnScroll>
                            <div className="text-center py-20 bg-card/30 backdrop-blur rounded-3xl border border-dashed border-border">
                                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Clock className="w-8 h-8 text-muted-foreground" />
                                </div>
                                <h3 className="text-xl font-bold mb-2">Em breve</h3>
                                <p className="text-muted-foreground max-w-md mx-auto">
                                    Estamos preparando conteúdos incríveis para você. Volte em breve para conferir nossos artigos sobre Growth e Alta Performance.
                                </p>
                            </div>
                        </FadeInOnScroll>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
}
