'use client';

import LeadForm from '@/components/forms/LeadForm';

export default function LeadFormSection() {
  return (
    <section id="contact" className="py-16 sm:py-24 bg-secondary/50">
      <div className="container mx-auto max-w-3xl text-center px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold md:text-4xl font-headline text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-600">
          Onde seu dinheiro está vazando?
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Faça um diagnóstico rápido e descubra os 3 gargalos que impedem seu lucro hoje.
        </p>
        <div className="mt-12">
          <LeadForm />
        </div>
      </div>
    </section>
  );
}
