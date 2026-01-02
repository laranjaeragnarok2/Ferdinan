# 🚀 Ferdinan-MSP - Plataforma de Growth & Automação

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-15.3.8-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=for-the-badge&logo=tailwind-css)
![Firebase](https://img.shields.io/badge/Firebase-11.10-orange?style=for-the-badge&logo=firebase)

**Consultoria especializada em estratégias de crescimento personalizadas para negócios de alto valor**

[🌐 Site](https://ferdinan-msp.group) • [📝 Blog](https://ferdinan-msp.group/blog) • [👨‍💼 Admin](https://ferdinan-msp.group/admin)

</div>

---

## 📋 Índice

- [Sobre o Projeto](#-sobre-o-projeto)
- [Funcionalidades](#-funcionalidades)
- [Tecnologias](#️-tecnologias)
- [Instalação](#-instalação)
- [Configuração](#️-configuração)
- [Uso](#-uso)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Painel Administrativo](#-painel-administrativo)
- [Deploy](#-deploy)
- [Licença](#-licença)

---

## 🎯 Sobre o Projeto

A **Ferdinan-MSP** é uma plataforma completa que combina:

- 🌐 **Landing Page de Alta Conversão** - Design moderno e responsivo
- 📝 **Blog Profissional** - Sistema completo de gerenciamento de conteúdo
- 🔐 **Painel Administrativo** - Gestão segura de posts e conteúdo
- 📧 **Captura de Leads** - Integração com email e Discord
- 🤖 **Automações** - Workflows inteligentes para crescimento

---

## ✨ Funcionalidades

### 🌐 Landing Page
- ✅ Design moderno com tema escuro premium
- ✅ Animações suaves com Framer Motion
- ✅ Formulário de captura de leads
- ✅ Integração com Discord e Email
- ✅ SEO otimizado
- ✅ Totalmente responsivo

### 📝 Sistema de Blog
- ✅ **Editor Rico TipTap** com formatação avançada
- ✅ Suporte a imagens, links, código e markdown
- ✅ Sistema de tags e categorias
- ✅ Rascunhos e publicação programada
- ✅ Upload de imagens via Firebase Storage
- ✅ Preview em tempo real

### 🔐 Painel Administrativo
- ✅ Autenticação segura com NextAuth + Google OAuth
- ✅ Proteção de rotas com middleware
- ✅ Dashboard com estatísticas
- ✅ Gerenciamento completo de posts
- ✅ Interface intuitiva e moderna

### 🎨 Design System
- ✅ Componentes reutilizáveis com ShadCN/UI
- ✅ Paleta de cores personalizada (Gold + Dark Blue)
- ✅ Tipografia otimizada
- ✅ Modo escuro nativo

---

## 🛠️ Tecnologias

### Core
- **[Next.js 15.3.8](https://nextjs.org/)** - Framework React com App Router
- **[TypeScript](https://www.typescriptlang.org/)** - Tipagem estática
- **[React 18](https://react.dev/)** - Biblioteca UI

### Estilização
- **[Tailwind CSS](https://tailwindcss.com/)** - Framework CSS utility-first
- **[ShadCN/UI](https://ui.shadcn.com/)** - Componentes UI modernos
- **[Framer Motion](https://www.framer.com/motion/)** - Animações fluidas

### Editor & Conteúdo
- **[TipTap](https://tiptap.dev/)** - Editor WYSIWYG rico
- **[React Hook Form](https://react-hook-form.com/)** - Gerenciamento de formulários
- **[Zod](https://zod.dev/)** - Validação de schemas

### Backend & Database
- **[Firebase](https://firebase.google.com/)** - Firestore + Storage
- **[NextAuth.js](https://next-auth.js.org/)** - Autenticação
- **[Nodemailer](https://nodemailer.com/)** - Envio de emails

### Ferramentas
- **[Lucide React](https://lucide.dev/)** - Ícones modernos
- **[Date-fns](https://date-fns.org/)** - Manipulação de datas
- **[Recharts](https://recharts.org/)** - Gráficos e visualizações

---

## 📦 Instalação

### Pré-requisitos

- **Node.js** 18.x ou superior
- **npm** ou **yarn**
- Conta no **Firebase**
- Conta no **Google Cloud** (para OAuth)

### Passos

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/seu-usuario/ferdinan-msp.git
   cd ferdinan-msp
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente:**
   
   Crie um arquivo `.env.local` na raiz do projeto:
   
   ```env
   # NextAuth Configuration
   NEXTAUTH_URL=http://localhost:9002
   NEXTAUTH_SECRET=sua-chave-secreta-aqui
   AUTH_TRUST_HOST=true

   # Google OAuth
   GOOGLE_CLIENT_ID=seu-google-client-id
   GOOGLE_CLIENT_SECRET=seu-google-client-secret

   # Admin Email
   ADMIN_EMAIL=seu-email@gmail.com

   # Firebase
   NEXT_PUBLIC_FIREBASE_API_KEY=sua-api-key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=seu-projeto.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=seu-projeto-id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=seu-projeto.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=seu-sender-id
   NEXT_PUBLIC_FIREBASE_APP_ID=seu-app-id

   # SMTP (Hostinger)
   SMTP_USER=contact@ferdinan-msp.group
   SMTP_PASS=sua-senha-smtp

   # Discord Webhook
   DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/ID/TOKEN
   ```

4. **Execute o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```

5. **Acesse no navegador:**
   ```
   http://localhost:9002
   ```

---

## ⚙️ Configuração

### 1. Firebase Setup

1. Crie um projeto no [Firebase Console](https://console.firebase.google.com/)
2. Ative **Firestore Database**
3. Ative **Storage**
4. Copie as credenciais para o `.env.local`

### 2. Google OAuth Setup

1. Acesse [Google Cloud Console](https://console.cloud.google.com/)
2. Crie um projeto ou selecione um existente
3. Vá em **APIs & Services** → **Credentials**
4. Crie **OAuth 2.0 Client ID**
5. Configure:
   - **Authorized JavaScript origins:** `http://localhost:9002`
   - **Authorized redirect URIs:** `http://localhost:9002/api/auth/callback/google`
6. Copie **Client ID** e **Client Secret** para o `.env.local`

### 3. SMTP Setup (Hostinger)

Configure as credenciais SMTP do Hostinger no `.env.local` para envio de emails.

### 4. Discord Webhook

1. No Discord, vá em **Configurações do Canal** → **Integrações** → **Webhooks**
2. Crie um novo webhook
3. Copie a URL para o `.env.local`

---

## 🎮 Uso

### Desenvolvimento

```bash
# Servidor de desenvolvimento
npm run dev

# Build de produção
npm run build

# Iniciar servidor de produção
npm start

# Verificação de tipos
npm run typecheck

# Linting
npm run lint
```

### Acessar o Painel Admin

1. Acesse: `http://localhost:9002/admin/login`
2. Faça login com Google usando o email configurado em `ADMIN_EMAIL`
3. Gerencie posts, imagens e conteúdo

---

## 📁 Estrutura do Projeto

```
ferdinan-msp/
├── src/
│   ├── app/                    # App Router (Next.js 15)
│   │   ├── [locale]/          # Internacionalização
│   │   ├── admin/             # Painel administrativo
│   │   │   ├── (protected)/   # Rotas protegidas
│   │   │   │   └── blog/      # Gerenciamento de posts
│   │   │   └── login/         # Página de login
│   │   ├── api/               # API Routes
│   │   │   ├── auth/          # NextAuth
│   │   │   └── blog/          # CRUD de posts
│   │   ├── blog/              # Blog público
│   │   ├── globals.css        # Estilos globais
│   │   └── layout.tsx         # Layout raiz
│   ├── components/            # Componentes React
│   │   ├── ui/                # Componentes ShadCN
│   │   └── RichTextEditor.tsx # Editor TipTap
│   ├── lib/                   # Utilitários
│   │   ├── auth.ts            # Configuração NextAuth
│   │   ├── firebase.ts        # Configuração Firebase
│   │   └── firestore.ts       # Funções Firestore
│   ├── types/                 # Tipos TypeScript
│   └── messages/              # i18n
├── public/                    # Arquivos estáticos
├── middleware.ts              # Middleware de autenticação
├── next.config.ts             # Configuração Next.js
├── tailwind.config.ts         # Configuração Tailwind
└── package.json               # Dependências
```

---

## 🔐 Painel Administrativo

### Acesso

- **URL:** `/admin/login`
- **Autenticação:** Google OAuth
- **Autorização:** Email configurado em `ADMIN_EMAIL`

### Funcionalidades

#### Dashboard (`/admin/blog`)
- Visualização de todos os posts
- Estatísticas (total, publicados, rascunhos)
- Ações rápidas (editar, deletar, publicar/despublicar)

#### Criar Post (`/admin/blog/new`)
- **Editor Rico TipTap** com:
  - Formatação de texto (negrito, itálico, tachado)
  - Títulos (H1, H2, H3)
  - Listas (marcadores e numeradas)
  - Citações e blocos de código
  - Links e imagens
  - Desfazer/Refazer
- Upload de imagem de capa
- Sistema de tags
- Publicação ou rascunho

#### Editar Post (`/admin/blog/edit/[id]`)
- Mesmas funcionalidades do criar post
- Carregamento automático do conteúdo existente
- Atualização em tempo real

---

## 🚀 Deploy

### Vercel (Recomendado)

1. **Conecte o repositório ao Vercel**

2. **Configure as variáveis de ambiente:**
   - Vá em **Settings** → **Environment Variables**
   - Adicione todas as variáveis do `.env.local`
   - **IMPORTANTE:** Altere `NEXTAUTH_URL` para seu domínio de produção

3. **Atualize o Google OAuth:**
   - Adicione seu domínio Vercel nas **Authorized redirect URIs**:
     ```
     https://seu-dominio.vercel.app/api/auth/callback/google
     ```

4. **Deploy:**
   ```bash
   git push origin main
   ```

### Variáveis de Ambiente de Produção

```env
NEXTAUTH_URL=https://ferdinan-msp.group
NEXTAUTH_SECRET=<secret-gerado>
# ... outras variáveis
```

---

## 🔒 Segurança

### Camadas de Proteção

1. **Middleware** - Proteção de rotas no edge
2. **Server-Side Layout** - Validação no servidor
3. **API Routes** - Autenticação em cada endpoint

### Boas Práticas

- ✅ Variáveis sensíveis em `.env.local` (nunca commitadas)
- ✅ Validação de email de admin em múltiplas camadas
- ✅ Tokens JWT seguros com NextAuth
- ✅ CORS configurado corretamente
- ✅ Firebase Security Rules aplicadas

---

## 📝 Scripts Disponíveis

| Script | Descrição |
|--------|-----------|
| `npm run dev` | Inicia servidor de desenvolvimento (porta 9002) |
| `npm run build` | Cria build de produção |
| `npm start` | Inicia servidor de produção |
| `npm run lint` | Executa ESLint |
| `npm run typecheck` | Verifica tipos TypeScript |

---

## 🤝 Contribuindo

Este é um projeto privado. Para contribuições, entre em contato com o proprietário.

---

## 📄 Licença

Este projeto é de **propriedade privada**. Todos os direitos reservados © 2026 Ferdinan-MSP.

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
