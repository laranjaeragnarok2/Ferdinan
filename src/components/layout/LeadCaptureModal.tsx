'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X, Mail, BookOpen, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function LeadCaptureModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { toast } = useToast();

    useEffect(() => {
        const hasSeenModal = localStorage.getItem('lead_modal_seen');
        if (hasSeenModal) return;

        // Timer de 10 segundos
        const timer = setTimeout(() => {
            showModal();
        }, 10000);

        // Gatilho de Scroll
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            const windowHeight = window.innerHeight;
            if (scrollPosition > windowHeight * 0.4) { // Aproximadamente 40% do scroll
                showModal();
            }
        };

        const showModal = () => {
            setIsOpen(true);
            window.removeEventListener('scroll', handleScroll);
            clearTimeout(timer);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            clearTimeout(timer);
        };
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch('/api/send-lead', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            if (!response.ok) throw new Error('Failed to send');

            // Armazenar no localStorage para não incomodar o usuário novamente
            localStorage.setItem('lead_modal_seen', 'true');

            toast({
                title: "Conteúdo a caminho! 🚀",
                description: "Em instantes você receberá nossa curadoria de ferramentas e leituras essenciais para sua gestão.",
            });

            setTimeout(() => setIsOpen(false), 2000);
        } catch (error) {
            toast({
                title: "Erro ao enviar",
                description: "Por favor, tente novamente.",
                variant: "destructive",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const closeModal = () => {
        setIsOpen(false);
        localStorage.setItem('lead_modal_seen', 'true'); // Evitar reabrir na mesma sessão se fechar
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="relative w-full max-w-lg bg-zinc-950 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl shadow-orange-900/20">
                <button
                    onClick={closeModal}
                    className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors z-10"
                >
                    <X size={20} />
                </button>

                <div className="p-8 sm:p-10">
                    <div className="flex items-center gap-2 text-orange-500 mb-4">
                        <Sparkles size={18} className="animate-pulse" />
                        <span className="text-xs font-bold uppercase tracking-widest">Acesso Exclusivo</span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-headline font-bold text-white mb-4">
                        Domine o Caos Estratégico
                    </h3>

                    <p className="text-zinc-400 mb-8 leading-relaxed">
                        Receba nossa curadoria selecionada com os <span className="text-zinc-200 font-semibold">3 livros e 2 ferramentas de IA</span> que economizaram mais de 40 horas mensais na gestão de nossos clientes este ano.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
                            <Input
                                type="email"
                                placeholder="Seu melhor e-mail corporativo"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="pl-10 h-12 bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-600 focus:border-orange-500/50 transition-all"
                            />
                        </div>
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full h-12 bg-orange-600 hover:bg-orange-700 text-white font-bold text-lg shadow-lg shadow-orange-900/30 transition-all active:scale-[0.98]"
                        >
                            {isSubmitting ? "Enviando..." : "Quero Acessar a Curadoria"}
                        </Button>
                        <p className="text-center text-[10px] text-zinc-600 uppercase tracking-tighter">
                            Sem SPAM. Apenas Conteúdo Estratégico de Alta Performance.
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}
