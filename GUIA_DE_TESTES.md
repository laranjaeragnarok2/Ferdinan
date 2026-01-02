# 🧪 Guia de Teste - Correção de Segurança do Painel Admin

## ✅ Status do Servidor

O servidor de desenvolvimento está **RODANDO** em:
- **Local:** http://localhost:9002
- **Rede:** http://192.168.0.8:9002

---

## 🔍 Testes a Realizar

### **Teste 1: Verificar Proteção de Rota (SEM Login)**

**Objetivo:** Confirmar que usuários não autenticados não podem acessar o painel.

**Passos:**
1. Abra seu navegador
2. Acesse: `http://localhost:9002/admin/blog`
3. **Resultado Esperado:** 
   - ✅ Deve redirecionar automaticamente para `/admin/login`
   - ✅ Deve mostrar a página de login com o botão "Entrar com Google"

**Se não redirecionar:** ❌ A proteção NÃO está funcionando

---

### **Teste 2: Acessar Página de Login**

**Objetivo:** Verificar se a página de login está funcionando.

**Passos:**
1. Acesse: `http://localhost:9002/admin/login`
2. **Resultado Esperado:**
   - ✅ Página com título "Painel Administrativo"
   - ✅ Botão "Entrar com Google"
   - ✅ Texto "Apenas usuários autorizados podem acessar"

---

### **Teste 3: Configurar Google OAuth (OBRIGATÓRIO)**

**Objetivo:** Habilitar o login com Google.

⚠️ **IMPORTANTE:** Sem isso, o login NÃO funcionará!

**Passos:**

1. **Acesse o Google Cloud Console:**
   - URL: https://console.cloud.google.com/

2. **Crie/Selecione um Projeto:**
   - Clique no seletor de projeto no topo
   - Crie um novo projeto ou selecione um existente

3. **Habilite a API do Google+:**
   - Menu → **APIs & Services** → **Library**
   - Busque por "Google+ API"
   - Clique em **Enable**

4. **Crie Credenciais OAuth:**
   - Menu → **APIs & Services** → **Credentials**
   - Clique em **Create Credentials** → **OAuth 2.0 Client ID**
   - Se solicitado, configure a tela de consentimento primeiro:
     - User Type: **External**
     - App name: **Ferdinan Blog Admin**
     - User support email: seu email
     - Developer contact: seu email
     - Salve e continue

5. **Configure o OAuth Client ID:**
   - Application type: **Web application**
   - Name: **Ferdinan Blog Admin**
   - **Authorized JavaScript origins:**
     ```
     http://localhost:9002
     ```
   - **Authorized redirect URIs:**
     ```
     http://localhost:9002/api/auth/callback/google
     ```
   - Clique em **Create**

6. **Copie as Credenciais:**
   - Você receberá um **Client ID** e **Client Secret**
   - Copie ambos

7. **Atualize o `.env.local`:**
   - Abra o arquivo: `c:\Users\Horyu\Desktop\Ferdinan\.env.local`
   - Substitua:
     ```bash
     GOOGLE_CLIENT_ID=seu-google-client-id-aqui
     GOOGLE_CLIENT_SECRET=seu-google-client-secret-aqui
     ```
   - Por:
     ```bash
     GOOGLE_CLIENT_ID=<cole o Client ID aqui>
     GOOGLE_CLIENT_SECRET=<cole o Client Secret aqui>
     ```

8. **Configure seu Email de Admin:**
   - No mesmo arquivo `.env.local`, substitua:
     ```bash
     ADMIN_EMAIL=seu-email@gmail.com
     ```
   - Por seu email real do Google (o que você usará para fazer login)

9. **Reinicie o Servidor:**
   - No terminal, pressione `Ctrl+C` para parar o servidor
   - Execute novamente: `npm run dev`

---

### **Teste 4: Fazer Login (APÓS Configurar OAuth)**

**Objetivo:** Testar o login com Google.

**Passos:**
1. Acesse: `http://localhost:9002/admin/login`
2. Clique em **"Entrar com Google"**
3. **Resultado Esperado:**
   - ✅ Abre uma janela de login do Google
   - ✅ Você faz login com o email configurado em `ADMIN_EMAIL`
   - ✅ Redireciona para `/admin/blog`
   - ✅ Mostra o painel administrativo com seus posts

