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
import { useTranslations } from 'next-intl';

interface NewsItem {
  title: string;
  pubDate: string;
  link: string;
  author: string;
}

const NewsFeedSection = () => {
  const t = useTranslations('NewsFeedSection');
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          'https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fexame.com%2Frss%2Fpme%2F'
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
    <section id="news" className="py-16 sm:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold md:text-4xl font-headline text-center text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-600">
          {t('title')}
        </h2>
        <p className="mt-4 max-w-2xl mx-auto text-center text-lg text-muted-foreground">
          {t('subtitle')}
        </p>

        {loading && (
          <div className="mt-12 text-center text-muted-foreground">
            {t('loading')}
          </div>
        )}
        {error && (
          <div className="mt-12 text-center text-destructive">{error}</div>
        )}

        {!loading && !error && news.length > 0 && (
          <Carousel
            opts={{
              align: 'start',
              loop: true,
            }}
            className="w-full mt-12"
          >
            <CarouselContent>
              {news.map((item, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-1">
                    <Card className="flex flex-col h-full bg-card border-border/70 shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-2 hover:shadow-xl hover:border-primary/50">
                      <CardContent className="p-6 flex flex-col flex-grow">
                        <h3 className="text-lg font-bold text-foreground mb-2 flex-grow">
                          {item.title}
                        </h3>
                        <p className="text-xs text-muted-foreground mb-4">
                          {new Date(item.pubDate).toLocaleDateString()} -{' '}
                          {item.author}
                        </p>
                        <Button asChild variant="outline" size="sm">
                          <a
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {t('readMore')}
                          </a>
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden sm:flex" />
            <CarouselNext className="hidden sm:flex" />
          </Carousel>
        )}
      </div>
    </section>
  );
};

export default NewsFeedSection;
