// Adapta os destinos do menu compartilhado sem alterar o site atual.
(() => {
  const legacyModels = { '#modelo-01': 'marlin', '#modelo-02': 'tuna', '#modelo-03': 'whale' };
  function refreshNavigation(selectedTerm) {
    document.querySelectorAll('a[href]').forEach(link => {
      const url = new URL(link.href);
      const page = url.pathname.split('/').pop();
      if (!['bicicletas.html', 'planos.html'].includes(page)) return;
      // Os links para a versão publicada devem continuar saindo da prévia.
      if (!url.pathname.includes('/previa/')) return;
      const name = url.searchParams.get('modelo') || legacyModels[url.hash];
      if (name) {
        link.href = BYKEPreview.modelUrl(BYKEPreview.getModel(name), url.searchParams.get('plano'));
      } else if (page === 'planos.html') {
        link.href = 'bicicletas.html#modelos';
      } else if (selectedTerm) {
        link.href = `bicicletas.html?plano=${BYKEPreview.getTerm(selectedTerm)}${url.hash}`;
      }
    });
  }
  BYKEPreview.refreshNavigation = refreshNavigation;
  refreshNavigation();
})();