**Se der erro:**
- ❌ Verifique se o email usado no login está em `ADMIN_EMAIL`
- ❌ Verifique se as credenciais OAuth estão corretas
- ❌ Verifique o console do navegador (F12) para erros

---

### **Teste 5: Editar um Post (APÓS Login)**

**Objetivo:** Verificar se a edição de posts está funcionando.

**Passos:**
1. No painel admin, clique no ícone de **Editar** (lápis) em um post
2. **Resultado Esperado:**
   - ✅ Abre a página de edição
   - ✅ Mostra o editor com o conteúdo do post
   - ✅ Você consegue editar e salvar

**Se der erro 401:**
- ❌ A autenticação nas APIs não está funcionando
- ❌ Verifique se o `NEXTAUTH_SECRET` está configurado

---

### **Teste 6: Criar um Novo Post (APÓS Login)**

**Objetivo:** Verificar se a criação de posts está funcionando.

**Passos:**
1. No painel admin, clique em **"Novo Post"**
2. Preencha os campos:
   - Título
   - Conteúdo
   - Tags
3. Clique em **"Publicar"** ou **"Salvar Rascunho"**
4. **Resultado Esperado:**
   - ✅ Post criado com sucesso
   - ✅ Redireciona para o painel
   - ✅ O novo post aparece na lista

---

### **Teste 7: Logout**

**Objetivo:** Verificar se o logout funciona.

**Passos:**
1. No painel admin, clique em **"Sair"**
2. **Resultado Esperado:**
   - ✅ Faz logout
   - ✅ Redireciona para a página inicial ou login
   - ✅ Ao tentar acessar `/admin/blog` novamente, redireciona para login

---

## 🐛 Troubleshooting

### Problema: "Redirect URI mismatch"

**Solução:**
- Verifique se a URI de redirecionamento no Google Cloud Console é exatamente:
  ```
  http://localhost:9002/api/auth/callback/google
  ```
- Sem barra no final!

### Problema: "Unauthorized" ao editar posts

**Solução:**
- Verifique se o `NEXTAUTH_SECRET` está configurado no `.env.local`
- Gere um novo secret:
  ```bash
  node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
  ```

### Problema: Email não autorizado

**Solução:**
- Verifique se o email usado no login está em `ADMIN_EMAIL`
- Você pode adicionar múltiplos emails separados por vírgula:
  ```bash
  ADMIN_EMAIL=email1@gmail.com,email2@gmail.com
  ```

### Problema: Servidor não inicia

**Solução:**
- Verifique se a porta 9002 está livre
- Ou altere a porta no `package.json`:
  ```json
  "dev": "next dev --turbopack -p 3000"
  ```

---

## 📊 Checklist de Testes

- [ ] Teste 1: Proteção de rota (sem login)
- [ ] Teste 2: Página de login carrega
- [ ] Teste 3: Google OAuth configurado
- [ ] Teste 4: Login com Google funciona
- [ ] Teste 5: Edição de posts funciona
- [ ] Teste 6: Criação de posts funciona
- [ ] Teste 7: Logout funciona

---

## ✅ Resultado Esperado Final

Após todos os testes:

1. ✅ **Segurança:** Apenas usuários autorizados podem acessar o admin
2. ✅ **Login:** Funciona com Google OAuth
3. ✅ **Edição:** Posts podem ser editados sem erro 401
4. ✅ **Criação:** Novos posts podem ser criados
5. ✅ **Proteção:** Middleware bloqueia acessos não autorizados

---

## 📞 Próximos Passos

Depois de concluir todos os testes:

1. **Se tudo funcionar:** 🎉 A correção foi bem-sucedida!
2. **Se houver problemas:** 
   - Verifique o console do navegador (F12)
   - Verifique os logs do servidor no terminal
   - Consulte a seção de Troubleshooting acima

---

**Data:** 2026-01-02  
**Servidor:** http://localhost:9002  
**Status:** ✅ PRONTO PARA TESTE
