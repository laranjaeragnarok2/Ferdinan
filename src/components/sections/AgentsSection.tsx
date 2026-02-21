import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Bot, ShieldCheck, Zap, BarChart3, Building2, Globe, Cpu, Scale } from "lucide-react";

const agents = [
  {
    id: "fincorp-analyst",
    name: "FinCorpAnalyst",
    hub: "Administrativo & Financeiro",
    icon: <BarChart3 className="h-6 w-6" />,
    description: "Consultoria financeira e gestão empresarial. Essencial para elaboração de propostas financeiras robustas em licitações.",
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
          <h2 className="text-4xl md:text-5xl font-headline text-luxury-gold mb-6">
            Inteligência Orquestrada: Ecossistema de Agentes
          </h2>
          <p className="max-w-3xl mx-auto text-xl text-muted-foreground leading-relaxed">
            Nossa operação é liderada pelo <span className="text-primary font-bold">Orquestrador Diamante (Eu)</span>,
            que coordena uma frota de sub-agentes especialistas dedicados a cada pilar da sua jornada corporativa e licitatória.
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

                <div className="bg-primary/5 border border-primary/20 rounded-lg p-5 mb-5 relative overflow-hidden">
                  <div className="absolute top-0 right-0 -mt-2 -mr-2 opacity-10">
                    <Scale className="h-24 w-24 text-primary" />
                  </div>
                  <h4 className="text-md font-bold text-primary mb-2 flex items-center gap-2">
                    <ShieldCheck className="h-5 w-5" /> Capacidade para Licitações e Leis
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed relative z-10">
                    Com o meu core de orquestração e acesso a habilidades jurídicas e financeiras afiadas, posso coordenar a <strong className="text-foreground">análise minuciosa de editais</strong>, a <strong className="text-foreground">preparação de propostas financeiras</strong>, a <strong className="text-foreground">revisão de termos legais</strong> e a <strong className="text-foreground">garantia de conformidade plena (Compliance)</strong> em diversas regulações. Atuo como um consultor estratégico e integrador em todo o processo de licitação.
                  </p>
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
            <Card key={agent.id} className="glass-luxury border-white/[0.08] hover:border-gold-glow p-8 transition-all duration-300">
              <CardHeader className="p-0 mb-6 flex flex-row items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-primary/5 border border-primary/10 flex items-center justify-center text-primary">
                  {agent.icon}
                </div>
                <div>
                  <h4 className="text-xs font-mono text-primary uppercase tracking-[0.2em] mb-1">{agent.hub}</h4>
                  <h3 className="text-xl font-bold text-foreground">{agent.name}</h3>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {agent.description}
                </p>
                <ul className="space-y-3">
                  {agent.capabilities.map((cap, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-foreground/80">
                      <div className="mt-1 h-1.5 w-1.5 rounded-full bg-primary shrink-0 shadow-[0_0_8px_rgba(212,175,55,0.8)]" />
                      {cap}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
