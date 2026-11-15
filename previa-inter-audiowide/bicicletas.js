(() => {
  const styleUrl = href => window.BYKEStyleVariant?.withVariant(href) || href;
  const { getModel, getTerm, modelUrl, modelCard, comparisonTable } = BYKEPreview;
  const controls = document.querySelector('.catalog-terms');
  const cards = document.getElementById('catalog-models');
  let term = getTerm(new URLSearchParams(location.search).get('plano'));
  function renderCards() {
    controls.querySelectorAll('input').forEach(input => { input.checked = input.value === term; });
    document.getElementById('comparison-table').innerHTML = comparisonTable(term);
    cards.innerHTML = models.map(model => modelCard(model, term)).join('');
    document.getElementById('catalog-term-note').textContent = `Contrato de ${terms[term].months} meses · Pagamento mensal`;
    updateProductPrices(term);
    BYKEPreview.refreshNavigation(term);
  }
  controls.addEventListener('change', event => {
    term = getTerm(event.target.value);
    history.replaceState(null, '', styleUrl(`bicicletas.html?plano=${term}${location.hash}`));
    renderCards();
  });
  addEventListener('popstate', () => {
    term = getTerm(new URLSearchParams(location.search).get('plano'));
    renderCards();
  });

  renderCards();
  if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
    }), { threshold: .08 });
    document.querySelectorAll('.catalog-models, .shop-comparison, .shop-quiz-invite').forEach(section => {
      section.classList.add('shop-reveal'); observer.observe(section);
    });
  }
})();
