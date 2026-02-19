'use client';

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Star } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MagneticButton } from '@/components/ui/MagneticButton';
import React, { useState, useEffect } from 'react';

const testimonialImages = [
  PlaceHolderImages.find((img) => img.id === 'testimonial-1'),
  PlaceHolderImages.find((img) => img.id === 'testimonial-2'),
  PlaceHolderImages.find((img) => img.id === 'testimonial-3'),
];

const heroBackgroundImage = PlaceHolderImages.find(
  (img) => img.id === 'hero-background'
);

const Sparkle = ({ delay, top, left, size }: { delay: string, top: string, left: string, size: string }) => (
  <span 
    className="absolute animate-sparkle pointer-events-none text-luxury-gold opacity-0 z-20"
    style={{ 
      top, 
      left, 
      fontSize: size,
      animationDelay: delay,
      filter: 'drop-shadow(0 0 10px rgba(212, 175, 55, 0.8))'
    }}
  >
    ✦
  </span>
);

export default function HeroSection() {
  const [scrollScale, setScrollScale] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollY / windowHeight;
      const newScale = Math.max(0, 1 - progress * 1.5); 
      setScrollScale(newScale);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative text-white overflow-hidden">
      {/* Seta Animada (GIF) com Efeitos de Elite para disfarçar qualidade */}
      <div 
        className="fixed left-4 bottom-24 z-30 hidden lg:block pointer-events-none transition-all duration-100"
        style={{ 
          transform: `scale(${scrollScale})`,
          opacity: scrollScale * 0.7
        }}
      >
        <img 
          src="/arrow-anim.gif" 
          alt="Role para baixo" 
          className="w-48 h-auto mix-blend-screen filter brightness-125 contrast-125 drop-shadow-[0_0_20px_rgba(212,175,55,0.5)] blur-[0.4px]"
        />
      </div>

      {heroBackgroundImage && (
        <Image
          src={heroBackgroundImage.imageUrl}
          alt="Silas Ferdinan - Arquiteto de Integridade e Liderança em Growth do Grupo Ferdinan-MSP.Group"
          title="Ferdinan-MSP.Group: Soberania e Integridade Digital"
          fill
          sizes="100vw"
          quality={80}
          className="object-cover"
          priority
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPj/HwADBwH/7vM8OAAAAABJRU5ErkJggg=="
          data-ai-hint={heroBackgroundImage.imageHint}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/40 to-background"></div>
      
      <div className="container relative z-10 mx-auto px-4 py-24 text-center md:py-40">
        <div className="mb-6 inline-flex items-center rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5 text-xs font-semibold tracking-widest text-primary uppercase backdrop-blur-md">
          <span className="mr-2 inline-flex h-1.5 w-1.5 animate-pulse rounded-full bg-primary shadow-[0_0_10px_#D4AF37]"></span>
          Consultoria de Alta Performance
        </div>

        <div className="relative max-w-fit mx-auto">
          {/* Estrelinhas de Ouro Amplificadas e Alinhadas */}
          <Sparkle delay="0s" top="-15%" left="5%" size="28px" />
          <Sparkle delay="0.5s" top="20%" left="-10%" size="20px" />
          <Sparkle delay="1.2s" top="70%" left="105%" size="24px" />
          <Sparkle delay="0.8s" top="100%" left="50%" size="18px" />
          <Sparkle delay="1.5s" top="10%" left="95%" size="30px" />
          <Sparkle delay="0.3s" top="-5%" left="80%" size="22px" />

          <h1 className="font-headline text-5xl font-bold tracking-tighter text-white md:text-8xl lg:text-9xl mb-8 leading-[1.1]">
            Soberania & <br />
            <span className="text-luxury-gold drop-shadow-[0_0_50px_rgba(212,175,55,0.5)]">
              Elite Digital
            </span>
          </h1>
        </div>

        <p className="mx-auto mt-8 max-w-2xl text-lg md:text-xl text-white/60 leading-relaxed font-light">
          A autoridade definitiva em <span className="text-white font-medium border-b border-primary/50">Growth, Gestão & Compliance</span>. Liderados por Silas Ferdinan, arquitetamos a integridade algorítmica e o crescimento exponencial de marcas soberanas.
        </p>

        <div className="mt-16 flex flex-col items-center justify-center gap-6">
          <MagneticButton>
            <Link href="#contact" passHref aria-label="Solicitar análise do meu negócio">
              <Button
                size="lg"
                className="h-16 px-12 bg-white text-black font-bold text-lg transition-all duration-500 transform hover:bg-primary hover:text-black shadow-[0_0_50px_rgba(212,175,55,0.15)] rounded-none border border-white/20"
              >
                Agendar Análise Estratégica
              </Button>
            </Link>
          </MagneticButton>

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

      {/* Incentivo de Rolagem Sutil */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20 opacity-40 hover:opacity-100 transition-opacity duration-500">
        <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-luxury-gold">Explorar</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-luxury-gold to-transparent relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-white animate-scroll-down"></div>
        </div>
      </div>
    </section>
  );
}
