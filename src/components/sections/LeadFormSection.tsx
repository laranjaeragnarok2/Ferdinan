'use client';

import LeadForm from '@/components/forms/LeadForm';
import { useTranslations } from 'next-intl';

export default function LeadFormSection() {
  const t = useTranslations('LeadFormSection');

  return (
    <section id="contact" className="py-16 sm:py-24 bg-secondary/50">
      <div className="container mx-auto max-w-3xl text-center px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold md:text-4xl font-headline text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-600">
          {t('title')}
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          {t('subtitle')}
        </p>
        <div className="mt-12">
          <LeadForm />
        </div>
      </div>
    </section>
  );
}
