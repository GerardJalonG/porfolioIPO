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
  const prefersDark = mq ? mq.matches : true;
  const initial = stored || (prefersDark ? 'dark' : 'light');
  setTheme(initial);

  if (btn) {
    btn.addEventListener('click', function () {
      const isLight = document.body.classList.contains('light-theme');
      const newTheme = isLight ? 'dark' : 'light';
      setTheme(newTheme);
      localStorage.setItem(storageKey, newTheme);
    });
  }

  if (mq) {
    const listener = (e) => {
      if (!localStorage.getItem(storageKey)) {
        setTheme(e.matches ? 'dark' : 'light');
      }
    };
    if (mq.addEventListener) mq.addEventListener('change', listener);
    else if (mq.addListener) mq.addListener(listener);
  }
})();
