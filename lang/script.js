// script.js
document.addEventListener('DOMContentLoaded', ()=>{
  // afficher année
  const y = document.getElementById('year');
  if(y) y.textContent = new Date().getFullYear();

  // set language from lang.js initialisation (lang/lang.js handles UI)
  // attach form handlers (forms.js will attach on load)
});
