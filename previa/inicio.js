// Os menus compartilhados continuam usando o catálogo, com destinos da prévia.
(() => {
  const legacyModels = { '#modelo-01': 'marlin', '#modelo-02': 'tuna', '#modelo-03': 'whale' };
  document.querySelectorAll('a[href]').forEach(link => {
    const url = new URL(link.href);
    const page = url.pathname.split('/').pop();
    if (!['bicicletas.html', 'planos.html'].includes(page)) return;
    const name = url.searchParams.get('modelo') || legacyModels[url.hash];
    link.href = name ? BYKEPreview.modelUrl(BYKEPreview.getModel(name), url.searchParams.get('plano')) : 'loja.html';
  });
})();
