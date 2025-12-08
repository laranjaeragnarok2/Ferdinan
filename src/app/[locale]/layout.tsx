import type { Metadata } from 'next';
import '../globals.css';
import { Toaster } from '@/components/ui/toaster';
import { SpeedInsights } from '@vercel/speed-insights/next';
import Script from 'next/script';
import CookieConsent from '@/components/layout/CookieConsent';

export const metadata: Metadata = {
  title: 'Ferdian-MSP',
  description:
    'Estratégias de crescimento personalizadas, curadas para negócios de alto valor.',
};

export default function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  return (
    <html lang={locale} className="!scroll-smooth dark">
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
