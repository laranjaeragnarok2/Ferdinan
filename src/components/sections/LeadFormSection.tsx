"use client";

import LeadForm from "@/components/forms/LeadForm";
import Image from "next/image";

export default function LeadFormSection() {
  return (
    <section
      id="contact"
      className="py-16 sm:py-24 bg-secondary/50 relative overflow-hidden"
    >
      {/* Background Accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-orange-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center lg:items-end justify-center gap-12 lg:gap-24">
          {/* Form Side */}
          <div className="w-full max-w-2xl text-center lg:text-left lg:pb-32">
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

          {/* Mascot Side */}
          <div className="relative w-full max-w-[500px] lg:max-w-[950px] -mb-16 sm:-mb-24 lg:-mb-24 self-end flex justify-center lg:justify-end">
            <div className="relative w-full">
              <Image
                src="/ferdinan-mascot.png"
                alt="Mascote Ferdinan-MSP.Group"
                width={950}
                height={950}
                className="relative z-10 filter brightness-110 w-full h-auto"
                priority
              />
              {/* Ground Shadow - Multi-layered for realism */}
              <div className="absolute bottom-[5%] left-1/2 -translate-x-1/2 w-[85%] h-[10%] bg-black/40 blur-3xl rounded-[100%] z-0" />
              <div className="absolute bottom-[8%] left-1/2 -translate-x-1/2 w-[70%] h-[5%] bg-black/60 blur-xl rounded-[100%] z-0" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
