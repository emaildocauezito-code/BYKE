const productsNav = document.querySelector('.nav-products');
const productsToggle = productsNav.querySelector('.products-toggle');

productsToggle.insertAdjacentHTML('afterend', `
  <div class="products-panel" id="products-panel" hidden inert>
    <div class="products-intro">
      <span class="eyebrow">BICICLETAS ELÉTRICAS</span>
      <h2>Encontre sua BYKE.</h2>
      <a href="bicicletas.html">Ver todas as bicicletas ↗</a>
    </div>
    <div class="products-grid">
      ${models.map(model => `
        <article class="nav-product">
          <span class="nav-product-tag">${model.tag}</span>
          <h3>${model.name}</h3>
          <a class="nav-product-image" data-pick="${model.id}"
            aria-label="Ver assinatura de ${model.name}">
            <img src="${model.image}" alt="${model.imageAlt}"
              width="1536" height="1024" loading="lazy">
          </a>
          <p><strong></strong><span> / mês</span></p>
          <a class="text-btn" data-pick="${model.id}"
            aria-label="Ver assinatura de ${model.name}">Ver assinatura ↗</a>
        </article>`).join('')}
    </div>
  </div>`);

const productsPanel = document.getElementById('products-panel');
const navProducts = productsPanel.querySelectorAll('.nav-product');

function updateProductPrices(term) {
  navProducts.forEach((product, index) => {
    const model = models[index];
    product.querySelector('strong').textContent = money(terms[term].prices[model.id]);
    product.querySelectorAll('a').forEach(link => {
      link.href = simulationUrl(model, term);
    });
  });
}

updateProductPrices('annual');

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
  const current = productsPanel.hidden ? productsClosedFrame : getComputedStyle(productsPanel);
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
productsToggle.addEventListener('focus', () => {
  if (productsToggle.matches(':focus-visible')) setProductsOpen(true);
});
productsNav.addEventListener('focusout', event => {
  if (!productsNav.contains(event.relatedTarget)) setProductsOpen(false);
});
document.addEventListener('click', event => {
  if (!productsNav.contains(event.target) || event.target.closest('[data-pick]')) {
    setProductsOpen(false);
  }
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && productsOpen) {
    if (productsNav.contains(document.activeElement)) productsToggle.focus();
    setProductsOpen(false);
  }
});
