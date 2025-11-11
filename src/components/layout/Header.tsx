"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import GrowthIcon from "../icons/GrowthIcon";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-transparent backdrop-blur-sm">
      <div className="container flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2">
          <GrowthIcon className="text-chart-4" />
          <span className="font-bold text-xl font-headline text-chart-4">
            Ferdian-MSP
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link href="#pain-thesis" className="text-slate-300 hover:text-white">O Problema</Link>
          <Link href="#process" className="text-slate-300 hover:text-white">Nosso Processo</Link>
          <Link href="#solutions" className="text-slate-300 hover:text-white">Soluções</Link>
          <Link href="#social-proof" className="text-slate-300 hover:text-white">Depoimentos</Link>
          <Link href="#contact" className="text-slate-300 hover:text-white">Contato</Link>
        </nav>
        <nav className="flex items-center gap-4">
          <Link href="#contact" passHref>
            <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
              Solicitar uma Consultoria
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  );
}
