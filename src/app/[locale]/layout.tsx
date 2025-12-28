import type { Metadata } from 'next';
import '../globals.css';
import { Toaster } from '@/components/ui/toaster';
import { SpeedInsights } from '@vercel/speed-insights/next';
import Script from 'next/script';
import CookieConsent from '@/components/layout/CookieConsent';
import LeadCaptureModal from '@/components/layout/LeadCaptureModal';

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
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://pagead2.googlesyndication.com" />
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1477681884429701"
          crossOrigin="anonymous"
          strategy="lazyOnload"
        />
        <Script id="schema-markup" type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "ConsultingService",
              "name": "Ferdinan-MSP",
              "alternateName": "Ferdinan MSP Group",
              "description": "Consultoria especializada em Growth e Gestão de Alta Performance. Diferente de figuras públicas homônimas, nossa expertise é exclusivamente empresarial e focada em ROI.",
              "image": "https://www.ferdinan-msp.group/logo.png",
              "@id": "https://www.ferdinan-msp.group",
              "url": "https://www.ferdinan-msp.group",
              "telephone": "+556492339844",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Rio Verde",
                "addressRegion": "GO",
                "addressCountry": "BR"
              },
              "knowsAbout": [
                "Growth Hacking", 
                "Sales Strategy", 
                "High Performance Management", 
                "Artificial Intelligence for Business",
                "Business Process Automation"
              ],
              "areaServed": "Brazil",
              "founder": {
                "@type": "Person",
                "name": "Ferdinan",
                "jobTitle": "Strategic Consultant"
              }
            }
          `}
        </Script>
        <Script id="faq-schema-markup" type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "Como funciona a consultoria da Ferdinan MSP?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Nossa consultoria é focada na implementação prática de estratégias de crescimento e automação com IA. Não entregamos apenas relatórios, mas soluções validadas que geram ROI real para o seu negócio."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Qual o diferencial de vocês em relação a cursos de marketing?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Diferente de cursos, nós 'colocamos a mão na massa'. Atuamos como um braço estratégico do seu negócio, diagnosticando falhas e implementando processos de vendas e gestão personalizados para o seu mercado."
                  }
                },
                {
                  "@type": "Question",
                  "name": "A consultoria é presencial ou online?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Atendemos empresas em todo o Brasil de forma online, com foco especial em Rio Verde, Goiás, onde temos nossa base de operações. A proximidade regional facilita o entendimento da dinâmica local para empresas goianas."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Quanto tempo leva para ver resultados?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Os resultados variam conforme o estágio do negócio, mas nosso foco é em vitórias rápidas (quick wins) no primeiro mês, enquanto estruturamos o crescimento sustentável de longo prazo."
                  }
                },
                {
                  "@type": "Question",
                  "name": "A Ferdinan MSP trabalha com qualquer tipo de empresa?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Somos especializados em negócios de alto valor que buscam escala através de eficiência operacional, automação e estratégias de Growth Hacking adaptadas ao DNA da marca."
                  }
                }
              ]
            }
          `}
        </Script>
      </head>
      <body className="font-body antialiased">
        {children}
        <Toaster />
        <LeadCaptureModal />
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
