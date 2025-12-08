'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus,
  X,
  Bot,
  ScrollText,
  Mail,
  MessageCircle,
} from 'lucide-react';
import { useTranslations } from 'next-intl';

const StickyElementsWidget = ({
  conciergeContent,
}: {
  conciergeContent: React.ReactNode;
}) => {
  const t = useTranslations('StickyElementsWidget');
  const [isOpen, setIsOpen] = useState(false);
  const [isConciergeOpen, setIsConciergeOpen] = useState(false);
  const widgetRef = useRef<HTMLDivElement>(null);

  const phoneNumber = '556492339844';
  const message = t('whatsappMessage');
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    message
  )}`;

  const handleScrollToContact = () => {
    setIsOpen(false);
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const toggleConcierge = () => {
    setIsOpen(false);
    setIsConciergeOpen(!isConciergeOpen);
  };

  return (
    <>
      <div
        ref={widgetRef}
        className="fixed bottom-6 left-6 z-50 flex flex-col items-center"
      >
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="mb-4 flex flex-col gap-3"
            >
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-14 w-14 items-center justify-center rounded-full bg-secondary text-foreground shadow-lg transition-all duration-300 hover:bg-green-500 hover:text-white"
                aria-label={t('whatsappAriaLabel')}
              >
                <MessageCircle className="h-7 w-7" />
              </a>
              <button
                onClick={toggleConcierge}
                className="group flex h-14 w-14 items-center justify-center rounded-full bg-secondary text-foreground shadow-lg transition-all duration-300 hover:bg-primary hover:text-primary-foreground"
                aria-label={t('conciergeAriaLabel')}
              >
                <Bot className="h-7 w-7" />
              </button>
              <button
                onClick={handleScrollToContact}
                className="group flex h-14 w-14 items-center justify-center rounded-full bg-secondary text-foreground shadow-lg transition-all duration-300 hover:bg-primary hover:text-primary-foreground"
                aria-label={t('consultationAriaLabel')}
              >
                <ScrollText className="h-7 w-7" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-amber-500 to-orange-600 text-black shadow-lg transition-transform duration-300 ease-in-out hover:scale-110 hover:brightness-110"
          aria-label={t('mainAriaLabel')}
        >
          <motion.div
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <Plus className="h-8 w-8" />
          </motion.div>
        </button>
      </div>

      <AnimatePresence>
        {isConciergeOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-[100px] left-6 z-50"
          >
            <div className="relative">
              {conciergeContent}
              <button
                onClick={() => setIsConciergeOpen(false)}
                className="absolute -top-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-foreground shadow-md transition-colors hover:bg-destructive hover:text-destructive-foreground"
                aria-label={t('closeConciergeAriaLabel')}
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default StickyElementsWidget;
