'use client';

import Header from '@/components/layout/Header';
import HeroSection from '@/components/sections/HeroSection';
import PainAndThesisSection from '@/components/sections/PainAndThesisSection';
import LeadFormSection from '@/components/sections/LeadFormSection';
import Footer from '@/components/layout/Footer';
import CurationProcessSection from '@/components/sections/CurationProcessSection';
import ValidatedSolutionsSection from '@/components/sections/ValidatedSolutionsSection';
import SocialProofSection from '@/components/sections/SocialProofSection';
import { FadeInOnScroll } from '@/components/animations/FadeInOnScroll';
import NewsFeedSection from '@/components/sections/NewsFeedSection';
import FAQSection from '@/components/sections/FAQSection';
import LatestPostSection from '@/components/sections/LatestPostSection';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <div className="relative z-10 bg-background">
          <FadeInOnScroll>
            <NewsFeedSection />
          </FadeInOnScroll>
          <FadeInOnScroll>
            <LatestPostSection />
          </FadeInOnScroll>
          <FadeInOnScroll>
            <PainAndThesisSection />
          </FadeInOnScroll>
          <FadeInOnScroll>
            <CurationProcessSection />
          </FadeInOnScroll>
          <FadeInOnScroll>
            <ValidatedSolutionsSection />
          </FadeInOnScroll>
          <FadeInOnScroll>
            <SocialProofSection />
          </FadeInOnScroll>
          <FadeInOnScroll>
            <FAQSection />
          </FadeInOnScroll>
          <FadeInOnScroll>
            <LeadFormSection />
          </FadeInOnScroll>
        </div>
      </main>
      <Footer />
    </div>
  );
}
