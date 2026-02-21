import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, BarChart3, TrendingUp, Users } from 'lucide-react';
import { GlassCard, GlassHeader, GlassTitle, GlassContent } from '@/components/ui/glass-card';

export default function AutomacaoCTASection() {
    return (
        <section className="py-24 relative overflow-hidden bg-black/95">
            {/* Background glow effects */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[120px] opacity-30 pointer-events-none" />
            <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] bg-amber-600/20 rounded-full blur-[100px] opacity-20 pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10 max-w-7xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* Text Content */}
                    <div className="space-y-8">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/5 text-primary text-sm font-medium">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                            </span>
                            Novo Motor de Automação
                        </div>

                        <h2 className="text-4xl md:text-5xl font-bold font-headline text-white leading-tight">
                            Transforme Visitantes em <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-amber-600">Compradores Lucrativos</span>
                        </h2>

                        <p className="text-xl text-muted-foreground leading-relaxed">
                            Descubra nosso sistema avançado que utiliza Inteligência Artificial e metodologias validadas para captar, qualificar e gerenciar leads automaticamente 24 horas por dia.
                        </p>

                        <div className="space-y-4 pt-4">
                            <div className="flex items-center gap-4 text-slate-300">
                                <div className="bg-primary/10 p-2 rounded-lg text-primary">
                                    <BarChart3 size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-white">Análise Preditiva</h4>
                                    <p className="text-sm">Encontre seu cliente ideal com precisão cirúrgica via IA.</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 text-slate-300">
                                <div className="bg-primary/10 p-2 rounded-lg text-primary">
                                    <Users size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-white">Qualificação Local-First</h4>
                                    <p className="text-sm">CRM inteligente que filtra e pontua oportunidades reais.</p>
                                </div>
                            </div>
                        </div>

                        <div className="pt-8">
                            <Link href="/automacao">
                                <Button size="lg" className="w-full sm:w-auto text-lg h-14 px-8 gold-bloom gap-2 font-bold hover:scale-105 transition-transform">
                                    Conhecer o Processo na Prática <ArrowRight size={20} />
                                </Button>
                            </Link>
                        </div>
                    </div>

                    {/* Flashy Charts Visualization */}
                    <div className="relative h-[500px] w-full hidden lg:block perspective-1000">
                        <GlassCard intensity="vanguard" withGlow className="absolute inset-0 transform rotate-y-[-10deg] rotate-x-[5deg] scale-105 border-primary/20 bg-black/60 backdrop-blur-3xl overflow-hidden p-6 hover:rotate-y-0 hover:rotate-x-0 transition-transform duration-700 ease-out">
                            <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />

                            <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
                                <div className="flex items-center gap-3">
                                    <div className="flex space-x-1.5">
                                        <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                                        <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                                        <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                                    </div>
                                    <span className="text-xs font-mono text-white/50 tracking-wider">MOTOR_DE_CRESCIMENTO.EXE</span>
                                </div>
                                <div className="flex items-center gap-2 text-primary font-mono text-sm bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
                                    <TrendingUp size={14} /> +342% ROI
                                </div>
                            </div>

                            {/* Animated Chart Area */}
                            <div className="relative h-64 mt-8 flex items-end gap-3 px-4">
                                {/* Grid lines */}
                                <div className="absolute inset-0 flex flex-col justify-between hidden sm:flex pointer-events-none opacity-20">
                                    <div className="w-full h-[1px] bg-white/20"></div>
                                    <div className="w-full h-[1px] bg-white/20"></div>
                                    <div className="w-full h-[1px] bg-white/20"></div>
                                    <div className="w-full h-[1px] bg-white/20"></div>
                                </div>

                                {/* Bars - Using inline styles for dynamic heights to simulate a chart */}
                                <div className="relative w-full flex justify-between items-end gap-2 h-full z-10">
                                    {[30, 45, 35, 60, 50, 80, 70, 95].map((height, i) => (
                                        <div key={i} className="relative group flex-1 flex justify-center h-full items-end pb-8">
                                            {/* Tooltip */}
                                            <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity bg-black border border-primary/30 text-white text-xs py-1 px-2 rounded font-mono z-20 whitespace-nowrap">
                                                Mês {i + 1}: {height}%
                                            </div>

                                            <div
                                                className="w-full max-w-[40px] rounded-t-sm relative overflow-hidden transition-all duration-1000 ease-out group-hover:brightness-125 cursor-pointer"
                                                style={{ height: `${height}%` }}
                                            >
                                                {/* Glow and gradient for bar */}
                                                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-primary/80 to-primary"></div>
                                                <div className="absolute top-0 w-full h-[2px] bg-white/80 shadow-[0_0_10px_rgba(255,255,255,0.8)]"></div>
                                            </div>
                                        </div>
                                    ))}

                                    {/* Overlay Line Chart glowing */}
                                    <svg className="absolute inset-0 w-full h-full pointer-events-none drop-shadow-[0_0_8px_rgba(212,175,55,1)]" viewBox="0 0 100 100" preserveAspectRatio="none">
                                        <polyline
                                            fill="none"
                                            stroke="url(#gradient)"
                                            strokeWidth="2"
                                            points="5,70 18,55 30,65 43,40 55,50 68,20 80,30 95,5"
                                            className="origin-bottom animate-[stroke_2s_ease-out_forwards]"
                                            strokeDasharray="200"
                                            strokeDashoffset="0"
                                        />
                                        <defs>
                                            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                                <stop offset="0%" stopColor="#d4af37" stopOpacity="0.5" />
                                                <stop offset="100%" stopColor="#fff" stopOpacity="1" />
                                            </linearGradient>
                                        </defs>
                                    </svg>
                                </div>
                            </div>

                            {/* Stats Footer */}
                            <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-white/10">
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-white font-mono">14K+</div>
                                    <div className="text-xs text-white/50 uppercase tracking-widest mt-1">Leads Processados</div>
                                </div>
                                <div className="text-center border-l border-r border-white/10">
                                    <div className="text-2xl font-bold text-white font-mono">98%</div>
                                    <div className="text-xs text-white/50 uppercase tracking-widest mt-1">Taxa de Qualificação</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-primary font-mono whitespace-nowrap animate-pulse">Online</div>
                                    <div className="text-xs text-white/50 uppercase tracking-widest mt-1">Status CRM</div>
                                </div>
                            </div>
                        </GlassCard>

                        {/* Floating decoration elements */}
                        <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/20 blur-xl rounded-full mix-blend-screen" />
                        <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-amber-600/20 blur-xl rounded-full mix-blend-screen" />
                    </div>

                </div>
            </div>
        </section>
    );
}
