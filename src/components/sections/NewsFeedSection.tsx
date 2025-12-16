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

interface NewsItem {
  title: string;
  pubDate: string;
  link: string;
  author: string;
}

const getNewsImages = (item: NewsItem, index: number) => {
  // 1. Tenta extrair imagem do feed
  const imgMatch = item.description?.match(/<img[^>]+src="([^">]+)"/);
  if (imgMatch) return imgMatch[1];

  // 2. Banco de imagens curadas (Unsplash IDs diretos para evitar links quebrados)
  const topicImages: Record<string, string> = {
    'tecnologia': 'photo-1518770660439-4636190af475', // Tech circuit
    'ia': 'photo-1620712943543-bcc4688e7485', // AI Brain
    'mercado': 'photo-1611974765215-0279735d6480', // Stock graph
    'bolsa': 'photo-1611974765215-0279735d6480', // Stock graph
    'dinheiro': 'photo-1580519542036-c47de6196ba5', // Money
    'dolar': 'photo-1580519542036-c47de6196ba5', // Money
    'economia': 'photo-1526304640155-24e53298e6ad', // Economy graph
    'brasil': 'photo-1483389127117-b6a2102724ae', // SP City
    'governo': 'photo-1541872703-74c596ff149d', // Architecture/Gov
    'startup': 'photo-1519389950473-47ba0277781c', // Team working
    'empreendedor': 'photo-1507679799987-e7346c487463', // Man in suit
  };

  // 3. Tenta casar palavras-chave do título
  const text = (item.title + ' ' + item.description).toLowerCase();
  for (const [key, id] of Object.entries(topicImages)) {
    if (text.includes(key)) {
      return `https://images.unsplash.com/${id}?auto=format&fit=crop&w=800&q=80`;
    }
  }

  // 4. Fallback: Imagens genéricas de negócios rotativas
  const fallbackImages = [
    'photo-1486406146926-c627a92ad1ab', // Building
    'photo-1600880292203-757bb62b4baf', // Meeting
    'photo-1556761175-5973dc0f32e7', // Handshake
    'photo-1460925895917-afdab827c52f', // Analytics
    'photo-1556155092-490a1ba16284', // Graph tablet
  ];

  const fallbackId = fallbackImages[index % fallbackImages.length];
  return `https://images.unsplash.com/${fallbackId}?auto=format&fit=crop&w=800&q=80`;
};

const NewsFeedSection = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          'https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fnews.google.com%2Frss%2Fsearch%3Fq%3Dempreendedorismo%2Beconomia%26hl%3Dpt-BR%26gl%3DBR%26ceid%3DBR%3Apt-419'
        );
        if (!response.ok) {
          throw new Error('Failed to fetch news');
        }
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
    <section id="news" className="py-20 bg-background relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold md:text-5xl font-headline tracking-tight text-foreground">
            Radar de <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-600">Mercado</span>
          </h2>
          <p className="mt-4 text-xl text-muted-foreground max-w-2xl mx-auto">
            Insights estratégicos e as notícias que movimentam a economia.
          </p>
        </div>

        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        )}

        {error && (
          <div className="text-center py-20">
            <p className="text-destructive mb-4">Não foi possível carregar as notícias.</p>
            <Button onClick={() => window.location.reload()} variant="outline">Tentar Novamente</Button>
          </div>
        )}

        {!loading && !error && news.length > 0 && (
          <Carousel
            opts={{
              align: 'start',
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {news.map((item, index) => {
                const imageUrl = getNewsImages(item, index);
                // Clean description
                const cleanDesc = item.description?.replace(/<[^>]*>/g, '').slice(0, 100) + '...';

                return (
                  <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3 xl:basis-1/3">
                    <div className="h-full group">
                      <Card className="flex flex-col h-full bg-card/50 backdrop-blur-sm border-muted/40 overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
                        <div className="relative h-48 overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-black animate-pulse" />
                          <img
                            src={imageUrl}
                            alt={item.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            loading="lazy"
                          />
                          <div className="absolute top-3 left-3">
                            <span className="px-2 py-1 text-xs font-semibold bg-primary/90 text-primary-foreground rounded-full backdrop-blur-md shadow-sm">
                              {new Date(item.pubDate).toLocaleDateString()}
                            </span>
                          </div>
                        </div>

                        <CardContent className="p-6 flex flex-col flex-grow">
                          <h3 className="text-lg font-bold text-foreground mb-3 line-clamp-2 leading-tight group-hover:text-primary transition-colors">
                            {item.title}
                          </h3>
                          <div className="text-sm text-muted-foreground mb-4 line-clamp-3">
                            {cleanDesc.length > 5 ? cleanDesc : "Clique para ler a notícia completa e ver os detalhes desta atualização de mercado."}
                          </div>

                          <div className="mt-auto pt-4 flex items-center justify-between border-t border-border/50">
                            <span className="text-xs font-medium text-muted-foreground truncate max-w-[120px]">
                              {item.author || 'Redação'}
                            </span>
                            <Button asChild variant="ghost" size="sm" className="p-0 h-auto hover:bg-transparent hover:text-primary font-semibold group/btn">
                              <a
                                href={item.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1"
                              >
                                Ler conteúdo <span className="transition-transform group-hover/btn:translate-x-1">→</span>
                              </a>
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <div className="flex justify-center gap-4 mt-8">
              <CarouselPrevious className="static translate-y-0 hover:bg-primary hover:text-primary-foreground" />
              <CarouselNext className="static translate-y-0 hover:bg-primary hover:text-primary-foreground" />
            </div>
          </Carousel>
        )}
      </div>
    </section>
  );
};

export default NewsFeedSection;
