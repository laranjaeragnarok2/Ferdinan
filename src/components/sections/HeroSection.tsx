'use client';

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Star } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useTranslations } from 'next-intl';

const testimonialImages = [
  PlaceHolderImages.find((img) => img.id === 'testimonial-1'),
  PlaceHolderImages.find((img) => img.id === 'testimonial-2'),
  PlaceHolderImages.find((img) => img.id === 'testimonial-3'),
];

const heroBackgroundImage = PlaceHolderImages.find(
  (img) => img.id === 'hero-background'
);

export default function HeroSection() {
  const t = useTranslations('HeroSection');

  return (
    <section className="relative text-white">
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
      <div className="container relative z-10 mx-auto px-4 py-20 text-center md:py-32">
        <h1 className="font-headline text-4xl font-bold tracking-tight text-white md:text-6xl">
          {t('headline')}
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-300">
          {t('subheadline')}
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Link href="#contact" passHref>
            <Button
              size="lg"
              className="bg-orange-600 text-white font-bold transition-transform transform hover:scale-105 hover:bg-orange-700"
            >
              {t('ctaButton')}
            </Button>
          </Link>
        </div>
        <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <div className="flex -space-x-2">
            {testimonialImages.map(
              (img, index) =>
                img && (
                  <Avatar key={index} className="border-2 border-background">
                    <AvatarImage
                      src={img.imageUrl}
                      alt={t('testimonialAlt')}
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
                  className="h-5 w-5 fill-yellow-400 text-yellow-400"
                />
              ))}
            </div>
            <p className="text-sm text-slate-400">{t('testimonialText')}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
