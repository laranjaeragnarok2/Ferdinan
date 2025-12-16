import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { SpeedInsights } from '@vercel/speed-insights/next';
import Script from 'next/script';
import CookieConsent from '@/components/layout/CookieConsent';
import StickyElementsWidget from '@/components/layout/StickyElementsWidget';
import ConciergeContent from '@/components/concierge/ConciergeContent';

import { StockTicker } from '@/components/ui/StockTicker';

export const metadata: Metadata = {
  title: 'Ferdian-MSP',
  description:
    'Estratégias de crescimento personalizadas, curadas para negócios de alto valor.',
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
    <html lang="pt-BR" className="!scroll-smooth dark">
      <head>
        <meta name="google-adsense-account" content="ca-pub-1477681884429701" />
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1477681884429701"
          crossOrigin="anonymous"
          strategy="lazyOnload"
        />
      </head>
      <body className="font-body antialiased">
        <StockTicker />
        {children}
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
