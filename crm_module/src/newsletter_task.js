import Parser from 'rss-parser';
import { db } from './db.js';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '..', '..', '.env.local') });

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.hostinger.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_PORT === '465',
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

const parser = new Parser();

// Keywords to search on Google News
const NEWS_QUERIES = [
    'Licitações Tecnologia Brasil',
    'Compliance Corporativo TCU',
];

async function fetchTrendingNews() {
    let articles = [];
    let seenTitles = new Set();
    console.log("🔍 [OpenClaw Intelligence] Varrendo a web por editais e regulações...");

    for (const query of NEWS_QUERIES) {
        try {
            const feed = await parser.parseURL(`https://news.google.com/rss/search?q=${encodeURIComponent(query)}&hl=pt-BR&gl=BR&ceid=BR:pt-419`);
            for (const item of feed.items) {
                const searchTitle = item.title.trim().toLowerCase();
                if (!seenTitles.has(searchTitle)) {
                    seenTitles.add(searchTitle);
                    articles.push({
                        title: item.title,
                        link: item.link,
                        pubDate: item.pubDate,
                        source: item.source || 'Portal de Notícias'
                    });
                }
                if (articles.length >= 4) break;
            }
        } catch (error) {
            console.error(`❌ Erro ao buscar RSS para '${query}':`, error.message);
        }
    }

    return articles.slice(0, 3);
}

