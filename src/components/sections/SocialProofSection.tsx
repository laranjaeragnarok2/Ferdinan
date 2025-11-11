import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Star } from "lucide-react";

const testimonials = [
  {
    id: "testimonial-1",
    name: "Alexandre Dubois",
    title: "CEO, Maison de Luxe",
    quote: "A equipe da Ferdian-MSP não forneceu apenas um serviço; eles curaram uma jornada de crescimento. Seus insights estratégicos foram inestimáveis, levando a um aumento de 40% em leads qualificados em um único trimestre.",
    rating: 5,
  },
  {
    id: "testimonial-2",
    name: "Isabella Rossi",
    title: "Fundadora, Artisa",
    quote: "Trabalhar com a Ferdian-MSP foi como ter uma equipe interna de gênios estratégicos. O processo de validação deles garantiu que investíssemos apenas no que funciona. Os resultados têm sido fenomenais.",
    rating: 5,
  },
  {
    id: "testimonial-3",
    name: "Chen Wei",
    title: "Diretor, Precision Dynamics",
    quote: "O processo de curadoria deles é inigualável. Eles entenderam nosso nicho de mercado e forneceram soluções que não foram apenas eficazes, mas também perfeitamente alinhadas com o posicionamento exclusivo de nossa marca.",
    rating: 5,
  },
];

export default function SocialProofSection() {
  return (
    <section id="social-proof" className="py-16 sm:py-24 bg-secondary/50">
        <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold md:text-4xl font-headline text-foreground">O Que Nossos Clientes Dizem</h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                Somos um parceiro de confiança para empresas que exigem excelência e resultados.
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
