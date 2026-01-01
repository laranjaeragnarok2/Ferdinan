"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import GrowthIcon from "../icons/GrowthIcon";

export default function Header() {
  const phoneNumber = '556492339844';
  const message = 'Olá, eu gostaria de mais informações';
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    message
  )}`;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-transparent backdrop-blur-sm">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center space-x-2">
          <GrowthIcon />
          <span className="font-bold text-xl font-headline text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-600">
            Ferdinan MSP
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link href="/#pain-thesis" className="text-slate-300 hover:text-white">O Problema</Link>
          <Link href="/#process" className="text-slate-300 hover:text-white">Nosso Processo</Link>
          <Link href="/#solutions" className="text-slate-300 hover:text-white">Soluções</Link>
          <Link href="/#social-proof" className="text-slate-300 hover:text-white">Depoimentos</Link>
          <Link href="/blog" className="text-slate-300 hover:text-white">Blog</Link>
          <Link href="/#contact" className="text-slate-300 hover:text-white">Contato</Link>
        </nav>
        <nav className="flex items-center gap-4">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button className="bg-gradient-to-r from-amber-500 to-orange-600 text-black font-bold btn-gradient border-amber-500 hover:brightness-110">
              Solicitar uma Consultoria
            </Button>
          </a>
        </nav>
      </div>
    </header>
  );
}
