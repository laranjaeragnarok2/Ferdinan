// concierge-flow.ts - SISTEMA DE ALTA CONVERSÃO
'use server';

import { z } from 'zod';

const ConciergeInputSchema = z.object({
  query: z.string(),
});

const ConciergeOutputSchema = z.object({
  response: z.string(),
});

// BANCO DE RESPOSTAS DE ALTA CONVERSÃO
const RESPOSTAS = {
  // 1. SAUDAÇÕES - Criar conexão + Prova social + CTA
  saudacao: (whatsapp: string) => `E aí! 👋

Sou consultor da Ferdinan-MSP.Group. Já escalamos +50 empresas que estavam travadas.

Qual o maior desafio do seu negócio agora? Vendas? Processos? Gestão?

Me chama no WhatsApp que te mostro como resolver:
${whatsapp}`,

  // 2. PREÇO - Reframe + ROI + Escassez + CTA
  preco: (whatsapp: string) => `Olha, vou ser direto: não é barato, mas é o melhor investimento que você vai fazer.

Toda empresa que trabalhou comigo teve ROI de 5-10x em 12 meses. Você não gasta, você MULTIPLICA.

Tenho só 2 vagas essa semana pra análise gratuita. Me chama AGORA:
${whatsapp}`,

  // 3. SERVIÇOS - Contraste + Resultado + Prova + CTA
  servicos: (whatsapp: string) => `A gente faz uma coisa: CRESCIMENTO REAL.

Nada de consultoria de PowerPoint. Implementamos processos que geram ROI em 30-60 dias.

Última empresa: +3x faturamento em 6 meses. Quer ver se consigo o mesmo por você?

Me chama no WhatsApp:
${whatsapp}`,

  // 4. DÚVIDA ESPECÍFICA - Validação + Oferta de valor + CTA
  duvida: (whatsapp: string) => `Boa pergunta! 🤔

Isso é exatamente o tipo de coisa que resolvo todo dia. Mas por aqui fico limitado.

No WhatsApp te explico em 5 minutos e te mostro cases reais. Pode ser?

Clica aqui:
${whatsapp}`,

  // 5. OBJEÇÃO "VOU PENSAR" - Urgência + Custo de esperar + CTA
  objecao_pensar: (whatsapp: string) => `Entendo! Mas deixa eu te falar uma verdade dura:

Cada mês que você "pensa" é dinheiro deixado na mesa. Seus concorrentes não estão pensando, estão AGINDO.

Me dá 10 minutos no WhatsApp pra te mostrar um caminho claro. Sem compromisso:
${whatsapp}`,

  // 6. OBJEÇÃO "NÃO TENHO TEMPO" - Empatia + Inversão + CTA
  objecao_tempo: (whatsapp: string) => `Justamente por isso você precisa de ajuda! 😅

Empresário sem tempo = processos mal estruturados. É exatamente isso que a gente resolve.

Me chama no WhatsApp que te mostro como ganhar 10-20h por semana:
${whatsapp}`,

  // 7. OBJEÇÃO "JÁ TENTEI" - Validação + Diferenciação + CTA
  objecao_ja_tentou: (whatsapp: string) => `Sei como é. Já vi muita empresa queimar dinheiro com "consultor" que só entrega relatório.

A diferença aqui: implementamos COM você. Resultados em 30 dias ou seu dinheiro de volta.

Quer ver como funciona? Me chama:
${whatsapp}`,

  // 8. INTERESSE ALTO - Capitalizar + Urgência + CTA forte
  interesse_alto: (whatsapp: string) => `Perfeito! Você está no momento certo.

Janeiro é O mês pra começar. Quem age agora sai na frente em 2026.

Tenho agenda aberta SÓ até sexta. Depois só em fevereiro.

Me chama AGORA antes que lote:
${whatsapp}`,

  // 9. AGRADECIMENTO - Reciprocidade + Oferta + CTA
  agradecimento: (whatsapp: string) => `Por nada! 😊

Olha, já que estamos conversando... posso te mandar um material EXCLUSIVO sobre como escalar sem queimar caixa?

É grátis e te mando no WhatsApp agora:
${whatsapp}`,

  // 10. COMPARAÇÃO COM CONCORRENTE - Autoridade + Diferenciação + CTA
  comparacao: (whatsapp: string) => `Boa pergunta! A diferença é simples:

Outros consultores: Relatórios bonitos, zero implementação.
Nós: Trabalhamos COM você, resultados em 30-60 dias.

+50 empresas já escolheram. Me chama que te mostro por quê:
${whatsapp}`,

  // 11. PEDIDO DE PROPOSTA - Qualificação + Próximo passo + CTA
  proposta: (whatsapp: string) => `Fechou! Mas antes de montar proposta, preciso entender 3 coisas:

1. Faturamento atual
2. Maior gargalo
3. Meta de crescimento

Me chama no WhatsApp que em 15 minutos te mando proposta personalizada:
${whatsapp}`,

  // 12. FALLBACK GENÉRICO - Curiosidade + Valor + CTA
  generico: (whatsapp: string) => `Interessante! 🤔

Olha, por aqui fico limitado. No WhatsApp consigo te explicar melhor e te mostrar:
• Cases reais de empresas que escalaram
• Framework que usamos
• Próximos passos

Me chama lá:
${whatsapp}`,
};

