import { getPosts } from '@/lib/mdx';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { GlassCard, GlassContent, GlassFooter, GlassHeader } from '@/components/ui/glass-card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { FadeInOnScroll } from '@/components/animations/FadeInOnScroll';

import { MarketTicker } from '@/components/ui/MarketTicker';
import { AuditScanner } from '@/components/ui/AuditScanner';

export const metadata = {
    title: 'Soberania & Conhecimento | Blog Ferdinan-MSP',
    description: 'Relatórios táticos e auditorias de integridade para a elite digital. Liderança estratégica sob o olhar de Silas Ferdinan.',
};

export default async function BlogListingPage() {
    const allPosts = await getPosts();
    const publishedPosts = allPosts.filter((post) => post.published);

    return (
        <div className="flex flex-col min-h-screen bg-black relative overflow-hidden">
            {/* Background Gradients para potencializar o Glassmorphism */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-primary/20 rounded-full blur-[120px] opacity-40 animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-blue-600/20 rounded-full blur-[120px] opacity-30 animate-pulse" />
            </div>

            <MarketTicker />
            <Header />

            <main className="flex-grow pt-32 pb-20 relative z-10">
                <div className="container mx-auto px-4">

                    {/* Hero Section */}
                    <div className="text-center max-w-3xl mx-auto mb-20 space-y-6">
                        <FadeInOnScroll>
                            <Badge variant="secondary" className="mb-4 bg-white/5 text-white/70 border-white/10 px-4 py-1.5 text-sm uppercase tracking-widest backdrop-blur-md">
                                Vanguarda Técnica
                            </Badge>
                            <h1 className="text-5xl md:text-7xl font-bold font-headline mb-6 tracking-tighter text-white">
                                Estrutura & <br />
                                <span className="text-luxury-gold drop-shadow-[0_0_30px_rgba(212,175,55,0.2)]">
                                    Conhecimento
                                </span>
                            </h1>
                            <p className="text-xl text-white/50 leading-relaxed font-light">
                                Estratégias táticas e visões de mercado filtradas para quem joga o jogo no nível mais alto.
                            </p>
                        </FadeInOnScroll>
                    </div>

                    {publishedPosts.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {publishedPosts.map((post, index) => (
                                <FadeInOnScroll key={post.slug} delay={index * 0.1}>
                                    <Link href={`/blog/${post.slug}`} className="group h-full block">
                                        <GlassCard intensity="medium" className="h-full flex flex-col group-hover:bg-white/15 group-hover:scale-[1.02] group-hover:border-white/30 transition-all duration-500 overflow-hidden">
                                            {/* Image Container with AuditScanner */}
                                            <AuditScanner>
                                                <div className="relative h-64 w-full overflow-hidden">
                                                    {post.coverImage ? (
                                                        <Image
                                                            src={post.coverImage}
                                                            alt={post.title}
                                                            fill
                                                            className="object-cover transition-transform duration-1000 group-hover:scale-110 grayscale-[0.5] group-hover:grayscale-0"
                                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full bg-gradient-to-br from-white/5 to-white/10 flex items-center justify-center">
                                                            <span className="text-white/20 font-bold tracking-tighter text-4xl italic">FERDINAN</span>
                                                        </div>
                                                    )}
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                                                    {/* Tags Overlay */}
                                                    <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                                                        {post.tags?.slice(0, 2).map(tag => (
                                                            <span key={tag} className="px-3 py-1 bg-white/10 backdrop-blur-xl text-[10px] font-bold uppercase tracking-widest rounded-full border border-white/10 text-white/90">
                                                                {tag}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            </AuditScanner>

                                            <GlassHeader className="space-y-3 pb-2 mt-2">
                                                <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-white/40 mb-1">
                                                    <span className="flex items-center gap-1.5">
                                                        <Calendar className="w-3 h-3 text-primary" />
                                                        {new Date(post.publishedAt).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' })}
                                                    </span>
                                                    <span className="flex items-center gap-1.5">
                                                        <Clock className="w-3 h-3 text-primary" />
                                                        5 min read
                                                    </span>
                                                </div>
                                                <h2 className="text-2xl font-bold leading-tight text-white group-hover:text-primary transition-colors tracking-tight">
                                                    {post.title}
                                                </h2>
                                            </GlassHeader>

                                            <GlassContent className="flex-grow">
                                                <p className="text-white/40 line-clamp-2 text-sm leading-relaxed font-light italic">
                                                    {post.description}
                                                </p>
                                            </GlassContent>

                                            <GlassFooter className="pt-4 border-t border-white/5 mt-auto p-6 flex items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-[10px] font-black text-white/60 overflow-hidden">
                                                        {post.author?.image ? (
                                                            <Image src={post.author.image} alt={post.author.name} width={32} height={32} />
                                                        ) : post.author?.name?.charAt(0) || 'F'}
                                                    </div>
                                                    <span className="text-[10px] font-bold uppercase tracking-widest text-white/60">
                                                        {post.author?.name || 'Skarner Engine'}
                                                    </span>
                                                </div>
                                                <span className="text-xs font-black text-primary flex items-center gap-2 group/link uppercase tracking-tighter">
                                                    Explorar <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-2" />
                                                </span>
                                            </GlassFooter>
                                        </GlassCard>
                                    </Link>
                                </FadeInOnScroll>
                            ))}
                        </div>
                    ) : (
                        <FadeInOnScroll>
                            <div className="text-center py-20 bg-white/5 backdrop-blur-3xl rounded-[32px] border border-white/5">
                                <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 border border-white/10">
                                    <Clock className="w-10 h-10 text-white/20 animate-spin-slow" />
                                </div>
                                <h3 className="text-2xl font-bold mb-3 text-white">Sincronizando Conteúdo...</h3>
                                <p className="text-white/40 max-w-md mx-auto font-light italic">
                                    Nossa engine de IA está refinando os próximos insights. Prepare-se para a vanguarda.
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
