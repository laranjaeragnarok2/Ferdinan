'use client';

import React from 'react';
import { motion } from 'framer-motion';

const tickerData = [
  { label: "Integridade de Mercado", value: "98.4%" },
  { label: "Audit-Logs em Tempo Real", value: "ATIVO" },
  { label: "ROI Médio Anual", value: "+340%" },
  { label: "Soberania de Dados", value: "LEVEL 10" },
  { label: "Empresas Integradas", value: "100+" },
  { label: "Protocolo Skarner", value: "ONLINE" },
];

export const MarketTicker = () => {
  return (
    <div className="w-full bg-black/80 border-b border-white/5 backdrop-blur-md overflow-hidden py-1">
      <motion.div
        animate={{ x: [0, -1000] }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear",
        }}
        className="flex whitespace-nowrap"
      >
        {[...tickerData, ...tickerData].map((item, index) => (
          <div key={index} className="ticker-item">
            {item.label} <span className="ticker-value">{item.value}</span>
            <span className="ml-8 opacity-20">|</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};
