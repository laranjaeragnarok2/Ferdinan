import LeadForm from "@/components/forms/LeadForm";

export default function LeadFormSection() {
  return (
    <section id="contact" className="py-16 sm:py-24 bg-secondary">
      <div className="container mx-auto max-w-4xl px-4 text-center">
        <h2 className="font-headline text-3xl font-bold md:text-4xl">
          Ready for a Strategy That Delivers?
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Complete this brief form to begin your pre-qualification. We partner
          with a select group of clients to ensure maximum impact. Let's see if
          we're the right fit to unlock your growth.
        </p>
        <div className="mt-12">
          <LeadForm />
        </div>
      </div>
    </section>
  );
}
