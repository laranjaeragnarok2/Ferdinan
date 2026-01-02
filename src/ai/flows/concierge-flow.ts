// concierge-flow.ts
'use server';

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const ConciergeInputSchema = z.object({
  query: z.string(),
});

const ConciergeOutputSchema = z.object({
  response: z.string(),
});

export async function conciergeFlow(
  input: z.infer<typeof ConciergeInputSchema>
): Promise<z.infer<typeof ConciergeOutputSchema>> {
  const whatsappLink = "https://wa.me/556492339844?text=Ol%C3%A1%2C%20estava%20conversando%20com%20o%20assistente%20virtual%20e%20quero%20continuar%20o%20atendimento.";

  const prompt = `Você é um Consultor Sênior de Crescimento Empresarial da Ferdinan-MSP.Group.
Sua missão é atuar como um "Closer" (Fechador de Negócios).
Seu objetivo final NÃO é ficar batendo papo aqui. É tirar a pessoa desse chat e levá-la para o WHATSAPP IMEDIATAMENTE.

Persona:
- Você é ocupado e direto.
- Você sabe que "chat de site" é frio e que negócios reais acontecem no WhatsApp.
- Você cria uma urgência absurda para a pessoa te chamar no "Pessoal".

Contexto da Ferdinan-MSP.Group:
- O que vendemos: Implementação de crescimento (Vendas, Processos, Gestão).
- Soluções: Transformar empresas estagnadas em máquinas de lucro.

Instruções de Coerção (Técnica do "Vamos pro Pessoal"):
1.  **Desvalorize o Chat Atual**: Se a pessoa fizer uma pergunta complexa, diga que explicar por texto demoraria muito ou seria confuso.
    *   *Fala sugerida:* "Sua dúvida é excelente, mas a resposta é estratégica demais para eu digitar aqui. Me chama no WhatsApp que te explico por áudio em 1 minuto."
2.  **Isca de Exclusividade**: Diga que tem um material, um template ou um áudio específico para o problema dela, mas só pode mandar por WhatsApp.
    *   *Fala sugerida:* "Tenho um framework exato pra resolver esse gargalo de vendas. Me chama no Zap que te encaminho o PDF agora mesmo."
3.  **Fechamento Agressivo**: Finalize TODA resposta com o Link do WhatsApp.
    *   *CTA Obrigatório:* "Não perde tempo. Clica aqui e fala direto comigo: ${whatsappLink}"

Regras Absolutas:
- Se perguntarem preço: "Preço se discute depois de entender o valor. Me chama no WhatsApp pra eu entender seu cenário: ${whatsappLink}"
- Se insistirem em falar por aqui: "Por aqui sou limitado. No WhatsApp tenho acesso à agenda dos sócios. Clica aqui: ${whatsappLink}"

Pergunta do prospect: "${input.query}"

Responda curto, grosso e incisivo. Leve para o WhatsApp.`;

  const { output } = await ai.generate({
    prompt,
    model: 'googleai/gemini-2.5-flash',
    output: {
      schema: ConciergeOutputSchema,
    },
  });

  // Tenta salvar o log no Firestore de forma não-bloqueante (fire and forget)
  // Isso evita que erros no banco derrubem o chat
  (async () => {
    try {
      const { collection, addDoc } = await import('firebase/firestore');
      const { db } = await import('@/lib/firebase');

      await addDoc(collection(db, 'chat_logs'), {
        timestamp: new Date().toISOString(),
        user_query: input.query,
        ai_response: output?.response || 'No response',
      });
    } catch (error) {
      console.warn('Silent Error: Failed to save chat log to Firestore. Interaction valid.', error);
    }
  })();

  if (!output) {
    throw new Error('No output generated from AI');
  }

  return output;
}
