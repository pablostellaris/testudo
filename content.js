(() => {
  const triggers = [
    'slachtoffer','vermoord','opgelicht','dood',
    'aanval','aanslag','corruptie','zedenzaak',
    'verkrachting','misbruik','geweld'
  ];
  const placeholder = 'Dit is een ongezond artikel';

  // zoek alle tekst­houdende elementen
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
})();
