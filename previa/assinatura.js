(() => {
  const { facts, getModel, getTerm, termOptions } = BYKEPreview;
  const query = new URLSearchParams(location.search);
  const model = getModel(query.get('modelo'));
  let term = getTerm(query.get('plano'));
  let step = 0;
  let delivery = null;
  let finished = false;
  const form = document.getElementById('delivery-form');
  const panels = ['checkout-plan', 'checkout-delivery', 'checkout-review'];
  // O preenchimento desta prévia é livre: nenhum formato ou campo é obrigatório.
  const display = value => String(value || '').trim() || 'Não informado';
  const displayDate = value => {
    const text = String(value || '').trim();
    if (!text) return 'Não informada';
    if (/^\d{4}-\d{2}-\d{2}$/.test(text)) {
      const date = new Date(`${text}T12:00:00Z`);
      if (!Number.isNaN(date.getTime()) && date.toISOString().slice(0,10) === text) {
        return new Intl.DateTimeFormat('pt-BR', { timeZone: 'America/Sao_Paulo', day: '2-digit', month: 'long', year: 'numeric' }).format(date);
      }
    }
    return text;
  };

  function updateChoice() {
    const selected = terms[term];
    const price = selected.prices[model.id];
    const modelLink = `bicicletas.html?plano=${term}#modelos`;
    document.getElementById('back-to-model').href = `bicicletas.html?plano=${term}`;
    document.getElementById('catalog-plans-link').href = modelLink;
    document.getElementById('change-model').href = modelLink;
    document.getElementById('back-to-shop').href = modelLink;
    history.replaceState(null, '', `assinatura.html?${new URLSearchParams({ modelo: model.name.toLowerCase(), plano: term })}`);
    document.getElementById('order-summary').innerHTML = `
      <img class="checkout-summary-image" src="${model.gallery[0].src}" width="1536" height="1024" alt="${model.imageAlt}">
      <p class="eyebrow">${model.tag}</p><h2>${model.name}</h2><p class="checkout-summary-feature">${facts[model.id].feature}</p>
      <dl><div><dt>Duração</dt><dd>${selected.months} meses</dd></div><div><dt>Mensalidade</dt><dd>${money(price)}/mês</dd></div><div><dt>Total do período</dt><dd>${money(price * selected.months)}</dd></div></dl><p class="checkout-summary-note">Valores ilustrativos do protótipo. Sem cobrança.</p>`;
    document.querySelector('.checkout-plan-total').textContent = `${money(price)}/mês durante ${selected.months} meses · ${money(price * selected.months)} no período.`;
  }
  function showStep(index) {
    if (finished) return;
    step = index;
    panels.forEach((id, i) => { document.getElementById(id).hidden = i !== step; });
    document.querySelectorAll('.checkout-stepper li').forEach((item, i) => {
      item.classList.toggle('is-complete', i < step);
      if (i === step) item.setAttribute('aria-current', 'step');
      else item.removeAttribute('aria-current');
    });
    if (step === 2) renderReview(document.getElementById('review-data'), true);
    document.querySelector(`#${panels[step]} h2`).focus({ preventScroll: true });
    document.querySelector('.checkout-stepper').scrollIntoView({ behavior: 'instant', block: 'start' });
  }
  function reviewBlock(title, lines, editStep) {
    const block = document.createElement('section');
    block.className = 'checkout-review-block';
    const heading = document.createElement('div');
    heading.className = 'checkout-review-heading';
    const h3 = document.createElement('h3'); h3.textContent = title; heading.append(h3);
    if (editStep !== undefined) {
      const button = document.createElement('button');
      button.type = 'button'; button.textContent = 'Editar';
      button.setAttribute('aria-label', `Editar ${title.toLowerCase()}`);
      button.addEventListener('click', () => showStep(editStep)); heading.append(button);
    }
    block.append(heading);
    for (const line of lines) { const p = document.createElement('p'); p.textContent = line; block.append(p); }
    return block;
  }
  function renderReview(target, editable) {
    const selected = terms[term];
    const price = selected.prices[model.id];
    const street = [delivery.street, delivery.number].map(value => value.trim()).filter(Boolean).join(', ') || 'Endereço não informado';
    const locality = [delivery.neighborhood, [delivery.city, delivery.state].map(value => value.trim()).filter(Boolean).join(' / ')].map(value => value.trim()).filter(Boolean).join(' · ') || 'Localidade não informada';
    target.replaceChildren(
      reviewBlock('Bicicleta e plano', [`BYKE ${model.name} · ${selected.months} meses`, `${money(price)}/mês · ${money(price * selected.months)} no período`], editable ? 0 : undefined),
      reviewBlock('Contato', [display(delivery.fullName), display(delivery.email), display(delivery.phone)], editable ? 1 : undefined),
      reviewBlock('Entrega', [`${street}${delivery.complement.trim() ? ` — ${delivery.complement}` : ''}`, locality, `CEP ${display(delivery.postalCode)}`, `Data desejada: ${displayDate(delivery.deliveryDate)}`], editable ? 1 : undefined)
    );
  }
  form.addEventListener('submit', event => {
    event.preventDefault();
    delivery = Object.fromEntries(new FormData(form).entries());
    showStep(2);
  });
  document.getElementById('checkout-terms').innerHTML = termOptions(model, term, 'checkoutDuration');
  document.getElementById('checkout-model-choice').innerHTML = `<div class="checkout-selected-bike"><img src="${model.gallery[0].src}" width="1536" height="1024" alt="${model.imageAlt}"><div><p class="eyebrow">${model.tag}</p><h3>${model.name}</h3><p>${facts[model.id].feature}</p></div></div>`;
  document.getElementById('checkout-terms').addEventListener('change', event => { term = getTerm(event.target.value); updateChoice(); });
  document.getElementById('to-delivery').addEventListener('click', () => showStep(1));
  document.querySelectorAll('[data-back]').forEach(button => button.addEventListener('click', () => showStep(Number(button.dataset.back))));
  document.getElementById('finish-order').addEventListener('click', event => {
    if (finished || step !== 2 || !delivery) return;
    finished = true;
    event.currentTarget.disabled = true;
    document.getElementById('checkout-layout').hidden = true;
    const success = document.getElementById('checkout-success');
    success.hidden = false;
    const summary = document.getElementById('success-summary');
    const reference = document.createElement('p');
    reference.className = 'checkout-reference';
    reference.textContent = `Comprovante demonstrativo BYKE-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;
    const details = document.createElement('div');
    renderReview(details, false);
    summary.append(reference, details);
    document.querySelectorAll('.checkout-stepper li').forEach(item => { item.classList.add('is-complete'); item.removeAttribute('aria-current'); });
    document.getElementById('success-title').focus({ preventScroll: true });
    success.scrollIntoView({ behavior: 'instant', block: 'start' });
  });
  document.getElementById('print-order').addEventListener('click', () => window.print());
  updateChoice();
  document.getElementById('to-delivery').disabled = false;
})();
