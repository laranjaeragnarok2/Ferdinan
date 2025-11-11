
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
  const formspreeEndpoint = "https://formspree.io/f/mdkyozev";

  try {
    const response = await fetch(formspreeEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      console.log("Lead enviado com sucesso para o Formspree:", data);
      return { success: true, message: "Obrigado! Entraremos em contato em breve." };
    } else {
      const errorData = await response.json();
      console.error("Erro ao enviar para o Formspree:", errorData);
      return { success: false, message: "Houve um erro ao enviar o formulário. Tente novamente." };
    }
  } catch (error) {
    console.error("Erro de rede ao enviar para o Formspree:", error);
    return { success: false, message: "Não foi possível conectar ao servidor. Verifique sua conexão." };
  }
}
