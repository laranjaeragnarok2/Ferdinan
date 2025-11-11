import Header from '@/components/layout/Header';
import HeroSection from '@/components/sections/HeroSection';
import ContentSection from '@/components/sections/ContentSection';
import CurationProcess from '@/components/sections/CurationProcess';
import ValidatedSolutions from '@/components/sections/ValidatedSolutions';
import SocialProof from '@/components/sections/SocialProof';
import LeadFormSection from '@/components/sections/LeadFormSection';
import Footer from '@/components/layout/Footer';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <ContentSection
          id="pain-thesis"
          sectionName="The Pain and Thesis"
          title="The Problem is Not the Tool, It's the Strategy"
          initialContent="Most businesses jump from one shiny tool to the next, hoping for a silver bullet. The result? A patchwork of expensive, underutilized software and a marketing strategy that's more reactive than proactive. We believe the foundation of growth isn't a tool, but a validated, bespoke strategy. We find the pain, and we build the thesis for your success."
          className="bg-secondary"
        />
        <CurationProcess />
        <ValidatedSolutions />
        <SocialProof />
        <LeadFormSection />
      </main>
      <Footer />
    </div>
  );
}
