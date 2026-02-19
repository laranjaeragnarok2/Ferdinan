import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Bot, ShieldCheck, Zap, BarChart3, Building2, Globe, Cpu } from "lucide-react";

const agents = [
  {
    id: "fincorp-analyst",
    name: "FinCorpAnalyst",
    hub: "Administrativo & Financeiro",
    icon: <BarChart3 className="h-6 w-6" />,
    description: "Especialista em gestão empresarial, análise de DRE, seguros e automação de cobranças.",
    capabilities: [
      "Consultoria em gestão estratégica",
      "Análise de viabilidade financeira",
      "Gestão de processos de despachante",
      "Automação de fluxos administrativos"
    ]
  },
  {
    id: "cloud-provider",
    name: "CloudProviderAgent",
    hub: "Tecnologia & SaaS",
    icon: <Cpu className="h-6 w-6" />,
    description: "Gestão de infraestrutura crítica, licenciamento de software e ativos de TI de alta performance.",
    capabilities: [
      "Monitoramento de Datacenter e Uptime",
      "Gestão de licenciamento de software",
      "Configuração de ativos B2B (Drones/Smartphones)",
      "Automação de DevOps e Scripts"
    ]
  },
  {
    id: "promo-sales",
    name: "PromoSalesAgent",
    hub: "Marketing & Publicidade",
    icon: <Globe className="h-6 w-6" />,
    description: "Motor de aquisição focado em campanhas dinâmicas, SEO e ROI publicitário.",
    capabilities: [
      "Criação de campanhas de promoção de vendas",
      "Roteirização de vídeos e conteúdo SEO",
      "Otimização de anúncios (Ads)",
      "Análise de performance em tempo real"
    ]
  },
  {
    id: "real-estate",
    name: "RealEstateEvaluator",
    hub: "Imobiliário & Ativos",
    icon: <Building2 className="h-6 w-6" />,
    description: "Inteligência imobiliária focada em avaliação e gestão de ativos físicos e musicais.",
    capabilities: [
      "Avaliação de valor de m² em Rio Verde - GO",
      "Gestão de locação de salas e instrumentos",
      "Monitoramento de manutenção de ativos",
      "Agendamento inteligente de visitas"
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
            Nossa operação é liderada pelo <span className="text-primary font-bold">Orquestrador Diamante (Gemini 3 Pro)</span>, 
            que coordena uma frota de especialistas dedicados a cada pilar da sua jornada empresarial.
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
                <h3 className="text-2xl font-bold text-foreground mb-2">Orquestrador Diamante (Sovereign)</h3>
                <p className="text-muted-foreground mb-4">
                  O cérebro estratégico que analisa, decide e delega. Utilizando o Gemini 3 Pro, 
                  garante que cada demanda seja atendida pelo especialista correto com precisão cirúrgica.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-mono uppercase tracking-widest border border-primary/20">Decision Intelligence</span>
                  <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-mono uppercase tracking-widest border border-primary/20">Multi-Agent Routing</span>
                  <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-mono uppercase tracking-widest border border-primary/20">Sovereign Control</span>
                </div>
              </div>
            </div>
          </Card>
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
