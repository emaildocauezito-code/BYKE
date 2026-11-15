// A prévia reutiliza o catálogo publicado; preços e especificações continuam iguais.
models.forEach(model => {
  model.image = `../${model.image}`;
  const [diagonal, lateral, frontal] = model.gallery;
  model.gallery = [lateral, diagonal, frontal].map(view => ({ ...view, src: `../${view.src}` }));
});
window.BYKEPreview = (() => {
  const facts = [
    { range: 'Até 100 km', charge: '4–5 horas', tire: '700 × 40C · aro 700C', feature: 'Guidão curvo', use: 'Esportiva · Asfalto' },
    { range: 'Até 100 km', charge: '4–6 horas', tire: '27,5 × 2,15″ · aro 27,5″', feature: 'Quadro baixo e cesta', use: 'Urbana · Dia a dia' },
    { range: 'Até 60 km', charge: '5–7 horas', tire: '26 × 4,0″ · aro 26″', feature: 'Suspensão dupla', use: 'Cross · Pisos irregulares' }
  ];
  const slug = model => model.name.toLowerCase();
  const getModel = value => models.find(model => slug(model) === (value === 'wale' ? 'whale' : value)) || models[0];
  const getTerm = value => Object.hasOwn(terms, value) ? value : 'annual';
  const url = (page, model, term) => `${page}?${new URLSearchParams({ modelo: slug(model), plano: getTerm(term) })}`;
  const modelUrl = (model, term) => url('loja.html', model, term);
  const checkoutUrl = (model, term) => url('assinatura.html', model, term);
  const arrow = '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false"><path d="M5 12h14m-6-6 6 6-6 6" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>';
  const termOptions = (model, selected, name = 'duration') => Object.entries(terms).map(([key, term]) => `
    <label class="shop-term-option">
      <input type="radio" name="${name}" value="${key}" ${key === selected ? 'checked' : ''}>
      <span><strong>${term.months} meses</strong><small>${money(term.prices[model.id])}/mês</small></span>
    </label>`).join('');
  const modelCard = (model, selectedTerm) => {
    const term = terms[getTerm(selectedTerm)];
    return `
      <article class="shop-related-card">
        <a class="shop-related-image" href="${modelUrl(model, selectedTerm)}#produto" data-model="${slug(model)}" aria-label="Conhecer ${model.name}"><img src="${model.gallery[0].src}" width="1536" height="1024" loading="lazy" alt="${model.imageAlt}"></a>
        <div class="shop-related-info"><div><p class="eyebrow">${model.tag}</p><h3>${model.name}</h3></div><p class="shop-related-price"><strong>${money(term.prices[model.id])}</strong><span>/mês · ${term.months} meses</span></p></div>
        <p class="shop-related-desc">${model.desc}</p>
        <p class="shop-related-specs">${facts[model.id].range} por carga <span aria-hidden="true">·</span> ${facts[model.id].feature}</p>
        <a class="btn btn-outline" href="${modelUrl(model, selectedTerm)}#produto" data-model="${slug(model)}">Conhecer ${model.name} ${arrow}</a>
      </article>`;
  };
  return { facts, slug, getModel, getTerm, modelUrl, checkoutUrl, arrow, termOptions, modelCard };
})();
