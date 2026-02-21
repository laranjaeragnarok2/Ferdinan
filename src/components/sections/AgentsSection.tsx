import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Bot, ShieldCheck, Zap, BarChart3, Building2, Globe, Cpu, Scale } from "lucide-react";

const agents = [
  {
    id: "fincorp-analyst",
    name: "FinCorpAnalyst",
    hub: "Administrativo & Financeiro",
    icon: <BarChart3 className="h-6 w-6" />,
    description: "Consultoria financeira e gestão empresarial. Essencial para elaboração de propostas financeiras robustas em licitações.",
    theme: {
      bgGradient: "from-emerald-500/10 via-transparent to-transparent",
      iconWrap: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 group-hover:bg-emerald-500/20 group-hover:border-emerald-500/40",
      dot: "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]",
      borderHover: "hover:border-emerald-500/40 hover:shadow-[0_0_30px_rgba(52,211,153,0.15)]",
      textHighlight: "text-emerald-400"
    },
    capabilities: [
      "Análise de viabilidade econômica de contratos",
      "Detalhe de custos e projeção de retornos",
      "Garantia de conformidade fiscal e DRE",
      "Gestão de seguros e cobranças"
    ]
  },
  {
    id: "cloud-provider",
    name: "CloudProviderAgent",
    hub: "Tecnologia & SaaS",
    icon: <Cpu className="h-6 w-6" />,
    description: "Gestão de infraestrutura crítica e ativos de TI. Garante que as propostas técnicas atendam aos padrões exigidos em licitações.",
    theme: {
      bgGradient: "from-blue-500/10 via-transparent to-transparent",
      iconWrap: "bg-blue-500/10 text-blue-400 border-blue-500/20 group-hover:bg-blue-500/20 group-hover:border-blue-500/40",
      dot: "bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.8)]",
      borderHover: "hover:border-blue-500/40 hover:shadow-[0_0_30px_rgba(96,165,250,0.15)]",
      textHighlight: "text-blue-400"
    },
    capabilities: [
      "Atendimento a requisitos de software e hardware",
      "Garantia de segurança de dados em certames",
      "Gestão de licenciamento e ativos B2B",
      "Gerenciamento de datacenter e uptime"
    ]
  },
  {
    id: "promo-sales",
    name: "PromoSalesAgent",
    hub: "Marketing & Publicidade",
    icon: <Globe className="h-6 w-6" />,
    description: "Comunicação estratégica de valor da empresa em documentos corporativos e análise do posicionamento de concorrentes.",
    theme: {
      bgGradient: "from-purple-500/10 via-transparent to-transparent",
      iconWrap: "bg-purple-500/10 text-purple-400 border-purple-500/20 group-hover:bg-purple-500/20 group-hover:border-purple-500/40",
      dot: "bg-purple-400 shadow-[0_0_8px_rgba(192,132,252,0.8)]",
      borderHover: "hover:border-purple-500/40 hover:shadow-[0_0_30px_rgba(192,132,252,0.15)]",
      textHighlight: "text-purple-400"
    },
    capabilities: [
      "Pesquisa de mercado para contratos públicos",
      "Comunicação estratégica de valor projetado",
      "Otimização de SEO e presença digital",
      "Gestão inteligente de campanhas e anúncios"
    ]
  },
  {
    id: "real-estate",
    name: "RealEstateEvaluator",
    hub: "Imobiliário & Ativos",
    icon: <Building2 className="h-6 w-6" />,
    description: "Relevante para licitações de bens imóveis. Fornece avaliações precisas assegurando conformidade com a legislação.",
    theme: {
      bgGradient: "from-amber-500/10 via-transparent to-transparent",
      iconWrap: "bg-amber-500/10 text-amber-500 border-amber-500/20 group-hover:bg-amber-500/20 group-hover:border-amber-500/40",
      dot: "bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.8)]",
      borderHover: "hover:border-amber-500/40 hover:shadow-[0_0_30px_rgba(245,158,11,0.15)]",
      textHighlight: "text-amber-500"
    },
    capabilities: [
      "Avaliação de imóveis para concorrências públicas",
      "Gestão de contratos de locação ou aquisição",
      "Conformidade minuciosa com leis imobiliárias",
      "Gestão de ativos físicos e agendamentos"
    ]
  }
];

