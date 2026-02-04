

import Header from '@/components/layout/Header';
import HeroSection from '@/components/sections/HeroSection';
import PainAndThesisSection from '@/components/sections/PainAndThesisSection';
import Footer from '@/components/layout/Footer';
import { FadeInOnScroll } from '@/components/animations/FadeInOnScroll';
import dynamic from 'next/dynamic';

// Lazy load below-the-fold components
const LeadFormSection = dynamic(() => import('@/components/sections/LeadFormSection'), {
  loading: () => <div className="h-96 bg-background" />,
});
const CurationProcessSection = dynamic(() => import('@/components/sections/CurationProcessSection'));
const ValidatedSolutionsSection = dynamic(() => import('@/components/sections/ValidatedSolutionsSection'));
const SocialProofSection = dynamic(() => import('@/components/sections/SocialProofSection'));
const NewsFeedSection = dynamic(() => import('@/components/sections/NewsFeedSection'), {
  loading: () => <div className="h-96 bg-background" />,
});
const LatestPostSection = dynamic(() => import('@/components/sections/LatestPostSection'));
const FAQSection = dynamic(() => import('@/components/sections/FAQSection'));
const StickyElementsWidget = dynamic(() => import('@/components/layout/StickyElementsWidget'));

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
      <StickyElementsWidget />
    </div>
  );
}
