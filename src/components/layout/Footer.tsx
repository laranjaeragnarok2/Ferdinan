import GrowthIcon from "../icons/GrowthIcon";
import Link from "next/link";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Lock, ShieldCheck, Database, Cloud, Fingerprint, Cpu } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-border/40 bg-secondary/50">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 py-12 px-4 sm:px-6 lg:px-8">
        <div>
          <Link href="/" className="flex items-center space-x-2 mb-4" aria-label="Ferdinan-MSP.Group Home">
            <GrowthIcon />
            <span className="font-bold text-xl font-headline text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-600">
              Ferdinan-MSP.Group
            </span>
          </Link>
          <p className="text-muted-foreground">A Ferdinan-MSP.Group presta consultoria global com sua sede em Rio Verde, Goiás. Estratégias de crescimento personalizadas para você empreendedor.</p>
        </div>
        <div>
          <h3 className="font-semibold mb-4 text-foreground">Links Rápidos</h3>
          <ul className="space-y-2">
            <li><Link href="#pain-thesis" className="text-muted-foreground hover:text-foreground">O Problema</Link></li>
            <li><Link href="#process" className="text-muted-foreground hover:text-foreground">Nosso Processo</Link></li>
            <li><Link href="#solutions" className="text-muted-foreground hover:text-foreground">Soluções</Link></li>
            <li><Link href="/blog" className="text-muted-foreground hover:text-foreground">Blog</Link></li>
            <li><Link href="#contact" className="text-muted-foreground hover:text-foreground">Contato</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-4 text-foreground">Mantenha-se Atualizado</h3>
          <p className="text-muted-foreground mb-4">Assine nossa newsletter para receber as últimas novidades.</p>
          <div className="flex w-full max-w-sm items-center space-x-2">
            <Input type="email" placeholder="Email" aria-label="Seu endereço de e-mail para newsletter" className="bg-input" />
            <Button type="submit" className="bg-gradient-to-r from-amber-500 to-orange-600 text-black font-bold btn-gradient border-amber-500 hover:brightness-110">Inscrever</Button>
          </div>
        </div>
      </div>

      {/* Barra de Certificação de Elite */}
      <div className="border-t border-border/40 py-12 bg-black/40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-y-12 gap-x-8 items-center opacity-30 hover:opacity-100 transition-opacity duration-700 grayscale hover:grayscale-0">

            {/* 1. SSL */}
            <div className="flex items-center gap-3 group justify-center lg:justify-start">
              <Lock className="w-7 h-7 text-primary group-hover:scale-110 transition-transform" />
              <div className="flex flex-col">
                <span className="text-[12px] font-bold uppercase tracking-widest text-white leading-none">SSL Secure</span>
                <span className="text-[10px] font-mono text-primary/70 uppercase tracking-tighter mt-1.5">AES-256 BIT ENCRYPT</span>
              </div>
            </div>

            {/* 2. Safe Browsing */}
            <div className="flex items-center gap-3 group justify-center lg:justify-start">
              <ShieldCheck className="w-7 h-7 text-primary group-hover:scale-110 transition-transform" />
              <div className="flex flex-col">
                <span className="text-[12px] font-bold uppercase tracking-widest text-white leading-none">Safe Browsing</span>
                <span className="text-[10px] font-mono text-primary/70 uppercase tracking-tighter mt-1.5">GOOGLE VERIFIED</span>
              </div>
            </div>

            {/* 3. LGPD */}
            <div className="flex items-center gap-3 group justify-center lg:justify-start">
              <Database className="w-7 h-7 text-primary group-hover:scale-110 transition-transform" />
              <div className="flex flex-col">
                <span className="text-[12px] font-bold uppercase tracking-widest text-white leading-none">Sovereign Data</span>
                <span className="text-[10px] font-mono text-primary/70 uppercase tracking-tighter mt-1.5">LGPD COMPLIANT</span>
              </div>
            </div>

            {/* 4. Google Cloud/Firebase */}
            <div className="flex items-center gap-3 group justify-center lg:justify-start">
              <Cloud className="w-7 h-7 text-primary group-hover:scale-110 transition-transform" />
              <div className="flex flex-col">
                <span className="text-[12px] font-bold uppercase tracking-widest text-white leading-none">Infrastructure</span>
                <span className="text-[10px] font-mono text-primary/70 uppercase tracking-tighter mt-1.5">GOOGLE CLOUD / FIREBASE</span>
              </div>
            </div>

            {/* 5. Skarner Engine */}
            <div className="flex items-center gap-3 group justify-center lg:justify-start">
              <Fingerprint className="w-7 h-7 text-primary group-hover:scale-110 transition-transform" />
              <div className="flex flex-col">
                <span className="text-[12px] font-bold uppercase tracking-widest text-white leading-none">Skarner Audit</span>
                <span className="text-[10px] font-mono text-primary/70 uppercase tracking-tighter mt-1.5">SOVEREIGN VERIFIED</span>
              </div>
            </div>

            {/* 6. Kyber-1024 */}
            <div className="flex items-center gap-3 group justify-center lg:justify-start">
              <Cpu className="w-7 h-7 text-primary group-hover:scale-110 transition-transform" />
              <div className="flex flex-col">
                <span className="text-[12px] font-bold uppercase tracking-widest text-white leading-none">Security Core</span>
                <span className="text-[10px] font-mono text-primary/70 uppercase tracking-tighter mt-1.5">KYBER-1024 QUANTUM-READY</span>
              </div>
            </div>

          </div>
        </div>
      </div>

      <div className="container mx-auto text-center text-sm text-muted-foreground border-t border-border/40 pt-6 pb-6 px-4 sm:px-6 lg:px-8">
        <p>
          &copy; {new Date().getFullYear()} Ferdinan-MSP.Group. Todos os Direitos Reservados.
        </p>
      </div>
    </footer>
  );
}
