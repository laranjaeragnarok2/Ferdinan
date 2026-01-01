import { Playfair_Display, PT_Sans } from 'next/font/google';
import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import Script from 'next/script';
import CookieConsent from '@/components/layout/CookieConsent';
import LeadCaptureModal from '@/components/layout/LeadCaptureModal';
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
  title: 'Ferdinan-MSP | Consultoria de Growth & Gestão de Alta Performance',
  description:
    'Pare de queimar capital com estratégias que não escalam. Implementamos processos de Growth e Gestão focados em ROI real e previsibilidade. Agende sua análise estratégica.',
  keywords: ['Growth Hacking', 'Consultoria de Vendas', 'Gestão de Alta Performance', 'Automação de Processos', 'Ferdinan', 'MSP Group', 'Growth Marketing', 'Vendas B2B'],
  authors: [{ name: 'Ferdinan' }],
  verification: {
    google: 'micLhK74KQ1gJVOLK9Wh0lj09tPNLRMebMigcF11gb4',
  },
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  metadataBase: new URL('https://www.ferdinan-msp.group'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Ferdinan-MSP | Consultoria de Growth & Gestão de Alta Performance',
    description: 'Pare de queimar capital com estratégias que não escalam. Implementamos processos de Growth e Gestão focados em ROI real e previsibilidade.',
    url: 'https://www.ferdinan-msp.group',
    siteName: 'Ferdinan-MSP',
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ferdinan-MSP | Consultoria de Growth & Gestão de Alta Performance',
    description: 'Implementação prática de Growth e Gestão focada em ROI e previsibilidade.',
  },
};

export const viewport: Viewport = {
  themeColor: '#09090b',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

import AuthProvider from '@/components/providers/AuthProvider';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`!scroll-smooth dark ${playfair.variable} ${ptSans.variable}`}>
      <head>
        <meta name="google-adsense-account" content="ca-pub-1477681884429701" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://pagead2.googlesyndication.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1477681884429701"
          crossOrigin="anonymous"
          strategy="lazyOnload"
        />
      </head>
      <body className="font-body antialiased bg-background text-foreground">
        <AuthProvider>
          <StockTicker />
          {children}
          <StickyElementsWidget />
          <CookieConsent />
          <Toaster />
          <LeadCaptureModal />
        </AuthProvider>
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
