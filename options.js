const defaults = {
  violence: true,
  sexual: true,
  corruption: true
};

function save() {
  const settings = {};
  Object.keys(defaults).forEach(key => {
    const input = document.querySelector(`input[name="${key}"]`);
    if (input) settings[key] = input.checked;
  });

  chrome.storage.sync.set(settings, () => {
    const status = document.getElementById('status');
    status.textContent = 'Opgeslagen!';
    setTimeout(() => status.textContent = '', 1500);
  });
}

function restore() {
  chrome.storage.sync.get(null, items => {
    Object.keys(defaults).forEach(key => {
      const input = document.querySelector(`input[name="${key}"]`);
      if (input) input.checked = items.hasOwnProperty(key) ? items[key] : defaults[key];
    });
  });
}

document.addEventListener('DOMContentLoaded', restore);
const saveButton = document.getElementById('save');
if (saveButton) {
  saveButton.addEventListener('click', save);
}