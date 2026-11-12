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
