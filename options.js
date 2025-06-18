const defaults = { violence: true, sexual: true, corruption: true };

function restore() {
  chrome.storage.sync.get(defaults, items => {
    Object.keys(defaults).forEach(key => {
      const input = document.querySelector(`input[name="${key}"]`);
      if (input) input.checked = items[key];
    });
  });
}

function save() {
  const data = {};
  Object.keys(defaults).forEach(key => {
    const input = document.querySelector(`input[name="${key}"]`);
    if (input) data[key] = input.checked;
  });
  chrome.storage.sync.set(data, () => {
    const s = document.getElementById('status');
    s.textContent = 'Instellingen opgeslagen';
    setTimeout(() => s.textContent = '', 1000);
  });
}

document.addEventListener('DOMContentLoaded', restore);
document.getElementById('save').addEventListener('click', ev => {
  ev.preventDefault();
  save();
});
