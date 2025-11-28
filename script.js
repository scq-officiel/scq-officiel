// script.js - SCQ
document.addEventListener("DOMContentLoaded", () => {
  // Année dynamique
  const yearSpan = document.getElementById('year');
  if(yearSpan) yearSpan.textContent = new Date().getFullYear();

  // Traductions FR/EN
  const translations = {
    en: {
      site_title: "Sovereignty & Citizenship of Quebec",
      nav_home: "Home",
      nav_constitution: "Constitution",
      nav_reformes: "Reforms",
      nav_postes: "Positions",
      nav_implication: "Involvement & Recognition",
      nav_differences: "Differences with other parties",
      nav_plateforme: "Electoral platform",
      nav_vision: "Party vision",
      nav_histoire: "Party history",
      nav_contact: "Contact",
      nav_don: "Contribute",
      platform_title: "Electoral Platform",
      vision_title: "Party Vision",
      history_title: "Party History",
      don_title: "Contribute to SCQ"
    },
    fr: {} // FR = textes par défaut
  };

  const langSwitcher = document.getElementById('langSwitcher');
  if(langSwitcher){
    langSwitcher.addEventListener('change', () => {
      const lang = langSwitcher.value;
      document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if(translations[lang] && translations[lang][key]){
          el.textContent = translations[lang][key];
        }
      });
    });
  }
});
