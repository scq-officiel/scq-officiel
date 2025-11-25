(() => {
  const openBtn = document.getElementById('scq-open-btn');
  const panel = document.getElementById('scq-chat-panel');
  const closeBtn = document.getElementById('scq-close-btn');
  const messages = document.getElementById('scq-messages');
  const form = document.getElementById('scq-input-form');
  const input = document.getElementById('scq-input');

  openBtn.addEventListener('click', () => {
    panel.hidden = !panel.hidden;
  });
  closeBtn.addEventListener('click', () => panel.hidden = true);

  function addMessage(text, who='bot') {
    const el = document.createElement('div');
    el.className = 'scq-msg ' + (who === 'user' ? 'scq-user' : 'scq-bot');
    el.textContent = text;
    messages.appendChild(el);
    messages.scrollTop = messages.scrollHeight;
  }

  async function sendToBackend(q) {
    addMessage(q, 'user');
    addMessage('...', 'bot');
    const botPlaceholder = messages.lastChild;

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({question: q})
      });
      if (!res.ok) throw new Error('Erreur serveur');
      const data = await res.json();
      botPlaceholder.textContent = data.answer || 'Désolé, aucune réponse.';
    } catch (e) {
      botPlaceholder.textContent = 'Erreur de connexion au chat. Merci de réessayer plus tard.';
      console.error(e);
    }
  }

  form.addEventListener('submit', ev => {
    ev.preventDefault();
    const q = input.value.trim();
    if (!q) return;
    input.value = '';
    sendToBackend(q);
  });

  // Optionnel : petite vérification de statut
  fetch('/api/status').catch(()=> console.warn('API chat inaccessible'));
})();
