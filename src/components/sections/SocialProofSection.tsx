import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Star } from "lucide-react";

const testimonials = [
  {
    id: "testimonial-1",
    name: "Alexandre Dubois",
    title: "CEO, Maison de Luxe",
    quote: "Ferdinan's team didn't just provide a service; they curated a growth journey. Their strategic insights were invaluable, leading to a 40% increase in qualified leads within a single quarter.",
    rating: 5,
  },
  {
    id: "testimonial-2",
    name: "Isabella Rossi",
    title: "Founder, Artisa",
    quote: "Working with Ferdinan felt like having an in-house team of strategic geniuses. Their validation process ensured that we only invested in what works. The results have been phenomenal.",
    rating: 5,
  },
  {
    id: "testimonial-3",
    name: "Chen Wei",
    title: "Director, Precision Dynamics",
    quote: "Their curation process is second to none. They understood our niche market and provided solutions that were not only effective but also perfectly aligned with our brand's exclusive positioning.",
    rating: 5,
  },
];

export default function SocialProofSection() {
  return (
    <section id="social-proof" className="py-16 sm:py-24 bg-secondary/50">
        <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold md:text-4xl font-headline text-foreground">What Our Clients Say</h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                We are a trusted partner for businesses that demand excellence and results.
            </p>
        </div>
      <div className="container mx-auto max-w-6xl px-4 mt-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {testimonials.map((testimonial) => {
            const image = PlaceHolderImages.find(
              (img) => img.id === testimonial.id
            );
            return (
              <Card key={testimonial.id} className="flex flex-col bg-card border-border/70 shadow-lg">
                <CardContent className="p-6 flex-grow">
                  <p className="text-muted-foreground">"{testimonial.quote}"</p>
                </CardContent>
                <CardFooter className="p-6 bg-primary/5 flex items-center justify-between">
                    <div className="flex items-center">
                        {image && (
                        <Avatar className="h-12 w-12 mr-4">
                            <AvatarImage
                                src={image.imageUrl}
                                alt={testimonial.name}
                                data-ai-hint={image.imageHint}
                            />
                            <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        )}
                        <div>
                            <h3 className="font-bold text-foreground">{testimonial.name}</h3>
                            <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                        </div>
                    </div>
                    <div className="flex text-primary">
                        {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-primary"/>
                        ))}
                    </div>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
