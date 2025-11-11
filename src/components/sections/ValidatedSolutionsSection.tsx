import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";

const solutions = [
  {
    title: "Posicionamento Estratégico de Marca",
    description: "Refinamos sua narrativa de marca para ressoar com uma clientela de alto valor, estabelecendo você como líder de mercado.",
  },
  {
    title: "Otimização de Funil Orientada a Dados",
    description: "Aproveitando a análise para construir e otimizar funis de conversão que entregam leads qualificados de forma consistente.",
  },
  {
    title: "Redes de Afiliados Exclusivas",
    description: "Acesso à nossa rede curada de parceiros afiliados, garantindo que sua marca seja promovida com integridade.",
  },
    {
    title: "Desenvolvimento de Ecossistema de Conteúdo",
    description: "Construindo um ecossistema de conteúdo valioso que nutre leads e constrói equidade de marca a longo prazo.",
  },
];

export default function ValidatedSolutionsSection() {
  return (
    <section id="solutions" className="py-16 sm:py-24 bg-background">
      <div className="container mx-auto max-w-6xl px-4 text-center">
        <h2 className="text-3xl font-bold md:text-4xl font-headline text-foreground">
          Soluções Integradas e Validadas
        </h2>
        <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
          Cada solução é um componente pré-validado e de alto desempenho do seu motor de crescimento, pronto para ser integrado.
        </p>
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          {solutions.map((solution) => (
            <Card key={solution.title} className="text-left bg-card border-border/70 shadow-lg flex items-start p-6">
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
