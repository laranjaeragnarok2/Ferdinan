'use client';

import { useState, useEffect } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '../ui/button';
import { ExternalLink, TrendingUp } from 'lucide-react';

interface NewsItem {
  title: string;
  pubDate: string;
  link: string;
  author: string;
  description?: string;
  thumbnail?: string;
  enclosure?: {
    link?: string;
    type?: string;
  };
}

const getNewsImages = (item: NewsItem, index: number) => {
  // 1. Verificar se o RSS2JSON já extraiu um thumbnail ou enclosure
  if (item.thumbnail && item.thumbnail.length > 0) return item.thumbnail;
  if (item.enclosure?.link && item.enclosure.link.includes('http')) return item.enclosure.link;

  // 2. Tentar extrair a imagem real da descrição (Google News costuma colocar aqui)
  if (item.description) {
    const imgMatch = item.description.match(/<img[^>]+src="([^">]+)"/);
    if (imgMatch && imgMatch[1]) {
      let url = imgMatch[1];
      if (url.startsWith('//')) url = `https:${url}`;
      // Google News às vezes usa imagens minúsculas, mas é o que temos
      return url;
    }
  }

  // 3. Fallback: Usar IA com um prompt muito mais refinado para evitar o aspecto "esquisito"
  // Filtramos palavras irrelevantes do título para o prompt
  const promptKeywords = item.title
    .split(' ')
    .filter(w => w.length > 3)
    .slice(0, 4)
    .join(' ');

  const safePrompt = encodeURIComponent(
    `High-end professional business editorial photography, ${promptKeywords}, corporate luxury aesthetic, clean composition, cinematic lighting, 8k resolution, realistic textures, no text, no logos`
  );

  // Usamos o índice para garantir imagens diferentes para notícias diferentes
  return `https://image.pollinations.ai/prompt/${safePrompt}?width=800&height=600&nologo=true&seed=${index + 1234}`;
};

const NewsFeedSection = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fallback definitivo caso qualquer imagem falhe no carregamento
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    const fallbacks = [
      'photo-1486406146926-c627a92ad1ab', // Building
      'photo-1497366216548-37526070297c', // Office
      'photo-1507679799987-c7377ec58699', // Business man
      'photo-1454165833767-171f675b33d0', // Meeting
      'photo-1517245386807-bb43f82c33c4'  // Team
    ];
    const randomId = fallbacks[Math.floor(Math.random() * fallbacks.length)];
    target.src = `https://images.unsplash.com/${randomId}?auto=format&fit=crop&w=800&q=80`;
  };

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          'https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fnews.google.com%2Frss%2Fsearch%3Fq%3Dempreendedorismo%2Beconomia%26hl%3Dpt-BR%26gl%3DBR%26ceid%3DBR%3Apt-419'
        );
        if (!response.ok) throw new Error('Failed to fetch news');
        const data = await response.json();
        if (data.status === 'ok') {
          setNews(data.items);
        } else {
          throw new Error('API response was not ok');
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return (
    <section id="news" className="py-24 bg-background relative overflow-hidden">
      {/* Abstract Background */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] bg-orange-600/5 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <Carousel
          opts={{
            align: 'start',
            loop: true,
          }}
          className="w-full"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold mb-4 uppercase tracking-widest">
                <TrendingUp className="w-3 h-3" />
                Live Insights
              </div>
              <h2 className="text-4xl md:text-5xl font-bold font-headline tracking-tight text-foreground">
                Radar de <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-600">Mercado</span>
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Acompanhe as movimentações estratégicas que impactam o crescimento e a economia global em tempo real.
              </p>
            </div>
            <div className="hidden md:flex gap-2">
              <CarouselPrevious className="static translate-y-0 h-12 w-12 border-muted/40 hover:bg-primary hover:text-white transition-all" />
              <CarouselNext className="static translate-y-0 h-12 w-12 border-muted/40 hover:bg-primary hover:text-white transition-all" />
            </div>
          </div>

          {loading && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-[400px] bg-muted/20 animate-pulse rounded-2xl border border-muted/30" />
              ))}
            </div>
          )}

          {error && (
            <div className="text-center py-20 bg-card/30 backdrop-blur rounded-3xl border border-dashed border-border">
              <p className="text-destructive mb-4 font-medium">Conexão instável com o radar de notícias.</p>
              <Button onClick={() => window.location.reload()} variant="outline" className="rounded-full">Recarregar Radar</Button>
            </div>
          )}

          {!loading && !error && news.length > 0 && (
            <>
              <CarouselContent className="-ml-6">
                {news.map((item, index) => {
                  const imageUrl = getNewsImages(item, index);
                  return (
                    <CarouselItem key={index} className="pl-6 md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                      <a href={item.link} target="_blank" rel="noopener noreferrer" className="h-full block group">
                        <Card className="flex flex-col h-full bg-card/30 backdrop-blur-md border-muted/30 hover:border-primary/50 transition-all duration-500 hover:shadow-[0_20px_40px_rgba(0,0,0,0.1)] cursor-pointer group rounded-2xl overflow-hidden">
                          <div className="relative h-48 w-full overflow-hidden">
                            <img
                              src={imageUrl}
                              alt={item.title}
                              onError={handleImageError}
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-card/90 to-transparent" />
                            <div className="absolute top-4 right-4 h-8 w-8 rounded-full bg-background/80 backdrop-blur flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                              <ExternalLink className="w-4 h-4 text-primary" />
                            </div>
                          </div>

                          <CardContent className="p-6 flex flex-col flex-grow relative">
                            <div className="flex items-center gap-2 mb-4">
                              <span className="text-[10px] font-bold text-primary/60 uppercase tracking-widest">
                                {new Date(item.pubDate).toLocaleDateString()}
                              </span>
                              <span className="w-1 h-1 rounded-full bg-muted-foreground/30" />
                              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                                {item.author || 'Mercado'}
                              </span>
                            </div>

                            <h3 className="text-lg font-bold text-foreground mb-4 line-clamp-3 leading-tight group-hover:text-primary transition-colors">
                              {item.title}
                            </h3>

                            <div className="mt-auto flex items-center gap-2 text-xs font-semibold text-primary group-hover:gap-3 transition-all">
                              Ler análise completa <span className="text-lg">→</span>
                            </div>
                          </CardContent>
                        </Card>
                      </a>
                    </CarouselItem>
                  );
                })}
              </CarouselContent>
              {/* Mobile Nav */}
              <div className="flex justify-center gap-4 mt-8 md:hidden">
                <CarouselPrevious className="static translate-y-0" />
                <CarouselNext className="static translate-y-0" />
              </div>
            </>
          )}
        </Carousel>
      </div>
    </section>
  );
};

export default NewsFeedSection;
