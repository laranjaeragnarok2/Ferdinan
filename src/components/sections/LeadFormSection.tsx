import LeadForm from "@/components/forms/LeadForm";

export default function LeadFormSection() {
  return (
    <section id="contact" className="py-16 sm:py-24 bg-secondary/50">
      <div className="container mx-auto max-w-3xl px-4 text-center">
        <h2 className="text-3xl font-bold md:text-4xl font-headline text-foreground">
          Solicitar uma Consultoria
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Preencha este breve formulário para começar. Vamos ver se somos a escolha certa para desbloquear seu crescimento.
        </p>
        <div className="mt-12">
          <LeadForm />
        </div>
      </div>
    </section>
  );
}
