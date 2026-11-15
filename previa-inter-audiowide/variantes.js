// Os nomes em destaque usam maiúsculas como padrão nesta versão.
(() => {
  const uppercase = true;
  const directory = new URL('.', location.href).pathname;
  if (uppercase) document.documentElement.dataset.modelNames = 'uppercase';
  function withVariant(href) {
    const url = new URL(href, location.href);
    if (url.origin !== location.origin || !url.pathname.startsWith(directory)) return href;
    if (!url.pathname.endsWith('.html')) return href;
    url.searchParams.set('v', 'rodape-2');
    if (uppercase) url.searchParams.set('nomes', 'maiusculos');
    return `${url.pathname.slice(directory.length)}${url.search}${url.hash}`;
  }
  function updateLink(link) {
    const href = link.getAttribute('href');
    if (!href || href.startsWith('#')) return;
    const next = withVariant(href);
    if (next !== href) link.setAttribute('href', next);
  }
  window.BYKEStyleVariant = { uppercase, withVariant };
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('a[href]').forEach(updateLink);
    new MutationObserver(records => {
      for (const record of records) {
        if (record.type === 'attributes') updateLink(record.target);
        else for (const node of record.addedNodes) {
          if (node.nodeType !== Node.ELEMENT_NODE) continue;
          if (node.matches('a[href]')) updateLink(node);
          node.querySelectorAll('a[href]').forEach(updateLink);
        }
      }
    }).observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['href'] });
  });
})();
