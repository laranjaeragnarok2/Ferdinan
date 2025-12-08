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

export default function Home() {
  const conciergeTexts = {
    title: 'Concierge Virtual',
    initialMessage: 'Olá! Sou o assistente virtual da Ferdian-MSP. Como posso te ajudar a descobrir a melhor estratégia de crescimento para seu negócio hoje?',
    inputPlaceholder: 'Digite sua dúvida...',
    sendButtonText: 'Enviar'
  }

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
            title={conciergeTexts.title}
            initialMessage={conciergeTexts.initialMessage}
            inputPlaceholder={conciergeTexts.inputPlaceholder}
            sendButtonText={conciergeTexts.sendButtonText}
          />
        }
      />
    </div>
  );
}
