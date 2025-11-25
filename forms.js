// forms.js
document.addEventListener('DOMContentLoaded', ()=>{
  const CONTACT_ENDPOINT = 'https://formspree.io/f/xyzabwqj'; // <--- remplace
  const ADHESION_ENDPOINT = 'https://formspree.io/f/xyzabwqj'; // <--- remplace

  async function postForm(url, formData, statusEl){
    statusEl.textContent = 'Envoi…';
    try {
      const res = await fetch(url, {method:'POST', headers:{'Accept':'application/json'}, body: formData});
      if(res.ok){ statusEl.textContent = 'Merci ! Message envoyé.'; return true; }
      else { statusEl.textContent = 'Erreur lors de l\'envoi.'; return false; }
    } catch(e){
      statusEl.textContent = 'Erreur de connexion.';
      return false;
    }
  }

  const contactForm = document.getElementById('contactForm');
  if(contactForm){
    contactForm.addEventListener('submit', async (e)=>{
      e.preventDefault();
      const status = document.getElementById('contactFormStatus');
      const fd = new FormData(contactForm);
      await postForm(CONTACT_ENDPOINT, fd, status);
      contactForm.reset();
    });
  }

  const adhesionForm = document.getElementById('adhesionForm');
  if(adhesionForm){
    adhesionForm.addEventListener('submit', async (e)=>{
      e.preventDefault();
      const status = document.getElementById('adhesionFormStatus');
      const fd = new FormData(adhesionForm);
      await postForm(ADHESION_ENDPOINT, fd, status);
      adhesionForm.reset();
    });
  }
});
