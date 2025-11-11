"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Cookie } from "lucide-react";

export default function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    // Acessa o localStorage apenas no lado do cliente
    try {
      const consent = localStorage.getItem("cookie_consent");
      if (consent !== "true") {
        setShowConsent(true);
      }
    } catch (e) {
      // Se o localStorage não estiver disponível, mostra o banner
      setShowConsent(true);
    }
  }, []);

  const acceptConsent = () => {
    try {
      localStorage.setItem("cookie_consent", "true");
      setShowConsent(false);
    } catch (e) {
        // Se o localStorage não puder ser acessado, apenas oculta o banner
        setShowConsent(false);
    }
  };

  if (!showConsent) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-secondary/80 backdrop-blur-sm border-t border-border/40 p-4">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-start gap-3">
           <Cookie className="h-6 w-6 mt-1 text-primary flex-shrink-0" />
            <p className="text-sm text-muted-foreground">
                Usamos cookies para analisar o tráfego e melhorar sua experiência. Ao continuar a navegar, você concorda com nosso uso de cookies.
            </p>
        </div>
        <Button 
            onClick={acceptConsent}
            className="bg-gradient-to-r from-amber-500 to-orange-600 text-black font-bold btn-gradient border-amber-500 hover:brightness-110 w-full md:w-auto flex-shrink-0"
        >
          Aceitar
        </Button>
      </div>
    </div>
  );
}
