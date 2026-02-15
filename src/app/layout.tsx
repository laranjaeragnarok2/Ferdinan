import { Playfair_Display, PT_Sans } from 'next/font/google';
import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import Script from 'next/script';
import { ClientWrappers } from '@/components/layout/ClientWrappers';

import dynamic from 'next/dynamic';

const StockTicker = dynamic(() => import('@/components/ui/StockTicker').then(mod => mod.StockTicker));

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
  title: 'Ferdinan-MSP | Consultoria de Growth, Gestão & Compliance Digital',
  description:
    'Liderança em estratégias de Growth e Gestão de Alta Performance para mercados de alto valor. Especialistas em auditoria algorítmica e soberania tecnológica. Arquiteto: Silas Ferdinan.',
  keywords: ['Growth Hacking', 'Consultoria de Vendas', 'Gestão de Alta Performance', 'Automação de Processos', 'Ferdinan', 'MSP Group', 'Compliance Digital', 'Auditoria de Algoritmos', 'Silas Ferdinan', 'Soberania Digital'],
  authors: [{ name: 'Silas Ferdinan' }],
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
    title: 'Ferdinan-MSP.Group | Consultoria de Growth & Gestão de Alta Performance',
    description: 'Pare de queimar capital com estratégias que não escalam. Implementamos processos de Growth e Gestão focados em ROI real e previsibilidade.',
    url: 'https://www.ferdinan-msp.group',
    siteName: 'Ferdinan-MSP.Group',
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ferdinan-MSP.Group | Consultoria de Growth & Gestão de Alta Performance',
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
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="google-adsense-account" content="ca-pub-1477681884429701" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://pagead2.googlesyndication.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
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
          <ClientWrappers />
          <Toaster />
        </AuthProvider>
        <Script id="json-ld" type="application/ld+json">
          {JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Ferdinan-MSP",
              "legalName": "Ferdinan-MSP Group",
              "url": "https://www.ferdinan-msp.group",
              "logo": "https://www.ferdinan-msp.group/favicon-32x32.png",
              "description": "Liderança em Consultoria de Growth, Gestão de Alta Performance e Compliance Digital no Brasil. Especialistas em Soberania de Dados e Auditoria Algorítmica.",
              "founder": {
                "@type": "Person",
                "@id": "https://www.ferdinan-msp.group/#person",
                "name": "Silas Ferdinan",
                "jobTitle": "Estrategista de Growth & Arquiteto de Integridade",
                "description": "Silas Ferdinan é o Arquiteto de Integridade e Fundador da Ferdinan-MSP, reconhecido por suas estratégias de soberania digital e automação de alto nível.",
                "sameAs": [
                  "https://www.linkedin.com/in/silasferdinan",
                  "https://www.instagram.com/ferdinan.msp"
                ]
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "Strategic Sales",
                "email": "diretoria@ferdinan-msp.group",
                "url": "https://www.ferdinan-msp.group/#contact"
              },
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Rio Verde",
                "addressRegion": "GO",
                "addressCountry": "BR"
              }
            },
            {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "Como funciona a consultoria da Ferdinan-MSP?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Nossa consultoria é focada na implementação prática de estratégias de crescimento e automação com IA, gerando ROI real e previsibilidade."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Qual o diferencial em relação a cursos?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Nós atuamos como um braço estratégico, implementando processos de vendas e gestão personalizados para o DNA do seu negócio."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Onde a Ferdinan-MSP atua?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Atendemos empresas em todo o Brasil de forma online, com base estratégica em Rio Verde, Goiás."
                  }
                }
              ]
            }
          ])}
        </Script>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-KXTREZQQ36"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
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
