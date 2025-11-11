import ContentSection from "./ContentSection";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";

const solutions = [
  {
    title: "Advanced CRM & Automation",
    description: "A unified platform for managing customer relationships and automating marketing workflows, vetted for scalability and deep integration capabilities.",
  },
  {
    title: "Data Analytics Suite",
    description: "A powerful analytics tool that provides deep, actionable insights into customer behavior and campaign performance, crucial for data-driven decisions.",
  },
  {
    title: "Content Optimization Engine",
    description: "An AI-powered platform for SEO and content marketing that ensures your message reaches and resonates with your target audience effectively.",
  },
];

export default function ValidatedSolutions() {
  return (
    <section id="solutions" className="py-16 sm:py-24">
      <ContentSection
        id="validation"
        sectionName="Validated Solutions"
        title="Integrated & Validated Solutions"
        initialContent="We integrate only the most effective, best-in-class technologies that align with our strategic principles. Each solution is rigorously vetted to ensure it serves the strategy, not the other way around. No third-party logos, just guaranteed performance."
      />
      <div className="container mx-auto max-w-5xl px-4 mt-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {solutions.map((solution) => (
            <Card key={solution.title} className="shadow-lg hover:shadow-primary/20 transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-xl font-headline">{solution.title}</CardTitle>
                <div className="flex items-center gap-2 text-primary pt-1">
                  <CheckCircle2 className="h-5 w-5" />
                  <span className="text-sm font-semibold">Validated</span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{solution.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
