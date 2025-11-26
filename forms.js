<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Contact SCQ</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f0f4f8;
      color: #0033A0;
      margin: 0;
      padding: 0;
    }
    #contact {
      max-width: 600px;
      margin: 50px auto;
      padding: 40px;
      background-color: #ffffff;
      border-radius: 10px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    }
    #contact img {
      display: block;
      margin: 0 auto 20px;
      width: 120px;
      height: auto;
    }
    label {
      display: block;
      font-weight: bold;
      margin-bottom: 5px;
    }
    input, textarea {
      width: 100%;
      padding: 10px;
      margin-bottom: 20px;
      border: 1px solid #0033A0;
      border-radius: 5px;
      font-size: 16px;
    }
    button {
      background-color: #0033A0;
      color: #ffffff;
      border: none;
      padding: 12px 25px;
      font-size: 16px;
      border-radius: 5px;
      cursor: pointer;
      transition: background-color 0.2s;
    }
    button:hover {
      background-color: #002080;
    }
    .form-status {
      text-align: center;
      font-weight: bold;
      margin-top: 10px;
    }
  </style>
</head>
<body>

<section id="contact">
  <!-- Logo SCQ -->
  <img src="logo_scq.jpg" alt="Logo SCQ">

  <form action="https://formspree.io/f/meobokok" method="POST">
  <label>
    Votre email :
    <input type="email" name="email" placeholder="votre@email.com" required>
  </label>

  <label>
    Votre message :
    <textarea name="message" placeholder="Écrivez votre message ici..." required></textarea>
  </label>

  <button type="submit">Envoyer</button>
  <div class="form-status"></div>
</form>

</section>

<script>
  // forms.js — gestion des formulaires Formspree pour SCQ
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('form[action^="https://formspree.io/f/meobokok"]').forEach(form => {
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

            // Redirection automatique après 2 secondes
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
</script>

</body>
</html>
