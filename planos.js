const termPicker = document.querySelector('.detail-term-picker');
const termNote = document.querySelector('.detail-term-note');
const bikePlanGrid = document.querySelector('.detail-plan-grid');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const modal = document.getElementById('modal');
const modelSelect = document.getElementById('model-select');
const termSelect = document.getElementById('term-select');
const toast = document.getElementById('toast');
let returnFocus;
let toastTimer;

models.forEach(model => modelSelect.add(new Option(model.name, model.id)));

bikePlanGrid.innerHTML = models.map(model => `
  <article class="detail-plan">
    <span class="eyebrow">${model.tag}</span>
    <h3>${model.name}</h3>
    <div class="plan-gallery" role="group" aria-roledescription="carrossel"
      aria-label="Fotos da ${model.name}" data-gallery-model="${model.id}" data-view="0">
      <div class="plan-gallery-stage">
        <img id="plan-image-${model.id}" class="plan-gallery-image"
          src="${model.gallery[0].src}" width="1536" height="1024" loading="lazy" decoding="async"
          alt="${model.imageAlt} — ${model.gallery[0].label.toLowerCase()}">
        <button class="plan-gallery-arrow plan-gallery-arrow--prev" type="button" data-view-step="-1"
          aria-label="Ângulo anterior da ${model.name}" aria-controls="plan-image-${model.id}">
          <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="m14 6-6 6 6 6"/></svg>
        </button>
        <button class="plan-gallery-arrow plan-gallery-arrow--next" type="button" data-view-step="1"
          aria-label="Próximo ângulo da ${model.name}" aria-controls="plan-image-${model.id}">
          <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="m10 6 6 6-6 6"/></svg>
        </button>
      </div>
      <p class="plan-gallery-caption"><span data-view-label>${model.gallery[0].label}</span><span data-view-count aria-hidden="true">1 / ${model.gallery.length}</span></p>
      <span class="plan-gallery-status" role="status" aria-live="polite" aria-atomic="true"></span>
    </div>
    <div class="plan-price"><strong></strong><span> / mês</span></div>
    <ul class="detail-list">
      ${model.specs.map(spec => `<li>${spec}</li>`).join('')}
    </ul>
    <a class="btn btn-outline" data-pick="${model.id}"
      aria-label="Simular assinatura da ${model.name}">
      Simular assinatura <span aria-hidden="true">↗</span>
    </a>
  </article>`).join('');

const planCards = bikePlanGrid.querySelectorAll('.detail-plan');

bikePlanGrid.addEventListener('click', async event => {
  const button = event.target.closest('button[data-view-step]');
  if (!button) return;

  const gallery = button.closest('.plan-gallery');
  if (gallery.getAttribute('aria-busy') === 'true') return;

  const model = models[Number(gallery.dataset.galleryModel)];
  const nextView = (Number(gallery.dataset.view) + Number(button.dataset.viewStep) +
    model.gallery.length) % model.gallery.length;
  const view = model.gallery[nextView];
  const status = gallery.querySelector('.plan-gallery-status');
  gallery.setAttribute('aria-busy', 'true');

  try {
    const nextImage = new Image();
    nextImage.src = view.src;
    await nextImage.decode();
    const image = gallery.querySelector('.plan-gallery-image');
    image.src = view.src;
    image.alt = `${model.imageAlt} — ${view.label.toLowerCase()}`;
    gallery.dataset.view = String(nextView);
    gallery.querySelector('[data-view-label]').textContent = view.label;
    gallery.querySelector('[data-view-count]').textContent = `${nextView + 1} / ${model.gallery.length}`;
    status.textContent = `${model.name}: ${view.label.toLowerCase()}, imagem ${nextView + 1} de ${model.gallery.length}.`;
  } catch {
    status.textContent = 'Não foi possível carregar este ângulo. Tente novamente.';
  } finally {
    gallery.setAttribute('aria-busy', 'false');
  }
});

function updateBikePrices(animate) {
  const selectedTerm = termPicker.querySelector(':checked').value;
  const term = terms[selectedTerm];
  termNote.textContent = `Contrato de ${termDuration(term)} · Pagamento mensal`;
  updateProductPrices(selectedTerm);
  termSelect.value = selectedTerm;
  updateSummary();

  planCards.forEach((card, index) => {
    const model = models[index];
    const price = card.querySelector('.plan-price');
    price.querySelector('strong').textContent = money(term.prices[model.id]);
    card.querySelector('a').href = simulationUrl(model, selectedTerm);

    price.getAnimations().forEach(animation => animation.cancel());
    if (animate && !reduceMotion.matches) {
      price.animate([
        { opacity: .45, transform: 'translateY(5px)' },
        { opacity: 1, transform: 'translateY(0)' }
      ], { duration: 240, delay: index * 35, easing: 'ease-out', fill: 'backwards' });
    }
  });
}

function updateSummary() {
  const term = terms[termSelect.value];
  document.getElementById('summary-plan').textContent = `Assinatura ${term.label}`;
  document.getElementById('summary-price').textContent =
    `${money(term.prices[Number(modelSelect.value)])} / mês`;
  document.getElementById('summary-term').textContent = termDuration(term);
}

function openSimulator(model, trigger) {
  returnFocus = trigger;
  modelSelect.value = String(model);
  updateSummary();
  modal.inert = false;
  modal.classList.add('show');
  modal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('locked');
  modal.querySelector('.close-modal').focus();
}

function closeSimulator() {
  modal.classList.remove('show');
  document.body.classList.remove('locked');
  const fallback = planCards[Number(modelSelect.value)].querySelector('a');
  const target = returnFocus?.closest('[inert]') ? document.querySelector('.products-toggle') :
    returnFocus || fallback;
  target.focus({ preventScroll: true });
  modal.inert = true;
  modal.setAttribute('aria-hidden', 'true');
}

document.addEventListener('click', event => {
  const link = event.target.closest('a[data-pick]');
  if (link && !event.ctrlKey && !event.metaKey && !event.shiftKey && !event.altKey) {
    event.preventDefault();
    openSimulator(Number(link.dataset.pick), link);
  }
  if (event.target.closest('[data-close]')) closeSimulator();
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && !modal.inert) closeSimulator();
});
modelSelect.addEventListener('change', updateSummary);
termSelect.addEventListener('change', () => {
  termPicker.querySelector(`[value="${termSelect.value}"]`).checked = true;
  updateBikePrices(true);
});
document.getElementById('confirm').addEventListener('click', () => {
  const model = models[Number(modelSelect.value)];
  const term = terms[termSelect.value];
  closeSimulator();
  toast.textContent = `Simulação concluída: ${model.name}, plano ${term.label}, por ` +
    `${money(term.prices[model.id])}/mês durante ${termDuration(term)}. ` +
    'Nenhuma assinatura foi realizada.';
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 4400);
});

const planQuery = new URLSearchParams(window.location.search);
const planParam = planQuery.get('plano');
const initialTerm = planParam === 'monthly' ? 'quarterly' : planParam;
if (Object.hasOwn(terms, initialTerm)) {
  termPicker.querySelector(`[value="${initialTerm}"]`).checked = true;
}
termPicker.addEventListener('change', () => updateBikePrices(true));
window.addEventListener('pageshow', () => updateBikePrices(false));
updateBikePrices(false);

const requestedModel = planQuery.get('modelo');
const initialModel = models.find(model => model.name.toLowerCase() ===
  (requestedModel === 'wale' ? 'whale' : requestedModel));
if (initialModel) openSimulator(initialModel.id);
