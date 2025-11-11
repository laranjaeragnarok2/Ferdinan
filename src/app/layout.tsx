import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { SpeedInsights } from "@vercel/speed-insights/next"
import Script from 'next/script';
import CookieConsent from '@/components/layout/CookieConsent';
import WhatsAppButton from '@/components/layout/WhatsAppButton';

export const metadata: Metadata = {
  title: 'Ferdian-MSP',
  description: 'Estratégias de crescimento personalizadas, curadas para negócios de alto valor.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="!scroll-smooth dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=PT+Sans:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        {children}
        <Toaster />
        <WhatsAppButton />
        <CookieConsent />
        <SpeedInsights />
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-KXTREZQQ36"></Script>
        <Script id="google-analytics">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-KXTREZQQ36');
          `}
        </Script>
      </body>
    </html>
  );
}
