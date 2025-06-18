(() => {
  const categories = {
    violence: ['slachtoffer', 'vermoord', 'aanval', 'aanslag', 'geweld', 'dood'],
    corruption: ['corruptie', 'opgelicht'],
    sexual: ['zedenzaak', 'verkrachting', 'misbruik']
  };

  const defaults = { violence: true, corruption: true, sexual: true };
  const placeholder = 'Dit is een ongezond artikel';

  chrome.storage.sync.get(defaults, prefs => {
    const triggers = Object.entries(categories)
      .filter(([cat]) => prefs[cat])
      .flatMap(([, words]) => words);

    const elems = document.querySelectorAll('article, p, h1, h2, h3');
    elems.forEach(el => {
      const text = el.innerText.toLowerCase();
      if (triggers.some(t => text.includes(t))) {
        const w = document.createElement('div');
        w.style.cssText = 'background:#eee;color:#333;padding:1em;border:1px solid #ccc;margin:1em 0;';
        w.innerText = placeholder;
        el.replaceWith(w);
      }
    });
  });
})();
