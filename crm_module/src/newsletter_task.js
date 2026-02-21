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
    port: parseInt(process.env.SMTP_PORT || '465'),
    secure: process.env.SMTP_PORT === '465',
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

const parser = new Parser();

// Keywords to search on Google News (in Portuguese for the BR Market)
const NEWS_QUERIES = [
    'Licitações Tecnologia Brasil',
    'Compliance Corporativo TCU',
];

async function fetchTrendingNews() {
    let articles = [];
    console.log("🔍 [OpenClaw Intelligence] Varrendo a web por editais e regulações...");

    for (const query of NEWS_QUERIES) {
        try {
            const feed = await parser.parseURL(`https://news.google.com/rss/search?q=${encodeURIComponent(query)}&hl=pt-BR&gl=BR&ceid=BR:pt-419`);
            // Get the top 2 articles from each query
            const topItems = feed.items.slice(0, 2);
            for (const item of topItems) {
                articles.push({
                    title: item.title,
                    link: item.link,
                    pubDate: item.pubDate,
                    source: item.source || 'Portal de Notícias'
                });
            }
        } catch (error) {
            console.error(`❌ Erro ao buscar RSS para '${query}':`, error.message);
        }
    }

    return articles;
}

function buildHtmlTemplate(leadName, newsArticles) {
    let newsHtml = '';

    if (newsArticles.length > 0) {
        newsHtml = newsArticles.map(article => `
            <div style="margin-bottom: 20px; padding: 15px; border-left: 4px solid #10b981; background: #f8fafc; border-radius: 4px;">
                <h4 style="margin: 0 0 8px 0; color: #1e293b; font-size: 15px;">${article.title}</h4>
                <p style="margin: 0 0 10px 0; font-size: 13px; color: #64748b;">⏳ Publicado em: ${new Date(article.pubDate).toLocaleDateString('pt-BR')}</p>
                <a href="${article.link}" style="display: inline-block; font-size: 13px; color: #d4af37; text-decoration: none; font-weight: bold;">[ Ler Análise Completa ]</a>
            </div>
        `).join('');
    } else {
        newsHtml = '<p style="color: #64748b; font-style: italic;">Nenhuma movimentação drástica de mercado nas últimas 24h. O panorama de licitações permanece estável.</p>';
    }

    return `
        <div style="font-family: 'Inter', Helvetica, sans-serif; max-width: 650px; margin: auto; padding: 30px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff; box-shadow: 0 4px 6px rgba(0,0,0,0.02);">
            <div style="text-align: center; margin-bottom: 30px;">
                <h1 style="color: #d4af37; margin: 0; font-size: 24px; letter-spacing: 1px; text-transform: uppercase;">Ferdinan Group</h1>
                <p style="color: #64748b; font-size: 12px; letter-spacing: 2px; text-transform: uppercase; margin-top: 5px;">Sovereign OS • Market Intelligence</p>
            </div>
            
            <p style="color: #334155; font-size: 16px; line-height: 1.6;">Prezado(a) <strong style="color: #0f172a;">${leadName}</strong>,</p>
            <p style="color: #334155; font-size: 16px; line-height: 1.6;">O Orquestrador Diamante interceptou as seguintes movimentações estratégicas e de compliance que podem impactar seus resultados nas próximas licitações e contratos corporativos.</p>
            
            <div style="margin: 30px 0;">
                <h3 style="color: #0f172a; margin-bottom: 20px; border-bottom: 1px solid #e2e8f0; padding-bottom: 10px; font-size: 18px;">📡 Radar de Editais e Compliance (Zero Touch)</h3>
                ${newsHtml}
            </div>

            <div style="background: linear-gradient(145deg, #0f172a, #1e293b); color: #ffffff; padding: 25px; border-radius: 8px; margin-top: 40px; text-align: center;">
                <h4 style="margin: 0 0 15px 0; color: #d4af37; font-size: 18px;">Transforme Risco em Vitória.</h4>
                <p style="margin: 0 0 20px 0; font-size: 14px; opacity: 0.9;">Precisa de estruturação financeira e análise técnica para algum destes editais?</p>
                <a href="https://www.ferdinan-msp.group" style="display: inline-block; background-color: #d4af37; color: #0f172a; padding: 12px 25px; border-radius: 6px; text-decoration: none; font-weight: bold; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Acionar Orquestrador</a>
            </div>

            <p style="font-size: 11px; text-align: center; color: #94a3b8; margin-top: 40px; border-top: 1px solid #f1f5f9; padding-top: 20px;">
                Gerado, curado e distribuído autonomamente via <strong style="color: #64748b;">OpenClaw AI 2026</strong>.<br>
                Ferdinan Group - Todos os direitos reservados.
            </p>
        </div>
    `;
}

async function runNewsletterEngine() {
    console.log("🚀 [OpenClaw] Acordando Orquestrador Diamante (Zero-Touch)...");

    // 1. Fetch News Automatically
    const articles = await fetchTrendingNews();
    if (articles.length > 0) {
        console.log(`✅ [Intelligence] Foram interceptadas ${articles.length} notícias de alto impacto.`);
    }

    // 2. Fetch Leads
    db.all("SELECT name, email FROM contacts WHERE status != 'Lost'", async (err, rows) => {
        if (err) {
            console.error("❌ [OpenClaw Error] Falha ao ler banco de dados do CRM:", err);
            return;
        }

        if (!rows || rows.length === 0) {
            console.log("⚠️ Nenhum lead corporativo com 'Status Ativo' encontrado na base.");
            return;
        }

        console.log(`📧 Processando disparo inteligente para ${rows.length} CEOs e Diretores...`);

        // 3. Dispatch Emails
        for (const lead of rows) {
            const htmlContent = buildHtmlTemplate(lead.name, articles);

            const mailOptions = {
                from: process.env.SMTP_FROM || `"Ferdinan Intelligence" <${process.env.SMTP_USER}>`,
                to: lead.email,
                subject: `📡 Radar de Compliance e Licitações de TI - Briefing para ${lead.name}`,
                text: `Prezado(a) ${lead.name},\n\nAcesse o briefing de inteligência com as últimas movimentações em Licitações de TI e Compliance do Mercado.`,
                html: htmlContent
            };

            try {
                await transporter.sendMail(mailOptions);
                console.log(`✅ [Enviado] Briefing Estratégico entregue na mesa do CEO: ${lead.email}`);
            } catch (sendErr) {
                console.error(`❌ [Erro] Falha ao enviar para ${lead.email}:`, sendErr.message);
            }

            // Wait 3s between sends to avoid rate limiting
            await new Promise(r => setTimeout(r, 3000));
        }

        console.log("🏁 [OpenClaw] Operação Zero-Touch Concluída. Desligando motores até a próxima sprint.");
    });
}

runNewsletterEngine();
