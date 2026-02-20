import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AgentsSection from '@/components/sections/AgentsSection';
import LeadFormSection from '@/components/sections/LeadFormSection';
import { FadeInOnScroll } from '@/components/animations/FadeInOnScroll';
import dynamic from 'next/dynamic';

const MarketTicker = dynamic(() => import('@/components/ui/MarketTicker').then(mod => mod.MarketTicker));

export default function AIPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <MarketTicker />
      <Header />
      <main className="flex-grow">
        {/* Hero Section para IA */}
        <section className="pt-32 pb-16 bg-background relative overflow-hidden">
          <div className="container mx-auto px-4 text-center relative z-10">
            <h1 className="text-5xl md:text-7xl font-headline text-luxury-gold mb-8">
              A Nova Fronteira da <br /> Soberania Digital
            </h1>
            <p className="max-w-2xl mx-auto text-xl text-muted-foreground mb-12">
              Não apenas inteligência artificial. Uma orquestração de elite projetada para elevar o padrão operacional da sua empresa ao nível soberano.
            </p>
          </div>
          {/* Decorative background element */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
        </section>

        <div className="relative z-10 bg-background">
          <FadeInOnScroll>
            <AgentsSection />
          </FadeInOnScroll>

          <FadeInOnScroll>
            <section className="py-20 bg-card/30 border-y border-white/[0.05]">
              <div className="container mx-auto px-4 text-center">
                <h2 className="text-3xl font-headline text-foreground mb-8">Tecnologia de Próxima Geração</h2>
                <div className="flex flex-wrap justify-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-700">
                  <div className="text-2xl font-bold font-mono">Diamante-OS Core</div>
                  <div className="text-2xl font-bold font-mono">Neural Orquestrator</div>
                  <div className="text-2xl font-bold font-mono">Clawdbot V2</div>
                  <div className="text-2xl font-bold font-mono">Sovereign Architecture</div>
                </div>
              </div>
            </section>
          </FadeInOnScroll>

          <FadeInOnScroll>
            <LeadFormSection />
          </FadeInOnScroll>
        </div>
      </main>
      <Footer />
    </div>
  );
}
