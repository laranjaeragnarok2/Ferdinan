import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Star } from "lucide-react";

const testimonials = [
  {
    id: "testimonial-1",
    name: "Alexandre Dubois",
    title: "CEO, Maison de Luxe",
    quote: "A Ferdinan-MSP.Group não entregou um serviço, mas uma parceria estratégica. A curadoria deles foi fundamental para nosso aumento de 40% em leads qualificados em um único trimestre.",
    rating: 5,
  },
  {
    id: "testimonial-2",
    name: "Isabella Rossi",
    title: "Fundadora, Artisa",
    quote: "Trabalhar com a Ferdinan-MSP.Group nos deu a clareza que precisávamos. O processo de validação deles garantiu que cada real investido tivesse retorno máximo. Os resultados foram transformadores.",
    rating: 5,
  },
  {
    id: "testimonial-3",
    name: "Chen Wei",
    title: "Diretor, Precision Dynamics",
    quote: "O que mais me impressionou foi a capacidade deles de entender as nuances do nosso mercado. As soluções não foram apenas eficazes, mas perfeitamente alinhadas com nossa visão de longo prazo.",
    rating: 5,
  },
];

export default function SocialProofSection() {
  return (
    <section id="social-proof" className="py-16 sm:py-24 bg-secondary/50">
      <div className="container mx-auto text-center px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold md:text-4xl font-headline text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-600">Resultados, Não Promessas</h2>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Parceiros que confiam em nossa curadoria para transformar seus negócios.
        </p>
      </div>
      <div className="container mx-auto mt-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {testimonials.map((testimonial) => {
            const image = PlaceHolderImages.find(
              (img) => img.id === testimonial.id
            );
            return (
              <Card key={testimonial.id} className="flex flex-col bg-card border-border/70 shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-2 hover:shadow-xl">
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
                  <div className="flex text-yellow-400">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
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
