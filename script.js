/* global behavior for the site + chat */
document.getElementById('year').textContent = new Date().getFullYear();

/* mobile menu toggle */
const menuToggle = document.getElementById('menuToggle');
menuToggle && menuToggle.addEventListener('click', () => {
  const nav = document.querySelector('.main-nav');
  const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', !expanded);
  nav.style.display = expanded ? '' : 'flex';
});

/* Load constitution & reforms from /api/knowledge if available */
async function loadKnowledge() {
  try {
    const res = await fetch('/api/knowledge');
    if (!res.ok) throw new Error('Pas de source knowledge');
    const data = await res.json();

    const cons = data.constitution || [];
    const refs = data.reforms || [];

    const consContainer = document.getElementById('constitution-content');
    const refContainer = document.getElementById('reformes-content');

    if (cons.length === 0) consContainer.innerHTML = '<p class="loading">Aucun article de la Constitution disponible.</p>';
    else consContainer.innerHTML = cons.map(c => `
      <article class="card">
        <h4>${escapeHtml(c.title)}</h4>
        <p>${escapeHtml(c.text)}</p>
        <small>— ${escapeHtml(c.author || 'SCQ')} • ${escapeHtml(c.date || '')}</small>
      </article>
    `).join('');

    if (refs.length === 0) refContainer.innerHTML = '<p class="loading">Aucune réforme publiée.</p>';
    else refContainer.innerHTML = refs.map(r => `
      <article class="card">
        <h4>${escapeHtml(r.title)}</h4>
        <p>${escapeHtml(r.text)}</p>
        <small>— ${escapeHtml(r.author || 'SCQ')} • ${escapeHtml(r.date || '')}</small>
      </article>
    `).join('');
  } catch (e) {
    document.getElementById('constitution-content').innerHTML = '<p class="loading">Impossible de charger la Constitution.</p>';
    document.getElementById('reformes-content').innerHTML = '<p class="loading">Impossible de charger les réformes.</p>';
    console.warn(e);
  }
}
loadKnowledge();

/* ---------- Chat widget logic ---------- */
const openBtn = document.getElementById('scq-open-btn');
const panel = document.getElementById('scq-chat-panel');
const closeBtn = document.getElementById('scq-close-btn');
const messages = document.getElementById('scq-messages');
const form = document.getElementById('scq-input-form');
const input = document.getElementById('scq-input');

openBtn.addEventListener('click', () => {
  panel.hidden = !panel.hidden;
  if (!panel.hidden) input.focus();
});

closeBtn && closeBtn.addEventListener('click', () => panel.hidden = true);

function addMessage(text, who='bot') {
  const el = document.createElement('div');
  el.className = 'scq-msg ' + (who === 'user' ? 'scq-user' : 'scq-bot');
  el.innerText = text;
  messages.appendChild(el);
  messages.scrollTop = messages.scrollHeight;
}

async function sendToBackend(q) {
  addMessage(q, 'user');
  const placeholder = document.createElement('div');
  placeholder.className = 'scq-msg scq-bot';
  placeholder.innerText = '...';
  messages.appendChild(placeholder);
  messages.scrollTop = messages.scrollHeight;

  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({question: q})
    });
    if (!res.ok) throw new Error('Erreur serveur');
    const data = await res.json();
    placeholder.innerText = data.answer || 'Désolé, aucune réponse.';
  } catch (err) {
    placeholder.innerText = 'Erreur : impossible de contacter le serveur du chat.';
    console.error(err);
  }
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const q = input.value.trim();
  if (!q) return;
  input.value = '';
  sendToBackend(q);
});

/* small helper to avoid injecting html */
function escapeHtml(s){
  if(!s) return '';
  return s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;');
}
