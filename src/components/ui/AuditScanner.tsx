'use client';

import React from 'react';

const auditLines = [
  "CHECKING_RTP_INTEGRITY...",
  "STATUS: VERIFIED_0x717",
  "DECRYPTING_BACKEND_LOGS",
  "PROTOCOL_SKARNER_ACTIVE",
  "ID_TRACE: SILAS_FERDINAN",
  "MGM_BYPASS_DETECTED: FALSE",
  "TRACER_ROUTE_MALTA: 100%",
  "SOVEREIGNTY_LEVEL: ELITE",
  "ENCRYPTION: KYBER_1024",
  "AUDIT_HASH: DEADBEEF001"
];

export const AuditScanner = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative group overflow-hidden rounded-xl">
      {children}
      <div className="audit-scan-overlay">
        <div className="absolute inset-0 flex flex-col gap-1 p-4">
          {[...Array(20)].map((_, i) => (
            <div 
              key={i} 
              className="audit-code-text"
              style={{ 
                left: `${Math.random() * 50}%`,
                animationDelay: `${Math.random() * 5}s`,
                top: `${i * 15}px`
              }}
            >
              {auditLines[i % auditLines.length]}
            </div>
          ))}
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent h-1 w-full animate-scan" style={{
            animation: 'scan-move 3s linear infinite'
        }}></div>
      </div>
      <style jsx>{`
        @keyframes scan-move {
          0% { top: -5%; }
          100% { top: 105%; }
        }
      `}</style>
    </div>
  );
};
