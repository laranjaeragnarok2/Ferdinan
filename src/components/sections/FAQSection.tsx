'use client';

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
    {
        question: "Como funciona a consultoria da Ferdinan-MSP.Group?",
        answer: "Nossa consultoria é focada na implementação prática de estratégias de crescimento e automação com IA. Não entregamos apenas relatórios, mas soluções validadas que geram ROI real para o seu negócio.",
    },
    {
        question: "Qual o diferencial de vocês em relação a cursos de marketing?",
        answer: "Diferente de cursos, nós 'colocamos a mão na massa'. Atuamos como um braço estratégico do seu negócio, diagnosticando falhas e implementando processos de vendas e gestão personalizados para o seu mercado.",
    },
    {
        question: "A consultoria é presencial ou online?",
        answer: "Atendemos empresas em todo o Brasil de forma online, com foco especial em Rio Verde, Goiás, onde temos nossa base de operações. A proximidade regional facilita o entendimento da dinâmica local para empresas goianas.",
    },
    {
        question: "Quanto tempo leva para ver resultados?",
        answer: "Os resultados variam conforme o estágio do negócio, mas nosso foco é em vitórias rápidas (quick wins) no primeiro mês, enquanto estruturamos o crescimento sustentável de longo prazo.",
    },
    {
        question: "A Ferdinan-MSP.Group trabalha com qualquer tipo de empresa?",
        answer: "Somos especializados em negócios de alto valor que buscam escala através de eficiência operacional, automação e estratégias de Growth Hacking adaptadas ao DNA da marca.",
    },
];

export default function FAQSection() {
    return (
        <section id="faq" className="py-16 sm:py-24 bg-background">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold md:text-4xl font-headline text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-600 mb-4">
                        Perguntas Frequentes
                    </h2>
                    <p className="text-lg text-muted-foreground">
                        Tire suas dúvidas sobre como podemos acelerar o crescimento da sua empresa.
                    </p>
                </div>

                <Accordion type="single" collapsible className="w-full">
                    {faqs.map((faq, index) => (
                        <AccordionItem key={index} value={`item-${index}`} className="border-white/10">
                            <AccordionTrigger className="text-left text-foreground hover:text-amber-500 transition-colors py-4 text-lg">
                                {faq.question}
                            </AccordionTrigger>
                            <AccordionContent className="text-muted-foreground text-base pb-4">
                                {faq.answer}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </section>
    );
}
