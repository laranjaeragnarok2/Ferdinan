import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Compass, GitBranch, CheckCircle } from "lucide-react";

const curationSteps = [
  {
    id: "curation-1",
    title: "1. Descoberta Profunda",
    description: "Mergulhamos em sua marca, mercado e na psicologia do seu cliente para encontrar os pontos de alavancagem ocultos que seus concorrentes ignoram.",
    icon: Compass
  },
  {
    id: "curation-2",
    title: "2. Curadoria Estratégica",
    description: "Selecionamos e adaptamos apenas as estratégias de maior impacto, garantindo um alinhamento perfeito com o DNA e os objetivos do seu negócio.",
    icon: GitBranch
  },
  {
    id: "curation-3",
    title: "3. Validação e Otimização",
    description: "Testamos rigorosamente cada estratégia contra a dinâmica real do mercado. Só implementamos o que comprovadamente funciona e otimizamos para máxima performance.",
    icon: CheckCircle
  },
];

export default function CurationProcessSection() {
  return (
    <section id="process" className="py-16 sm:py-24 bg-secondary/50">
      <div className="container mx-auto max-w-6xl px-4 text-center">
        <h2 className="text-3xl font-bold md:text-4xl font-headline text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-amber-500">
          Nossa Metodologia para Resultados Reais
        </h2>
        <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
          Um processo de três etapas desenhado não para planejar, mas para arquitetar seu crescimento e domínio de mercado.
        </p>
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
          {curationSteps.map((step) => (
              <Card key={step.title} className="text-center bg-card border-border/70 shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-2 hover:shadow-xl">
                <CardHeader>
                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-yellow-400">
                    <step.icon className="h-10 w-10" />
                  </div>
                </CardHeader>
                <CardContent>
                  <h3 className="text-xl font-bold text-foreground">{step.title}</h3>
                  <p className="mt-2 text-muted-foreground">
                    {step.description}
                  </p>
                </CardContent>
              </Card>
            ))}
        </div>
      </div>
    </section>
  );
}
