
"use server";

import { z } from "zod";
import nodemailer from 'nodemailer';
import { sendDiscordNotification } from '@/utils/discord';

export const formSchema = z.object({
  firstName: z.string().min(2, 'O nome deve ter pelo menos 2 caracteres.'),
  lastName: z.string().min(2, 'O sobrenome deve ter pelo menos 2 caracteres.'),
  email: z.string().email('Por favor, insira um e-mail válido.'),
  countryCode: z.string().min(1, 'Selecione o código do país.'),
  phone: z.string().min(8, 'Por favor, insira um número de telefone válido.'),
  challenge: z.string().min(1, 'Por favor, selecione um desafio.'),
  referral: z.string().min(1, 'Por favor, selecione como nos encontrou.'),
  experience: z.string().min(1, 'Por favor, selecione seu nível de experiência.'),
  acceptNotifications: z.boolean().default(false),
});

export type LeadFormData = z.infer<typeof formSchema>;

export async function submitLead(data: LeadFormData) {
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.hostinger.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const fullPhone = `${data.countryCode} ${data.phone}`;

    // 1. E-mail de Notificação para VOCÊ (Dono)
    const notificationMail = {
      from: `"Ferdinan-MSP.Group Leads" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_USER,
      subject: `🔥 Novo Lead: ${data.firstName} ${data.lastName} (${data.challenge})`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #ea580c;">Nova Solicitação de Análise</h2>
          <hr/>
          <p><strong>Nome:</strong> ${data.firstName} ${data.lastName}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Telefone:</strong> ${fullPhone}</p>
          <p><strong>Desafio Principal:</strong> ${data.challenge}</p>
          <p><strong>Origem:</strong> ${data.referral}</p>
          <p><strong>Experiência:</strong> ${data.experience}</p>
          <p><strong>Aceita Notificações:</strong> ${data.acceptNotifications ? 'Sim' : 'Não'}</p>
          <hr/>
          <p style="font-size: 12px; color: #666;">Recebido via Formulário Principal do Site.</p>
        </div>
      `,
    };

    // 2. E-mail de Confirmação para o CLIENTE
    const confirmationMail = {
      from: `"Ferdinan-MSP.Group" <${process.env.SMTP_USER}>`,
      to: data.email,
      subject: 'Recebemos sua solicitação de Análise Estratégica',
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #333; line-height: 1.6;">
          <h2 style="color: #ea580c;">Olá, ${data.firstName}.</h2>
          
          <p>Recebi pessoalmente a sua solicitação de análise para o seu negócio.</p>
          
          <p>Nesse exato momento, o <strong>Núcleo Diamante</strong> já iniciou o processamento dos seus dados. Diferente de agências comuns que utilizam triagens genéricas, nossa inteligência proprietária realiza um cruzamento de viabilidade técnica antes da minha revisão final.</p>
          
          <p><strong>O que acontece agora?</strong></p>
          <ul>
            <li>Nossa arquitetura soberana analisará os dados que você enviou.</li>
            <li>Entraremos em contato via WhatsApp ou E-mail em até 24 horas úteis.</li>
            <li>Se o seu perfil atingir o score de viabilidade, agendaremos o diagnóstico detalhado.</li>
          </ul>

          <p>Enquanto isso, recomendo que reflita: <em>Qual é o custo de oportunidade de não resolver o problema de "${data.challenge}" hoje?</em></p>

          <br/>
          <p>Atenciosamente,</p>
          <p><strong>Ferdinan</strong><br>
          <span style="font-size: 12px; color: #666;">Growth & Gestão | Ferdinan-MSP.Group</span></p>
        </div>
      `,
    };

    // Enviar ambos os e-mails e notificação Discord
    // Nota: A função sendDiscordNotification pode precisar de ajuste para o novo formato de dados
    await Promise.allSettled([
      transporter.sendMail(notificationMail),
      transporter.sendMail(confirmationMail),
      sendDiscordNotification({ ...data, name: `${data.firstName} ${data.lastName}`, whatsapp: fullPhone }, 'form')
    ]);

    return { success: true, message: "Solicitação recebida com sucesso! Verifique seu e-mail." };
  } catch (error) {
    console.error("Erro ao enviar e-mail via SMTP:", error);
    return { success: false, message: "Houve um erro técnico. Por favor, chame no WhatsApp." };
  }
}
