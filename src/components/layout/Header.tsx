import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-xl items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2">
          <span className="font-headline text-2xl font-bold text-primary tracking-wide">
            Ferdinan
          </span>
        </Link>
        <nav className="flex items-center gap-4">
          <Link href="#contact" passHref>
            <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
              Request a Consultation
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  );
}
