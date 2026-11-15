(() => {
  const styleUrl = href => window.BYKEStyleVariant?.withVariant(href) || href;
  const { facts, getModel, getTerm, termOptions } = BYKEPreview;
  const query = new URLSearchParams(location.search);
  const model = getModel(query.get('modelo'));
  let term = getTerm(query.get('plano'));
  let step = 0;
  let delivery = null;
  let finished = false;
  const form = document.getElementById('delivery-form');
  const paymentLabels = { pix: 'Pix', credit: 'Cartão de crédito', boleto: 'Boleto' };
  const notification = document.getElementById('checkout-notification');
  let notificationTimer;
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

  async function playCompletionSound() {
    let audioContext;
    try {
      const Audio = window.AudioContext || window.webkitAudioContext;
      if (!Audio) return;
      // Criado no clique de conclusão para respeitar a política de áudio do navegador.
      audioContext = new Audio();
      if (audioContext.state === 'suspended') await audioContext.resume();
      if (audioContext.state !== 'running') { await audioContext.close(); return; }
      const start = audioContext.currentTime;
      let remaining = 2;
      [660, 880].forEach((frequency, index) => {
        const oscillator = audioContext.createOscillator();
        const volume = audioContext.createGain();
        const time = start + index * .15;
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(frequency, time);
        volume.gain.setValueAtTime(0, time);
        volume.gain.linearRampToValueAtTime(.065, time + .015);
        volume.gain.exponentialRampToValueAtTime(.001, time + .20);
        oscillator.connect(volume);
        volume.connect(audioContext.destination);
        oscillator.onended = () => {
          oscillator.disconnect(); volume.disconnect();
          if (--remaining === 0) audioContext.close().catch(() => {});
        };
        oscillator.start(time);
        oscillator.stop(time + .23);
      });
    } catch {
      if (audioContext && audioContext.state !== 'closed') await audioContext.close().catch(() => {});
    }
  }

  function syncReceivingChoice() {
    const pickup = form.elements.fulfillment.value === 'pickup';
    const address = document.getElementById('delivery-address');
    const pickupDetails = document.getElementById('pickup-details');
    address.hidden = pickup;
    address.disabled = pickup;
    pickupDetails.hidden = !pickup;
    pickupDetails.disabled = !pickup;
    document.getElementById('fulfillment-date-label').textContent = pickup ? 'Data desejada para retirada' : 'Data desejada para entrega';
    document.getElementById('fulfillment-summary').textContent = pickup ? 'Retirada no ponto combinado' : 'Entrega em casa';
    document.getElementById('payment-summary').textContent = paymentLabels[form.elements.paymentMethod.value];
  }

  function updateChoice() {
    const selected = terms[term];
    const price = selected.prices[model.id];
    const modelLink = `bicicletas.html?plano=${term}#modelos`;
    document.getElementById('back-to-model').href = `bicicletas.html?plano=${term}`;
    document.getElementById('catalog-plans-link').href = modelLink;
    document.querySelector('.nav-quiz').href = `bicicletas.html?quiz=1&plano=${term}`;
    document.getElementById('change-model').href = modelLink;
    document.getElementById('back-to-shop').href = modelLink;
    history.replaceState(null, '', styleUrl(`assinatura.html?${new URLSearchParams({ modelo: model.name.toLowerCase(), plano: term })}`));
    document.getElementById('order-summary').innerHTML = `
      <img class="checkout-summary-image" src="${model.gallery[0].src}" width="1536" height="1024" alt="${model.imageAlt}">
      <p class="eyebrow">${model.tag}</p><h2>${model.name}</h2><p class="checkout-summary-feature">${facts[model.id].feature}</p>
      <dl><div><dt>Duração</dt><dd>${selected.months} meses</dd></div><div><dt>Mensalidade</dt><dd>${money(price)}/mês</dd></div><div><dt>Total do período</dt><dd>${money(price * selected.months)}</dd></div><div><dt>Recebimento</dt><dd id="fulfillment-summary"></dd></div><div><dt>Pagamento</dt><dd id="payment-summary"></dd></div></dl><p class="checkout-summary-note">Valores ilustrativos do protótipo. Sem cobrança.</p>`;
    document.querySelector('.checkout-plan-total').textContent = `${money(price)}/mês durante ${selected.months} meses · ${money(price * selected.months)} no período.`;
    syncReceivingChoice();
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
    const pickup = delivery.fulfillment === 'pickup';
    const street = [delivery.street, delivery.number].map(value => String(value || '').trim()).filter(Boolean).join(', ') || 'Endereço não informado';
    const locality = [delivery.neighborhood, [delivery.city, delivery.state].map(value => String(value || '').trim()).filter(Boolean).join(' / ')].map(value => String(value || '').trim()).filter(Boolean).join(' · ') || 'Localidade não informada';
    const receivingLines = pickup
      ? ['Retirada em ponto BYKE', `Data desejada: ${displayDate(delivery.deliveryDate)}`, 'Local e horário da retirada a combinar.']
      : [`${street}${delivery.complement?.trim() ? ` — ${delivery.complement}` : ''}`, locality, `CEP ${display(delivery.postalCode)}`, `Data desejada: ${displayDate(delivery.deliveryDate)}`];
    target.replaceChildren(
      reviewBlock('Bicicleta e plano', [`BYKE ${model.name} · ${selected.months} meses`, `${money(price)}/mês · ${money(price * selected.months)} no período`], editable ? 0 : undefined),
      reviewBlock('Contato', [display(delivery.fullName), display(delivery.email), display(delivery.phone)], editable ? 1 : undefined),
      reviewBlock(pickup ? 'Retirada' : 'Entrega em casa', receivingLines, editable ? 1 : undefined),
      reviewBlock('Pagamento', [paymentLabels[delivery.paymentMethod], `${money(price)}/mês durante ${selected.months} meses`], editable ? 1 : undefined)
    );
  }
  form.addEventListener('submit', event => {
    event.preventDefault();
    delivery = Object.fromEntries(new FormData(form).entries());
    showStep(2);
  });
  form.addEventListener('change', event => {
    if (['fulfillment', 'paymentMethod'].includes(event.target.name)) syncReceivingChoice();
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
    notification.hidden = false;
    playCompletionSound();
    const message = `${model.name.toUpperCase()} · ${terms[term].months} meses · ${money(terms[term].prices[model.id])}/mês. ${delivery.fulfillment === 'pickup' ? 'Retirada' : 'Entrega em casa'} e ${paymentLabels[delivery.paymentMethod]} selecionados. Confira o comprovante.`;
    requestAnimationFrame(() => { document.getElementById('checkout-notification-message').textContent = message; });
    notificationTimer = setTimeout(dismissNotification, 8000);
  });
  function dismissNotification() {
    clearTimeout(notificationTimer);
    const returnFocus = notification.contains(document.activeElement);
    notification.hidden = true;
    if (returnFocus) document.getElementById('success-title').focus({ preventScroll: true });
  }
  document.getElementById('dismiss-notification').addEventListener('click', dismissNotification);
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !notification.hidden && !document.querySelector('dialog[open]')) dismissNotification();
  });
  document.getElementById('print-order').addEventListener('click', () => window.print());
  updateChoice();
  document.getElementById('to-delivery').disabled = false;
})();
