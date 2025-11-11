import Header from '@/components/layout/Header';
import HeroSection from '@/components/sections/HeroSection';
import PainAndThesisSection from '@/components/sections/PainAndThesisSection';
import LeadFormSection from '@/components/sections/LeadFormSection';
import Footer from '@/components/layout/Footer';
import CurationProcessSection from '@/components/sections/CurationProcessSection';
import ValidatedSolutionsSection from '@/components/sections/ValidatedSolutionsSection';
import SocialProofSection from '@/components/sections/SocialProofSection';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <div className="relative z-10 bg-background">
          <PainAndThesisSection />
          <CurationProcessSection />
          <ValidatedSolutionsSection />
          <SocialProofSection />
          <LeadFormSection />
        </div>
      </main>
      <Footer />
    </div>
  );
}
