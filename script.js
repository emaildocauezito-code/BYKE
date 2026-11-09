const models = [
  {
    id: 0, name: 'Marlin', price: 239, tag: 'ESPORTIVA',
    tagline: 'Encontre seu ritmo.',
    desc: 'A agilidade do marlin inspira nossa bike de perfil esportivo. ' +
      'Com guidão curvo e uma posição de pedalada mais inclinada, a Marlin é ' +
      'para quem gosta de movimento, ritmo e trajetos no asfalto.'
  },
  {
    id: 1, name: 'Tuna', price: 199, tag: 'URBANA',
    tagline: 'Energia para acompanhar seu dia.',
    desc: 'A Tuna traduz resistência em uma bike feita para a rotina. Sua proposta ' +
      'combina maior autonomia de bateria, posição confortável e praticidade. ' +
      'A cesta e o bagageiro acomodam seus pertences, enquanto o quadro baixo ' +
      'facilita cada parada pelo caminho.'
  },
  {
    id: 2, name: 'Whale', price: 239, tag: 'CROSS',
    tagline: 'Presença para explorar.',
    desc: 'A força e a presença da baleia dão personalidade à Whale. Com pneus ' +
      'largos, suspensão dianteira e traseira e visual robusto, ela traz uma ' +
      'proposta aventureira para quem quer explorar caminhos de terra e percursos irregulares.'
  }
];
const money=n=>n.toLocaleString('pt-BR',{style:'currency',currency:'BRL',maximumFractionDigits:0});
const terms = {
  monthly: { label: 'mensal', months: 1, prices: [329, 279, 329] },
  semiannual: { label: 'semestral', months: 6, prices: [269, 219, 269] },
  annual: { label: 'anual', months: 12, prices: models.map(model => model.price) }
};
const requestedTerm = new URLSearchParams(window.location.search).get('plano');
let selectedTerm = Object.hasOwn(terms, requestedTerm) ? requestedTerm : 'annual';
const termDuration = term => `${term.months} ${term.months === 1 ? 'mês' : 'meses'}`;
const monthlyPrice = model => terms[selectedTerm].prices[model.id];
const productsNav = document.querySelector('.nav-products');
const productsToggle = document.querySelector('.products-toggle');
const productsPanel = document.getElementById('products-panel');
const navProductGrid = document.getElementById('nav-product-grid');

models.forEach((model, index) => {
  const product = document.createElement('article');
  product.className = 'nav-product';
  product.innerHTML = `
    <span class="nav-product-tag">${model.tag}</span>
    <h3>${model.name}</h3>
    <button class="nav-product-image" data-pick="${model.id}"
      aria-label="Ver assinatura de ${model.name}">
      <img src="bike.svg" alt="Ilustração conceitual de ${model.name}"
        class="bike-${index}">
    </button>
    <p><strong data-nav-price="${model.id}">${money(model.price)}</strong>
      <span> / mês</span></p>
    <button class="text-btn" data-pick="${model.id}">Ver assinatura ↗</button>
  `;
  navProductGrid.appendChild(product);
});

let productsOpen = false;
let productsAnimation;
const productsClosedFrame = {
  opacity: '0',
  transform: 'translateY(-18px)',
  clipPath: 'inset(0 0 100% 0)'
};
const productsOpenFrame = {
  opacity: '1',
  transform: 'translateY(0)',
  clipPath: 'inset(0 0 0 0)'
};

function setProductsOpen(open) {
  if (open === productsOpen) return;
  productsOpen = open;
  productsToggle.setAttribute('aria-expanded', String(open));
  productsPanel.inert = !open;

  // Continue from the current position if the pointer changes direction mid-animation.
  const current = productsPanel.hidden ? productsClosedFrame :
    getComputedStyle(productsPanel);
  const start = {
    opacity: current.opacity,
    transform: current.transform,
    clipPath: current.clipPath
  };
  productsAnimation?.cancel();

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    productsPanel.hidden = !open;
    return;
  }

  productsPanel.hidden = false;
  const animation = productsPanel.animate(
    [start, open ? productsOpenFrame : productsClosedFrame],
    {
      duration: open ? 420 : 320,
      easing: open ? 'cubic-bezier(.16, 1, .3, 1)' : 'cubic-bezier(.4, 0, .2, 1)',
      fill: 'both'
    }
  );
  productsAnimation = animation;
  animation.finished.then(() => {
    if (productsAnimation !== animation) return;
    productsPanel.hidden = !productsOpen;
    animation.cancel();
    productsAnimation = undefined;
  }).catch(() => {});
}

productsNav.addEventListener('pointerenter', event => {
  if (event.pointerType === 'mouse') setProductsOpen(true);
});
productsNav.addEventListener('pointerleave', event => {
  if (event.pointerType === 'mouse' &&
      !productsNav.contains(document.activeElement)) setProductsOpen(false);
});
productsNav.addEventListener('focusout', event => {
  if (!productsNav.contains(event.relatedTarget)) setProductsOpen(false);
});
document.addEventListener('click', event => {
  if (!productsNav.contains(event.target)) setProductsOpen(false);
  if (event.target.closest('[data-go], [data-pick]')) {
    setProductsOpen(false);
    document.querySelector('.nav').classList.remove('open');
    document.querySelector('.menu-toggle').setAttribute('aria-expanded', 'false');
  }
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && productsOpen) {
    productsToggle.focus();
    setProductsOpen(false);
  }
});
document.querySelector('.menu-toggle').addEventListener('click', () => {
  setProductsOpen(false);
});
const planGrid = document.getElementById('plan-grid');

function renderPlans() {
  const term = terms[selectedTerm];
  planGrid.innerHTML = models.map((model, index) => {
    const saving = terms.monthly.prices[index] - term.prices[index];
    const annualSaving = terms.monthly.prices[index] - terms.annual.prices[index];
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
        <p class="plan-saving">${selectedTerm !== 'monthly'
          ? `Economize ${money(saving)}/mês em relação ao mensal`
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
  document.querySelectorAll('[data-nav-price]').forEach(element => {
    element.textContent = money(term.prices[Number(element.dataset.navPrice)]);
  });
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
document.addEventListener('click',e=>{let pick=e.target.closest('[data-pick]');if(pick){openModal(Number(pick.dataset.pick));return}let nav=e.target.closest('[data-go]');if(nav){document.getElementById(nav.dataset.go)?.scrollIntoView({behavior:'smooth'});document.querySelector('.nav').classList.remove('open');document.querySelector('.menu-toggle').setAttribute('aria-expanded','false')}if(e.target.closest('[data-close]'))closeModal()});
sel.addEventListener('change', update);
document.getElementById('confirm').addEventListener('click', () => {
  const model = models[Number(sel.value)];
  const term = terms[selectedTerm];
  closeModal();
  notify(`Simulação concluída: ${model.name}, plano ${term.label}, por ` +
    `${money(monthlyPrice(model))}/mês durante ${termDuration(term)}. ` +
    'Nenhuma assinatura foi realizada.');
});
document.querySelector('.menu-toggle').addEventListener('click',e=>{let n=document.querySelector('.nav');const b=n.classList.toggle('open');e.currentTarget.setAttribute('aria-expanded',String(b))});document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModal()});
