'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X } from 'lucide-react';
import ConciergeContent from '../concierge/ConciergeContent';

const StickyElementsWidget = () => {
  const [isConciergeOpen, setIsConciergeOpen] = useState(false);
  const widgetRef = useRef<HTMLDivElement>(null);

  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    // Show tooltip after 3 seconds instead of auto-opening
    const timer = setTimeout(() => {
      setShowTooltip(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const toggleConcierge = () => {
    setIsConciergeOpen(!isConciergeOpen);
    if (!isConciergeOpen) {
      setShowTooltip(false); // Hide tooltip when opening
    }
  };

  const conciergeTexts = {
    title: 'Concierge Virtual',
    initialMessage:
      'Olá! Sou o assistente virtual da Ferdian-MSP. Como posso te ajudar a descobrir a melhor estratégia de crescimento para seu negócio hoje?',
    inputPlaceholder: 'Digite sua dúvida...',
    sendButtonText: 'Enviar',
  };

  return (
    <>
      <div
        ref={widgetRef}
        className="fixed bottom-6 right-6 z-50 flex flex-col items-center"
      >
        <AnimatePresence>
          {showTooltip && !isConciergeOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.8 }}
              className="absolute bottom-20 right-0 bg-background border border-border text-foreground text-xs font-semibold px-4 py-2 rounded-xl shadow-lg whitespace-nowrap mb-2 mr-2"
            >
              Converse conosco
              <div className="absolute -bottom-1 right-6 w-3 h-3 bg-background border-b border-r border-border transform rotate-45"></div>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={toggleConcierge}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-amber-500 to-orange-600 text-black shadow-lg transition-transform duration-300 ease-in-out hover:scale-110 hover:brightness-110"
          aria-label="Abrir Assistente de IA"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={isConciergeOpen ? 'x' : 'bot'}
              initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
              transition={{ duration: 0.2 }}
            >
              {isConciergeOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Bot className="h-6 w-6" />
              )}
            </motion.div>
          </AnimatePresence>
        </button>
      </div>

      <AnimatePresence>
        {isConciergeOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed bottom-24 right-6 z-40"
          >
            <ConciergeContent
              title={conciergeTexts.title}
              initialMessage={conciergeTexts.initialMessage}
              inputPlaceholder={conciergeTexts.inputPlaceholder}
              sendButtonText={conciergeTexts.sendButtonText}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default StickyElementsWidget;
