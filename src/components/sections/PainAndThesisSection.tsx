import { PlaceHolderImages } from "@/lib/placeholder-images";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";

const painThesisImage = PlaceHolderImages.find(img => img.id === 'pain-thesis');

export default function PainAndThesisSection() {
  return (
    <section id="pain-thesis" className="py-16 sm:py-24 bg-background px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <h2 className="text-3xl font-bold md:text-4xl font-headline text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-amber-500 mb-6">O Mercado é Caótico. Sua Estratégia Não Precisa Ser.</h2>
            <div className="space-y-4 text-muted-foreground text-lg">
                <p><strong className="text-foreground">A Dor:</strong> Soluções genéricas falham em mercados de alto valor. Ruído, complexidade e a pressão por resultados imediatos levam a decisões reativas que desperdiçam recursos e diluem sua marca.</p>
                <p><strong className="text-foreground">Nossa Tese:</strong> O crescimento exponencial e sustentável vem da curadoria, não da cópia. Ao alinhar estratégias validadas com o DNA exclusivo do seu negócio, transformamos complexidade em vantagem competitiva e criamos um caminho claro para a liderança.</p>
            </div>
            <Link href="#contact" className="mt-8 inline-block">
                <Button size="lg" className="bg-gradient-to-r from-yellow-300 to-amber-500 text-black font-bold hover:from-yellow-400 hover:to-amber-600 transition-transform transform hover:scale-105">
                    Transforme Complexidade em Vantagem
                </Button>
            </Link>
          </div>
          <div className="order-1 md:order-2">
            {painThesisImage && (
                <Image 
                    src={painThesisImage.imageUrl}
                    alt={painThesisImage.description}
                    width={296}
                    height={346}
                    className="rounded-lg shadow-2xl mx-auto object-cover transform transition-all duration-300 hover:scale-105"
                    data-ai-hint={painThesisImage.imageHint}
                />
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
