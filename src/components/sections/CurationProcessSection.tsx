import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Image from "next/image";

const curationSteps = [
  {
    id: "curation-1",
    title: "Deep Discovery",
    description: "We immerse ourselves in your brand, market, and customer psychology to uncover unique leverage points.",
    iconHint: "gold compass"
  },
  {
    id: "curation-2",
    title: "Strategic Curation",
    description: "We don't just plan; we curate. We select and tailor strategies that are a perfect fit for your business DNA.",
    iconHint: "gold chart"
  },
  {
    id: "curation-3",
    title: "Rigorous Validation",
    description: "Every strategy is tested and validated against real-world market dynamics before full-scale implementation.",
    iconHint: "gold checkmark"
  },
];

export default function CurationProcessSection() {
  return (
    <section id="process" className="py-16 sm:py-24 bg-secondary/50">
      <div className="container mx-auto max-w-6xl px-4 text-center">
        <h2 className="text-3xl font-bold md:text-4xl font-headline text-foreground">
          Our Curation Process
        </h2>
        <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
          A three-step methodology designed to architect sustainable growth and market leadership.
        </p>
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
          {curationSteps.map((step) => {
            const image = PlaceHolderImages.find(img => img.id === step.id);
            return (
              <Card key={step.title} className="text-center bg-card border-border/70 shadow-lg transform transition-transform hover:-translate-y-2">
                <CardHeader>
                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
                    {image && <Image src={image.imageUrl} alt={step.title} width={40} height={40} data-ai-hint={step.iconHint} />}
                  </div>
                </CardHeader>
                <CardContent>
                  <h3 className="text-xl font-bold text-foreground">{step.title}</h3>
                  <p className="mt-2 text-muted-foreground">
                    {step.description}
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
