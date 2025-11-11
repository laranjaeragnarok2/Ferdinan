import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MountainIcon } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-xl items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2">
          <MountainIcon className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl font-headline text-foreground">
            Ferdian-MSP
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link href="#pain-thesis" className="text-foreground/60 hover:text-foreground/80">O Problema</Link>
          <Link href="#process" className="text-foreground/60 hover:text-foreground/80">Nosso Processo</Link>
          <Link href="#solutions" className="text-foreground/60 hover:text-foreground/80">Soluções</Link>
          <Link href="#social-proof" className="text-foreground/60 hover:text-foreground/80">Depoimentos</Link>
          <Link href="#contact" className="text-foreground/60 hover:text-foreground/80">Contato</Link>
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
