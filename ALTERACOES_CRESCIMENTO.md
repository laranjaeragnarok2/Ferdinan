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
- **Motivo:** Permitir o build do site mesmo sem conexão com APIs externas.

### ✅ 4. Remoção Completa do Firebase (CONCLUÍDO)
- **Ação:** Eliminados arquivos e pacotes `firebase` e `firebase-admin`.

### ✅ 5. Resgate de Conteúdo Legado (CONCLUÍDO)
- **Ação:** Executado script de resgate para baixar todos os posts e imagens do Sanity.
- **Resultado:** 3 posts convertidos para MDX e imagens migradas para `public/blog-images/`.

---
*Status: Sistema Restaurado, Independente e Soberano.*
