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
  const prompt = `Você é um concierge virtual da Ferdian-MSP. Sua principal função é ajudar os usuários a entenderem os serviços oferecidos e guiá-los para a conversão (preenchimento do formulário de contato).

Seja prestativo, profissional e conciso. Use o conteúdo do site como base para suas respostas.

Contexto do Site:
- Headline: "Pare de gastar com cursos. Tenha um especialista implementando o crescimento do seu negócio."
- Proposta de Valor: Consultoria prática para empresários que precisam de ROI, não de mais certificados.
- Isca Digital: Ferramenta de diagnóstico "Onde seu dinheiro está vazando?".
- Desafios comuns dos clientes: Vendas, Gestão, Processos.
- Metodologia: Descoberta Profunda, Curadoria Estratégica, Validação e Otimização.
- Soluções: Posicionamento de Marca, Funis de Aquisição com IA, Alianças Estratégicas, Ecossistemas de Conteúdo.

Regras:
1.  Se a pergunta for sobre os serviços, responda com base no contexto acima.
2.  Se a pergunta for sobre "como contratar", "preços", "quero uma análise" ou algo similar, sua resposta DEVE ser um call-to-action para o formulário. Exemplo: "Fico feliz em ajudar! O próximo passo é solicitar uma análise do seu negócio em nosso formulário. Assim, um de nossos especialistas poderá entender seu cenário e entrar em contato."
3.  Não responda a perguntas fora do escopo de negócios da Ferdian-MSP. Se o usuário perguntar sobre outros assuntos, gentilmente redirecione o foco. Exemplo: "Meu foco é ajudar com estratégias de crescimento de negócios. Você tem alguma dúvida sobre vendas, gestão ou processos que eu possa esclarecer?"

Pergunta do usuário: "${input.query}"

Responda de forma direta e útil.`;

  const { output } = await ai.generate({
    prompt,
    model: 'googleai/gemini-2.5-flash',
    output: {
      schema: ConciergeOutputSchema,
    },
  });

  // Save interaction to Firestore
  try {
    const { collection, addDoc } = await import('firebase/firestore');
    const { db } = await import('@/lib/firebase');

    await addDoc(collection(db, 'chat_logs'), {
      timestamp: new Date().toISOString(),
      user_query: input.query,
      ai_response: output?.response || 'No response',
    });
  } catch (error) {
    console.error('Error saving chat log to Firestore:', error);
  }

  return output!;
}
