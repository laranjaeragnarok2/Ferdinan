import { MountainIcon } from "lucide-react";
import Link from "next/link";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export default function Footer() {
  return (
    <footer className="border-t border-border/40 bg-secondary/50 py-12">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
                 <Link href="/" className="flex items-center space-x-2 mb-4">
                    <MountainIcon className="h-6 w-6 text-primary" />
                    <span className="font-bold text-xl font-headline text-foreground">
                        Ferdinan
                    </span>
                </Link>
                <p className="text-muted-foreground">Bespoke growth strategies, curated for high-value businesses.</p>
            </div>
            <div>
                <h3 className="font-semibold mb-4 text-foreground">Quick Links</h3>
                <ul className="space-y-2">
                    <li><Link href="#pain-thesis" className="text-muted-foreground hover:text-foreground">The Problem</Link></li>
                    <li><Link href="#process" className="text-muted-foreground hover:text-foreground">Our Process</Link></li>
                    <li><Link href="#solutions" className="text-muted-foreground hover:text-foreground">Solutions</Link></li>
                    <li><Link href="#contact" className="text-muted-foreground hover:text-foreground">Contact</Link></li>
                </ul>
            </div>
            <div>
                 <h3 className="font-semibold mb-4 text-foreground">Stay Updated</h3>
                 <p className="text-muted-foreground mb-4">Subscribe to our newsletter for the latest insights.</p>
                 <div className="flex w-full max-w-sm items-center space-x-2">
                    <Input type="email" placeholder="Email" className="bg-input"/>
                    <Button type="submit" className="bg-accent hover:bg-accent/90 text-accent-foreground">Subscribe</Button>
                </div>
            </div>
        </div>
      <div className="container mx-auto px-4 text-center text-sm text-muted-foreground mt-8 border-t border-border/40 pt-6">
        <p>
          &copy; {new Date().getFullYear()} Ferdinan Strategy Curator. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
