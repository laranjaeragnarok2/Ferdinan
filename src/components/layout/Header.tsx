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
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-transparent backdrop-blur-sm">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center space-x-2" aria-label="Ferdinan-MSP.Group Home">
          <GrowthIcon />
          <span className="font-bold text-xl font-headline text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-600">
            Ferdinan-MSP.Group
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link href="/#pain-thesis" className="text-slate-300 hover:text-white">O Problema</Link>
          <Link href="/#process" className="text-slate-300 hover:text-white">Nosso Processo</Link>
          <Link href="/#solutions" className="text-slate-300 hover:text-white">Soluções</Link>
          <Link href="/#social-proof" className="text-slate-300 hover:text-white">Depoimentos</Link>
          <Link href="/blog" className="text-slate-300 hover:text-white">Blog</Link>
          <Link href="/#contact" className="text-slate-300 hover:text-white">Contato</Link>

          {/* Admin Link Removed temporarily */}
        </nav>
        <nav className="hidden md:flex items-center gap-4">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Solicitar consultoria via WhatsApp"
          >
            <Button className="bg-gradient-to-r from-amber-500 to-orange-600 text-black font-bold btn-gradient border-amber-500 hover:brightness-110">
              Solicitar uma Consultoria
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
