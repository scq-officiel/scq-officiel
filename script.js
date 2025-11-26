// script.js — bilingual basic loader + data loader for transparency
document.addEventListener('DOMContentLoaded', async () => {
  // year
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  // language switcher (simple)
  const langSel = document.getElementById('langSwitcher');
  if (langSel) {
    const saved = localStorage.getItem('scq_lang') || 'fr';
    langSel.value = saved;
    langSel.addEventListener('change', (e) => { localStorage.setItem('scq_lang', e.target.value); location.reload(); });
  }

  // load data.json and populate members and transparency tables/charts
  try {
    const res = await fetch('/data.json');
    const data = await res.json();

    // members
    const membersEl = document.getElementById('members-count');
    const updatedEl = document.getElementById('members-updated');
    if (membersEl) membersEl.textContent = data.members || 0;
    if (updatedEl) updatedEl.textContent = 'Dernière mise à jour : ' + (data.members_last_updated || '');

    // transparency page: build tables & charts if elements exist
    if (document.getElementById('donations-table')) {
      populateTransparency(data);
    }

  } catch (e) {
    console.warn('Impossible de charger data.json', e);
  }
});

// populate donations/expenses tables and charts
function populateTransparency(data) {
  // Donations table
  const dtable = document.getElementById('donations-table');
  dtable.innerHTML = `<tr><th>Date</th><th>Source</th><th>Méthode</th><th>Montant</th><th>Note</th></tr>`;
  const donations = data.donations || [];
  donations.forEach(d => {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${d.date}</td><td>${escapeHtml(d.source)}</td><td>${escapeHtml(d.method||'')}</td><td>${d.amount}</td><td>${escapeHtml(d.note||'')}</td>`;
    dtable.appendChild(tr);
  });

  // Expenses table
  const etable = document.getElementById('expenses-table');
  etable.innerHTML = `<tr><th>Date</th><th>Payee</th><th>Catégorie</th><th>Montant</th><th>Note</th></tr>`;
  const expenses = data.expenses || [];
  expenses.forEach(e => {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${e.date}</td><td>${escapeHtml(e.payee)}</td><td>${escapeHtml(e.category||'')}</td><td>${e.amount}</td><td>${escapeHtml(e.note||'')}</td>`;
    etable.appendChild(tr);
  });

  // Charts (requires Chart.js loaded on transparence.html)
  setTimeout(()=> {
    if (typeof Chart !== 'undefined') {
      const ctxD = document.getElementById('chart-donations');
      const ctxE = document.getElementById('chart-expenses');

      // donations by source (aggregate)
      const bySource = {};
      donations.forEach(d => bySource[d.source] = (bySource[d.source]||0) + Number(d.amount));
      const dLabels = Object.keys(bySource);
      const dValues = dLabels.map(l=>bySource[l]);

      // expenses by category
      const byCat = {};
      expenses.forEach(x => byCat[x.category] = (byCat[x.category]||0) + Number(x.amount));
      const eLabels = Object.keys(byCat);
      const eValues = eLabels.map(l=>byCat[l]);

      if (ctxD) new Chart(ctxD.getContext('2d'), {
        type: 'pie',
        data: { labels: dLabels, datasets: [{ data: dValues }] },
        options: { responsive: true, plugins: { legend: { position: 'bottom' } } }
      });

      if (ctxE) new Chart(ctxE.getContext('2d'), {
        type: 'bar',
        data: { labels: eLabels, datasets: [{ label: 'Dépenses', data: eValues }] },
        options: { responsive: true, plugins: { legend: { display: false } }, scales: { y: { beginAtZero:true } } }
      });
    }
  }, 300);
}

// simple escape
function escapeHtml(s){ if(!s) return ''; return String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;'); }
