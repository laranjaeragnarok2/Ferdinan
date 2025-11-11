import LeadForm from "@/components/forms/LeadForm";

export default function LeadFormSection() {
  return (
    <section id="contact" className="py-16 sm:py-24 bg-secondary/50">
      <div className="container mx-auto max-w-3xl px-4 text-center">
        <h2 className="text-3xl font-bold md:text-4xl font-headline text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-amber-500">
          Pronto para Acelerar seu Crescimento?
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Preencha o formulário abaixo. Vamos descobrir juntos se nossa curadoria estratégica é a peça que falta para o seu negócio decolar.
        </p>
        <div className="mt-12">
          <LeadForm />
        </div>
      </div>
    </section>
  );
}
