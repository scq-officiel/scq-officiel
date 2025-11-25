// lang/lang.js
(function(){
  const LANG_FOLDER = '/lang'; // folder where fr.json and en.json are stored
  const SWITCHER_ID = 'langSwitcher';
  let currentLang = localStorage.getItem('scq_lang') || (navigator.language && navigator.language.startsWith('en') ? 'en' : 'fr');
  let dict = null;

  async function loadDict(l){
    try {
      const res = await fetch(`${LANG_FOLDER}/${l}.json`);
      if (!res.ok) throw new Error('Lang file not found');
      dict = await res.json();
    } catch (e) {
      dict = null;
      console.warn('Could not load language file', e);
    }
  }

  function applyInlineElements(l){
    // elements using data-fr/data-en
    document.querySelectorAll('[data-fr], [data-en]').forEach(el=>{
      if(el.hasAttribute('data-i18n')) return; // skip if using i18n dict
      const text = el.getAttribute(l === 'fr' ? 'data-fr' : 'data-en');
      if(text !== null){
        if(el.tagName.toLowerCase() === 'input' || el.tagName.toLowerCase() === 'textarea'){
          // placeholder for form fields
          el.placeholder = text;
        } else if(el.tagName.toLowerCase() === 'option'){
          el.textContent = text;
        } else {
          el.textContent = text;
        }
      }
    });
  }

  function applyDictElements(){
    if(!dict) return;
    document.querySelectorAll('[data-i18n]').forEach(el=>{
      const key = el.getAttribute('data-i18n');
      const value = dict[key];
      if(!value) return;
      if(el.tagName.toLowerCase() === 'input' || el.tagName.toLowerCase() === 'textarea'){
        el.placeholder = value;
      } else {
        el.innerText = value;
      }
    });
  }

  async function applyLanguage(l){
    currentLang = l;
    localStorage.setItem('scq_lang', l);
    // load dictionary (for data-i18n)
    await loadDict(l);
    applyDictElements();
    applyInlineElements(l);
    // update switcher UI if present
    const s = document.getElementById(SWITCHER_ID);
    if(s) s.value = l;
  }

  document.addEventListener('DOMContentLoaded', async ()=>{
    // init switcher
    const s = document.getElementById(SWITCHER_ID);
    if(s){
      s.value = currentLang;
      s.addEventListener('change', (e)=> applyLanguage(e.target.value));
    }
    await applyLanguage(currentLang);
  });
})();
