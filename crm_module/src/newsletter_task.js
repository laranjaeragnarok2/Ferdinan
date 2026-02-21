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
            <div style="margin-bottom: 24px; padding: 24px; border: 1px solid rgba(212, 175, 55, 0.15); border-left: 4px solid #D4AF37; background: rgba(255, 255, 255, 0.02); border-radius: 8px;">
                <h4 style="margin: 0 0 12px 0; color: #FFFFFF; font-size: 16px; font-weight: 500; font-family: 'Outfit', sans-serif;">${article.title}</h4>
                <p style="margin: 0 0 16px 0; font-size: 12px; color: rgba(255, 255, 255, 0.5); text-transform: uppercase; letter-spacing: 0.05em;">⏳ Publicado em: ${new Date(article.pubDate).toLocaleDateString('pt-BR')}</p>
                <a href="${article.link}" style="display: inline-block; font-size: 13px; color: #D4AF37; text-decoration: none; font-weight: bold; border-bottom: 1px solid rgba(212, 175, 55, 0.4); padding-bottom: 2px;">Ler Análise Completa →</a>
            </div>
        `).join('');
    } else {
        newsHtml = '<p style="color: rgba(255, 255, 255, 0.5); font-style: italic; padding: 20px; border: 1px dashed rgba(255,255,255,0.1); border-radius: 8px;">Nenhuma movimentação drástica de mercado nas últimas 24h. O panorama corporativo permanece estável.</p>';
    }

    return `
        <div style="background-color: #0A0A0A; padding: 40px 20px;">
            <div style="font-family: 'Inter', Helvetica, sans-serif; max-width: 600px; margin: auto; padding: 40px; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 16px; background-color: #0F0F11; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
                <div style="text-align: center; margin-bottom: 40px;">
                    <img src="https://ferdinan-msp.group/ferdinan-mascot.png" alt="Orquestrador Diamante" style="width: 70px; height: 70px; border-radius: 50%; border: 2px solid #D4AF37; box-shadow: 0 0 15px rgba(212, 175, 55, 0.5); margin-bottom: 20px;" />
                    <h1 style="color: #D4AF37; margin: 0; font-size: 28px; font-family: 'Outfit', sans-serif; letter-spacing: 1.5px; text-transform: uppercase; font-weight: 300;">Ferdinan <span style="font-weight: 700;">Group</span></h1>
                    <div style="width: 40px; height: 1px; background: rgba(212, 175, 55, 0.5); margin: 15px auto;"></div>
                    <p style="color: rgba(255, 255, 255, 0.5); font-size: 11px; letter-spacing: 3px; text-transform: uppercase; margin-top: 5px;">Sovereign OS • Market Intelligence</p>
                </div>
                
                <p style="color: rgba(255, 255, 255, 0.9); font-size: 16px; line-height: 1.6;">Olá, <strong style="color: #FFFFFF;">Amigo Empresário</strong>,</p>
                <p style="color: rgba(255, 255, 255, 0.7); font-size: 15px; line-height: 1.7;">O Orquestrador Diamante interceptou movimentações estratégicas e de compliance que impactam profundamente o cenário corporativo hoje.</p>
                
                <div style="margin: 40px 0;">
                    <h3 style="color: #FFFFFF; margin-bottom: 25px; border-bottom: 1px solid rgba(255, 255, 255, 0.1); padding-bottom: 15px; font-size: 16px; text-transform: uppercase; letter-spacing: 0.1em; display: flex; align-items: center;">
                        <span style="display: inline-block; width: 8px; height: 8px; background-color: #D4AF37; border-radius: 50%; margin-right: 10px; box-shadow: 0 0 10px rgba(212, 175, 55, 0.8);"></span>
                        Radar de Editais
                    </h3>
                    ${newsHtml}
                </div>

                <div style="background: linear-gradient(145deg, rgba(212, 175, 55, 0.05), rgba(212, 175, 55, 0.1)); border: 1px solid rgba(212, 175, 55, 0.2); padding: 30px; border-radius: 12px; margin-top: 50px; text-align: center;">
                    <h4 style="margin: 0 0 15px 0; color: #FFFFFF; font-size: 18px; font-family: 'Outfit', sans-serif;">Transforme Risco em Vitória.</h4>
                    <p style="margin: 0 0 25px 0; font-size: 14px; color: rgba(255, 255, 255, 0.6); line-height: 1.6;">Precisa de estruturação jurídica e financeira para dominar editais complexos? Nossa arquitetura proprietária está pronta.</p>
                    <a href="https://www.ferdinan-msp.group" style="display: inline-block; background-color: #D4AF37; color: #0A0A0A; padding: 14px 30px; border-radius: 4px; text-decoration: none; font-weight: 700; font-size: 13px; text-transform: uppercase; letter-spacing: 1px; transition: all 0.3s ease;">Acionar Orquestrador</a>
                </div>

                <p style="font-size: 11px; text-align: center; color: rgba(255, 255, 255, 0.3); margin-top: 50px; border-top: 1px solid rgba(255, 255, 255, 0.05); padding-top: 25px; line-height: 1.6;">
                    Briefing Executivo Confidencial.<br>
                    Ferdinan Group - Todos os direitos reservados.
                </p>
            </div>
        </div>
    `;
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
