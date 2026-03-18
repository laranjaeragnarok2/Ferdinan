# 🚀 Ferdinan-MSP — Plataforma de Growth, Automação & CRM

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-16.1-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19-61dafb?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=for-the-badge&logo=tailwind-css)
![Firebase](https://img.shields.io/badge/Firebase-11.10-orange?style=for-the-badge&logo=firebase)
![Genkit](https://img.shields.io/badge/Genkit_AI-1.20-purple?style=for-the-badge&logo=google)
![SQLite](https://img.shields.io/badge/SQLite-CRM-003B57?style=for-the-badge&logo=sqlite)
![PWA](https://img.shields.io/badge/PWA-Ready-5A0FC8?style=for-the-badge&logo=pwa)

**Consultoria especializada em estratégias de crescimento personalizadas para negócios de alto valor.**
**"Soberania & Domínio Digital" — Metodologia para Resultados Reais.**

[🌐 Site](https://ferdinan-msp.group) • [📝 Blog](https://ferdinan-msp.group/blog) • [🤖 Automação](https://ferdinan-msp.group/automacao) • [👨‍💼 Admin](https://ferdinan-msp.group/admin)

</div>

---

## 📋 Índice

- [Sobre o Projeto](#-sobre-o-projeto)
- [Funcionalidades](#-funcionalidades)
- [Arquitetura](#-arquitetura)
- [Tecnologias](#️-tecnologias)
- [Instalação](#-instalação)
- [Configuração](#️-configuração)
- [Uso](#-uso)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Módulos](#-módulos)
- [Painel Administrativo](#-painel-administrativo)
- [Internacionalização](#-internacionalização)
- [Deploy](#-deploy)
- [Segurança](#-segurança)
- [Licença](#-licença)

---

## 🎯 Sobre o Projeto

A **Ferdinan-MSP** é uma plataforma full-stack que integra marketing, automação e CRM local-first em um único ecossistema. Projetada para consultorias B2B de alto valor, ela combina:

- 🌐 **Landing Page de Alta Conversão** — Design premium escuro com animações Framer Motion
- 📝 **Blog Profissional** — Editor TipTap, conteúdo MDX e sistema de posts completo
- 🤖 **Motor de Automação com IA** — Agentes inteligentes via Google Genkit para growth
- 📊 **CRM Local-first (OpenClaw)** — Pipeline de deals, leads e follow-ups com SQLite
- 📧 **Lead Magnets & Newsletter** — Captura, nutrição e automação de email
- 🔐 **Painel Administrativo** — Gerenciamento de conteúdo, propostas e estatísticas
- 🌍 **Internacionalização** — Suporte a 4 idiomas (PT-BR, EN, ES, ZH)
- 📱 **PWA Ready** — Progressive Web App com manifesto configurado

---

## ✨ Funcionalidades

### 🌐 Landing Page
- ✅ Design premium com tema escuro e paleta Gold + Dark Blue
- ✅ Animações fluidas com Framer Motion
- ✅ Seções modulares: Hero, Agentes IA, Automação CTA, Prova Social, FAQ, News Feed, Blog Posts
- ✅ Formulário de captura de leads integrado com Discord e Email
- ✅ SEO otimizado com sitemap dinâmico, robots.txt e meta tags
- ✅ Totalmente responsivo e Mobile-first

### 📝 Sistema de Blog
- ✅ **Editor Rico TipTap** com formatação avançada (negrito, itálico, títulos, listas, citações, código, imagens, links)
- ✅ Suporte a conteúdo **MDX** para posts estáticos
- ✅ Sistema de tags, categorias e busca
- ✅ Rascunhos e publicação
- ✅ Upload de imagens via Firebase Storage
- ✅ Preview em tempo real e contador de palavras

### 🤖 Automação & IA
- ✅ **Google Genkit** com fluxos de IA (Concierge Flow)
- ✅ Geração e qualificação inteligente de leads (ICP-based)
- ✅ Outreach multicanal automatizado (LinkedIn + Email)
- ✅ Sistema de newsletter automatizada
- ✅ Lead magnets com formulários integrados ao CRM

### 📊 CRM — OpenClaw
- ✅ **CRM local-first** com SQLite — sem dependências externas
- ✅ Gestão de contatos, deals, atividades, follow-ups e tags
- ✅ Pipeline configurável (prospect → qualified → proposal → negotiation → closed-won)
- ✅ CLI completa para operação e relatórios
- ✅ Interchange em `.md` para integração com agentes IA
- ✅ Backup e restore do banco de dados
- ✅ Endpoint API integrado (`/api/openclaw-crm-submit`)

### 🔐 Painel Administrativo
- ✅ Autenticação segura com NextAuth + Google OAuth
- ✅ Proteção de rotas com middleware (edge + server-side)
- ✅ Dashboard com estatísticas de posts
- ✅ Gerenciamento completo de posts (CRUD)
- ✅ Geração de propostas comerciais (com export PDF via jsPDF)
- ✅ Interface moderna com ShadCN/UI

### 🎨 Design System
- ✅ Componentes reutilizáveis ShadCN/UI (40+ componentes)
- ✅ Paleta de cores personalizada (Gold + Dark Blue)
- ✅ Carrosséis com Embla Carousel
- ✅ Tipografia otimizada e modo escuro nativo

### 🌍 Páginas Especiais
- ✅ `/automacao` — Showcase de automações e serviços de IA
- ✅ `/blueprint-elite-digital` — Lead magnet premium
- ✅ `/lead-magnet-blueprint` — Página de captura com formulário
- ✅ `/soberania` — Página institucional sobre a metodologia
- ✅ `/ia` — Página dedicada a soluções de Inteligência Artificial
- ✅ `/llms.txt` — Arquivo de contexto para LLMs/IA

---

## 🏗 Arquitetura

```
┌────────────────────────────────────────────────────────────────┐
│                     Ferdinan-MSP Platform                      │
├──────────────┬──────────────┬──────────────┬──────────────────-─┤
│  Landing     │  Blog +      │  Admin       │  Automação &      │
│  Page        │  Content     │  Panel       │  Lead Magnets     │
│  (React/SSR) │  (MDX/TipTap)│  (Protected) │  (Genkit AI)      │
├──────────────┴──────────────┴──────────────┴───────────────────-┤
│                    Next.js 16 App Router                        │
│                    (Turbopack · TypeScript)                     │
├────────────────────────┬───────────────────────────────────────-┤
│  Firebase              │  OpenClaw CRM (SQLite)                 │
│  Firestore + Storage   │  Leads · Deals · Follow-ups ·Pipeline │
├────────────────────────┴───────────────────────────────────────-┤
│  Integrações: Discord Webhooks · SMTP · Google OAuth · Genkit  │
└────────────────────────────────────────────────────────────────-┘
```

---

## 🛠️ Tecnologias

### Core
| Tecnologia | Versão | Descrição |
|---|---|---|
| [Next.js](https://nextjs.org/) | 16.1 | Framework React com App Router + Turbopack |
| [React](https://react.dev/) | 19 | Biblioteca UI com Server Components |
| [TypeScript](https://www.typescriptlang.org/) | 5.x | Tipagem estática |

### Frontend & Estilização
| Tecnologia | Descrição |
|---|---|
| [Tailwind CSS](https://tailwindcss.com/) | Framework CSS utility-first |
| [ShadCN/UI](https://ui.shadcn.com/) | 40+ componentes UI acessíveis |
| [Framer Motion](https://www.framer.com/motion/) | Animações fluidas |
| [Embla Carousel](https://www.embla-carousel.com/) | Carrosséis performáticos |
| [Lucide React](https://lucide.dev/) | Ícones modernos |
| [Recharts](https://recharts.org/) | Gráficos e visualizações de dados |

### Editor & Conteúdo
| Tecnologia | Descrição |
|---|---|
| [TipTap](https://tiptap.dev/) | Editor WYSIWYG rico |
| [MDX](https://mdxjs.com/) | Conteúdo Markdown + JSX |
| [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) | Formulários com validação de schema |

### IA & Automação
| Tecnologia | Descrição |
|---|---|
| [Google Genkit](https://firebase.google.com/products/genkit) | Framework de IA do Google (Gemini) |
| [RSS Parser](https://github.com/rbren/rss-parser) | Agregação de conteúdo externo |

### Backend & Dados
| Tecnologia | Descrição |
|---|---|
| [Firebase](https://firebase.google.com/) | Firestore (NoSQL) + Storage (arquivos) |
| [SQLite](https://www.sqlite.org/) (better-sqlite3) | Banco de dados local para o CRM |
| [NextAuth.js](https://next-auth.js.org/) | Autenticação (Google OAuth) |
| [Nodemailer](https://nodemailer.com/) | Envio de emails transacionais e newsletters |

### Utilidades
| Tecnologia | Descrição |
|---|---|
| [jsPDF](https://github.com/parallax/jsPDF) + [html2canvas](https://html2canvas.hertzen.com/) | Geração de PDFs (propostas) |
| [Date-fns](https://date-fns.org/) | Manipulação de datas |
| [Gray Matter](https://github.com/jonschlinkert/gray-matter) | Parser de frontmatter YAML |
| [Vercel Speed Insights](https://vercel.com/docs/speed-insights) | Monitoramento de performance |

---

## 📦 Instalação

### Pré-requisitos

- **Node.js** 18.x ou superior
- **npm** 9+
- Conta no **Firebase** (Firestore + Storage)
- Conta no **Google Cloud** (para OAuth)

### Passos

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/seu-usuario/ferdinan-msp.git
   cd ferdinan-msp
   ```

2. **Instale as dependências do projeto principal:**
   ```bash
   npm install
   ```

3. **Instale as dependências do módulo CRM:**
   ```bash
   cd crm_module && npm install && cd ..
   ```

4. **Instale as dependências do módulo Blog:**
   ```bash
   cd blog_module && npm install && cd ..
   ```

5. **Configure as variáveis de ambiente:**

   Crie um arquivo `.env.local` na raiz do projeto:

   ```env
   # ── NextAuth ──────────────────────────────────
   NEXTAUTH_URL=http://localhost:9002
   NEXTAUTH_SECRET=sua-chave-secreta-aqui
   AUTH_TRUST_HOST=true

   # ── Google OAuth ──────────────────────────────
   GOOGLE_CLIENT_ID=seu-google-client-id
   GOOGLE_CLIENT_SECRET=seu-google-client-secret

   # ── Admin ─────────────────────────────────────
   ADMIN_EMAIL=seu-email@gmail.com

   # ── Firebase ──────────────────────────────────
   NEXT_PUBLIC_FIREBASE_API_KEY=sua-api-key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=seu-projeto.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=seu-projeto-id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=seu-projeto.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=seu-sender-id
   NEXT_PUBLIC_FIREBASE_APP_ID=seu-app-id

   # ── SMTP (Hostinger) ─────────────────────────
   SMTP_USER=contact@ferdinan-msp.group
   SMTP_PASS=sua-senha-smtp

   # ── Discord Webhook ──────────────────────────
   DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/ID/TOKEN
   ```

6. **Execute o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```

7. **Acesse no navegador:**
   ```
   http://localhost:9002
   ```

---

## ⚙️ Configuração

### 1. Firebase Setup

1. Crie um projeto no [Firebase Console](https://console.firebase.google.com/)
2. Ative **Firestore Database** (modo de produção)
3. Ative **Storage** para uploads de imagens
4. Copie as credenciais para o `.env.local`

### 2. Google OAuth Setup

1. Acesse [Google Cloud Console](https://console.cloud.google.com/)
2. Crie ou selecione um projeto
3. Vá em **APIs & Services** → **Credentials**
4. Crie **OAuth 2.0 Client ID**
5. Configure:
   - **Authorized JavaScript origins:** `http://localhost:9002`
   - **Authorized redirect URIs:** `http://localhost:9002/api/auth/callback/google`
6. Copie **Client ID** e **Client Secret** para o `.env.local`

### 3. SMTP Setup (Hostinger)

Configure as credenciais SMTP do Hostinger no `.env.local` para envio de emails transacionais e newsletters.

### 4. Discord Webhook

1. No Discord: **Configurações do Canal** → **Integrações** → **Webhooks**
2. Crie um novo webhook e copie a URL para o `.env.local`

### 5. Genkit AI (Opcional)

Para utilizar os fluxos de IA, inicie o servidor Genkit:

```bash
npm run genkit:dev
```

---

## 🎮 Uso

### Scripts Disponíveis

| Script | Descrição |
|---|---|
| `npm run dev` | Servidor de desenvolvimento (Turbopack, porta 9002) |
| `npm run build` | Build de produção |
| `npm start` | Servidor de produção |
| `npm run lint` | Executa ESLint |
| `npm run typecheck` | Verifica tipos TypeScript |
| `npm run genkit:dev` | Inicia servidor Genkit AI |
| `npm run genkit:watch` | Genkit AI com hot-reload |
| `npm run newsletter` | Executa tarefa de newsletter |

### CRM via CLI

```bash
cd crm_module

# Adicionar um contato
node src/cli.js lead add "Jane Smith" -c "Acme Corp" -e jane@acme.com

# Criar um deal
node src/cli.js deal add "Acme Enterprise License" -c <contact-id> -v 50000 --stage proposal

# Agendar follow-up
node src/cli.js followup add <deal-id> -d 2026-04-01 -n "Send revised proposal"

# Ver follow-ups pendentes
node src/cli.js followup due --days 7

# Relatório de pipeline
node src/cli.js report pipeline
```

### Acessar o Painel Admin

1. Acesse: `http://localhost:9002/admin/login`
2. Faça login com Google usando o email em `ADMIN_EMAIL`
3. Gerencie posts, propostas e conteúdo

---

## 📁 Estrutura do Projeto

```
ferdinan-msp/
├── src/
│   ├── app/                          # App Router (Next.js 16)
│   │   ├── [locale]/                 # Internacionalização (i18n)
│   │   ├── admin/                    # Painel administrativo
│   │   │   ├── (protected)/          # Rotas protegidas
│   │   │   │   ├── blog/             # Gerenciamento de posts
│   │   │   │   └── proposal/         # Geração de propostas
│   │   │   └── login/                # Página de login
│   │   ├── api/                      # API Routes
│   │   │   ├── auth/                 # NextAuth endpoints
│   │   │   ├── openclaw-crm-submit/  # Integração CRM
│   │   │   └── send-lead/            # Captura de leads
│   │   ├── automacao/                # Página de automação
│   │   ├── blog/                     # Blog público
│   │   ├── blueprint-elite-digital/  # Lead magnet premium
│   │   ├── ia/                       # Soluções de IA
│   │   ├── lead-magnet-blueprint/    # Página de captura
│   │   ├── llms.txt/                 # Contexto para LLMs
│   │   ├── soberania/                # Metodologia
│   │   ├── manifest.ts               # PWA manifest
│   │   ├── sitemap.ts                # Sitemap dinâmico
│   │   ├── robots.ts                 # robots.txt
│   │   ├── globals.css               # Estilos globais
│   │   ├── layout.tsx                # Layout raiz
│   │   └── page.tsx                  # Landing page
│   ├── ai/                           # Inteligência Artificial
│   │   ├── flows/                    # Fluxos Genkit
│   │   │   └── concierge-flow.ts     # Fluxo de concierge IA
│   │   ├── genkit.ts                 # Config Genkit
│   │   └── dev.ts                    # Dev server AI
│   ├── components/                   # Componentes React
│   │   ├── sections/                 # Seções da landing page
│   │   │   ├── AgentsSection.tsx
│   │   │   ├── AutomacaoCTASection.tsx
│   │   │   ├── HeroSection.tsx
│   │   │   ├── NewsFeedSection.tsx
│   │   │   ├── LatestPostSection.tsx
│   │   │   ├── FAQSection.tsx
│   │   │   ├── SocialProofSection.tsx
│   │   │   └── ...
│   │   ├── ui/                       # 40+ componentes ShadCN
│   │   ├── layout/                   # Header, Footer, Nav
│   │   ├── blog/                     # Componentes do blog
│   │   ├── forms/                    # Formulários
│   │   ├── concierge/                # Concierge IA
│   │   └── RichTextEditor.tsx        # Editor TipTap
│   ├── content/                      # Conteúdo estático
│   │   └── blog/                     # Posts MDX
│   ├── hooks/                        # Custom hooks
│   ├── lib/                          # Utilitários e configs
│   │   ├── auth.ts                   # NextAuth config
│   │   ├── firebase.ts               # Firebase config
│   │   ├── firestore.ts              # Funções Firestore
│   │   ├── mdx.ts                    # Parser MDX
│   │   ├── storage.ts                # Firebase Storage
│   │   ├── audit.ts                  # Auditoria
│   │   └── proposal-store.ts         # Store de propostas
│   ├── messages/                     # i18n
│   │   ├── pt-BR.json
│   │   ├── en.json
│   │   ├── es.json
│   │   └── zh.json
│   ├── types/                        # Tipos TypeScript
│   └── utils/                        # Funções utilitárias
├── crm_module/                       # 📊 OpenClaw CRM
│   ├── src/                          # Código do CRM
│   │   ├── cli.js                    # CLI principal
│   │   ├── contacts.js               # Gestão de contatos
│   │   ├── deals.js                  # Pipeline de deals
│   │   ├── followups.js              # Follow-ups
│   │   ├── newsletter_task.js        # Automação de newsletter
│   │   ├── mailer.js                 # Envio de emails
│   │   ├── server.js                 # API server CRM
│   │   └── ...
│   ├── data/                         # Dados SQLite
│   ├── migrations/                   # Migrações do banco
│   └── test/                         # Testes
├── blog_module/                      # 📝 Módulo Blog auxiliar
├── scripts/                          # Scripts utilitários
├── public/                           # Arquivos estáticos e ícones PWA
├── middleware.ts                      # Middleware de autenticação
├── next.config.ts                    # Config Next.js
├── tailwind.config.ts                # Config Tailwind
├── vercel.json                       # Config Vercel
└── package.json                      # Dependências
```

---

## 📦 Módulos

### 📊 CRM — OpenClaw (`crm_module/`)

CRM local-first com SQLite, projetado para soberania total sobre os dados de leads e deals.

**Funcionalidades:**
- Gestão de contatos com busca full-text
- Pipeline de deals com estágios configuráveis
- Atividades e notas por deal
- Follow-ups com detecção de atrasos
- Tags flexíveis para categorização
- Relatórios de pipeline
- Interchange `.md` para integração com agentes IA
- Sistema de newsletter automatizada
- Backup e restore completo

> Documentação completa: [`crm_module/README.md`](crm_module/README.md)

### 🤖 IA — Genkit (`src/ai/`)

Fluxos de IA baseados em Google Genkit para automação inteligente:

- **Concierge Flow** — Atendimento inteligente com contexto do negócio
- Integração com modelos Google Gemini

### 📝 Blog Module (`blog_module/`)

Módulo auxiliar para processamento de conteúdo do blog.

---

## 🔐 Painel Administrativo

### Acesso

- **URL:** `/admin/login`
- **Autenticação:** Google OAuth via NextAuth.js
- **Autorização:** Email configurado em `ADMIN_EMAIL`

### Funcionalidades

#### Dashboard (`/admin`)
- Visualização geral e estatísticas
- Ações rápidas de gerenciamento

#### Blog (`/admin/blog`)
- CRUD completo de posts
- Editor Rico TipTap
- Upload de imagens via Firebase Storage
- Tags e categorias
- Publicação e rascunhos

#### Propostas (`/admin/proposal`)
- Geração de propostas comerciais
- Export para PDF (jsPDF + html2canvas)

---

## 🌍 Internacionalização

O projeto suporta **4 idiomas** com arquivos JSON de tradução:

| Idioma | Arquivo | Rota |
|---|---|---|
| 🇧🇷 Português (BR) | `pt-BR.json` | `/pt-BR/...` |
| 🇺🇸 Inglês | `en.json` | `/en/...` |
| 🇪🇸 Espanhol | `es.json` | `/es/...` |
| 🇨🇳 Chinês | `zh.json` | `/zh/...` |

As traduções cobrem todas as seções da landing page, navegação e conteúdo institucional.

---

## 🚀 Deploy

### Vercel (Recomendado)

1. **Conecte o repositório ao Vercel**

2. **Configure as variáveis de ambiente:**
   - Vá em **Settings** → **Environment Variables**
   - Adicione todas as variáveis do `.env.local`
   - **IMPORTANTE:** Altere `NEXTAUTH_URL` para seu domínio de produção

3. **Atualize o Google OAuth:**
   - Adicione seu domínio nas **Authorized redirect URIs**:
     ```
     https://ferdinan-msp.group/api/auth/callback/google
     ```

4. **Deploy:**
   ```bash
   git push origin main
   ```

### Variáveis de Ambiente de Produção

```env
NEXTAUTH_URL=https://ferdinan-msp.group
NEXTAUTH_SECRET=<secret-gerado>
# ... demais variáveis
```

---

## 🔒 Segurança

### Camadas de Proteção

1. **Middleware (Edge)** — Proteção de rotas no edge runtime
2. **Server-Side Layout** — Validação no servidor
3. **API Routes** — Autenticação em cada endpoint
4. **CRM Local-first** — Dados armazenados localmente, sem exposição externa

### Boas Práticas

- ✅ Variáveis sensíveis em `.env.local` (nunca commitadas)
- ✅ Validação de email de admin em múltiplas camadas
- ✅ Tokens JWT seguros com NextAuth
- ✅ CORS configurado corretamente
- ✅ Firebase Security Rules aplicadas
- ✅ Server Actions com limite de body size (20MB)
- ✅ Auditoria de ações administrativas (`lib/audit.ts`)

---

## 📝 Changelog

Veja o histórico completo de mudanças em [`CHANGELOG.md`](CHANGELOG.md).

---

## 🤝 Contribuindo

Este é um projeto privado. Para contribuições, entre em contato com o proprietário.

---

## 📄 Licença

Este projeto é de **propriedade privada**. Todos os direitos reservados © 2025-2026 Ferdinan-MSP.

---

## 📞 Suporte

Para dúvidas ou suporte:

- 📧 Email: contact@ferdinan-msp.group
- 🌐 Website: [ferdinan-msp.group](https://ferdinan-msp.group)

---

<div align="center">

**Desenvolvido com ❤️ por Ferdinan-MSP**

⭐ Se este projeto te ajudou, considere dar uma estrela!

</div>
