const termPicker = document.querySelector('.detail-term-picker');
const termNote = document.querySelector('.detail-term-note');
const bikePlanGrid = document.querySelector('.detail-plan-grid');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

bikePlanGrid.innerHTML = models.map(model => `
  <article class="detail-plan">
    <span class="eyebrow">${model.tag}</span>
    <h3>${model.name}</h3>
    <div class="plan-price"><strong></strong><span> / mês</span></div>
    <ul class="detail-list">
      ${model.specs.map(spec => `<li>${spec}</li>`).join('')}
    </ul>
    <a class="btn btn-outline" aria-label="Simular assinatura da ${model.name}">
      Simular assinatura <span aria-hidden="true">↗</span>
    </a>
  </article>`).join('');

const planCards = bikePlanGrid.querySelectorAll('.detail-plan');

function updateBikePrices(animate) {
  const selectedTerm = termPicker.querySelector(':checked').value;
  const term = terms[selectedTerm];
  termNote.textContent = `Contrato de ${termDuration(term)} · Pagamento mensal`;
  updateProductPrices(selectedTerm);

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

termPicker.addEventListener('change', () => updateBikePrices(true));
window.addEventListener('pageshow', () => updateBikePrices(false));
updateBikePrices(false);
