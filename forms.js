// forms.js — gestion des formulaires Formspree pour SCQ
document.addEventListener('DOMContentLoaded', () => {
  // Sélectionne tous les formulaires avec le nouvel endpoint Formspree
  document.querySelectorAll('form[action^="https://formspree.io/f/xpwgwwwv"]').forEach(form => {

    form.addEventListener('submit', async (e) => {
      e.preventDefault(); // Empêche le rechargement de la page

      const endpoint = form.getAttribute('action');
      const formData = new FormData(form);
      const statusEl = form.querySelector('.form-status');

      // Message pendant l'envoi
      if (statusEl) {
        statusEl.textContent = 'Envoi ...';
        statusEl.style.color = 'black';
      }

      try {
        // Envoi via fetch POST
        const res = await fetch(endpoint, {
          method: 'POST',
          body: formData,
          headers: { 'Accept': 'application/json' }
        });

        if (res.ok) {
          if (statusEl) {
            statusEl.textContent = 'Merci — message envoyé.';
            statusEl.style.color = 'green';
          }
          form.reset();

          // Redirection automatique vers une page de remerciement après 2 secondes
          setTimeout(() => {
            window.location.href = '/merci.html';
          }, 2000);

        } else {
          if (statusEl) {
            statusEl.textContent = 'Erreur lors de l’envoi.';
            statusEl.style.color = 'red';
          }
        }

      } catch (e) {
        if (statusEl) {
          statusEl.textContent = 'Erreur de connexion.';
          statusEl.style.color = 'red';
        }
      }

    });

  });
});
