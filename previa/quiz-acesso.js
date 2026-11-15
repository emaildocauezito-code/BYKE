(() => {
  const content = document.getElementById('quiz-content');
  const dialog = document.getElementById('bike-quiz');
  let openedFrom;
  document.addEventListener('click', event => {
    const trigger = event.target.closest('[data-open-quiz]');
    if (trigger) openedFrom = trigger;
  }, true);
  dialog.addEventListener('close', () => {
    if (openedFrom?.closest('.nav') && openedFrom.getClientRects().length === 0) {
      document.querySelector('.menu-toggle').focus({ preventScroll: true });
    }
  });
  const selectedTerm = () => {
    const input = document.querySelector('input[name="duration"]:checked, input[name="catalogDuration"]:checked, input[name="checkoutDuration"]:checked');
    return BYKEPreview.getTerm(input?.value || new URLSearchParams(location.search).get('plano'));
  };
  new MutationObserver(() => {
    content.querySelectorAll('a[href]').forEach(link => {
      const name = new URL(link.href).searchParams.get('modelo');
      if (!name) return;
      const model = BYKEPreview.getModel(name);
      link.href = BYKEPreview.modelUrl(model, selectedTerm());
      link.dataset.model = BYKEPreview.slug(model);
    });
  }).observe(content, { childList: true, subtree: true });
  if (new URLSearchParams(location.search).get('quiz') === '1') {
    document.querySelector('header [data-open-quiz]').click();
  }
})();
