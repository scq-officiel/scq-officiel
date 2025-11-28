// =====================================
// Traduction FR/EN
// =====================================

// Exemple des textes traduits
const translations = {
  "site_title": {
    fr: "Souveraineté & Citoyenneté du Québec",
    en: "Sovereignty & Citizenship of Quebec"
  },
  "site_tagline": {
    fr: "Un parti 100% citoyen — Pour que le Québec appartienne au peuple.",
    en: "A 100% citizen party — So Quebec belongs to the people."
  },
  "nav_accueil": { fr: "Accueil", en: "Home" },
  "nav_constitution": { fr: "Constitution", en: "Constitution" },
  "nav_reformes": { fr: "Réformes", en: "Reforms" },
  "nav_postes": { fr: "Postes", en: "Positions" },
  "nav_implication": { fr: "Implication", en: "Involvement" },
  "nav_differences": { fr: "Différences", en: "Differences" },
  "nav_plateforme": { fr: "Plateforme", en: "Platform" },
  "nav_vision": { fr: "Vision", en: "Vision" },
  "nav_histoire": { fr: "Histoire", en: "History" },
  "nav_don": { fr: "Contribuer", en: "Contribute" },
  "nav_contact": { fr: "Contact", en: "Contact" }
};

// Fonction pour traduire tous les éléments
function translatePage(lang) {
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if(translations[key] && translations[key][lang]) {
      el.textContent = translations[key][lang];
    }
  });
}

// Événement sur le select
document.addEventListener("DOMContentLoaded", () => {
  const langSwitcher = document.getElementById("langSwitcher");
  if(langSwitcher) {
    langSwitcher.addEventListener("change", (e) => {
      translatePage(e.target.value);
    });
  }
  
  // Initialisation année footer
  const yearSpan = document.getElementById("year");
  if(yearSpan) yearSpan.textContent = new Date().getFullYear();
});