export default function AgentsSection() {
  return (
    <section id="agents" className="py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-3 mb-6 rounded-2xl bg-primary/10 border border-primary/20 gold-bloom">
            <Bot className="h-8 w-8 text-primary" />
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-sm uppercase tracking-wider mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Especialistas em Licitações
          </div>
          <h2 className="text-4xl md:text-5xl font-headline text-luxury-gold mb-6">
            Inteligência Orquestrada: Ecossistema de Agentes
          </h2>
          <p className="max-w-3xl mx-auto text-xl text-muted-foreground leading-relaxed">
            Nossa operação é liderada pelo <span className="text-primary font-bold">Orquestrador Diamante (Proprietário)</span>,
            que coordena uma frota de sub-agentes especialistas dedicados a cada pilar da sua jornada corporativa, com
            <strong className="text-foreground"> expertise inigualável em processos licitatórios</strong> e conformidade pública.
          </p>
        </div>

        {/* Orchestrator Card */}
        <div className="max-w-4xl mx-auto mb-16">
          <Card className="glass-luxury border-primary/30 p-8 relative group hover:border-primary/60 transition-all duration-500">
            <div className="absolute top-0 right-0 p-4">
              <ShieldCheck className="h-10 w-10 text-primary opacity-20 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-shrink-0">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary via-amber-200 to-primary/40 flex items-center justify-center shadow-[0_0_30px_rgba(212,175,55,0.4)]">
                  <Zap className="h-12 w-12 text-background" />
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-2">Orquestrador Diamante (Proprietário)</h3>
                <p className="text-muted-foreground mb-4">
                  Como Orquestrador Central, minha função é coordenar, estrategizar e delegar, utilizando a inteligência dos sub-agentes e um vasto arsenal de habilidades (Law, Contract, Compliance, Accounting, Strategy) através da nossa <strong className="text-foreground">arquitetura proprietária</strong>. Com capacidade de raciocínio profundo, integro informações complexas de diversas fontes para resolver problemas de alto impacto.
                </p>

                {/* Licitações Highlight Banners */}
                <div className="relative group rounded-xl p-[1px] bg-gradient-to-r from-primary via-emerald-500 to-amber-500 mb-6 shadow-[0_0_20px_rgba(212,175,55,0.2)]">
                  <div className="bg-background/95 backdrop-blur-sm rounded-xl p-6 h-full relative overflow-hidden">
                    {/* Background decoration */}
                    <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
                      <Scale className="h-40 w-40 text-emerald-500" />
                    </div>

                    <div className="flex items-center gap-3 mb-4 relative z-10">
                      <div className="p-2 bg-emerald-500/20 rounded-lg border border-emerald-500/30">
                        <ShieldCheck className="h-6 w-6 text-emerald-400" />
                      </div>
                      <h4 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400">
                        Domínio Absoluto em Leis e Licitações
                      </h4>
                    </div>

                    <p className="text-sm text-foreground/90 leading-relaxed relative z-10 mb-4">
                      Com o meu core de orquestração e acesso a habilidades afiadas em <strong className="text-emerald-400">Law & Compliance</strong>, garanto precisão em processos críticos de certames da sua empresa. Atuo como um <strong className="text-emerald-400 font-bold">consultor estratégico e integrador 24/7</strong> para o avanço em licitações.
                    </p>

                    <div className="grid grid-cols-2 gap-3 relative z-10 mt-4">
                      <div className="bg-white/5 border border-white/10 rounded p-3 flex items-start gap-2">
                        <div className="mt-1 flex-shrink-0 h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="text-xs font-semibold text-foreground/80">Análise Cirúrgica de Editais e Riscos</span>
                      </div>
                      <div className="bg-white/5 border border-white/10 rounded p-3 flex items-start gap-2">
                        <div className="mt-1 flex-shrink-0 h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="text-xs font-semibold text-foreground/80">Preparação de Propostas Financeiras</span>
                      </div>
                      <div className="bg-white/5 border border-white/10 rounded p-3 flex items-start gap-2">
                        <div className="mt-1 flex-shrink-0 h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="text-xs font-semibold text-foreground/80">Revisão e Elaboração de Termos Legais</span>
                      </div>
                      <div className="bg-white/5 border border-white/10 rounded p-3 flex items-start gap-2">
                        <div className="mt-1 flex-shrink-0 h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="text-xs font-semibold text-foreground/80">Monitoramento Contínuo de Compliance</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-mono uppercase tracking-widest border border-primary/20">Legal & Contracts</span>
                  <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-mono uppercase tracking-widest border border-primary/20">Bid Strategic Planning</span>
                  <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-mono uppercase tracking-widest border border-primary/20">Deep Thinking</span>
                  <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-mono uppercase tracking-widest border border-primary/20">Compliance Officer</span>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className="text-center mb-10 pt-4">
          <h3 className="text-3xl font-headline text-luxury-gold mb-3">
            Sub-Agentes (Ecossistema Próprio)
          </h3>
          <div className="h-1 w-20 bg-primary/30 mx-auto rounded-full mb-6"></div>
        </div>

        {/* Hubs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {agents.map((agent) => (
            <Card
              key={agent.id}
              className={`glass-luxury border-white/[0.08] ${agent.theme.borderHover} p-8 transition-all duration-500 relative overflow-hidden group`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${agent.theme.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-in-out`} />

              <div className="relative z-10">
                <CardHeader className="p-0 mb-6 flex flex-row items-center gap-4">
                  <div className={`h-12 w-12 rounded-xl border flex items-center justify-center transition-all duration-500 ${agent.theme.iconWrap}`}>
                    {agent.icon}
                  </div>
                  <div>
                    <h4 className={`text-xs font-mono uppercase tracking-[0.2em] mb-1 transition-colors duration-500 ${agent.theme.textHighlight}`}>
                      {agent.hub}
                    </h4>
                    <h3 className="text-xl font-bold text-foreground">{agent.name}</h3>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {agent.description}
                  </p>
                  <ul className="space-y-3">
                    {agent.capabilities.map((cap, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-foreground/80 group-hover:text-foreground transition-colors duration-300">
                        <div className={`mt-1.5 h-1.5 w-1.5 rounded-full shrink-0 transition-shadow duration-500 ${agent.theme.dot}`} />
                        {cap}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
