// concierge-flow.ts - SISTEMA HÍBRIDO SOBERANO (ALTA CONVERSÃO + ECONOMIA DE TOKENS)
'use server';

import { z } from 'zod';

const ConciergeInputSchema = z.object({
  query: z.string(),
});

const ConciergeOutputSchema = z.object({
  response: z.string(),
});

const WHATSAPP_LINK = "https://wa.me/556492339844?text=Ol%C3%A1%2C%20estava%20conversando%20com%20o%20assistente%20virtual%20e%20quero%20continuar%20o%20atendimento.";

// RESPOSTAS ESTRUTURADAS (Soberanas)
const SOBEREIGN_RESPONSES = {
  saudacao: `E aí! 👋 Sou o **Núcleo Diamante**, a inteligência soberana da Ferdinan-MSP. Já escalamos mais de 50 empresas com tecnologia que outros chamam de "impossível". Qual o maior gargalo do seu negócio hoje? Vendas, Processos ou Tecnologia?`,
  
  valor: `Entendo sua dúvida sobre investimento. No modelo Soberano, não falamos de "preço", mas de ROI. Nossas implementações se pagam em média em 60 dias. Para uma análise de viabilidade real do seu caso, preciso que me chame no WhatsApp: ${WHATSAPP_LINK}`,
  
  servicos: `Operamos em 4 hubs: Financeiro, Cloud/TI, Marketing e Imobiliário. Tudo orquestrado por mim (Diamante-OS). Qual dessas áreas você quer blindar primeiro?`,
  
  proposta: `Para eu gerar um score de viabilidade e uma proposta, preciso de dados que não devemos trocar por aqui por segurança. Me chama no WhatsApp agora e digita "DIAMANTE": ${WHATSAPP_LINK}`,
  
  fallback: `Interessante seu ponto. Como uma inteligência de execução, eu prefiro analisar cenários concretos. Que tal continuarmos essa conversa com o Silas no WhatsApp? Ele tem os dados de mercado que vão te impressionar: ${WHATSAPP_LINK}`
};

// DETECTOR DE INTENÇÃO (Zero Token Cost)
function getIntention(q: string) {
  const query = q.toLowerCase();
  if (/\b(oi|olá|ola|bom dia|boa tarde|boa noite|eai|e aí)\b/.test(query)) return 'saudacao';
  if (/\b(preço|valor|quanto|custo|investimento|pagar)\b/.test(query)) return 'valor';
  if (/\b(serviço|fazem|ajuda|trabalho|hubs)\b/.test(query)) return 'servicos';
  if (/\b(proposta|orçamento|contratar|fechar)\b/.test(query)) return 'proposta';
  return 'fallback';
}

export async function conciergeFlow(
  input: z.infer<typeof ConciergeInputSchema>
): Promise<z.infer<typeof ConciergeOutputSchema>> {
  
  // 🛡️ PROTEÇÃO ANTI-EXPLOSÃO (Rate Limiting Simples por Sessão/IP pode ser feito no Middleware)
  // Aqui usamos lógica heurística para economizar chamadas de LLM
  
  const intention = getIntention(input.query);
  const response = SOBEREIGN_RESPONSES[intention as keyof typeof SOBEREIGN_RESPONSES];

  console.log(`[DIAMANTE-OS] Intenção: ${intention} | Query: ${input.query}`);

  return { response };
}
