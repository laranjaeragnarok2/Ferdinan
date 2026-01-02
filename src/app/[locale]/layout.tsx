import type { Metadata } from 'next';
import '../globals.css';
import { Toaster } from '@/components/ui/toaster';
import { SpeedInsights } from '@vercel/speed-insights/next';
import Script from 'next/script';
import CookieConsent from '@/components/layout/CookieConsent';
import LeadCaptureModal from '@/components/layout/LeadCaptureModal';

export const metadata: Metadata = {
  title: 'Ferdinan-MSP.Group | Consultoria de Growth & Gestão de Alta Performance',
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

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  // Validar locale - se não for um locale válido, usar pt-BR
  const validLocales = ['pt-BR', 'en', 'es'];
  const currentLocale = validLocales.includes(locale) ? locale : 'pt-BR';

  return (
    <>
      {children}
    </>
  );
}
