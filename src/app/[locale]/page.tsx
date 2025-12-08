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
import StickyElementsWidget from '@/components/layout/StickyElementsWidget';
import ConciergeContent from '@/components/concierge/ConciergeContent';
import NewsFeedSection from '@/components/sections/NewsFeedSection';
import { useTranslations } from 'next-intl';

export default function Home() {
  const t = useTranslations('Concierge');
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
            <LeadFormSection />
          </FadeInOnScroll>
        </div>
      </main>
      <Footer />
      <StickyElementsWidget
        conciergeContent={
          <ConciergeContent
            title={t('title')}
            initialMessage={t('initialMessage')}
            inputPlaceholder={t('inputPlaceholder')}
            sendButtonText={t('sendButtonText')}
          />
        }
      />
    </div>
  );
}
