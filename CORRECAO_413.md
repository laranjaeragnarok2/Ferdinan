# 🔧 Correção do Erro 413 - Upload de Imagens

## ❌ Problema
Erro **413 (Content Too Large)** ao fazer upload de imagens no blog.

## ✅ Soluções Implementadas

### 1. Aumentado Limite para 20MB

Atualizei os limites em **4 lugares**:

#### a) `next.config.ts`
```typescript
experimental: {
  serverActions: {
    bodySizeLimit: '20mb',
  },
}
```

#### b) `src/app/api/blog/upload/route.ts`
```typescript
const maxSize = 20 * 1024 * 1024; // 20MB
```

#### c) `src/components/RichTextEditor.tsx`
```typescript
const maxSize = 20 * 1024 * 1024; // 20MB
```

#### d) `vercel.json` (novo arquivo)
```json
{
  "functions": {
    "src/app/api/blog/upload/route.ts": {
      "maxDuration": 60,
      "memory": 1024
    }
  }
}
```

### 2. Adicionado Domínios do Firebase Storage

No `next.config.ts`, adicionei os domínios do Firebase para as imagens funcionarem:
```typescript
{
  protocol: 'https',
  hostname: '*.firebasestorage.app',
},
{
  protocol: 'https',
  hostname: 'firebasestorage.googleapis.com',
}
```

### 3. Corrigido Erro TipTap (Bônus)

Desabilitei a extensão Link duplicada no `RichTextEditor.tsx`:
```typescript
StarterKit.configure({
  link: false, // Desabilitar para usar configuração customizada
})
```

## 📋 Próximos Passos

1. **Instalar dependências** (se ainda não instalou):
   ```bash
   npm install
   ```

2. **Fazer commit e deploy**:
   ```bash
   git add .
   git commit -m "fix: aumentar limite de upload para 20MB e corrigir TipTap"
   git push
   ```

3. **Ativar Firebase Storage** (ainda necessário):
   - Acesse: https://console.firebase.google.com/
   - Selecione o projeto: **ferdinan-a90a3**
   - Ative o **Storage** no menu lateral
   - Configure as regras de segurança

## 🎯 Resultado Esperado

Após o deploy:
- ✅ Upload de imagens até **20MB** funcionará
- ✅ Sem erro 413
- ✅ Sem erro de Link duplicado no TipTap
- ⚠️ Ainda precisa ativar Firebase Storage para funcionar completamente

## ⚠️ Importante

O erro **413** era causado pelo limite padrão do Next.js (4.5MB). Agora está configurado para **20MB**.

Mas você ainda precisa **ativar o Firebase Storage** no Console do Firebase, senão vai continuar dando erro **404** (bucket não encontrado).
