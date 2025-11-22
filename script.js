// Ouvrir / fermer le chat
document.getElementById("chat-btn").onclick = () => {
    const box = document.getElementById("chat-box");
    box.style.display = box.style.display === "flex" ? "none" : "flex";
};

// Gestion simple des messages (version démo)
document.getElementById("chat-input").addEventListener("keydown", async (e) => {
    if (e.key === "Enter") {
        const input = e.target.value;
        e.target.value = "";

        const messages = document.getElementById("chat-messages");

        // Affiche la question
        messages.innerHTML += `<div><b>Vous:</b> ${input}</div>`;

        // Réponse IA (à remplacer plus tard par ton serveur)
        messages.innerHTML += `<div><b>SCQ-IA:</b> Je suis en développement. La version finale répondra sur les réformes, la constitution et les positions du parti.</div>`;
    }
});
