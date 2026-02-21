import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '..', '..', '.env.local') });
dotenv.config(); // Fallback for local .env if .env.local doesn't exist or is incomplete

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.hostinger.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_PORT === '465',
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

/**
 * Envia notificação de novo lead via Email e Discord
 */
export async function sendLeadNotifications(lead) {
    const { name, email, company, notes } = lead;

    // 1. Notificação por Email
    const mailOptions = {
        from: process.env.SMTP_FROM || `"OpenClaw CRM" <${process.env.SMTP_USER}>`,
        to: process.env.SMTP_USER, // Envia para o próprio dono do CRM
        subject: `🔥 Novo Lead no CRM: ${name}`,
        html: `
            <h2>Novo Lead Capturado</h2>
            <p><strong>Nome:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Empresa:</strong> ${company || 'N/A'}</p>
            <p><strong>Notas:</strong> ${notes || 'N/A'}</p>
            <hr>
            <p>Enviado via OpenClaw CRM Local Server</p>
        `,
    };

    // 2. Notificação por Discord
    const discordPayload = {
        content: '🔥 **Novo lead capturado no CRM!**',
        embeds: [{
            title: '👤 Novo Lead',
            color: 0x6366f1, // Blue/Indigo
            fields: [
                { name: 'Nome', value: name, inline: true },
                { name: 'Email', value: email, inline: true },
                { name: 'Empresa', value: company || 'N/A', inline: false },
                { name: 'Notas', value: notes || 'N/A', inline: false }
            ],
            timestamp: new Date().toISOString()
        }]
    };

    try {
        const promises = [];

        if (process.env.SMTP_USER && process.env.SMTP_PASS) {
            promises.push(transporter.sendMail(mailOptions));
        }

        if (process.env.DISCORD_WEBHOOK_URL) {
            promises.push(fetch(process.env.DISCORD_WEBHOOK_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(discordPayload)
            }));
        }

        await Promise.allSettled(promises);
        console.log(`✅ Notificações enviadas para o lead: ${name}`);
    } catch (err) {
        console.error('❌ Erro ao enviar notificações:', err.message);
    }
}
