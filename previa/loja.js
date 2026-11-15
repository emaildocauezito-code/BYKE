(() => {
  const { facts, slug, getModel, getTerm, modelUrl, checkoutUrl, arrow, termOptions } = BYKEPreview;
  const product = document.getElementById('produto');
  const related = document.getElementById('related-models');
  const status = document.getElementById('shop-status');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  let model;
  let term;
  let currentView = 0;
  let galleryRequest = 0;
  let quizReturnFocus;
  let forwardingQuiz = false;
  const quiz = document.getElementById('bike-quiz');
  quiz.addEventListener('close', () => {
    const target = quizReturnFocus;
    quizReturnFocus = null;
    if (target?.isConnected) requestAnimationFrame(() => target.focus({ preventScroll: true }));
  });
  new MutationObserver(() => {
    quiz.querySelectorAll('a[href]').forEach(link => {
      const requested = new URL(link.href).searchParams.get('modelo');
      if (requested) { link.href = modelUrl(getModel(requested), term); link.dataset.model = requested; }
    });
  }).observe(document.getElementById('quiz-content'), { childList: true, subtree: true });

  function readLocation() {
    const query = new URLSearchParams(location.search);
    const legacy = { '#modelo-01': 'marlin', '#modelo-02': 'tuna', '#modelo-03': 'whale' };
    model = getModel(query.get('modelo') || legacy[location.hash]);
    term = getTerm(query.get('plano'));
  }
  function renderPrice() {
    const selected = terms[term];
    const price = selected.prices[model.id];
    document.getElementById('product-price').textContent = money(price);
    document.getElementById('product-total').textContent = `${selected.months} meses · ${money(price * selected.months)} no período`;
    document.getElementById('subscribe-link').href = checkoutUrl(model, term);
    document.querySelectorAll('[data-model]').forEach(link => { link.href = modelUrl(getModel(link.dataset.model), term); });
    related.innerHTML = models.filter(other => other.id !== model.id).map(other => `
      <article class="shop-related-card">
        <a class="shop-related-image" href="${modelUrl(other, term)}#produto" data-model="${slug(other)}" aria-label="Conhecer ${other.name}"><img src="${other.gallery[0].src}" width="1536" height="1024" loading="lazy" alt="${other.imageAlt}"></a>
        <div class="shop-related-info"><div><p class="eyebrow">${other.tag}</p><h3>${other.name}</h3></div><p class="shop-related-price"><strong>${money(selected.prices[other.id])}</strong><span>/mês · ${selected.months} meses</span></p></div>
        <p class="shop-related-desc">${other.desc}</p>
        <p class="shop-related-specs">${facts[other.id].range} por carga <span aria-hidden="true">·</span> ${facts[other.id].feature}</p>
        <a class="btn btn-outline" href="${modelUrl(other, term)}#produto" data-model="${slug(other)}">Conhecer ${other.name} ${arrow}</a>
      </article>`).join('');
  }
  function renderProduct() {
    galleryRequest++;
    currentView = 0;
    const fact = facts[model.id];
    document.title = `${model.name} — Bicicletas e planos BYKE`;
    document.getElementById('breadcrumb-model').textContent = model.name;
    document.querySelectorAll('.shop-model-nav a').forEach(link => {
      if (link.dataset.model === slug(model)) link.setAttribute('aria-current', 'true');
      else link.removeAttribute('aria-current');
    });
    product.innerHTML = `
      <div class="shop-gallery" role="group" aria-label="Fotos da ${model.name}">
        <div class="shop-gallery-stage"><span class="shop-gallery-tag">BYKE / ${model.name.toUpperCase()}</span>
          <img class="shop-gallery-image" src="${model.gallery[0].src}" width="1536" height="1024" alt="${model.imageAlt} — vista lateral" fetchpriority="high">
          <button class="shop-gallery-arrow shop-gallery-prev" type="button" data-view-step="-1" aria-label="Ângulo anterior da ${model.name}">←</button>
          <button class="shop-gallery-arrow shop-gallery-next" type="button" data-view-step="1" aria-label="Próximo ângulo da ${model.name}">→</button>
        </div>
        <div class="shop-gallery-bottom"><span id="view-caption">Vista lateral</span><span id="view-count">01 / 03</span></div>
        <div class="shop-thumbnails" role="group" aria-label="Escolha um ângulo da ${model.name}">${model.gallery.map((view, index) => `<button type="button" data-view="${index}" aria-pressed="${index === 0}" aria-label="${view.label} da ${model.name}"><img src="${view.src}" width="1536" height="1024" alt=""><span>${view.label.replace('Vista ', '')}</span></button>`).join('')}</div>
      </div>
      <div class="shop-product-info"><p class="eyebrow">BYKE · ${model.tag}</p><h1 id="product-name" tabindex="-1">${model.name}</h1><p class="shop-description">${model.desc}</p>
        <dl class="shop-facts"><div><dt>Autonomia estimada</dt><dd>${fact.range}<small>por carga</small></dd></div><div><dt>Recarga estimada</dt><dd>${fact.charge}</dd></div></dl>

        <section class="shop-plan" id="plano" aria-labelledby="plan-title"><div class="shop-plan-heading"><h2 id="plan-title">Escolha a duração</h2><span>Pagamento mensal</span></div>
          <fieldset class="shop-terms"><legend class="shop-sr-only">Duração da assinatura da ${model.name}</legend>${termOptions(model, term)}</fieldset>
          <div class="shop-price" aria-live="polite"><p><strong id="product-price"></strong><span>/mês</span></p><span id="product-total"></span></div>
          <a class="btn btn-dark shop-subscribe" id="subscribe-link" href="${checkoutUrl(model, term)}">Assinar ${model.name} ${arrow}</a>
          <p class="shop-plan-note">Na próxima etapa, informe a entrega e revise sua escolha.</p>
        </section>
        <details class="shop-technical"><summary>Ver ficha técnica</summary><dl><div><dt>Pneus e aros propostos</dt><dd>${fact.tire}</dd></div><div><dt>Diferencial</dt><dd>${fact.feature}</dd></div></dl></details>
        <a class="shop-help" href="#bike-quiz" data-quiz-forward>Em dúvida? Descubra sua BYKE com o quiz <span aria-hidden="true">→</span></a>
      </div>`;
    renderPrice();
  }
  function navigateModel(nextModel) {
    if (quiz.open) {
      quiz.addEventListener('close', () => requestAnimationFrame(() => document.getElementById('product-name').focus({ preventScroll: true })), { once: true });
      quiz.close();
    }
    if (nextModel.id !== model.id) {
      model = nextModel;
      history.pushState(null, '', `${modelUrl(model, term)}#produto`);
      renderProduct();
    }
    document.getElementById('product-name').focus({ preventScroll: true });
    product.scrollIntoView({ behavior: reducedMotion.matches ? 'instant' : 'smooth', block: 'start' });
    status.textContent = `${model.name} selecionada. Informações e mensalidades atualizadas.`;
  }
  async function changeView(nextView) {
    const index = (nextView + model.gallery.length) % model.gallery.length;
    if (index === currentView) return;
    const view = model.gallery[index];
    const token = ++galleryRequest;
    const galleryImage = product.querySelector('.shop-gallery-image');
    try {
      const image = new Image();
      image.src = view.src;
      await image.decode();
      if (token !== galleryRequest) return;
      galleryImage.src = view.src;
      galleryImage.alt = `${model.imageAlt} — ${view.label.toLowerCase()}`;
      currentView = index;
      document.getElementById('view-caption').textContent = view.label;
      document.getElementById('view-count').textContent = `0${index + 1} / 03`;
      product.querySelectorAll('[data-view]').forEach(button => button.setAttribute('aria-pressed', String(Number(button.dataset.view) === index)));
      if (!reducedMotion.matches) galleryImage.animate([{ opacity: .35, transform: 'translateY(6px)' }, { opacity: 1, transform: 'none' }], { duration: 300, easing: 'ease-out' });
      status.textContent = `${model.name}: ${view.label.toLowerCase()}.`;
    } catch { if (token === galleryRequest) status.textContent = 'Não foi possível carregar este ângulo. Tente novamente.'; }
  }
  product.addEventListener('change', event => {
    if (!event.target.matches('[name="duration"]')) return;
    term = getTerm(event.target.value);
    history.replaceState(null, '', `${modelUrl(model, term)}${location.hash}`);
    renderPrice();
  });
  product.addEventListener('click', event => {
    const button = event.target.closest('[data-view], [data-view-step]');
    if (button) changeView(button.hasAttribute('data-view') ? Number(button.dataset.view) : currentView + Number(button.dataset.viewStep));
    if (event.target.closest('[data-quiz-forward]')) {
      event.preventDefault();
      quizReturnFocus = event.target.closest('[data-quiz-forward]');
      forwardingQuiz = true;
      document.querySelector('.shop-quiz-invite [data-open-quiz]').click();
      forwardingQuiz = false;
    }
  });
  // Keep the shared quiz's selected model inside this unified preview.
  document.addEventListener('click', event => {
    if (event.target.closest('[data-open-quiz]') && !forwardingQuiz) quizReturnFocus = null;
    const link = event.target.closest('a[href]');
    if (!link || event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    const quizModel = link.closest('#bike-quiz') ? new URL(link.href).searchParams.get('modelo') : null;
    if (!link.hasAttribute('data-model') && !quizModel) return;
    event.preventDefault();
    navigateModel(getModel(quizModel || link.dataset.model));
  });
  addEventListener('popstate', () => { readLocation(); renderProduct(); });
  readLocation();
  renderProduct();
  if ('IntersectionObserver' in window && !reducedMotion.matches) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
    }), { threshold: .1 });
    document.querySelectorAll('.shop-related, .shop-quiz-invite, .shop-faq').forEach(section => { section.classList.add('shop-reveal'); observer.observe(section); });
  }
})();
