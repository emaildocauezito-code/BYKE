(() => {
  const dialog = document.getElementById('bike-quiz');
  const content = document.getElementById('quiz-content');
  const { questions, recommend } = BYKEQuizProfile;
  const facts = BYKEPreview.facts;
  const icons = {
    route: '<path d="M7 5h6a4 4 0 0 1 0 8H9a4 4 0 0 0 0 8h8"/><circle cx="6" cy="5" r="2"/><path d="m15 18 3 3-3 3"/>',
    compass: '<circle cx="13" cy="13" r="10"/><path d="m17 9-3 6-6 3 3-6 6-3Z"/>',
    bag: '<rect x="5" y="8" width="16" height="15" rx="2"/><path d="M9 8V6a4 4 0 0 1 8 0v2M9 12v2m8-2v2"/>',
    range: '<rect x="2" y="7" width="20" height="13" rx="2"/><path d="M25 11v5M6 11v5m4-5v5m4-5v5"/>',
    spark: '<path d="m13 2 3 8 8 3-8 3-3 8-3-8-8-3 8-3 3-8Z"/>'
  };
  let step = 0;
  let answers = Array(questions.length).fill(null);
  let finished = false;
  let returnFocus;
  let lockedBefore = false;
  let advanceTimer;
  const arrow = '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false"><path d="M6 18 18 6M6 6h12v12" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>';
  const imageFor = model => model.gallery[0].src;

  function focusTitle() { content.querySelector('#quiz-title').focus({ preventScroll: true }); }
  function resetScroll() { dialog.scrollTop = 0; }
  function renderQuestion(focus = true) {
    clearTimeout(advanceTimer);
    advanceTimer = undefined;
    const q = questions[step];
    content.innerHTML = `
      <div class="quiz-question-layout">
        <aside class="quiz-aside" aria-hidden="true">
          <span class="quiz-brand">BYKE / SEU PERFIL</span>
          <div class="quiz-orbit"><svg viewBox="0 0 28 28" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round">${icons[q.icon]}</svg></div>
          <p class="quiz-aside-label">${q.label}</p><span class="quiz-aside-number">0${step + 1}<small> / 05</small></span>
          <p class="quiz-aside-note">Um caminho. Três possibilidades.<br>Vamos encontrar a sua.</p>
        </aside>
        <div class="quiz-main">
          <div class="quiz-progress-label"><span>DESCUBRA SUA BYKE</span><span>${step + 1} de ${questions.length}</span></div>
          <progress class="quiz-progress" max="${questions.length}" value="${step + 1}" aria-label="Pergunta ${step + 1} de ${questions.length}"></progress>
          <h2 id="quiz-title" tabindex="-1">${q.title}</h2>
          <p class="quiz-question-hint">${q.hint} Escolha uma resposta para avançar.</p>
          <div class="quiz-form">
            <fieldset class="quiz-options"><legend class="quiz-sr-only">${q.title}</legend>
              ${q.options.map((option, i) => `<button type="button" class="quiz-option" data-answer="${i}" aria-pressed="${answers[step] === i}"><span class="quiz-radio" aria-hidden="true"></span><span><strong>${option.title}</strong>${option.text ? `<span>${option.text}</span>` : ''}</span></button>`).join('')}
            </fieldset>
            <div class="quiz-navigation"><button class="quiz-back" type="button" ${step === 0 ? 'disabled' : ''}><span aria-hidden="true">←</span> Voltar</button></div>
          </div>
          <p class="quiz-privacy">Sem cadastro. Suas respostas ficam apenas nesta página.</p>
        </div>
      </div>`;
    const options = content.querySelectorAll('.quiz-option');
    options.forEach(button => button.addEventListener('click', () => {
      if (advanceTimer !== undefined) return;
      answers[step] = Number(button.dataset.answer);
      options.forEach(option => {
        option.setAttribute('aria-pressed', String(option === button));
        option.disabled = true;
      });
      // Confirma a escolha visualmente e impede que um clique duplo pule perguntas.
      advanceTimer = setTimeout(() => {
        advanceTimer = undefined;
        if (!dialog.open) return;
        if (step < questions.length - 1) { step++; renderQuestion(); }
        else { finished = true; renderResult(); }
      }, 220);
    }));
    content.querySelector('.quiz-back').addEventListener('click', () => { if (step > 0) { step--; renderQuestion(); } });
    dialog.classList.remove('quiz-showing-result');
    resetScroll();
    if (focus) focusTitle();
  }
  function renderResult() {
    const { ranking, reasons, tradeoff, notices } = recommend(answers);
    const winner = ranking[0].model;
    const fact = facts[winner.id];
    const selectedTerm = BYKEPreview.quizTerm?.() || BYKEPreview.getTerm(new URLSearchParams(location.search).get('plano'));
    const term = terms[selectedTerm];
    const price = term.prices[winner.id];
    const budgetNote = selectedTerm === 'annual'
      ? 'Seu orçamento foi comparado às mensalidades do plano de 12 meses.'
      : `Seu orçamento foi informado para 12 meses (${money(terms.annual.prices[winner.id])}/mês para a ${winner.name}). Você está comparando ${term.months} meses, com mensalidades diferentes; pode mudar o prazo na próxima etapa.`;
    dialog.classList.add('quiz-showing-result');
    content.innerHTML = `
      <div class="quiz-result">
        <div class="quiz-result-intro"><p class="eyebrow">SEU PERFIL BYKE</p><h2 id="quiz-title" tabindex="-1">Sua combinação: <span>${winner.name}.</span></h2><p>Uma recomendação que considera seu uso, sua distância e seu orçamento de referência.</p></div>
        ${notices.length ? `<div class="quiz-result-notices" role="note">${notices.map(notice => `<p>${notice}</p>`).join('')}</div>` : ''}
        <div class="quiz-match">
          <div class="quiz-match-visual"><span class="quiz-match-tag">01 / SEU DESTAQUE</span><img src="${imageFor(winner)}" width="1536" height="1024" alt="${winner.imageAlt}"><p>${fact.use}</p></div>
          <div class="quiz-match-copy"><p class="eyebrow">POR QUE A ${winner.name.toUpperCase()}?</p><p>${winner.desc}</p>
            ${reasons.length ? `<ul class="quiz-reasons">${reasons.map(reason => `<li>${reason}</li>`).join('')}</ul>` : ''}
            <dl class="quiz-result-specs"><div><dt>Autonomia estimada</dt><dd>${fact.range} por carga</dd></div><div><dt>Recarga estimada</dt><dd>${fact.charge}</dd></div><div><dt>Diferencial</dt><dd>${fact.feature}</dd></div></dl>
            <p class="quiz-tradeoff"><strong>Para considerar</strong>${tradeoff}</p>
            <p class="quiz-result-price"><strong>${money(price)}/mês</strong><span>Contrato de ${term.months} meses · ${money(price * term.months)} no período</span></p>
            <p class="quiz-budget-note">${budgetNote}</p>
            <a class="btn btn-dark quiz-choose" href="${BYKEPreview.modelUrl(winner, selectedTerm)}#plano">Escolher ${winner.name} ${arrow}</a><span class="quiz-plan-hint">Continue para conferir o plano e escolher 3, 6 ou 12 meses.</span>
          </div>
        </div>
        <section class="quiz-ranking" aria-labelledby="quiz-ranking-title"><div class="quiz-ranking-heading"><h3 id="quiz-ranking-title">Seu ranking de estilos</h3><p>Seu uso, com prioridade para distância e orçamento.</p></div>
          <ol>${ranking.map(({model, budgetFits, rangeFits}, i) => `<li><span class="quiz-rank-position" aria-label="${i+1}º lugar">0${i+1}</span><img src="${imageFor(model)}" width="1536" height="1024" alt=""><div><strong>${model.name}</strong><span>${facts[model.id].use}</span><span>${money(term.prices[model.id])}/mês · ${term.months} meses</span>${!budgetFits ? '<span class="quiz-ranking-caution">Acima da faixa informada para 12 meses</span>' : ''}${!rangeFits ? '<span class="quiz-ranking-caution">Requer recarga antes da distância informada</span>' : ''}</div><a href="${BYKEPreview.modelUrl(model, selectedTerm)}#plano" aria-label="Escolher ${model.name} pelo ranking">Escolher ${arrow}</a></li>`).join('')}</ol>
        </section>
        <p class="quiz-result-note">${BYKEPreview.estimateNote} A recomendação orienta a comparação e não substitui uma avaliação técnica.</p>
        <div class="quiz-result-actions"><button type="button" class="quiz-edit">← Rever respostas</button><a class="quiz-compare" href="bicicletas.html?plano=${selectedTerm}#comparar">Comparar modelos</a><button type="button" class="quiz-restart">Refazer quiz <span aria-hidden="true">↻</span></button></div>
      </div>`;
    content.querySelector('.quiz-restart').addEventListener('click', () => {
      answers = Array(questions.length).fill(null); step = 0; finished = false; renderQuestion();
    });
    content.querySelector('.quiz-edit').addEventListener('click', () => { step = 0; finished = false; renderQuestion(); });
    resetScroll();
    focusTitle();
  }
  document.querySelectorAll('[data-open-quiz]').forEach(trigger => trigger.addEventListener('click', event => {
    event.preventDefault();
    returnFocus = trigger;
    if (typeof closeMainNav === 'function') closeMainNav();
    lockedBefore = document.body.classList.contains('locked');
    if (finished) renderResult(); else renderQuestion(false);
    dialog.showModal();
    document.body.classList.add('locked');
    focusTitle();
  }));
  dialog.querySelector('.quiz-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
  });
  dialog.addEventListener('close', () => {
    clearTimeout(advanceTimer);
    advanceTimer = undefined;
    if (!lockedBefore) document.body.classList.remove('locked');
    returnFocus?.focus({ preventScroll: true });
  });
})();
