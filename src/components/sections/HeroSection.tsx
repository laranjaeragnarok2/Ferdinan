
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Star } from "lucide-react";

const heroImage = PlaceHolderImages.find((img) => img.id === "hero-strategy");

export default function HeroSection() {
  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4 text-center">
        <h1 className="font-headline text-4xl md:text-6xl tracking-tight text-foreground">
          Curated Growth Strategies<br />for High-Value Businesses
        </h1>
        <p className="mt-6 max-w-2xl mx-auto text-lg text-muted-foreground">
          We deliver bespoke growth strategies and validated solutions, meticulously curated to navigate the complexities of the modern market and unlock sustainable growth for high-value businesses.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Link href="#contact">
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
              Request a Consultation
            </Button>
          </Link>
          <Link href="#process">
            <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10">
              Our Process
            </Button>
          </Link>
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
