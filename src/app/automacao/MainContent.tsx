import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GlassCard, GlassHeader, GlassTitle, GlassContent, GlassDescription } from '@/components/ui/glass-card';

export function MainContent() {
    return (
        <div className="container mx-auto px-4 pt-8 mb-20">
            <GlassCard intensity="vanguard" withGlow className="py-12 shadow-lg text-center mb-16">
                <GlassHeader className="pb-4">
                    <GlassTitle className="text-4xl md:text-5xl font-headline font-bold leading-tight mb-4 text-primary">
                        Motor de Automação e Qualificação
                    </GlassTitle>
                    <GlassDescription className="text-xl md:text-2xl font-light text-muted-foreground max-w-4xl mx-auto">
                        Uma máquina de crescimento projetada para se adaptar a qualquer modelo de negócio, convertendo visitantes em compradores através de Inteligência Artificial e processos validados.
                    </GlassDescription>
                </GlassHeader>
            </GlassCard>

            <div className="max-w-6xl mx-auto space-y-16">
                <section className="text-center max-w-4xl mx-auto">
                    <p className="text-lg mb-6 text-muted-foreground leading-relaxed">
                        Nosso framework de automação integra inteligência de mercado, geração de conteúdo estratégico, comunicação multicanal e um sistema organizacional inteligente (CRM). Essa estrutura é altamente flexível e focada em entregar resultados mensuráveis e previsibilidade, independentemente do que você vende ou de como a sua empresa opera.
                    </p>
                </section>

                <section>
                    <GlassCard intensity="medium" withGlow className="p-8">
                        <GlassTitle className="text-3xl font-bold font-headline mb-8 text-center text-primary">A Anatomia do Processo</GlassTitle>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                            <Card className="relative p-6 border-border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                                <div className="absolute -top-4 -left-4 w-10 h-10 bg-primary text-background rounded-full flex items-center justify-center text-lg font-bold">1</div>
                                <CardHeader className="p-0 pb-3 mt-4">
                                    <CardTitle className="text-xl font-semibold font-headline text-primary">Entendimento e Foco Estratégico</CardTitle>
                                </CardHeader>
                                <CardContent className="p-0 space-y-2">
                                    <p className="text-muted-foreground"><strong className="text-foreground">O Cliente Ideal:</strong> Um estudo orientado por IA para mapear exatamente quem encontra o maior valor na sua solução, entendendo necessidades e objeções.</p>
                                    <p className="text-muted-foreground"><strong className="text-foreground">Análise de Mercado:</strong> Inteligência para avaliar os seus concorrentes e descobrir como posicionar a sua oferta de um jeito único.</p>
                                    <p className="text-muted-foreground"><strong className="text-foreground">Canais de Atração:</strong> Identificação cirúrgica de onde o seu público-alvo passa tempo (redes sociais, buscadores, e-mail) para direcionar esforços.</p>
                                </CardContent>
                            </Card>

                            <Card className="relative p-6 border-border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                                <div className="absolute -top-4 -left-4 w-10 h-10 bg-primary text-background rounded-full flex items-center justify-center text-lg font-bold">2</div>
                                <CardHeader className="p-0 pb-3 mt-4">
                                    <CardTitle className="text-xl font-semibold font-headline text-primary">Atração e Engajamento Inicial</CardTitle>
                                </CardHeader>
                                <CardContent className="p-0 space-y-2">
                                    <p className="text-muted-foreground"><strong className="text-foreground">Comunicação Personalizada:</strong> Elaboração de mensagens que dialogam diretamente com os desejos do cliente por meio de copy persuasivo.</p>
                                    <p className="text-muted-foreground"><strong className="text-foreground">Ativos de Captação:</strong> Criação de atrativos (guias, descontos, orçamentos, webinars) elaborados de forma visual e instigante para a captura do contato.</p>
                                    <p className="text-muted-foreground"><strong className="text-foreground">Páginas de Alta Conversão:</strong> Landing Pages rápidas e otimizadas que garantem que o visitante deixe suas informações de forma fluida.</p>
                                </CardContent>
                            </Card>

                            <Card className="relative p-6 border-border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                                <div className="absolute -top-4 -left-4 w-10 h-10 bg-primary text-background rounded-full flex items-center justify-center text-lg font-bold">3</div>
                                <CardHeader className="p-0 pb-3 mt-4">
                                    <CardTitle className="text-xl font-semibold font-headline text-primary">Sistematização e Conversão</CardTitle>
                                </CardHeader>
                                <CardContent className="p-0 space-y-2">
                                    <p className="text-muted-foreground"><strong className="text-foreground">CRM Próprio e Limpo:</strong> Um sistema seguro, configurado com as necessidades da sua empresa, concentrando históricos de interação sem mensalidades ocultas.</p>
                                    <p className="text-muted-foreground"><strong className="text-foreground">Nutrição Automática:</strong> Sequências logísticas e automatizadas de e-mail e mensagens que aquecem quem demonstrou interesse, construindo confiança.</p>
                                    <p className="text-muted-foreground"><strong className="text-foreground">Filtro de Oportunidades:</strong> Pontuação automática para separar curiosos de potenciais compradores de fato, repassando apenas os melhores contatos para conversão.</p>
                                </CardContent>
                            </Card>

                            <Card className="relative p-6 border-border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                                <div className="absolute -top-4 -left-4 w-10 h-10 bg-primary text-background rounded-full flex items-center justify-center text-lg font-bold">4</div>
                                <CardHeader className="p-0 pb-3 mt-4">
                                    <CardTitle className="text-xl font-semibold font-headline text-primary">Acompanhamento Inteligente</CardTitle>
                                </CardHeader>
                                <CardContent className="p-0 space-y-2">
                                    <p className="text-muted-foreground"><strong className="text-foreground">Dados em Tempo Real:</strong> Métricas como taxa de resposta, contatos angariados e custos apresentadas em painéis claros, sem planilhas interminonas.</p>
                                    <p className="text-muted-foreground"><strong className="text-foreground">Relatórios Descomplicados:</strong> Resumos diretos focados nos números que indicam se as campanhas estão gerando lucro ou prejuízo.</p>
                                    <p className="text-muted-foreground"><strong className="text-foreground">Melhoria e A/B Testing:</strong> O sistema facilita o aprendizado contínuo, permitindo o teste de títulos ou layouts diferentes para ajustar e maximizar as metas de venda.</p>
                                </CardContent>
                            </Card>

                        </div>
                    </GlassCard>
                </section>

                <section>
                    <GlassCard intensity="vanguard" withGlow className="p-8">
                        <GlassTitle className="text-3xl font-bold font-headline mb-6 text-center text-primary">Resultados Entregáveis</GlassTitle>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[
                                'Mapeamento Claro de Clientela Lucrativa',
                                'Geração de Autoridade Independente do Ramo',
                                'Engajamento Automático 24/7',
                                'Centralização Segura de Contatos',
                                'Qualificação Autossuficiente de Visitantes',
                                'Transição Pronta para o Setor de Vendas',
                                'Análise Transparente de Aquisição',
                                'Ciclo de Otimização e Melhoria Semanal',
                                'Aumento Real em Visibilidade e Contratos'
                            ].map((cap, i) => (
                                <div key={i} className="flex items-start space-x-3">
                                    <svg className="w-6 h-6 text-accent flex-shrink-0 mt-0.5 gold-bloom" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span className="text-muted-foreground">{cap}</span>
                                </div>
                            ))}
                        </div>
                    </GlassCard>
                </section>

                <section className="mb-12">
                    <GlassCard intensity="medium" withGlow className="p-8">
                        <GlassHeader>
                            <GlassTitle className="text-3xl font-bold font-headline mb-4 text-center text-primary">Perfeito Para Qualquer Vertical</GlassTitle>
                        </GlassHeader>
                        <GlassContent>
                            <p className="text-muted-foreground mb-8 text-center max-w-2xl mx-auto">
                                A IA aplica a lógica da venda para qualquer cenário. Sendo um framework flexível, ativamos recursos diferentes baseado na jornada única do seu consumidor:
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                                <div className="flex flex-col border-b border-border pb-4 md:border-b-0 md:pb-0">
                                    <strong className="text-lg text-foreground mb-1">E-commerces e Lojas</strong>
                                    <span className="text-muted-foreground">Recuperação de carrinhos, cupons de primeira compra via captura estratégica e envio de ofertas baseadas em comportamento de navegação no site.</span>
                                </div>
                                <div className="flex flex-col border-b border-border pb-4 md:border-b-0 md:pb-0">
                                    <strong className="text-lg text-foreground mb-1">Prestadores de Serviço (Médicos, Advogados, Consultores)</strong>
                                    <span className="text-muted-foreground">Construção de autoridade e confiança prévia por meio de materiais informativos para atrair pacientes ou clientes antes do agendamento comercial.</span>
                                </div>
                                <div className="flex flex-col border-b border-border pb-4 md:border-b-0 md:pb-0">
                                    <strong className="text-lg text-foreground mb-1">Serviços e Vendas B2B</strong>
                                    <span className="text-muted-foreground">Nutrição e conquista de tomadores de decisão em vendas corporativas longas. Engajamento corporativo direto via LinkedIn e e-mail marketing especializado.</span>
                                </div>
                                <div className="flex flex-col">
                                    <strong className="text-lg text-foreground mb-1">Educação e Produtos Digitais (Cursos/SaaS)</strong>
                                    <span className="text-muted-foreground">Captura para demonstrações ou webinars, com triagem e fluxos contínuos educando alunos ou usuários gratuitos até o avanço para as assinaturas.</span>
                                </div>
                            </div>
                        </GlassContent>
                    </GlassCard>
                </section>

            </div>
        </div>
    );
}
