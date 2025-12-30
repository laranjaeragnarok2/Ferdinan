# Ferdian-MSP - Landing Page de Alta Conversão

![Captura de tela da landing page da Ferdian-MSP](https://i.imgur.com/DIj135R.png)

Este é o repositório oficial da landing page para **Ferdian-MSP**, uma consultoria especializada em estratégias de crescimento personalizadas para negócios de alto valor. O site foi projetado para ser moderno, responsivo e focado na captura de leads qualificados.

## ✨ Visão Geral do Projeto

O objetivo deste projeto é apresentar os serviços da Ferdian-MSP de forma clara e convincente, destacando sua metodologia única e os resultados alcançados para seus clientes. A landing page é a principal ferramenta de marketing digital da empresa, construída com tecnologias de ponta para garantir performance, escalabilidade e uma excelente experiência do usuário.

## 🚀 Principais Funcionalidades

- **Design Moderno e Responsivo**: Layout elegante que se adapta perfeitamente a desktops, tablets e celulares.
- **Tema Escuro (Dark Mode)**: Suporte para temas claro e escuro, respeitando a preferência do sistema do usuário.
- **Animações Interativas**: Efeitos sutis de *fade-in* ao rolar a página e animações em botões, utilizando `Framer Motion` para uma experiência mais fluida.
- **Formulário de Contato**: Um formulário de lead completo com validação em tempo real para capturar informações de potenciais clientes.
- **Componentes Reutilizáveis**: Construído com base em componentes modulares para fácil manutenção e escalabilidade.
- **Otimização para Performance**: Utiliza os recursos mais recentes do Next.js, como App Router e Server Components, para um carregamento rápido.

## 🛠️ Tecnologias Utilizadas

Este projeto foi construído com um stack de tecnologias moderno e robusto:

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Linguagem**: [TypeScript](https://www.typescriptlang.org/)
- **Estilização**: [Tailwind CSS](https://tailwindcss.com/)
- **Componentes UI**: [ShadCN/UI](https://ui.shadcn.com/)
- **Animações**: [Framer Motion](https://www.framer.com/motion/)
- **Gerenciamento de Formulários**: [React Hook Form](https://react-hook-form.com/)
- **Validação de Esquemas**: [Zod](https://zod.dev/)
- **Ícones**: [Lucide React](https://lucide.dev/)

## ⚙️ Como Executar o Projeto Localmente

Para clonar e executar este projeto em sua máquina local, siga os passos abaixo.

### Pré-requisitos

- [Node.js](https://nodejs.org/) (versão 18.x ou superior)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)

### Instalação

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/seu-usuario/ferdian-msp.git
    ```

2.  **Navegue até o diretório do projeto:**
    ```bash
    cd ferdian-msp
    ```

3.  **Instale as dependências:**
    ```bash
    npm install
    ```
    *(ou `yarn install` se você usa Yarn)*

4.  **Configure as variáveis de ambiente:**
    
    Crie um arquivo `.env.local` na raiz do projeto com as seguintes variáveis:
    
    ```bash
    # SMTP Configuration (Hostinger)
    SMTP_USER=contact@ferdinan-msp.group
    SMTP_PASS=sua_senha_smtp_aqui
    
    # Discord Webhook
    DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/SEU_WEBHOOK_ID/SEU_WEBHOOK_TOKEN
    ```
    
    **Como obter a URL do Discord Webhook:**
    
    1. Acesse o canal do Discord onde deseja receber as notificações
    2. Clique em **Configurações do Canal** (ícone de engrenagem)
    3. Vá em **Integrações** → **Webhooks**
    4. Clique em **Novo Webhook**
    5. Dê um nome (ex: "Leads Ferdinan-MSP")
    6. Copie a **URL do Webhook** e cole no `.env.local`


### Executando o Servidor de Desenvolvimento

Após a instalação, você pode iniciar o servidor de desenvolvimento local:

```bash
npm run dev
```
*(ou `yarn dev`)*

Abra [http://localhost:3000](http://localhost:3000) (ou a porta indicada no seu terminal) no seu navegador para ver o projeto em ação.

## 📄 Licença

Este projeto é de propriedade privada. Todos os direitos reservados.
