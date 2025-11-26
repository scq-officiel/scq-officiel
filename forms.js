// small UI feedback for forms (forms already post to Formspree)
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('form[action^="https://formspree.io/f/xpwgwwwv"]').forEach(form => {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const endpoint = form.getAttribute('action');
      const formData = new FormData(form);
      const statusEl = form.querySelector('.form-status');

      if (statusEl) {
        statusEl.textContent = 'Envoi ...';
        statusEl.style.color = 'black';
      }

      try {
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
          // Redirection après 2 secondes vers une page de remerciement (optionnel)
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
