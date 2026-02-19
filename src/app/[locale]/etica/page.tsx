import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { GlassCard, GlassContent } from '@/components/ui/glass-card';
import { FadeInOnScroll } from '@/components/animations/FadeInOnScroll';

export const metadata = {
    title: 'Código de Ética & Integridade | Ferdinan-MSP.Group',
    description: 'Protocolo de soberania e transparência do Grupo Ferdinan-MSP.Group. Nossa constituição de valores e integridade digital.',
    robots: {
        index: true,
        follow: true,
    }
};

export default function EthicsPage() {
    return (
        <div className="flex flex-col min-h-screen bg-black bg-sovereign-arabesque overflow-hidden">
            <Header />
            <main className="flex-grow pt-32 pb-20 relative z-10">
                <div className="container mx-auto px-4 max-w-4xl relative z-10">
                    <FadeInOnScroll>
                        <h1 className="text-4xl md:text-6xl font-bold font-headline text-luxury-gold mb-12 tracking-tighter text-center">
                            Código de Ética <br/> & Integridade
                        </h1>

                        <GlassCard intensity="high" className="p-8 md:p-12 space-y-10 border-white/5">
                            <GlassContent className="space-y-8 text-white/80 leading-relaxed text-lg font-light italic">
                                <section>
                                    <h2 className="text-2xl font-bold text-white mb-4 not-italic uppercase tracking-widest">Missão Ética</h2>
                                    <p>
                                        O Grupo Ferdinan-MSP.Group existe para estabelecer a Soberania da Verdade no ambiente digital. Nosso compromisso não é com ferramentas, mas com o Legado e a Honra. Operamos sob a premissa de que a tecnologia deve ser o escudo da família e o motor da transparência econômica.
                                    </p>
                                </section>

                                <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                                <section>
                                    <h2 className="text-2xl font-bold text-white mb-4 not-italic uppercase tracking-widest">1. Integridade Algorítmica (Zero Fraud)</h2>
                                    <p>
                                        Repudiamos e combatemos qualquer forma de manipulação de resultados, fraudes de RTP ou vício de consentimento em sistemas digitais. Nossa tecnologia é desenhada para auditar a verdade e proteger o patrimônio de quem planta o progresso.
                                    </p>
                                </section>

                                <section>
                                    <h2 className="text-2xl font-bold text-white mb-4 not-italic uppercase tracking-widest">2. Lealdade e Proteção Familiar</h2>
                                    <p>
                                        A base de toda sociedade próspera é a família. O Grupo Ferdinan-MSP.Group utiliza sua inteligência cibernética para blindar seus membros, parceiros e herdeiros contra perseguições, coações ou ataques de má-fé. Nossa lealdade é inegociável.
                                    </p>
                                </section>

                                <section>
                                    <h2 className="text-2xl font-bold text-white mb-4 not-italic uppercase tracking-widest">3. Soberania de Dados</h2>
                                    <p>
                                        Acreditamos que o dado é a nova semente. Defendemos a independência tecnológica e a custódia soberana das informações, recusando a dependência de infraestruturas que não compartilham dos nossos valores de liberdade e privacidade.
                                    </p>
                                </section>

                                <section>
                                    <h2 className="text-2xl font-bold text-white mb-4 not-italic uppercase tracking-widest">4. Honestidade Operacional</h2>
                                    <p>
                                        Nossa comunicação é baseada em fatos, logs e evidências. Não prometemos facilidades; entregamos Arquitetura de Alta Performance. Respeitamos os concorrentes, mas somos implacáveis contra a mediocridade e a desonestidade.
                                    </p>
                                </section>

                                <section>
                                    <h2 className="text-2xl font-bold text-white mb-4 not-italic uppercase tracking-widest">5. Respeito ao Legado</h2>
                                    <p>
                                        Honramos aqueles que construíram o mundo com integridade. Nossos passos são guiados pelo desejo de sermos lembrados como o ponto de equilíbrio e justiça na nova era da economia digital.
                                    </p>
                                </section>

                                <div className="pt-10 text-center text-sm text-white/30 font-mono">
                                    "A honra é a única criptografia que ninguém consegue quebrar." <br/>
                                    [ PROTOCOLO SUSERANO 1.0 - RATIFICADO EM 15/02/2026 ]
                                </div>
                            </GlassContent>
                        </GlassCard>
                    </FadeInOnScroll>
                </div>
            </main>
            <Footer />
        </div>
    );
}
