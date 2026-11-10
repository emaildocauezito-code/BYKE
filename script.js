const params = new URLSearchParams(window.location.search);
const planParam = params.get('plano');
const requestedTerm = planParam === 'monthly' ? 'quarterly' : planParam;
let selectedTerm = Object.hasOwn(terms, requestedTerm) ? requestedTerm : 'annual';
const monthlyPrice = model => terms[selectedTerm].prices[model.id];
const planGrid = document.getElementById('plan-grid');

function renderPlans() {
  const term = terms[selectedTerm];
  planGrid.innerHTML = models.map((model, index) => {
    const saving = terms.quarterly.prices[index] - term.prices[index];
    const annualSaving = terms.quarterly.prices[index] - terms.annual.prices[index];
    return `
      <article class="plan-card${index === 1 ? ' featured' : ''}">
        <div class="plan-visual">
          <img src="bike.svg" alt="Ilustração conceitual de ${model.name}"
            class="bike-${index}" loading="lazy">
        </div>
        <span class="plan-label">${model.tag}</span>
        <h3>${model.name}</h3>
        <p class="plan-tagline">${model.tagline}</p>
        <p class="plan-description">${model.desc}</p>
        <div class="plan-price">
          <strong>${money(monthlyPrice(model))}</strong><span> / mês</span>
        </div>
        <p class="plan-saving">${selectedTerm !== 'quarterly'
          ? `Economize ${money(saving)}/mês em relação ao trimestral`
          : `No anual, você economiza ${money(annualSaving)}/mês`}</p>
        <div class="plan-divider"></div>
        <p>Contrato de ${termDuration(term)}</p>
        <ul>
          <li>Bicicleta elétrica para uso diário</li>
          <li>Permanece na sua casa durante o plano</li>
          <li>Pagamento mensal ilustrativo</li>
        </ul>
        <button class="btn ${index === 1 ? 'btn-green' : 'btn-outline'} full"
          data-pick="${model.id}">Selecionar modelo ↗</button>
      </article>`;
  }).join('');
  document.getElementById('plan-selection-note').textContent =
    `Plano ${term.label}: contrato de ${termDuration(term)}, com pagamento mensal.`;
  document.getElementById('term-select').value = selectedTerm;
  document.querySelectorAll('[data-term]').forEach(button => {
    button.setAttribute('aria-pressed', String(button.dataset.term === selectedTerm));
  });
  updateProductPrices(selectedTerm);
}

function selectTerm(term) {
  if (!Object.hasOwn(terms, term)) return;
  selectedTerm = term;
  document.getElementById('term-select').value = term;
  renderPlans();
  update();
}

document.querySelectorAll('[data-term]').forEach(button => {
  button.addEventListener('click', () => selectTerm(button.dataset.term));
});
document.getElementById('term-select').addEventListener('change', event => {
  selectTerm(event.target.value);
});
renderPlans();
const sel=document.getElementById('model-select'),modal=document.getElementById('modal'),price=document.getElementById('summary-price'),toast=document.getElementById('toast');models.forEach(m=>sel.add(new Option(m.name,m.id)));
function openModal(i=0){sel.value=String(i);update();modal.classList.add('show');modal.setAttribute('aria-hidden','false');document.body.classList.add('locked');document.querySelector('.close-modal').focus()}
function update() {
  price.textContent = money(monthlyPrice(models[Number(sel.value)])) + ' / mês';
  document.getElementById('summary-plan').textContent =
    'Assinatura ' + terms[selectedTerm].label;
  document.getElementById('summary-term').textContent =
    termDuration(terms[selectedTerm]);
}
function closeModal(){modal.classList.remove('show');modal.setAttribute('aria-hidden','true');document.body.classList.remove('locked')}
let toastTimer;function notify(s){toast.textContent=s;toast.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove('show'),4400)}
const mainNav = document.querySelector('.nav');
const menuToggle = document.querySelector('.menu-toggle');
document.addEventListener('click', event => {
  const pick = event.target.closest('[data-pick]');
  const sectionLink = event.target.closest('[data-go]');
  if (pick?.matches('a') && (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey)) return;

  if (pick || sectionLink) {
    mainNav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  }
  if (pick) {
    event.preventDefault();
    openModal(Number(pick.dataset.pick));
  }
  if (sectionLink) {
    document.getElementById(sectionLink.dataset.go)?.scrollIntoView({ behavior: 'smooth' });
  }
  if (event.target.closest('[data-close]')) closeModal();
});
sel.addEventListener('change', update);
document.getElementById('confirm').addEventListener('click', () => {
  const model = models[Number(sel.value)];
  const term = terms[selectedTerm];
  closeModal();
  notify(`Simulação concluída: ${model.name}, plano ${term.label}, por ` +
    `${money(monthlyPrice(model))}/mês durante ${termDuration(term)}. ` +
    'Nenhuma assinatura foi realizada.');
});
menuToggle.addEventListener('click', () => {
  const open = mainNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') closeModal();
});

const requestedModel = models.find(model => model.name.toLowerCase() === params.get('modelo'));
if (requestedModel) openModal(requestedModel.id);
