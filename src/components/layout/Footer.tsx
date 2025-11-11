import GrowthIcon from "../icons/GrowthIcon";
import Link from "next/link";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export default function Footer() {
  return (
    <footer className="border-t border-border/40 bg-secondary/50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
                 <Link href="/" className="flex items-center space-x-2 mb-4">
                    <GrowthIcon />
                    <span className="font-bold text-xl font-headline text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-amber-500">
                        Ferdian-MSP
                    </span>
                </Link>
                <p className="text-muted-foreground">Estratégias de crescimento personalizadas, curadas para negócios de alto valor.</p>
            </div>
            <div>
                <h3 className="font-semibold mb-4 text-foreground">Links Rápidos</h3>
                <ul className="space-y-2">
                    <li><Link href="#pain-thesis" className="text-muted-foreground hover:text-foreground">O Problema</Link></li>
                    <li><Link href="#process" className="text-muted-foreground hover:text-foreground">Nosso Processo</Link></li>
                    <li><Link href="#solutions" className="text-muted-foreground hover:text-foreground">Soluções</Link></li>
                    <li><Link href="#contact" className="text-muted-foreground hover:text-foreground">Contato</Link></li>
                </ul>
            </div>
            <div>
                 <h3 className="font-semibold mb-4 text-foreground">Mantenha-se Atualizado</h3>
                 <p className="text-muted-foreground mb-4">Assine nossa newsletter para receber as últimas novidades.</p>
                 <div className="flex w-full max-w-sm items-center space-x-2">
                    <Input type="email" placeholder="Email" className="bg-input"/>
                    <Button type="submit" className="bg-gradient-to-r from-yellow-300 to-amber-500 text-black font-bold hover:from-yellow-400 hover:to-amber-600 btn-gradient">Inscrever</Button>
                </div>
            </div>
        </div>
      <div className="container mx-auto text-center text-sm text-muted-foreground mt-8 border-t border-border/40 pt-6">
        <p>
          &copy; {new Date().getFullYear()} Ferdian-MSP. Todos os Direitos Reservados.
        </p>
      </div>
    </footer>
  );
}
