'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X } from 'lucide-react';
import ConciergeContent from '../concierge/ConciergeContent';

const StickyElementsWidget = () => {
  const [isConciergeOpen, setIsConciergeOpen] = useState(false);
  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsConciergeOpen(true);
    }, 5000); // 5 segundos

    return () => clearTimeout(timer); // Limpa o timer se o componente for desmontado
  }, []);

  const toggleConcierge = () => {
    setIsConciergeOpen(!isConciergeOpen);
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
        <button
          onClick={toggleConcierge}
          className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-amber-500 to-orange-600 text-black shadow-lg transition-transform duration-300 ease-in-out hover:scale-110 hover:brightness-110"
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
                <X className="h-8 w-8" />
              ) : (
                <Bot className="h-8 w-8" />
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
