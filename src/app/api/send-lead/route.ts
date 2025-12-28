import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
    try {
        const { email } = await req.json();

        if (!email) {
            return NextResponse.json({ error: 'Email is required' }, { status: 400 });
        }

        const transporter = nodemailer.createTransport({
            host: 'smtp.hostinger.com',
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        const mailOptions = {
            from: `"Ferdinan-MSP" <${process.env.SMTP_USER}>`,
            to: email,
            subject: '🛠️ Sua Curadoria de Alta Performance (Livros + Ferramentas)',
            html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #333; line-height: 1.6;">
          <h2 style="color: #ea580c;">Domine o Caos Estratégico</h2>
          <p>Olá,</p>
          <p>Diferente da maioria dos gestores que tenta "resolver tudo no braço", você deu o primeiro passo para institucionalizar a eficiência no seu negócio.</p>
          <p>Conforme prometido, aqui estão os ativos que selecionamos para economizar o seu recurso mais escasso: <strong>tempo</strong>.</p>
          
          <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
          
          <h3 style="color: #ea580c;">📚 1. Os 3 Livros que mudam o "Jogo"</h3>
          <ul>
            <li><strong>Hacking Growth (Sean Ellis):</strong> Para você parar de ver o marketing como gasto e começar a ver como um processo científico de experimentação.</li>
            <li><strong>Estratégia do Oceano Azul:</strong> O guia definitivo para você parar de brigar por preço em mercados saturados e criar seu próprio espaço de lucro.</li>
            <li><strong>Princípios (Ray Dalio):</strong> Como criar uma cultura de gestão baseada em lógica e meritocracia, eliminando o achismo operacional.</li>
          </ul>

          <h3 style="color: #ea580c;">🤖 2. As 2 Ferramentas de IA para Escalar</h3>
          <ul>
            <li><strong>Perplexity AI:</strong> Esqueça as buscas lentas no Google. Use para pesquisas de mercado em tempo real com fontes citadas. Economia de 5h/semana em coleta de dados.</li>
            <li><strong>Claude 3.5 Sonnet:</strong> A IA mais refinada para redação estratégica e análise de documentos complexos. Use para revisar contratos ou criar teses de vendas.</li>
          </ul>

          <h3 style="color: #ea580c;">📺 3. Visão Estratégica (YouTube)</h3>
          <ul>
            <li><strong><a href="https://www.youtube.com/watch?v=PHe0bXAIuk0" style="color: #333; text-decoration: underline;">Como a Máquina Econômica Funciona (Ray Dalio)</a>:</strong> 30 minutos que ensinam mais sobre ciclos de mercado do que 4 anos de faculdade. Obrigatório para previsibilidade.</li>
            <li><strong><a href="https://www.youtube.com/watch?v=nO8YJbd4UeE" style="color: #333; text-decoration: underline;">Alex Hormozi - $100M Offers (Resumo Prático)</a>:</strong> Como criar ofertas tão boas que seus clientes se sentiriam estúpidos em dizer não. A base da nossa consultoria de vendas.</li>
          </ul>

          <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />

          <h3 style="color: #333;">💡 O Próximo Passo Estratégico</h3>
          <p>Ter as ferramentas certas é 20% do caminho. Os outros 80% são a <strong>implementação cirúrgica</strong> delas no seu modelo de negócio.</p>
          <p>Muitas empresas compram livros e assinaturas de IA, mas continuam com o lucro vazando por falhas operacionais básicas.</p>
          <p>Se você quer pular a etapa da tentativa e erro e ir direto para o <strong>ROI</strong>, eu reservei um slot na minha agenda para uma <strong>Análise Estratégica de Gargalos</strong>.</p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="https://www.ferdinan-msp.group/#contact" style="background-color: #ea580c; color: white; padding: 15px 25px; text-decoration: none; border-radius: 8px; font-weight: bold;">AGENDAR MINHA ANÁLISE ESTRATÉGICA</a>
          </div>

          <p>Sucesso e alta performance,<br>
          <strong>Ferdinan</strong><br>
          <span style="font-size: 12px; color: #666;">Growth & Gestão | Ferdinan-MSP</span></p>
        </div>
      `,
        };

        await transporter.sendMail(mailOptions);

        // Também enviar um email de notificação para você (opcional mas recomendado)
        const notificationOptions = {
            from: `"Sistema Ferdinan-MSP" <${process.env.SMTP_USER}>`,
            to: process.env.SMTP_USER,
            subject: '🔥 Novo Lead Capturado!',
            text: `Um novo lead deixou o email para a curadoria: ${email}`,
        };
        await transporter.sendMail(notificationOptions);

        return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });
    } catch (error) {
        console.error('Email sending error:', error);
        return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
    }
}
