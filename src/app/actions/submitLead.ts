"use server";

import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(2, "O nome deve ter pelo menos 2 caracteres."),
  email: z.string().email("Por favor, insira um e-mail válido."),
  company: z.string().min(2, "O nome da empresa é obrigatório."),
  role: z.string().min(2, "Sua função é obrigatória."),
  budget: z.string().nonempty("Por favor, selecione uma faixa de orçamento."),
  challenge: z
    .string()
    .min(10, "Por favor, descreva seu desafio em pelo menos 10 caracteres."),
});

export type LeadFormData = z.infer<typeof formSchema>;

export async function submitLead(data: LeadFormData) {
  console.log("Novo lead enviado:", data);
  // Simula um atraso na rede
  await new Promise((resolve) => setTimeout(resolve, 1500));
  return { success: true, message: "Obrigado! Entraremos em contato em breve." };
}
