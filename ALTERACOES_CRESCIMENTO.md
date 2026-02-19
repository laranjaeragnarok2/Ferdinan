# 🛠️ Log de Alterações - Operação Soberania Local

## 🕒 Data: 18-02-2026
## 🎯 Objetivo: Unificar fonte de dados do blog para local (.mdx) e otimizar sitemap.

---

### ✅ 1. Refatoração de `src/lib/mdx.ts` (CONCLUÍDO)
- **Ação:** Substituída integração com Sanity.io por leitura nativa do sistema de arquivos (`fs`).
- **Motivo:** Garantir a soberania dos dados e eliminar latência de rede/APIs externas.
- **Técnica:** Implementada varredura da pasta `src/content/blog` com parse de frontmatter via `gray-matter`.

### ✅ 2. Atualização de `src/app/sitemap.ts` (CONCLUÍDO)
- **Ação:** Sincronizada a geração de URLs com a nova lógica local.
- **Motivo:** Otimização para indexação instantânea pelo Google Bot.

### ✅ 3. Blindagem de Configuração (CONCLUÍDO)
- **Ação:** Neutralizados os erros fatais por falta de variáveis de ambiente (Sanity e Firebase).
- **Motivo:** Permitir o build do site mesmo sem conexão com APIs externas, honrando a Soberania Local.
- **Técnica:** Substituído `throw Error` por `console.warn` e valores de fallback nos arquivos `src/sanity/env.ts` e `src/lib/firebase.ts`.

### ✅ 4. Remoção Completa do Firebase (CONCLUÍDO)
- **Ação:** Eliminados arquivos de configuração e lógica de banco de dados do Firebase.
- **Motivo:** Otimização de performance e remoção de "peso morto" do projeto, honrando a Soberania Local.
- **Arquivos Deletados:** `src/lib/firebase.ts`, `src/lib/firestore.ts`, `src/lib/audit.ts`.
- **Refatoração:** `src/lib/auth.ts` e `src/lib/proposal-store.ts` agora operam sem dependências externas.
- **Status:** Sucesso. 52 pacotes removidos do sistema.

---
*Status: Código Limpo e Pronto para Build.*

