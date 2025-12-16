import { Playfair_Display, PT_Sans } from 'next/font/google';
import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import Script from 'next/script';
import CookieConsent from '@/components/layout/CookieConsent';
import StickyElementsWidget from '@/components/layout/StickyElementsWidget';

import { StockTicker } from '@/components/ui/StockTicker';

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-headline',
});

const ptSans = PT_Sans({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body',
});

export const metadata: Metadata = {
  title: 'Ferdinan-MSP.Group',
  description:
    'Potencialize seu lucro com Consultoria de Growth, Vendas e Gestão de Alta Performance. Descubra onde sua empresa está perdendo dinheiro. Faça seu Diagnóstico Gratuito.',
};

export const viewport: Viewport = {
  themeColor: '#09090b',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`!scroll-smooth dark ${playfair.variable} ${ptSans.variable}`}>
      <head>
        <meta name="google-adsense-account" content="ca-pub-1477681884429701" />
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1477681884429701"
          crossOrigin="anonymous"
          strategy="lazyOnload"
        />
      </head>
      <body className="font-body antialiased bg-background text-foreground">
        <StockTicker />
        {children}
        <StickyElementsWidget />
        <CookieConsent />
        <Toaster />
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-KXTREZQQ36"
        ></Script>
        <Script id="google-analytics">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-KXTREZQQ36');
            gtag('config', 'AW-16899626920');
          `}
        </Script>
      </body>
    </html>
  );
}
