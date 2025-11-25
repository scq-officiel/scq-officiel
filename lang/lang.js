// lang/lang.js
(async function(){
  const switcher = () => document.getElementById('langSwitcher');
  let lang = localStorage.getItem('scq_lang') || (navigator.language && navigator.language.startsWith('en') ? 'en' : 'fr');
  async function loadLang(l){
    try{
      const res = await fetch(`/lang/${l}.json`);
      const dict = await res.json();
      document.querySelectorAll('[data-i18n]').forEach(el=>{
        const key = el.getAttribute('data-i18n');
        if(dict[key]) {
          if(el.tagName.toLowerCase()==='input' || el.tagName.toLowerCase()==='textarea'){
            el.placeholder = dict[key];
          } else {
            el.innerText = dict[key];
          }
        }
      });
      localStorage.setItem('scq_lang', l);
    }catch(e){
      console.warn('Lang file load error',e);
    }
  }
  // init
  document.addEventListener('DOMContentLoaded', ()=> {
    const sel = document.getElementById('langSwitcher');
    if(sel){
      sel.value = lang;
      sel.addEventListener('change', (e)=>{ loadLang(e.target.value); });
    }
    loadLang(lang);
  });
})();
