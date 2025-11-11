
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const testimonialImages = [
    PlaceHolderImages.find((img) => img.id === "testimonial-1"),
    PlaceHolderImages.find((img) => img.id === "testimonial-2"),
    PlaceHolderImages.find((img) => img.id === "testimonial-3"),
];

const heroBackgroundImage = PlaceHolderImages.find((img) => img.id === "hero-background");


export default function HeroSection() {
  return (
    <section className="relative py-20 md:py-32 bg-background text-white px-4 sm:px-6 lg:px-8">
        {heroBackgroundImage && (
            <Image
                src={heroBackgroundImage.imageUrl}
                alt={heroBackgroundImage.description}
                fill
                className="object-cover"
                priority
                data-ai-hint={heroBackgroundImage.imageHint}
            />
        )}
        <div className="absolute inset-0 bg-black/60"></div>
      <div className="container relative mx-auto text-center">
        <h1 className="font-headline text-4xl md:text-6xl tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-amber-500">
          Pare de Adivinhar. Comece a Crescer.
        </h1>
        <p className="mt-6 max-w-2xl mx-auto text-lg text-slate-300">
          Navegue pelas complexidades do mercado com estratégias de crescimento personalizadas, meticulosamente curadas para negócios de alto valor que não se contentam com o comum.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Link href="#contact">
            <Button size="lg" className="bg-gradient-to-r from-yellow-300 to-amber-500 text-black font-bold hover:from-yellow-400 hover:to-amber-600 transition-transform transform hover:scale-105">
              Solicitar uma Consultoria
            </Button>
          </Link>
          <Link href="#process">
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 transition-transform transform hover:scale-105">
              Conheça Nosso Processo
            </Button>
          </Link>
        </div>
        <div className="mt-8 flex justify-center items-center gap-4">
            <div className="flex -space-x-2">
                {testimonialImages.map((img, index) => img && (
                    <Avatar key={index} className="border-2 border-background">
                        <AvatarImage src={img.imageUrl} alt="Cliente satisfeito" data-ai-hint={img.imageHint} />
                        <AvatarFallback>{`C${index+1}`}</AvatarFallback>
                    </Avatar>
                ))}
            </div>
            <div className="text-left">
                <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                </div>
                <p className="text-sm text-slate-400">Confiado por líderes de mercado.</p>
            </div>
        </div>
      </div>
    </section>
  );
}
