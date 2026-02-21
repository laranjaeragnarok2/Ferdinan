import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GlassCard, GlassHeader, GlassTitle, GlassContent, GlassDescription } from '@/components/ui/glass-card';

export function MainContent() {
  return (
    <>
      <div className="container mx-auto px-4 pt-8">
        <GlassCard intensity="vanguard" withGlow className="py-8 shadow-lg text-center mb-12">
          <GlassHeader className="pb-2">
            <GlassTitle className="text-4xl md:text-5xl font-headline font-bold leading-tight mb-2">
              Blueprint da Dominio Digital
            </GlassTitle>
            <GlassDescription className="text-xl md:text-2xl font-light">
              7 Passos para uma Metodologia de Resultados Reais em TI
            </GlassDescription>
            {/* Placeholder for visual element: Shield/Compass */}
            <div className="mt-4 text-accent">
              <svg className="w-16 h-16 mx-auto gold-bloom" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L4 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-8-3zm-1 13H9v-2h2v2zm0-4H9V7h2v4zm4 0h-2V7h2v4zm0 2h-2v2h2v-2z" />
              </svg>
              <p className="text-sm">Seu Guia para a Excelência em TI</p>
            </div>
          </GlassHeader>
        </GlassCard>

        {/* Main Content Sections */}
        <div className="max-w-6xl mx-auto">
          <section className="mb-12 text-center max-w-3xl mx-auto">
            <p className="text-lg mb-4 text-muted-foreground">
              Em um cenário de TI em constante evolução, a obtenção de resultados reais e sustentáveis exige mais do que apenas tecnologia. Exige uma metodologia robusta, clareza estratégica e a capacidade de inovar continuamente. Este Blueprint foi criado para líderes e equipes de TI que buscam transformar desafios em oportunidades e consolidar sua posição como a Dominio Digital do mercado.
            </p>
            <p className="text-lg text-muted-foreground">
              Descubra os 7 passos fundamentais que irão guiá-lo na construção de uma operação de TI de alto impacto, focada em eficiência, segurança e, acima de tudo, resultados mensuráveis.
            </p>
          </section>

          {/* 7 Steps Section */}
          <section className="mb-12">
            <GlassCard intensity="medium" withGlow className="p-8">
              <GlassTitle className="text-3xl font-bold font-headline mb-8 text-center text-primary">Os 7 Passos para a Excelência em TI:</GlassTitle>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Step 1 */}
                <Card className="relative p-6 border-border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="absolute -top-4 -left-4 w-10 h-10 bg-primary text-background rounded-full flex items-center justify-center text-lg font-bold">1</div>
                  <CardHeader className="p-0 pb-3">
                    <CardTitle className="text-xl font-semibold font-headline mb-0 mt-4">Diagnóstico Estratégico e Alinhamento</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <p className="text-muted-foreground">Compreenda o cenário atual da sua TI e alinhe-o com os objetivos de negócio. Defina KPIs claros e métricas de sucesso.</p>
                  </CardContent>
                </Card>
                {/* Step 2 */}
                <Card className="relative p-6 border-border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="absolute -top-4 -left-4 w-10 h-10 bg-primary text-background rounded-full flex items-center justify-center text-lg font-bold">2</div>
                  <CardHeader className="p-0 pb-3">
                    <CardTitle className="text-xl font-semibold font-headline mb-0 mt-4">Otimização de Processos e Fluxos</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <p className="text-muted-foreground">Identifique gargalos, automatize tarefas repetitivas e estruture processos eficientes que impulsionem a produtividade.</p>
                  </CardContent>
                </Card>
                {/* Step 3 */}
                <Card className="relative p-6 border-border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="absolute -top-4 -left-4 w-10 h-10 bg-primary text-background rounded-full flex items-center justify-center text-lg font-bold">3</div>
                  <CardHeader className="p-0 pb-3">
                    <CardTitle className="text-xl font-semibold font-headline mb-0 mt-4">Gestão de Segurança e Conformidade</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <p className="text-muted-foreground">Implemente políticas de segurança robustas e garanta a conformidade com as regulamentações, protegendo seus dados e operações.</p>
                  </CardContent>
                </Card>
                {/* Step 4 */}
                <Card className="relative p-6 border-border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="absolute -top-4 -left-4 w-10 h-10 bg-primary text-background rounded-full flex items-center justify-center text-lg font-bold">4</div>
                  <CardHeader className="p-0 pb-3">
                    <CardTitle className="text-xl font-semibold font-headline mb-0 mt-4">Infraestrutura Adaptável e Escalável</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <p className="text-muted-foreground">Construa uma base tecnológica que suporte o crescimento do negócio, com flexibilidade e resiliência.</p>
                  </CardContent>
                </Card>
                {/* Step 5 */}
                <Card className="relative p-6 border-border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="absolute -top-4 -left-4 w-10 h-10 bg-primary text-background rounded-full flex items-center justify-center text-lg font-bold">5</div>
                  <CardHeader className="p-0 pb-3">
                    <CardTitle className="text-xl font-semibold font-headline mb-0 mt-4">Cultura de Inovação e Desenvolvimento</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <p className="text-muted-foreground">Fomente um ambiente onde a inovação é incentivada e a equipe está sempre à frente das tendências tecnológicas.</p>
                  </CardContent>
                </Card>
                {/* Step 6 */}
                <Card className="relative p-6 border-border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="absolute -top-4 -left-4 w-10 h-10 bg-primary text-background rounded-full flex items-center justify-center text-lg font-bold">6</div>
                  <CardHeader className="p-0 pb-3">
                    <CardTitle className="text-xl font-semibold font-headline mb-0 mt-4">Gestão de Custos e ROI da TI</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <p className="text-muted-foreground">Monitore e otimize os investimentos em TI, garantindo um retorno claro e justificado para o negócio.</p>
                  </CardContent>
                </Card>
                {/* Step 7 */}
                <Card className="relative p-6 border-border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="absolute -top-4 -left-4 w-10 h-10 bg-primary text-background rounded-full flex items-center justify-center text-lg font-bold">7</div>
                  <CardHeader className="p-0 pb-3">
                    <CardTitle className="text-xl font-semibold font-headline mb-0 mt-4">Liderança Digital e Transformação Contínua</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <p className="text-muted-foreground">Capacite sua liderança para guiar a transformação digital, adaptando-se rapidamente às mudanças do mercado.</p>
                  </CardContent>
                </Card>
              </div>
            </GlassCard>
          </section>

          {/* Call to Action and Lead Form */}
          <section className="max-w-2xl mx-auto">
            <GlassCard intensity="vanguard" withGlow className="p-8 text-center">
              <GlassHeader>
                <GlassTitle className="text-3xl font-bold font-headline mb-4 text-primary">Desbloqueie o Seu Blueprint Agora!</GlassTitle>
              </GlassHeader>
              <GlassContent>
                <>
                  <p className="text-lg mb-6 text-muted-foreground">
                    Preencha o formulário abaixo para fazer o download gratuito do "Blueprint da Dominio Digital" e comece sua jornada rumo a resultados reais e estratégicos em TI.
                  </p>

                  {/* Lead Capture Form */}
                  <form className="space-y-4 text-left bg-card p-6 rounded-lg shadow-inner text-foreground" action="/api/openclaw-crm-submit" method="POST">
                    <div>
                      <Label htmlFor="name">Nome Completo</Label>
                      <Input
                        type="text"
                        name="name"
                        id="name"
                        required
                        placeholder="Seu nome completo"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Profissional</Label>
                      <Input
                        type="email"
                        name="email"
                        id="email"
                        required
                        placeholder="seu.email@empresa.com.br"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Telefone (com DDD)</Label>
                      <Input
                        type="tel"
                        name="phone"
                        id="phone"
                        required
                        placeholder="(XX) XXXXX-XXXX"
                      />
                    </div>
                    <div>
                      <Label htmlFor="company">Empresa</Label>
                      <Input
                        type="text"
                        name="company"
                        id="company"
                        required
                        placeholder="Nome da sua empresa"
                      />
                    </div>
                    <div>
                      <Label htmlFor="role">Cargo</Label>
                      <Input
                        type="text"
                        name="role"
                        id="role"
                        required
                        placeholder="Seu cargo na empresa"
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full gold-bloom"
                    >
                      Baixar o Blueprint Agora!
                    </Button>
                  </form>
                </>
              </GlassContent>
            </GlassCard>
          </section>
        </div>
      </div>
    </>
  );
}
