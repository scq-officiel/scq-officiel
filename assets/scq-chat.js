(() => {
  const API_URL = "https://TON-API.example/api/chat"; // <- on le remplacera après

  // UI
  const btn = document.createElement("button");
  btn.id = "scqChatBtn";
  btn.textContent = "Parler à SCQ-IA";

  const panel = document.createElement("div");
  panel.id = "scqChatPanel";
  panel.innerHTML = `
    <div id="scqChatHeader">
      <div>
        SCQ-IA<br><small>Réponses basées sur les documents du SCQ</small>
      </div>
      <button id="scqChatClose" aria-label="Fermer">✕</button>
    </div>
    <div id="scqChatMsgs"></div>
    <form id="scqChatForm">
      <input id="scqChatInput" type="text" placeholder="Posez votre question..." autocomplete="off" />
      <button id="scqChatSend" type="submit">Envoyer</button>
    </form>
  `;

  document.body.appendChild(btn);
  document.body.appendChild(panel);

  const closeBtn = panel.querySelector("#scqChatClose");
  const msgs = panel.querySelector("#scqChatMsgs");
  const form = panel.querySelector("#scqChatForm");
  const input = panel.querySelector("#scqChatInput");

  const state = { history: [] }; // {role:'user'|'assistant', content:'...'}

  function addMsg(role, text) {
    const d = document.createElement("div");
    d.className = `scqMsg ${role === "user" ? "user" : "assistant"}`;
    d.textContent = text;
    msgs.appendChild(d);
    msgs.scrollTop = msgs.scrollHeight;
  }

  btn.addEventListener("click", () => {
    panel.style.display = panel.style.display === "none" || !panel.style.display ? "block" : "none";
    if (panel.style.display === "block" && state.history.length === 0) {
      addMsg("assistant", "Bonjour. Posez votre question. Si possible, je citerai les documents officiels.");
    }
  });

  closeBtn.addEventListener("click", () => (panel.style.display = "none"));

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const text = (input.value || "").trim();
    if (!text) return;
    input.value = "";

    state.history.push({ role: "user", content: text });
    addMsg("user", text);

    addMsg("assistant", "…");
    const loadingNode = msgs.lastChild;

    try {
      const r = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, history: state.history.slice(-10) })
      });

      const data = await r.json();
      const reply = data.reply || "Je n’ai pas pu répondre.";
      loadingNode.textContent = reply;

      state.history.push({ role: "assistant", content: reply });
    } catch {
      loadingNode.textContent = "Erreur de connexion au service IA.";
    }
  });
})();
