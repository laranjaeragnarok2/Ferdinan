import type { Metadata } from 'next';
import '../globals.css';
import { Toaster } from '@/components/ui/toaster';
import { SpeedInsights } from '@vercel/speed-insights/next';
import Script from 'next/script';
import CookieConsent from '@/components/layout/CookieConsent';

export const metadata: Metadata = {
  title: 'Ferdinan MSP',
  description:
    'Consultoria de vendas e gestão em Rio Verde, Goiás. Estratégias de crescimento personalizadas, curadas para negócios de alto valor.',
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
        <Script id="schema-markup" type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              "name": "Ferdinan MSP",
              "image": "https://www.ferdinan-msp.group/logo.png",
              "@id": "https://www.ferdinan-msp.group",
              "url": "https://www.ferdinan-msp.group",
              "telephone": "+556492339844",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "",
                "addressLocality": "Rio Verde",
                "addressRegion": "GO",
                "postalCode": "",
                "addressCountry": "BR"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": -17.7915,
                "longitude": -50.9204
              },
              "description": "A Ferdinan MSP presta consultoria de vendas e gestão em Rio Verde, Goiás, focada em estratégias de crescimento e automação com IA.",
              "openingHoursSpecification": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday"
                ],
                "opens": "08:00",
                "closes": "18:00"
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
