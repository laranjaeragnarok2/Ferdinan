'use client';

import LeadForm from '@/components/forms/LeadForm';

export default function LeadFormSection() {
  return (
    <section id="contact" className="py-16 sm:py-24 bg-secondary/50 relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-orange-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto max-w-3xl text-center px-4 sm:px-6 lg:px-8 relative z-10">
        <h2 className="text-3xl font-bold md:text-5xl font-headline text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-600">
          Onde seu dinheiro está vazando?
        </h2>
        <p className="mt-4 text-xl text-muted-foreground">
          Descubra os gargalos que impedem seu lucro hoje.
        </p>
        <div className="mt-12 p-1 rounded-2xl bg-gradient-to-b from-white/10 to-transparent shadow-2xl">
          <div className="bg-background/80 backdrop-blur-xl rounded-xl p-6 sm:p-10 border border-white/10">
            <LeadForm />
          </div>
        </div>
      </div>
    </section>
  );
}
