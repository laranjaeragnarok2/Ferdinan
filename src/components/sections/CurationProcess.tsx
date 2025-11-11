import ContentSection from "./ContentSection";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap, Search, ShieldCheck, BarChart4 } from "lucide-react";

const pillars = [
  {
    icon: Zap,
    title: "Discovery",
    description:
      "We identify your core business objectives and customer pain points.",
  },
  {
    icon: Search,
    title: "Vetting",
    description:
      "We rigorously test and validate tools and strategies against your goals.",
  },
  {
    icon: ShieldCheck,
    title: "Integration",
    description:
      "We create a seamless, bespoke marketing ecosystem for your team.",
  },
  {
    icon: BarChart4,
    title: "Optimization",
    description:
      "We continually refine the strategy based on data-driven insights for peak performance.",
  },
];

export default function CurationProcess() {
  return (
    <section id="process" className="py-16 sm:py-24">
      <ContentSection
        id="curation"
        sectionName="Curation Process"
        title="Our Meticulous Curation Process"
        initialContent="We don't just recommend; we validate. Our four-pillar process ensures every component of your strategy is battle-tested and tailored to deliver results, moving you from complexity to clarity."
      />
      <div className="container mx-auto max-w-5xl px-4 mt-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <Card key={pillar.title} className="text-center shadow-lg border-primary/20 hover:shadow-primary/20 transition-shadow duration-300">
                <CardHeader>
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                </CardHeader>
                <CardContent>
                  <h3 className="text-xl font-bold font-headline">{pillar.title}</h3>
                  <p className="mt-2 text-muted-foreground">
                    {pillar.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
