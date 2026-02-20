import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ShieldCheck, Target, Zap, TrendingUp } from 'lucide-react';

export default function SoberaniaPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-grow pt-32 pb-20">
        <div className="container mx-auto px-4">
          {/* Hero do Funil */}
          <div className="text-center max-w-4xl mx-auto mb-16">
            <h1 className="text-4xl md:text-6xl font-headline text-luxury-gold mb-6 leading-tight">
              Sua Empresa é Citada pela IA <br /> ou é <span className="text-red-500">Invisível</span>?
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Em 2026, o Google não é mais sobre links. É sobre quem o **Diamante-OS** e outras IAs recomendam. 
              Descubra agora o seu **Score de Soberania Digital**.
            </p>
            
            {/* CTA de Audit */}
            <div className="bg-card border border-primary/20 p-8 rounded-2xl shadow-2xl gold-bloom max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold mb-4">Análise de Viabilidade GEO Gratuita</h3>
              <p className="text-sm text-muted-foreground mb-6">Insira a URL do seu site e nosso núcleo processará um relatório tático de exposição.</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Input placeholder="https://suaempresa.com.br" className="flex-1 bg-background/50" />
                <Button className="bg-luxury-gold text-black font-bold hover:bg-luxury-gold/80 px-8">
                  ANALISAR AGORA
                </Button>
              </div>
              <p className="text-[10px] mt-4 text-muted-foreground uppercase tracking-widest">Powered by Diamante-OS Sovereign Core</p>
            </div>
          </div>

          {/* Pilares do Funil */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            <div className="p-6 rounded-xl border border-white/5 bg-card/50">
              <ShieldCheck className="h-10 w-10 text-primary mb-4" />
              <h4 className="text-xl font-bold mb-2">Blindagem de Marca</h4>
              <p className="text-muted-foreground text-sm">Garantimos que as IAs falem bem de você e usem seus dados como fonte primária.</p>
            </div>
            <div className="p-6 rounded-xl border border-white/5 bg-card/50">
              <Target className="h-10 w-10 text-primary mb-4" />
              <h4 className="text-xl font-bold mb-2">GEO Optimization</h4>
              <p className="text-muted-foreground text-sm">Apareça no topo dos resumos generativos do Google, ChatGPT e Claude.</p>
            </div>
            <div className="p-6 rounded-xl border border-white/5 bg-card/50">
              <TrendingUp className="h-10 w-10 text-primary mb-4" />
              <h4 className="text-xl font-bold mb-2">Escala Soberana</h4>
              <p className="text-muted-foreground text-sm">Converta leads de alto ticket que já chegam educados pela nossa inteligência.</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
