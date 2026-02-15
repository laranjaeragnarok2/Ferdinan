"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import GrowthIcon from "../icons/GrowthIcon";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Header() {
  const { status } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const phoneNumber = '556492339844';
  const message = 'Olá, eu gostaria de mais informações';
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    message
  )}`;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/[0.05] bg-black/[0.01] backdrop-blur-2xl">
      <div className="flex h-20 items-center justify-between px-4 sm:px-6 lg:px-12">
        <Link href="/" className="flex items-center space-x-3 group" aria-label="Ferdinan-MSP Home">
          <div className="transition-transform group-hover:scale-110 duration-500">
            <GrowthIcon />
          </div>
          <span className="font-bold text-2xl font-headline tracking-tighter text-luxury-gold drop-shadow-[0_0_15px_rgba(212,175,55,0.1)]">
            Ferdinan-MSP
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-xs font-semibold tracking-widest uppercase">
          <Link href="/#pain-thesis" className="text-white/40 hover:text-primary transition-colors">Problema</Link>
          <Link href="/#process" className="text-white/40 hover:text-primary transition-colors">Processo</Link>
          <Link href="/#solutions" className="text-white/40 hover:text-primary transition-colors">Soluções</Link>
          <Link href="/blog" className="text-white/40 hover:text-primary transition-colors">Briefing</Link>
          <Link href="/#contact" className="text-white/40 hover:text-primary transition-colors">Contato</Link>
        </nav>
        <nav className="hidden md:flex items-center gap-4">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Solicitar consultoria via WhatsApp"
          >
            <Button className="bg-white text-black font-bold tracking-tight rounded-none px-8 h-11 border border-white/20 hover:bg-primary hover:text-black transition-all duration-500">
              SOLICITAR ACESSO
            </Button>
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-white hover:text-amber-500 transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-white/10 bg-black/95 backdrop-blur-xl">
          <nav className="flex flex-col p-4 space-y-4">
            <Link
              href="/#pain-thesis"
              className="text-slate-300 hover:text-white hover:bg-white/5 p-2 rounded-lg transition-all"
              onClick={() => setIsMenuOpen(false)}
            >
              O Problema
            </Link>
            <Link
              href="/#process"
              className="text-slate-300 hover:text-white hover:bg-white/5 p-2 rounded-lg transition-all"
              onClick={() => setIsMenuOpen(false)}
            >
              Nosso Processo
            </Link>
            <Link
              href="/#solutions"
              className="text-slate-300 hover:text-white hover:bg-white/5 p-2 rounded-lg transition-all"
              onClick={() => setIsMenuOpen(false)}
            >
              Soluções
            </Link>
            <Link
              href="/#social-proof"
              className="text-slate-300 hover:text-white hover:bg-white/5 p-2 rounded-lg transition-all"
              onClick={() => setIsMenuOpen(false)}
            >
              Depoimentos
            </Link>
            <Link
              href="/blog"
              className="text-slate-300 hover:text-white hover:bg-white/5 p-2 rounded-lg transition-all"
              onClick={() => setIsMenuOpen(false)}
            >
              Blog
            </Link>
            <Link
              href="/#contact"
              className="text-slate-300 hover:text-white hover:bg-white/5 p-2 rounded-lg transition-all"
              onClick={() => setIsMenuOpen(false)}
            >
              Contato
            </Link>

            {/* Admin Link Removed temporarily */}

            <div className="pt-4 border-t border-white/10">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMenuOpen(false)}
                className="block"
              >
                <Button className="w-full bg-gradient-to-r from-amber-500 to-orange-600 text-black font-bold btn-gradient border-amber-500 hover:brightness-110">
                  Solicitar uma Consultoria
                </Button>
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
