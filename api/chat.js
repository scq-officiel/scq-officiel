// chat.js — minimal chat UI that sends to /api/chat
document.addEventListener('DOMContentLoaded', ()=> {
  // if you want a persistent button, create it in HTML or dynamically here
  // This code expects the index.html chat controls to be present if used.
});

async function scqSendChat(question, addMessageCallback) {
  // addMessageCallback(role, text)
  addMessageCallback && addMessageCallback('user', question);
  try {
    const res = await fetch('/api/chat', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ question })});
    if (!res.ok) throw new Error('server');
    const data = await res.json();
    addMessageCallback && addMessageCallback('bot', data.answer || 'Aucune réponse.');
  } catch (e) {
    addMessageCallback && addMessageCallback('bot', 'Erreur : impossible de contacter le serveur du chat.');
  }
}
