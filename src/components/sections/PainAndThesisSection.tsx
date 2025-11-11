import { PlaceHolderImages } from "@/lib/placeholder-images";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";

const painThesisImage = PlaceHolderImages.find(img => img.id === 'pain-thesis');

export default function PainAndThesisSection() {
  return (
    <section id="pain-thesis" className="py-16 sm:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <h2 className="text-3xl font-bold md:text-4xl font-headline text-foreground mb-6">O Problema & Nossa Tese</h2>
            <div className="space-y-4 text-muted-foreground text-lg">
                <p><strong className="text-foreground">A Dor:</strong> Negócios de alto valor operam em um mercado complexo e ruidoso. Estratégias prontas falham porque não consideram os ativos de marca únicos, o posicionamento de mercado e a intrincada teia da psicologia do consumidor.</p>
                <p><strong className="text-foreground">Nossa Tese:</strong> O crescimento sustentável não é sobre seguir tendências; é sobre curadoria estratégica. Ao selecionar, validar e integrar meticulosamente estratégias e soluções que se alinham com o DNA central de um negócio, desbloqueamos um valor exponencial e de longo prazo.</p>
            </div>
            <Link href="#contact" className="mt-8 inline-block">
                <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                    Resolva Meu Problema de Crescimento
                </Button>
            </Link>
          </div>
          <div className="order-1 md:order-2">
            {painThesisImage && (
                <Image 
                    src={painThesisImage.imageUrl}
                    alt={painThesisImage.description}
                    width={600}
                    height={700}
                    className="rounded-lg shadow-2xl mx-auto object-cover"
                    data-ai-hint={painThesisImage.imageHint}
                />
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
