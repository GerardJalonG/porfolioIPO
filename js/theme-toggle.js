(function () {
  const storageKey = 'theme-preference';
  const btn = document.getElementById('theme-toggle');
  const mq = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)');

  function setTheme(theme) {
    if (theme === 'light') {
      document.body.classList.add('light-theme');
      document.body.classList.remove('dark-theme');
      if (btn) { btn.textContent = '☀️'; btn.setAttribute('aria-pressed', 'false'); }
    } else {
      document.body.classList.remove('light-theme');
      document.body.classList.add('dark-theme');
      if (btn) { btn.textContent = '🌙'; btn.setAttribute('aria-pressed', 'true'); }
    }
  }

  const stored = localStorage.getItem(storageKey);
  const initial = stored || 'dark';
  setTheme(initial);

  if (btn) {
    btn.addEventListener('click', function () {
      const isLight = document.body.classList.contains('light-theme');
      const newTheme = isLight ? 'dark' : 'light';
      setTheme(newTheme);
      localStorage.setItem(storageKey, newTheme);
    });
  }

  // Do not follow system changes if user hasn't set a preference;
  // we intentionally default to dark. Keep listener only to update
  // if the user explicitly clears preference and you want system sync
  // (currently we skip automatic system sync to keep default dark behaviour).
})();
