
"use server";

import { z } from "zod";
import nodemailer from 'nodemailer';
import { sendDiscordNotification } from '@/utils/discord';

const formSchema = z.object({
  name: z.string().min(2, 'O nome deve ter pelo menos 2 caracteres.'),
  email: z.string().email('Por favor, insira um e-mail válido.'),
  whatsapp: z.string().min(10, 'Por favor, insira um número de WhatsApp válido.'),
  challenge: z.string().nonempty('Por favor, selecione um desafio.'),
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

    // 1. E-mail de Notificação para VOCÊ (Dono)
    const notificationMail = {
      from: `"Ferdinan-MSP.Group Leads" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_USER,
      subject: `🔥 Novo Lead: ${data.name} (Análise de Negócio)`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #ea580c;">Nova Solicitação de Análise</h2>
          <hr/>
          <p><strong>Nome:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>WhatsApp:</strong> ${data.whatsapp}</p>
          <p><strong>Desafio Principal:</strong> ${data.challenge}</p>
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
          <h2 style="color: #ea580c;">Olá, ${data.name.split(' ')[0]}.</h2>
          
          <p>Recebi pessoalmente a sua solicitação de análise para o seu negócio.</p>
          
          <p>Nesse exato momento, nossa equipe já foi notificada. Diferente de agências comuns, nós não usamos robôs para triagem inicial. Eu ou um dos meus consultores seniores analisaremos seu perfil.</p>
          
          <p><strong>O que acontece agora?</strong></p>
          <ul>
            <li>Vamos analisar os dados que você enviou.</li>
            <li>Entraremos em contato via WhatsApp ou E-mail em até 24 horas úteis.</li>
            <li>Se o seu perfil for aprovado, agendaremos o diagnóstico detalhado.</li>
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
    await Promise.allSettled([
      transporter.sendMail(notificationMail),
      transporter.sendMail(confirmationMail),
      sendDiscordNotification(data, 'form')
    ]);

    return { success: true, message: "Solicitação recebida com sucesso! Verifique seu e-mail." };
  } catch (error) {
    console.error("Erro ao enviar e-mail via SMTP:", error);
    return { success: false, message: "Houve um erro técnico. Por favor, chame no WhatsApp." };
  }
}
