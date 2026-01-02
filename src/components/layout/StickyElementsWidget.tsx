'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Sparkles } from 'lucide-react';
import ConciergeContent from '../concierge/ConciergeContent';

const StickyElementsWidget = () => {
  const [isConciergeOpen, setIsConciergeOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [showPulse, setShowPulse] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Mostrar tooltip após 3 segundos
    const tooltipTimer = setTimeout(() => {
      if (!hasInteracted) {
        setShowTooltip(true);
      }
    }, 3000);

    // Mostrar pulso após 5 segundos
    const pulseTimer = setTimeout(() => {
      if (!hasInteracted) {
        setShowPulse(true);
      }
    }, 5000);

    // Esconder tooltip após 10 segundos
    const hideTooltipTimer = setTimeout(() => {
      setShowTooltip(false);
    }, 13000);

    return () => {
      clearTimeout(tooltipTimer);
      clearTimeout(pulseTimer);
      clearTimeout(hideTooltipTimer);
    };
  }, [hasInteracted]);

  const toggleConcierge = () => {
    setIsConciergeOpen(!isConciergeOpen);
    setHasInteracted(true);
    setShowTooltip(false);
    setShowPulse(false);
  };

  const conciergeTexts = {
    title: '💬 Fale com um Especialista',
    initialMessage:
      'E aí! 👋 Sou consultor da Ferdinan-MSP.Group.\n\nJá ajudamos +50 empresas a escalar de verdade. Como posso te ajudar hoje?',
    inputPlaceholder: 'Digite sua mensagem...',
    sendButtonText: 'Enviar',
  };

  return (
    <>
      <div
        ref={widgetRef}
        className="fixed bottom-6 right-6 z-50 flex flex-col items-end"
      >
        {/* Tooltip "Converse conosco" */}
        <AnimatePresence>
          {showTooltip && !isConciergeOpen && (
            <motion.div
              initial={{ opacity: 0, x: 20, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.8 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="mb-4 mr-2"
            >
              <div className="relative bg-gradient-to-r from-amber-500 to-orange-600 text-black font-semibold px-5 py-3 rounded-2xl shadow-xl">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 animate-pulse" />
                  <span className="text-sm">Converse conosco!</span>
                </div>
                {/* Seta apontando para o botão */}
                <div className="absolute -bottom-2 right-8 w-4 h-4 bg-gradient-to-br from-amber-500 to-orange-600 transform rotate-45"></div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Botão do Chat */}
        <motion.button
          onClick={toggleConcierge}
          className={`
            relative flex h-16 w-16 items-center justify-center rounded-full 
            bg-gradient-to-r from-amber-500 to-orange-600 text-black 
            shadow-2xl transition-all duration-300 ease-out
            hover:scale-110 hover:shadow-amber-500/50
            ${showPulse && !isConciergeOpen ? 'animate-bounce' : ''}
          `}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Abrir Chat"
        >
          {/* Efeito de pulso - APENAS quando fechado */}
          {showPulse && !isConciergeOpen && (
            <span className="absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75 animate-ping"></span>
          )}

          {/* Ícone */}
          <AnimatePresence mode="wait">
            <motion.div
              key={isConciergeOpen ? 'close' : 'open'}
              initial={{ opacity: 0, rotate: -180, scale: 0.5 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 180, scale: 0.5 }}
              transition={{ duration: 0.3, type: 'spring' }}
            >
              {isConciergeOpen ? (
                <X className="h-7 w-7" strokeWidth={2.5} />
              ) : (
                <MessageCircle className="h-7 w-7" strokeWidth={2.5} />
              )}
            </motion.div>
          </AnimatePresence>

          {/* Badge de notificação */}
          {!hasInteracted && !isConciergeOpen && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-white text-xs font-bold"
            >
              1
            </motion.span>
          )}
        </motion.button>
      </div>

      {/* Janela do Chat */}
      <AnimatePresence>
        {isConciergeOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 25,
              duration: 0.4
            }}
            className="fixed bottom-28 right-6 z-40"
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
