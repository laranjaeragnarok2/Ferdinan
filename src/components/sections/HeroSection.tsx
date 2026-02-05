'use client';

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Star } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const testimonialImages = [
  PlaceHolderImages.find((img) => img.id === 'testimonial-1'),
  PlaceHolderImages.find((img) => img.id === 'testimonial-2'),
  PlaceHolderImages.find((img) => img.id === 'testimonial-3'),
];

const heroBackgroundImage = PlaceHolderImages.find(
  (img) => img.id === 'hero-background'
);

export default function HeroSection() {
  return (
    <section className="relative text-white overflow-hidden">
      {heroBackgroundImage && (
        <Image
          src={heroBackgroundImage.imageUrl}
          alt={heroBackgroundImage.description}
          fill
          sizes="100vw"
          quality={85}
          className="object-cover"
          priority
          fetchPriority="high"
          loading="eager"
          data-ai-hint={heroBackgroundImage.imageHint}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/40 to-background"></div>
      <div className="container relative z-10 mx-auto px-4 py-24 text-center md:py-40">
        <div className="mb-6 inline-flex items-center rounded-full border border-orange-500/30 bg-orange-500/10 px-3 py-1 text-sm font-medium text-orange-400 backdrop-blur-sm">
          <span className="mr-2 inline-flex h-2 w-2 animate-pulse rounded-full bg-orange-500"></span>
          Consultoria de Alta Performance
        </div>

        <h1 className="font-headline text-5xl font-extrabold tracking-tight text-white md:text-7xl lg:text-8xl mb-8">
          Insights para <br />
          <span className="bg-gradient-to-r from-orange-400 via-amber-500 to-orange-600 bg-clip-text text-transparent">
            Alta Performance
          </span>
        </h1>

        <p className="mx-auto mt-8 max-w-2xl text-xl text-slate-300 leading-relaxed">
          Pare de queimar capital com estratégias que não escalam. Implementamos processos de <span className="text-white font-semibold underline decoration-orange-500/50 underline-offset-4">Growth e Gestão</span> focados em ROI real e previsibilidade.
        </p>

        <div className="mt-12 flex flex-col items-center justify-center gap-6">
          <Link href="#contact" passHref aria-label="Solicitar análise do meu negócio">
            <Button
              size="lg"
              className="h-14 px-10 bg-orange-600 text-white font-bold text-lg transition-all duration-300 transform hover:scale-105 hover:bg-orange-700 shadow-[0_0_25px_rgba(234,88,12,0.3)] rounded-full"
            >
              Agendar Análise Estratégica
            </Button>
          </Link>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row mt-8">
            <div className="flex -space-x-2">
              {testimonialImages.map(
                (img, index) =>
                  img && (
                    <Avatar key={index} className="border-2 border-background w-10 h-10">
                      <AvatarImage
                        src={img.imageUrl}
                        alt={`Depoimento do cliente ${index + 1}`}
                        data-ai-hint={img.imageHint}
                      />
                      <AvatarFallback>{`C${index + 1}`}</AvatarFallback>
                    </Avatar>
                  )
              )}
            </div>
            <div className="text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-yellow-500 text-yellow-500"
                  />
                ))}
              </div>
              <p className="text-xs text-slate-400 font-medium">Confiado por líderes de mercado.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
