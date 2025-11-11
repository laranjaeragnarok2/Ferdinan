import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";

const solutions = [
  {
    title: "Posicionamento de Marca Cirúrgico",
    description: "Elevamos sua narrativa de marca para ressoar com uma clientela de alto padrão, estabelecendo você como a única escolha lógica em seu mercado.",
  },
  {
    title: "Funis de Aquisição Otimizados por IA",
    description: "Utilizamos dados e IA para construir e otimizar funis que não apenas geram leads, mas atraem os clientes certos de forma consistente.",
  },
  {
    title: "Alianças Estratégicas de Alto Nível",
    description: "Acesso à nossa rede exclusiva de parceiros, garantindo que sua marca seja amplificada com integridade e alcance exponencial.",
  },
    {
    title: "Ecossistemas de Conteúdo que Geram Autoridade",
    description: "Criamos um universo de conteúdo que educa seu mercado, nutre leads no piloto automático e constrói um ativo de marca duradouro.",
  },
];

export default function ValidatedSolutionsSection() {
  return (
    <section id="solutions" className="py-16 sm:py-24 bg-background">
      <div className="container mx-auto text-center px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold md:text-4xl font-headline text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-600">
          Soluções Comprovadas para Crescimento Acelerado
        </h2>
        <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
          Cada solução é um componente de alta performance, pré-validado em cenários reais e pronto para ser integrado ao seu motor de crescimento.
        </p>
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          {solutions.map((solution) => (
            <Card key={solution.title} className="text-left bg-card border-border/70 shadow-lg flex items-start p-6 transition-all duration-300 ease-in-out transform hover:-translate-y-2 hover:shadow-xl hover:border-primary/50">
              <CardHeader className="p-0 mr-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <CheckCircle2 className="h-6 w-6" />
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <h3 className="text-lg font-bold text-foreground">{solution.title}</h3>
                <p className="mt-1 text-muted-foreground">
                  {solution.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
