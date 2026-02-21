document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide Icons
    lucide.createIcons();

    const API_BASE = '/api';

    // UI Elements
    const statsContainer = document.getElementById('stats-summary');
    const topDealsBody = document.querySelector('#top-deals-table tbody');
    const stageBreakdown = document.getElementById('stage-breakdown');
    const navItems = document.querySelectorAll('.nav-item');
    const views = document.querySelectorAll('.content-view');

    // Navigation Logic
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const viewId = 'view-' + item.getAttribute('data-view');

            navItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');

            views.forEach(v => v.classList.add('hidden'));
            document.getElementById(viewId).classList.remove('hidden');

            if (item.getAttribute('data-view') === 'leads') fetchLeads();
            if (item.getAttribute('data-view') === 'deals') fetchDeals();
        });
    });

    // Modal Logic
    const modal = document.getElementById('modal-lead');
    const btnAddLead = document.getElementById('btn-add-lead');
    const closeModals = document.querySelectorAll('.close-modal');

    btnAddLead.addEventListener('click', () => modal.classList.add('active'));
    closeModals.forEach(c => c.addEventListener('click', () => modal.classList.remove('active')));

    // Fetch Dashboard Data
    async function loadDashboard() {
        try {
            const res = await fetch(`${API_BASE}/report/pipeline`);
            const { report } = await res.json();

            // Extract data from markdown (since the backend returns MD)
            // In a real app we'd return JSON, but let's parse or just use separate endpoints
            // Better: let's use separate endpoints for the UI
            fetchSummaryStats();
            fetchTopDeals();
        } catch (err) {
            console.error('Error loading dashboard:', err);
        }
    }

    async function fetchSummaryStats() {
        try {
            const res = await fetch(`${API_BASE}/deals`);
            const deals = await res.json();

            const totalValue = deals.reduce((acc, d) => acc + d.value, 0);
            const activeDeals = deals.filter(d => !d.stage.startsWith('closed')).length;
            const avgDeal = deals.length > 0 ? (totalValue / deals.length) : 0;

            statsContainer.innerHTML = `
                <div class="stat-card">
                    <div class="stat-label">Valor Total Pipeline</div>
                    <div class="stat-value">$${totalValue.toLocaleString()}</div>
                </div>
                <div class="stat-card">
                    <div class="stat-label">Negócios Ativos</div>
                    <div class="stat-value">${activeDeals}</div>
                </div>
                <div class="stat-card">
                    <div class="stat-label">Ticket Médio</div>
                    <div class="stat-value">$${Math.round(avgDeal).toLocaleString()}</div>
                </div>
                <div class="stat-card">
                    <div class="stat-label">Taxa de Conversão</div>
                    <div class="stat-value">12%</div>
                </div>
            `;
        } catch (err) {
            console.error(err);
        }
    }

    async function fetchTopDeals() {
        try {
            const res = await fetch(`${API_BASE}/deals?limit=5`);
            const deals = await res.json();

            topDealsBody.innerHTML = deals.slice(0, 5).map(d => `
                <tr>
                    <td><strong>${d.title}</strong></td>
                    <td><span class="badge badge-${d.stage}">${d.stage}</span></td>
                    <td>$${d.value.toLocaleString()}</td>
                </tr>
            `).join('');

            // Also update chart
            const stages = ['prospect', 'qualified', 'proposal', 'negotiation', 'closed-won'];
            const stageCounts = stages.map(s => ({
                name: s,
                count: deals.filter(d => d.stage === s).length
            }));
            const max = Math.max(...stageCounts.map(s => s.count)) || 1;

            stageBreakdown.innerHTML = stageCounts.map(s => `
                <div class="stage-bar-item">
                    <div class="stage-bar-meta">
                        <span>${s.name}</span>
                        <span>${s.count}</span>
                    </div>
                    <div class="stage-bar-outer">
                        <div class="stage-bar-inner" style="width: ${(s.count / max) * 100}%"></div>
                    </div>
                </div>
            `).join('');

        } catch (err) {
            console.error(err);
        }
    }

    async function fetchLeads() {
        const res = await fetch(`${API_BASE}/contacts`);
        const leads = await res.json();
        document.querySelector('#leads-list tbody').innerHTML = leads.map(l => `
            <tr>
                <td>${l.name}</td>
                <td>${l.company || '-'}</td>
                <td>${l.email || '-'}</td>
                <td><button class="btn btn-secondary">Ver</button></td>
            </tr>
        `).join('');
    }

    async function fetchDeals() {
        const res = await fetch(`${API_BASE}/deals`);
        const deals = await res.json();
        document.querySelector('#deals-list tbody').innerHTML = deals.map(d => `
            <tr>
                <td>${d.title}</td>
                <td><span class="badge badge-${d.stage}">${d.stage}</span></td>
                <td>$${d.value.toLocaleString()}</td>
                <td><button class="btn btn-secondary">Editar</button></td>
            </tr>
        `).join('');
    }

    // Lead Form Submit
    const leadForm = document.getElementById('lead-form');
    leadForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(leadForm);
        const data = Object.fromEntries(formData.entries());

        try {
            const res = await fetch(`${API_BASE}/contacts`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            if (res.ok) {
                modal.classList.remove('active');
                leadForm.reset();
                loadDashboard();
                if (!document.getElementById('view-leads').classList.contains('hidden')) fetchLeads();
            }
        } catch (err) {
            alert('Erro ao salvar lead: ' + err.message);
        }
    });

    // Initial Load
    loadDashboard();
});
