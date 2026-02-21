const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const CRM_MODULE_PATH = '/home/horyua/projetos/Ferdinan/crm_module/';
const SCRIPTS_PATH = path.join(CRM_MODULE_PATH, 'scripts');
const REPORTS_PATH = path.join(CRM_MODULE_PATH, 'reports');

function getCurrentDateFormatted() {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
}

function generateReport() {
    console.log("Generating weekly lead report...");

    const currentDate = getCurrentDateFormatted();
    const reportFilename = `weekly_lead_report_${currentDate}.md`;
    const reportFilePath = path.join(REPORTS_PATH, reportFilename);

    // --- Collect Metrics ---
    let totalLeads = 0;
    try {
        console.log("Executing: node src/cli.js lead list");
        // Ensure the path is correct for execution from script's current working directory
        const leadsOutput = execSync(`node ${path.join(CRM_MODULE_PATH, 'src', 'cli.js')} lead list`, { cwd: CRM_MODULE_PATH, encoding: 'utf8' });
        // Split by new line, filter out 'Contacts:' header and empty lines, then count
        totalLeads = leadsOutput.split('\n').filter(line => line.trim() !== '' && !line.startsWith('Contacts:')).length;
        console.log(`Total Leads Raw Output:\n${leadsOutput}`);
        console.log(`Calculated Total Leads: ${totalLeads}`);
    } catch (error) {
        console.error(`Error collecting total leads: ${error.message}`);
        console.error(`Error details: ${error.stderr ? error.stderr.toString() : 'No stderr output'}`);
    }

    // Placeholder values for metrics that cannot be directly collected via CLI with status filter
    const mqlsGenerated = totalLeads; // Using total leads as a placeholder
    const scheduledMeetings = 0; // Assuming 0 as there's no way to filter
    const placeholderAnalysis = "Não foi possível coletar esta métrica com precisão devido a limitações do CLI do openclaw-crm na filtragem por status. Valor atual é um placeholder baseado no total de leads.";
    const noDataAnalysis = "Não foi possível coletar esta métrica com precisão devido a limitações do CLI do openclaw-crm.";

    // --- Report Template ---
    const reportContent = `
# Relatório de Monitoramento de Geração e Qualificação de Leads - Fase 4

**Período do Relatório:** ${currentDate} a ${currentDate}
**Data de Geração:** ${currentDate}
**Responsável:** Agente OpenClaw

---

## 📊 Resumo Executivo

*   **Destaques:** [Pontos positivos notáveis do período - Ex: Aumento no volume de leads brutos.]
*   **Desafios:** [Principais problemas ou quedas de desempenho - Ex: Impossibilidade de filtrar leads por status via CLI para métricas específicas.]
*   **Ações Recomendadas:** [Sumário das próximas etapas ou otimizações - Ex: Investigar alternativas para obter métricas de status de leads ou aprimorar o CLI do CRM.]

---

## 📈 Performance das Métricas Chave

### 1. Taxa de Abertura de Email
*   **Valor Atual:** [X.X]% (Período: Semanal)
*   **Valor Anterior:** [Y.Y]%
*   **Tendência:** [↔️]
*   **Observações:** [Análise breve, ex: "Métrica não rastreada pelo openclaw-crm CLI."]

### 2. Taxa de Resposta de LinkedIn
*   **Valor Atual:** [X.X]% (Período: Semanal)
*   **Valor Anterior:** [Y.Y]%
*   **Tendência:** [↔️]
*   **Observações:** [Análise breve, ex: "Métrica não rastreada pelo openclaw-crm CLI."]

### 3. Taxa de Conversão de Lead Magnet para MQL
*   **Valor Atual:** [X.X]% (Período: Semanal)
*   **Valor Anterior:** [Y.Y]%
*   **Tendência:** [↔️]
*   **Observações:** [Análise breve, ex: "Métrica não rastreada pelo openclaw-crm CLI."]

### 4. Volume de MQLs Gerados
*   **Valor Atual:** ${mqlsGenerated} MQLs (Período: Semanal)
*   **Valor Anterior:** [YYY] MQLs
*   **Tendência:** [↔️]
*   **Observações:** ${placeholderAnalysis}

### 5. Taxa de Conversão de MQL para Reunião Agendada
*   **Valor Atual:** [X.X]% (Período: Mensal)
*   **Valor Anterior:** [Y.Y]%
*   **Tendência:** [↔️]
*   **Observações:** ${noDataAnalysis}

### 6. Custo por Lead Qualificado (CPL)
*   **Valor Atual:** R$[X.XX] (Período: Mensal)
*   **Valor Anterior:** R$[Y.YY]
*   **Tendência:** [↔️]
*   **Observações:** [Análise breve, ex: "Métrica não rastreada pelo openclaw-crm CLI."]

### 7. Custo de Aquisição de Cliente (CAC) - Estimado
*   **Valor Atual:** R$[X.XX] (Período: Mensal, baseado em projeções)
*   **Valor Anterior:** R$[Y.YY]
*   **Tendência:** [↔️]
*   **Observações:** [Análise breve, ex: "Métrica não rastreada pelo openclaw-crm CLI."]

---

## 🎯 Metas e Próximos Passos

*   **Metas para o Próximo Período:**
    *   [Meta 1: Implementar uma forma de rastrear e filtrar status de leads.]
    *   [Meta 2: Integrar o openclaw-crm com ferramentas de marketing para coletar métricas adicionais.]
    *   [Meta 3: Revisar a documentação ou código-fonte do openclaw-crm para funcionalidades ocultas.]
*   **Ações Detalhadas:**
    *   [Ação 1: Pesquisar extensões ou plugins para openclaw-crm que adicionem gestão de status.]
    *   [Ação 2: Desenvolver um módulo personalizado para o openclaw-crm para adicionar funcionalidade de status de leads.]
    *   [Ação 3: Validar a possibilidade de extração de dados brutos do CRM para processamento externo.]

---

## 🗒️ Notas Adicionais

Foi identificado que o CLI do openclaw-crm na versão atual não oferece opções diretas para filtrar ou definir o status de leads (MQL, Reunião Agendada, etc.) através dos comandos 'lead list' ou 'lead add'. As métricas de volume de MQLs gerados e Reuniões Agendadas neste relatório são baseadas no volume total de leads devido a esta limitação. Recomenda-se investigar a funcionalidade completa do CRM ou considerar extensões/personalizações para habilitar este rastreamento.
    `;

    try {
        fs.writeFileSync(reportFilePath, reportContent.trim(), 'utf8');
        console.log(`Relatório gerado com sucesso em: ${reportFilePath}`);
        console.log("\n--- Conteúdo do Relatório Gerado ---\n");
        console.log(reportContent.trim());
    } catch (error) {
        console.error(`Erro ao salvar o relatório: ${error.message}`);
    }
}

generateReport();
