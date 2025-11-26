<!-- Formulaire SCQ -->
<section id="contact" style="background-color:#ffffff; padding:40px; max-width:600px; margin:auto; border-radius:10px; box-shadow:0 4px 12px rgba(0,0,0,0.1);">
  <!-- Logo SCQ -->
  <div style="text-align:center; margin-bottom:20px;">
    <img src="logo_scq.jpg" alt="Logo SCQ" style="width:120px; height:auto;">
  </div>

  <form action="https://formspree.io/f/xpwgwwwv" method="POST">
    <div style="margin-bottom:15px;">
      <label for="name" style="display:block; font-weight:bold; color:#0033A0;">Nom</label>
      <input type="text" id="name" name="name" placeholder="Votre nom" required 
             style="width:100%; padding:10px; border:1px solid #0033A0; border-radius:5px;">
    </div>

    <div style="margin-bottom:15px;">
      <label for="email" style="display:block; font-weight:bold; color:#0033A0;">Email</label>
      <input type="email" id="email" name="email" placeholder="Votre email" required
             style="width:100%; padding:10px; border:1px solid #0033A0; border-radius:5px;">
    </div>

    <div style="margin-bottom:15px;">
      <label for="message" style="display:block; font-weight:bold; color:#0033A0;">Message</label>
      <textarea id="message" name="message" placeholder="Votre message" required
                style="width:100%; padding:10px; border:1px solid #0033A0; border-radius:5px; min-height:120px;"></textarea>
    </div>

    <div style="text-align:center; margin-bottom:15px;">
      <button type="submit" 
              style="background-color:#0033A0; color:#ffffff; border:none; padding:12px 25px; font-size:16px; border-radius:5px; cursor:pointer;">
        Envoyer
      </button>
    </div>

    <!-- Zone de statut pour le script forms.js -->
    <div class="form-status" style="text-align:center; font-weight:bold;"></div>
  </form>
</section>
