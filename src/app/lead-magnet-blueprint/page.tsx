// src/app/lead-magnet-blueprint/page.tsx
import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

// Define a simple header component for consistency if not already globally defined
const Header = () => (
  <header className="bg-[#004AAD] text-white py-4 shadow-md"> {/* Ferdinan Blue */}
    <div className="container mx-auto px-4 flex justify-between items-center">
      <Link href="/" className="text-2xl font-bold">
        Ferdinan-MSP.Group
      </Link>
      <nav>
        {/* Potentially add navigation links here */}
      </nav>
    </div>
  </header>
);

// Define a simple footer component
const Footer = () => (
  <footer className="bg-gray-800 text-white py-8 mt-12">
    <div className="container mx-auto px-4 text-center text-sm">
      <p>&copy; {new Date().getFullYear()} Ferdinan-MSP.Group. Todos os direitos reservados.</p>
      <div className="mt-2">
        <Link href="/privacy-policy" className="text-[#00BFA5] hover:underline mr-4"> {/* Innovation Teal */}
          Política de Privacidade
        </Link>
        <Link href="/terms-of-service" className="text-[#00BFA5] hover:underline"> {/* Innovation Teal */}
          Termos de Uso
        </Link>
      </div>
    </div>
  </footer>
);

export default function LeadMagnetBlueprintPage() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 flex flex-col">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-[#004AAD] to-[#00BFA5] text-white py-20 md:py-32 relative overflow-hidden">
          {/* Background visual elements */}
          <div className="absolute inset-0 z-0 opacity-10">
            {/* Example of abstract lines/connection patterns - using simple SVG for now */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <line x1="0" y1="0" x2="100" y2="100" stroke="currentColor" strokeWidth="0.5" />
              <line x1="100" y1="0" x2="0" y2="100" stroke="currentColor" strokeWidth="0.5" />
              <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="0.5" fill="none" />
            </svg>
          </div>

          <div className="container mx-auto px-4 relative z-10 text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4">
              Blueprint da Dominio Digital: 7 Passos para uma Metodologia de Resultados Reais em TI
            </h1>
            <p className="text-xl md:text-2xl font-light mb-8">
              Transforme a gestão de TI da sua empresa e alcance resultados exponenciais com nosso guia prático e inovador.
            </p>
            {/* CTA Button - styled with CTA Gold */}
            <Button className="bg-[#FFD700] text-[#004AAD] hover:bg-yellow-400 text-lg px-8 py-4 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105">
              Baixe o Blueprint Agora!
            </Button>
          </div>
        </section>

        {/* Introduction and Benefits Section */}
        <section className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#004AAD] mb-6">
              O que você vai aprender com o Blueprint?
            </h2>
            <p className="text-lg text-gray-700">
              A TI é o coração da inovação e da eficiência nos negócios modernos. Este blueprint oferece um caminho claro e
              comprovado para otimizar seus processos, aumentar a produtividade e gerar valor real para sua organização.
              Descubra como a Dominio Digital está transformando o futuro da tecnologia.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {[
              "Domine as estratégias dos líderes de mercado em TI.",
              "Implemente uma metodologia comprovada para resultados consistentes.",
              "Otimize recursos e reduza custos operacionais.",
              "Aumente a segurança e a conformidade dos seus sistemas.",
              "Capacite sua equipe para alta performance e inovação.",
              "Tome decisões baseadas em dados e métricas reais.",
              "Prepare sua infraestrutura para os desafios futuros."
            ].map((benefit, index) => (
              <div key={index} className="flex items-start p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                <svg className="w-8 h-8 text-[#00BFA5] mr-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <p className="text-lg font-medium text-gray-700">{benefit}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA and Form Section */}
        <section className="bg-[#004AAD] py-16 md:py-24 text-white"> {/* Ferdinan Blue */}
          <div className="container mx-auto px-4 text-center max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Não perca tempo! Transforme sua TI hoje.
            </h2>
            <p className="text-xl font-light mb-10">
              Preencha o formulário abaixo para receber o "Blueprint da Dominio Digital" e desbloqueie o potencial máximo da sua equipe.
            </p>

            {/* Lead Capture Form - Placeholder */}
            <div className="bg-white p-8 md:p-12 rounded-lg shadow-xl text-gray-800">
              <h3 className="text-2xl font-semibold mb-6 text-[#004AAD]">Baixe Seu Blueprint Gratuito!</h3> {/* Ferdinan Blue */}
              <form className="space-y-6">
                <div>
                  <Label htmlFor="name" className="sr-only">Nome Completo</Label>
                  <Input id="name" type="text" placeholder="Nome Completo" className="w-full p-3 border border-gray-300 rounded-md focus:ring-[#00BFA5] focus:border-[#00BFA5]" /> {/* Innovation Teal for focus */}
                </div>
                <div>
                  <Label htmlFor="email" className="sr-only">E-mail Profissional</Label>
                  <Input id="email" type="email" placeholder="E-mail Profissional" className="w-full p-3 border border-gray-300 rounded-md focus:ring-[#00BFA5] focus:border-[#00BFA5]" /> {/* Innovation Teal for focus */}
                </div>
                <div>
                  <Label htmlFor="company" className="sr-only">Empresa</Label>
                  <Input id="company" type="text" placeholder="Empresa" className="w-full p-3 border border-gray-300 rounded-md focus:ring-[#00BFA5] focus:border-[#00BFA5]" /> {/* Innovation Teal for focus */}
                </div>
                <div>
                  <Label htmlFor="role" className="sr-only">Cargo</Label>
                  <Input id="role" type="text" placeholder="Cargo" className="w-full p-3 border border-gray-300 rounded-md focus:ring-[#00BFA5] focus:border-[#00BFA5]" /> {/* Innovation Teal for focus */}
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="consent" className="border-gray-300 rounded-sm data-[state=checked]:bg-[#00BFA5] data-[state=checked]:text-white focus:ring-[#00BFA5]" /> {/* Innovation Teal for checked state */}
                  <Label htmlFor="consent" className="text-sm text-gray-600">
                    Concordo em receber comunicações da Ferdinan-MSP.Group.
                  </Label>
                </div>
                <Button type="submit" className="w-full bg-[#FFD700] text-[#004AAD] hover:bg-yellow-400 text-lg px-8 py-3 rounded-md shadow-md transition-all duration-300 transform hover:scale-105"> {/* CTA Gold */}
                  Baixar Agora!
                </Button>
              </form>
              <p className="text-sm text-gray-500 mt-6">
                Junte-se a centenas de gestores de TI que já estão aplicando a metodologia Ferdinan-MSP.Group para impulsionar seus negócios.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
