// chat.js
document.addEventListener('DOMContentLoaded', ()=> {
  const chatBtn = document.getElementById('chatButton');
  const chatWindow = document.getElementById('chatWindow');
  const closeBtn = document.getElementById('closeChat');
  const messages = document.getElementById('chatMessages');
  const sendBtn = document.getElementById('sendChat');
  const input = document.getElementById('chatText');

  // toggle
  chatBtn && chatBtn.addEventListener('click', ()=> {
    if(chatWindow.classList.contains('hidden')) chatWindow.classList.remove('hidden');
    else chatWindow.classList.add('hidden');
  });
  closeBtn && closeBtn.addEventListener('click', ()=> chatWindow.classList.add('hidden'));

  function addMessage(txt, who='bot'){
    const d = document.createElement('div');
    d.className = 'scq-msg ' + (who==='user' ? 'scq-user' : 'scq-bot');
    d.innerText = txt;
    messages.appendChild(d);
    messages.scrollTop = messages.scrollHeight;
  }

  async function sendQuestion(q){
    addMessage(q,'user');
    const placeholder = document.createElement('div'); placeholder.className='scq-msg scq-bot'; placeholder.innerText='…'; messages.appendChild(placeholder);
    try {
      const res = await fetch('/api/chat', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({question:q})});
      if(!res.ok) throw new Error('server');
      const data = await res.json();
      placeholder.innerText = data.answer || 'Aucune réponse.';
    } catch(e){
      placeholder.innerText = 'Erreur : impossible de contacter le serveur du chat.';
    }
    messages.scrollTop = messages.scrollHeight;
  }

  sendBtn && sendBtn.addEventListener('click', ()=>{
    const q = input.value.trim(); if(!q) return; input.value=''; sendQuestion(q);
  });
  input && input.addEventListener('keydown', (e)=> { if(e.key==='Enter'){ e.preventDefault(); sendBtn.click(); }});

});
