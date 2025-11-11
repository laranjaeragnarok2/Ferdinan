import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";

const solutions = [
  {
    title: "Strategic Brand Positioning",
    description: "We refine your brand narrative to resonate with high-value clientele, establishing you as a market leader.",
  },
  {
    title: "Data-Driven Funnel Optimization",
    description: "Leveraging analytics to build and optimize conversion funnels that deliver qualified leads consistently.",
  },
  {
    title: "Exclusive Affiliate Networks",
    description: "Access to our curated network of affiliate partners, ensuring your brand is promoted with integrity.",
  },
    {
    title: "Content Ecosystem Development",
    description: "Building an ecosystem of valuable content that nurtures leads and builds long-term brand equity.",
  },
];

export default function ValidatedSolutionsSection() {
  return (
    <section id="solutions" className="py-16 sm:py-24 bg-background">
      <div className="container mx-auto max-w-6xl px-4 text-center">
        <h2 className="text-3xl font-bold md:text-4xl font-headline text-foreground">
          Integrated & Validated Solutions
        </h2>
        <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
          Each solution is a pre-vetted, high-performance component of your growth engine, ready to be integrated.
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