function buildHtmlTemplate(newsArticles) {
    let newsHtml = '';

    if (newsArticles.length > 0) {
        newsHtml = newsArticles.map(article => `
            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 24px;">
                <tr>
                    <td style="padding: 24px; border: 1px solid #333333; border-left: 4px solid #D4AF37; background-color: #1A1A1A; border-radius: 8px;">
                        <h4 style="margin: 0 0 12px 0; color: #FFFFFF; font-size: 16px; font-weight: 500; font-family: Helvetica, Arial, sans-serif;">${article.title}</h4>
                        <p style="margin: 0 0 16px 0; font-size: 12px; color: #888888; text-transform: uppercase; letter-spacing: 0.05em; font-family: Helvetica, Arial, sans-serif;">⏳ Publicado em: ${new Date(article.pubDate).toLocaleDateString('pt-BR')}</p>
                        <a href="${article.link}" style="display: inline-block; font-size: 13px; color: #D4AF37; text-decoration: none; font-weight: bold; border-bottom: 1px solid #D4AF37; padding-bottom: 2px; font-family: Helvetica, Arial, sans-serif;">Ler Análise Completa &rarr;</a>
                    </td>
                </tr>
            </table>
        `).join('');
    } else {
        newsHtml = '<p style="color: #888888; font-style: italic; padding: 20px; border: 1px dashed #333333; border-radius: 8px; font-family: Helvetica, Arial, sans-serif;">Nenhuma movimentação drástica de mercado nas últimas 24h. O panorama corporativo permanece estável.</p>';
    }

    return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ferdinan Group - Market Intelligence</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0A0A0A; font-family: Helvetica, Arial, sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #0A0A0A; padding: 40px 10px;">
        <tr>
            <td align="center">
                <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 600px; padding: 40px; border: 1px solid #222222; border-radius: 16px; background-color: #0F0F11;">
                    <tr>
                        <td align="center" style="padding-bottom: 40px;">
                            <img src="https://ferdinan-msp.group/ferdinan-mascot.png" alt="Orquestrador Diamante" width="80" height="80" style="display: block; border-radius: 50%; border: 2px solid #D4AF37; margin-bottom: 20px;" />
                            <h1 style="color: #D4AF37; margin: 0; font-size: 28px; letter-spacing: 1.5px; text-transform: uppercase; font-weight: 300;">Ferdinan <span style="font-weight: 700;">Group</span></h1>
                            <div style="width: 40px; height: 1px; background-color: #D4AF37; margin: 15px auto;"></div>
                            <p style="color: #888888; font-size: 11px; letter-spacing: 3px; text-transform: uppercase; margin-top: 5px;">Sovereign OS &bull; Market Intelligence</p>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding-bottom: 40px;">
                            <p style="color: #DDDDDD; font-size: 16px; line-height: 1.6; margin: 0 0 15px 0;">Olá, <strong style="color: #FFFFFF;">Amigo Empresário</strong>,</p>
                            <p style="color: #BBBBBB; font-size: 15px; line-height: 1.7; margin: 0;">O Orquestrador Diamante interceptou movimentações estratégicas e de compliance que impactam profundamente o cenário corporativo hoje.</p>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding-bottom: 40px;">
                            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-bottom: 1px solid #222222; margin-bottom: 25px;">
                                <tr>
                                    <td style="padding-bottom: 15px;">
                                        <h3 style="color: #FFFFFF; font-size: 16px; text-transform: uppercase; letter-spacing: 0.1em; margin: 0;">
                                            <span style="color: #D4AF37;">&#9679;</span> Radar de Editais
                                        </h3>
                                    </td>
                                </tr>
                            </table>
                            ${newsHtml}
                        </td>
                    </tr>
                    <tr>
                        <td align="center">
                            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #1A1A1A; border: 1px solid #333333; border-radius: 12px;">
                                <tr>
                                    <td align="center" style="padding: 30px;">
                                        <h4 style="margin: 0 0 15px 0; color: #FFFFFF; font-size: 18px;">Transforme Risco em Vitória.</h4>
                                        <p style="margin: 0 0 25px 0; font-size: 14px; color: #BBBBBB; line-height: 1.6;">Precisa de estruturação jurídica e financeira para dominar editais complexos? Nossa arquitetura proprietária está pronta.</p>
                                        <a href="https://www.ferdinan-msp.group" style="display: inline-block; background-color: #D4AF37; color: #0A0A0A; padding: 14px 30px; border-radius: 4px; text-decoration: none; font-weight: 700; font-size: 13px; text-transform: uppercase; letter-spacing: 1px;">Acionar Orquestrador</a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td align="center" style="padding-top: 50px;">
                            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-top: 1px solid #222222;">
                                <tr>
                                    <td align="center" style="padding-top: 30px;">
                                        <p style="font-size: 11px; color: #666666; line-height: 1.6; margin: 0;">
                                            Briefing Executivo Confidencial.<br>
                                            Ferdinan Group - Todos os direitos reservados.
                                        </p>
                                        <img src="https://ferdinan-msp.group/favicon-32x32.png" alt="Logo Ferdinan" width="32" height="32" style="display: block; margin-top: 15px; opacity: 0.5;" />
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>`;
}

async function runNewsletterEngine() {
    console.log("🚀 [OpenClaw] Acordando Orquestrador Diamante (Zero-Touch)...");

    const articles = await fetchTrendingNews();
    if (articles.length > 0) {
        console.log(`✅ [Intelligence] Foram interceptadas ${articles.length} notícias de alto impacto.`);
    }

    db.all("SELECT name, email FROM contacts WHERE status != 'Lost'", async (err, rows) => {
        if (err) {
            console.error("❌ [OpenClaw Error] Falha ao ler banco de dados do CRM:", err);
            process.exit(1);
        }

        if (!rows || rows.length === 0) {
            console.log("⚠️ Nenhum lead corporativo com 'Status Ativo' encontrado na base.");
            process.exit(0);
        }

        console.log(`📧 Processando disparo inteligente para ${rows.length} CEOs e Diretores...`);

        for (const lead of rows) {
            const htmlContent = buildHtmlTemplate(articles);

            const mailOptions = {
                from: process.env.SMTP_FROM || `"Ferdinan Intelligence" <${process.env.SMTP_USER}>`,
                to: lead.email,
                subject: `📡 Radar de Compliance e Licitações de TI - Briefing da Semana`,
                text: `Olá Amigo Empresário,\n\nAcesse o briefing de inteligência com as últimas movimentações em Licitações de TI e Compliance do Mercado.`,
                html: htmlContent
            };

            try {
                await transporter.sendMail(mailOptions);
                console.log(`✅ [Enviado] Briefing Estratégico entregue na mesa do CEO: ${lead.email}`);
            } catch (sendErr) {
                console.error(`❌ [Erro] Falha ao enviar para ${lead.email}:`, sendErr.message);
            }

            await new Promise(r => setTimeout(r, 3000));
        }

        console.log("🏁 [OpenClaw] Operação Zero-Touch Concluída. Desligando motores até a próxima sprint.");
        process.exit(0);
    });
}

runNewsletterEngine();
