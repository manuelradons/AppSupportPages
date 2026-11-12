/* Shared behaviour only. Each app owns its markup, typography and colours. */
(() => {
  const panels = [...document.querySelectorAll('[data-language]')];
  const choices = [...document.querySelectorAll('[data-language-choice]')];
  if (!panels.length) return;

  const languages = panels.map(panel => panel.dataset.language);
  const supported = tag => {
    const language = String(tag || '').trim().toLowerCase().split(/[-_]/)[0];
    return languages.includes(language) ? language : null;
  };
  const preferences = navigator.languages?.length ? navigator.languages : [navigator.language];
  const automatic = preferences.map(supported).find(Boolean) || 'en';
  const requested = supported(new URL(location.href).searchParams.get('lang'));
  let activeLanguage = requested || automatic;

  function hashTarget() {
    try { return document.getElementById(decodeURIComponent(location.hash.slice(1))); }
    catch { return null; }
  }

  function showLanguage() {
    const target = hashTarget();
    const selected = target?.closest('[data-language]') ||
      panels.find(panel => panel.dataset.language ===
        (target ? activeLanguage : requested || automatic)) || panels[0];
    const language = selected.dataset.language;
    activeLanguage = language;
    const focusedPanel = document.activeElement?.closest('[data-language]');
    for (const panel of panels) panel.hidden = panel !== selected;
    document.documentElement.lang = language;
    document.title = selected.dataset.pageTitle || document.title;
    const description = document.querySelector('meta[name="description"]');
    if (description && selected.dataset.description) description.content = selected.dataset.description;

    // Translate the current section anchor as well as the language. Switching
    // languages halfway through a policy should keep the reader in that section.
    const section = target?.id.startsWith(`${language}-`)
      ? target.id.slice(language.length + 1)
      : selected.id.slice(language.length + 1);
    for (const choice of choices) {
      const next = choice.dataset.languageChoice;
      const destination = document.getElementById(`${next}-${section}`) ||
        panels.find(panel => panel.dataset.language === next);
      if (destination) choice.setAttribute('href', `#${destination.id}`);
      if (next === language) choice.setAttribute('aria-current', 'true');
      else choice.removeAttribute('aria-current');
    }
    for (const link of document.querySelectorAll('[data-localized-href]')) {
      link.setAttribute('href', link.dataset.localizedHref.replaceAll('{lang}', language));
    }
    for (const element of document.querySelectorAll('[data-label-en][data-label-de]')) {
      element.setAttribute('aria-label', element.dataset[language === 'de' ? 'labelDe' : 'labelEn']);
    }
    if (focusedPanel && focusedPanel !== selected) {
      choices.find(choice => choice.dataset.languageChoice === language)?.focus({ preventScroll: true });
    }
    if (target && selected.contains(target)) {
      for (let ancestor = target; ancestor && ancestor !== selected; ancestor = ancestor.parentElement) {
        if (ancestor.tagName === 'DETAILS') ancestor.open = true;
      }
      requestAnimationFrame(() => target.scrollIntoView({ block: 'start' }));
    }
  }

  for (const choice of choices) choice.addEventListener('click', () => {
    if (choice.hash === location.hash) showLanguage();
  });
  window.addEventListener('hashchange', showLanguage);
  showLanguage();
})();