// DETECTOR INTELIGENTE DE INTENÇÃO
function detectarIntencao(query: string): keyof typeof RESPOSTAS {
  const q = query.toLowerCase();

  // SAUDAÇÕES
  if (/\b(olá|oi|ola|hello|salve|bom dia|boa tarde|boa noite|e aí|eai)\b/.test(q)) {
    return 'saudacao';
  }

  // PREÇO
  if (/\b(preço|preco|custo|valor|quanto|investimento|pagar|cobrar|caro)\b/.test(q)) {
    return 'preco';
  }

  // SERVIÇOS
  if (/\b(serviço|servico|fazem|faz|trabalham|trabalha|ajuda|ajudar|oferecem|especialidade)\b/.test(q)) {
    return 'servicos';
  }

  // OBJEÇÃO "VOU PENSAR"
  if (/\b(pensar|depois|mais tarde|amanhã|semana que vem|mês que vem)\b/.test(q)) {
    return 'objecao_pensar';
  }

  // OBJEÇÃO "NÃO TENHO TEMPO"
  if (/\b(tempo|ocupado|corrido|atarefado|sem tempo)\b/.test(q)) {
    return 'objecao_tempo';
  }

  // OBJEÇÃO "JÁ TENTEI"
  if (/\b(já tentei|ja tentei|não funcionou|nao funcionou|não deu certo|nao deu certo)\b/.test(q)) {
    return 'objecao_ja_tentou';
  }

  // INTERESSE ALTO
  if (/\b(quero|preciso|urgente|rápido|rapido|agora|hoje|interessado|vamos)\b/.test(q)) {
    return 'interesse_alto';
  }

  // AGRADECIMENTO
  if (/\b(obrigad|valeu|thanks|agradeço|agradeco)\b/.test(q)) {
    return 'agradecimento';
  }

  // COMPARAÇÃO
  if (/\b(diferença|diferenca|comparar|melhor|pior|outro|concorrente)\b/.test(q)) {
    return 'comparacao';
  }

  // PEDIDO DE PROPOSTA
  if (/\b(proposta|orçamento|orcamento|contrato|fechar|contratar)\b/.test(q)) {
    return 'proposta';
  }

  // DÚVIDA ESPECÍFICA (perguntas)
  if (/\b(como|por que|porque|quando|onde|qual|quais|pode|consegue)\b/.test(q)) {
    return 'duvida';
  }

  // FALLBACK
  return 'generico';
}

export async function conciergeFlow(
  input: z.infer<typeof ConciergeInputSchema>
): Promise<z.infer<typeof ConciergeOutputSchema>> {

  const whatsappLink = "https://wa.me/556492339844?text=Ol%C3%A1%2C%20estava%20conversando%20com%20o%20assistente%20virtual%20e%20quero%20continuar%20o%20atendimento.";

  console.log('[CONCIERGE] 💬 Nova mensagem recebida');
  console.log('[CONCIERGE] Query:', input.query);

  // Detectar intenção
  const intencao = detectarIntencao(input.query);
  console.log('[CONCIERGE] 🎯 Intenção detectada:', intencao);

  // Buscar resposta correspondente
  const resposta = RESPOSTAS[intencao](whatsappLink);

  console.log('[CONCIERGE] ✅ Resposta de alta conversão gerada');
  console.log('[CONCIERGE] 📊 Tipo:', intencao);

  return { response: resposta };
}
