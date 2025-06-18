// content.js

console.log("✅ Testudo script geladen");
(() => {
  const placeholder = 'Dit is een ongezond artikel';

  // Triggerwoorden ingedeeld per categorie (wildcard * = 0 of meer letters)
  // Oorlog & geweld
  const warAndViolence = [
    'oorlog*', 'aanval*', 'aanslag*', 'militair*', 'leger*',
    'geweld*', 'wapen*', 'slachtoffer*', 'dood*', 'dodelijk*',
    'moord*', 'vermoord*', 'executi*', 'martel*', 'terrorist*', 'terrorisme*', 'Israël*', 'Gaza*', 'Oekraïn*'
  ];

  // Kinderen & zedendelicten
  const childrenAndSexOffenses = [
    'verkrach*', 'misbruik*', 'aanrand*', 'kindermisbruik*',
    'pedo*', 'zedenzaak*'
  ];

  // Corruptie & schandalen
  const corruptionAndScandals = [
    'corrupt*', 'fraud*', 'oplicht*', 'schandaal*', 'witwas*'
  ];

  // Rampen & ongevallen
  const disastersAndAccidents = [
    'ramp*', 'overstrom*', 'aardbeving*', 'tsunami*',
    'ongeluk*', 'brand*', 'explosie*'
  ];

  // Gezondheid & ziekte
  const healthAndDisease = [
    'virus*', 'epidemie*', 'pandemie*', 'corona*', 'covid*',
    'kanker*', 'ziekte*', 'besmet*'
  ];

  // Criminaliteit algemeen
  const generalCrime = [
    'dwang*', 'gevangene*', 'diefstal*', 'inbraak*', 'drugs*'
  ];

  // Emotioneel belastend / sociaal
  const emotionalAndSocial = [
    'suïcide*', 'zelfmoord*', 'vluchteling*', 'honger*',
    'vlucht*', 'immigratie*'
  ];

  // Alles samenvoegen
  const triggers = [
    ...warAndViolence,
    ...childrenAndSexOffenses,
    ...corruptionAndScandals,
    ...disastersAndAccidents,
    ...healthAndDisease,
    ...generalCrime,
    ...emotionalAndSocial
  ];

  // Van wildcard patronen naar regexes
  const regexes = triggers.map(pattern => {
    const placeholder = '<<STAR>>';
    const tmp = pattern
      .replace(/\*/g, placeholder)                     // * tijdelijk markeren
      .replace(/[.*+?^${}()|[\]\\]/g, '\\$&')          // escape regex-specials
      .replace(new RegExp(placeholder, 'g'), '\\w*');  // wildcard -> woord-characters
    return new RegExp(`\\b${tmp}\\b`, 'i');
  });

  const root = document.querySelector('main') || document.body;
  const selector = 'h1, h2, h3, p, img, a, span';

  function checkAndReplace(el) {
    const text = el.textContent || '';
    if (regexes.some(rx => rx.test(text))) {
      const w = document.createElement('div');
      w.style.cssText =
        'background:#eee;color:#333;padding:1em;border:1px solid #ccc;margin:1em 0;';
      w.innerText = placeholder;
      el.replaceWith(w);
    }
  }

  if (root) {
    root.querySelectorAll(selector).forEach(checkAndReplace);
    new MutationObserver(muts => {
      muts.forEach(({ addedNodes }) =>
        addedNodes.forEach(node => {
          if (!(node instanceof Element)) return;
          if (node.matches(selector)) checkAndReplace(node);
          node.querySelectorAll(selector).forEach(checkAndReplace);
        })
      );
    }).observe(root, { childList: true, subtree: true });
  }
})();