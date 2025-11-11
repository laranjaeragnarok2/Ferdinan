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
            <h2 className="text-3xl font-bold md:text-4xl font-headline text-foreground mb-6">The Problem & Our Thesis</h2>
            <div className="space-y-4 text-muted-foreground text-lg">
                <p><strong className="text-foreground">The Pain:</strong> High-value businesses operate in a complex, noisy market. Off-the-shelf strategies fail because they don't account for unique brand assets, market positioning, and the intricate web of customer psychology.</p>
                <p><strong className="text-foreground">Our Thesis:</strong> Sustainable growth is not about chasing trends; it's about strategic curation. By meticulously selecting, validating, and integrating strategies and solutions that align with a business's core DNA, we unlock exponential, long-term value.</p>
            </div>
            <Link href="#contact" className="mt-8 inline-block">
                <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                    Solve My Growth Problem
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
