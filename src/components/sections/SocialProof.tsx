import ContentSection from "./ContentSection";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const testimonials = [
  {
    id: "testimonial-1",
    name: "Eleanor Vance",
    title: "CEO, InnovateNow",
    quote:
      "Ferdinan didn't just give us a new marketing plan; they gave us a new perspective. Our lead quality has skyrocketed, and our team is finally aligned.",
  },
  {
    id: "testimonial-2",
    name: "Marcus Thorne",
    title: "Founder, Apex Solutions",
    quote:
      "The curation process was a game-changer. We eliminated redundant software and focused our budget on what truly drives results. The clarity is priceless.",
  },
  {
    id: "testimonial-3",
    name: "Sienna Hayes",
    title: "CMO, QuantumLeap",
    quote:
      "We were drowning in data and tools. Ferdinan built a streamlined strategy that was not only effective but also empowering for our internal teams.",
  },
];

export default function SocialProof() {
  return (
    <section id="social-proof" className="py-16 sm:py-24 bg-secondary">
      <ContentSection
        id="proof"
        sectionName="Social Proof"
        title="Trusted by Industry Leaders"
        initialContent="Our clients don't just see results; they experience a fundamental shift in their approach to growth. But don't just take our word for it."
      />
      <div className="container mx-auto max-w-6xl px-4 mt-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => {
            const image = PlaceHolderImages.find(
              (img) => img.id === testimonial.id
            );
            return (
              <Card key={testimonial.id} className="flex flex-col shadow-lg">
                <CardContent className="pt-6 flex-grow">
                  <p className="text-muted-foreground italic">
                    "{testimonial.quote}"
                  </p>
                </CardContent>
                <CardHeader className="flex-row items-center gap-4 pt-4">
                  <Avatar>
                    {image && (
                      <AvatarImage
                        src={image.imageUrl}
                        alt={testimonial.name}
                        data-ai-hint={image.imageHint}
                      />
                    )}
                    <AvatarFallback>
                      {testimonial.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-bold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.title}
                    </p>
                  </div>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
