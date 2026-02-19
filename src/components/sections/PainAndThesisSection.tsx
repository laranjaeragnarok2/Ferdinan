import { PlaceHolderImages } from "@/lib/placeholder-images";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
import { GlassCard, GlassContent } from "../ui/glass-card";
import { AuditScanner } from "../ui/AuditScanner";

const painThesisImage = PlaceHolderImages.find(img => img.id === 'pain-thesis');

export default function PainAndThesisSection() {
  return (
    <section id="pain-thesis" className="py-24 md:py-40 bg-sovereign-arabesque overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-2 gap-20 items-center">
          <div className="order-2 md:order-1">
            <h2 className="text-4xl font-bold md:text-6xl font-headline text-luxury-gold mb-8 leading-tight">O Mercado é Caótico. <br/>Sua Soberania Não.</h2>
            <div className="space-y-6 text-white/50 text-xl font-light">
                <p><strong className="text-white font-medium">O Desafio:</strong> Soluções genéricas falham em mercados de alto valor. Ruído, complexidade e a falta de integridade técnica corroem o seu lucro.</p>
                <p><strong className="text-white font-medium">Nossa Tese:</strong> O domínio de mercado nasce da união entre tecnologia soberana e curadoria estratégica. Transformamos dados em autoridade inabalável.</p>
            </div>
            <Link href="#contact" className="mt-12 inline-block">
                <Button size="lg" className="h-14 px-10 bg-white text-black font-bold border border-white/20 hover:bg-primary hover:text-black transition-all duration-500 rounded-none">
                    SOLICITAR ACESSO À TESE
                </Button>
            </Link>
          </div>
          <div className="order-1 md:order-2">
            <AuditScanner>
              <GlassCard intensity="vanguard" className="p-2">
                {painThesisImage && (
                    <Image 
                        src={painThesisImage.imageUrl}
                        alt="Estratégia de Soberania Digital e Auditoria Algorítmica da Ferdinan-MSP.Group"
                        title="Integridade e Domínio de Mercado"
                        width={600}
                        height={700}
                        className="rounded-xl transition-all duration-700 object-cover"
                        data-ai-hint={painThesisImage.imageHint}
                    />
                )}
              </GlassCard>
            </AuditScanner>
          </div>
        </div>
      </div>
    </section>
  )
}
