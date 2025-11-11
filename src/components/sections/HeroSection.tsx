
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const heroImage = PlaceHolderImages.find((img) => img.id === "hero-strategy");
const testimonialImages = [
    PlaceHolderImages.find((img) => img.id === "testimonial-1"),
    PlaceHolderImages.find((img) => img.id === "testimonial-2"),
    PlaceHolderImages.find((img) => img.id === "testimonial-3"),
];


export default function HeroSection() {
  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4 text-center">
        <h1 className="font-headline text-4xl md:text-6xl tracking-tight text-foreground">
          Estratégias de Crescimento Curadas<br />para Negócios de Alto Valor
        </h1>
        <p className="mt-6 max-w-2xl mx-auto text-lg text-muted-foreground">
          Entregamos estratégias de crescimento personalizadas e soluções validadas, meticulosamente curadas para navegar nas complexidades do mercado moderno e desbloquear o crescimento sustentável para negócios de alto valor.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Link href="#contact">
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
              Solicitar uma Consultoria
            </Button>
          </Link>
          <Link href="#process">
            <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10">
              Nosso Processo
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
                        <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                    ))}
                </div>
                <p className="text-sm text-muted-foreground">Confiado por líderes de mercado.</p>
            </div>
        </div>
      </div>
      <div className="container mx-auto px-4 mt-16 relative">
        {heroImage && (
            <Image
                src={heroImage.imageUrl}
                alt={heroImage.description}
                width={1200}
                height={500}
                className="rounded-lg shadow-2xl mx-auto object-cover"
                data-ai-hint={heroImage.imageHint}
            />
        )}
      </div>
    </section>
  );
}
