(() => {
  const dialog = document.getElementById('bike-quiz');
  const content = document.getElementById('quiz-content');
  const questions = [
    {
      title: 'Como é o piso do seu percurso?', hint: 'Pense no caminho que você faz com mais frequência.',
      label: 'Seu caminho', icon: 'route', options: [
        { title: 'Asfalto e ciclovias', text: 'Um percurso predominantemente liso.', scores: [5, 3, 0], reason: 'Seu percurso é principalmente no asfalto.' },
        { title: 'Ruas de bairro e calçamento', text: 'Pedras, juntas e pequenas irregularidades.', scores: [0, 2, 5], reason: 'Você encontra calçamento irregular no caminho.' },
        { title: 'Um pouco de cada piso', text: 'Asfalto, trechos de terra e variações de piso.', scores: [1, 2, 5], reason: 'Seu trajeto alterna diferentes tipos de piso.' }
      ]
    },
    {
      title: 'O que você mais busca no pedal?', hint: 'Escolha o que faz mais diferença para você.',
      label: 'Seu estilo', icon: 'compass', options: [
        { title: 'Uma posição esportiva', text: 'Guidão curvo e diferentes posições para as mãos.', scores: [6, 0, 1], reason: 'Você prefere uma proposta esportiva com guidão curvo.' },
        { title: 'Praticidade na rotina', text: 'Facilidade para subir, descer e fazer paradas.', scores: [0, 6, 1], reason: 'Facilidade nas paradas é uma prioridade para você.' },
        { title: 'Uma bike mais robusta', text: 'Pneus largos e suspensão nos dois eixos.', scores: [0, 1, 6], reason: 'Você procura pneus largos e suspensão dupla.' }
      ]
    },
    {
      title: 'O que costuma levar com você?', hint: 'Considere seus deslocamentos do dia a dia.',
      label: 'Sua rotina', icon: 'bag', options: [
        { title: 'Só o essencial', text: 'Celular, uma garrafa e poucos objetos.', scores: [4, 1, 1], reason: 'Você costuma levar apenas o essencial.' },
        { title: 'Compras e objetos à mão', text: 'Uma cesta dianteira seria bem-vinda.', scores: [0, 6, 0], reason: 'A cesta dianteira faz sentido para a sua rotina.' },
        { title: 'Uma bolsa no bagageiro', text: 'Prefiro acomodar meus objetos atrás.', scores: [2, 2, 2], reason: 'Você prefere levar uma bolsa no bagageiro.' }
      ]
    },
    {
      title: 'Quanto pedala entre recargas?', hint: 'Some a ida e a volta, se recarrega só ao chegar em casa.',
      label: 'Sua distância', icon: 'range', options: [
        { title: 'Até 20 km', text: 'Deslocamentos curtos.', scores: [1, 1, 1] },
        { title: 'De 21 a 40 km', text: 'Um percurso intermediário.', scores: [1, 1, 1] },
        { title: 'De 41 a 60 km', text: 'Mais quilômetros entre recargas.', scores: [3, 3, 0] },
        { title: 'De 61 a 100 km', text: 'Autonomia é um ponto importante.', scores: [5, 5, 0] }
      ]
    },
    {
      title: 'Qual detalhe decide sua escolha?', hint: 'Uma última preferência para completar seu perfil.',
      label: 'Sua prioridade', icon: 'spark', options: [
        { title: 'Guidão curvo', text: 'Uma proposta voltada ao pedal no asfalto.', scores: [5, 0, 0], reason: 'O guidão curvo é um diferencial na sua escolha.' },
        { title: 'Quadro baixo e cesta', text: 'Acessibilidade e espaço para os objetos.', scores: [0, 5, 0], reason: 'Quadro baixo e cesta são seus diferenciais preferidos.' },
        { title: 'Pneus largos e suspensão', text: 'Uma configuração para pisos variados.', scores: [0, 0, 5], reason: 'Pneus largos e suspensão são seus diferenciais preferidos.' }
      ]
    }
  ];
  const facts = [
    { range: 'Até 100 km', charge: '4–5 horas', feature: 'Guidão curvo', use: 'Perfil esportivo · Asfalto' },
    { range: 'Até 100 km', charge: '4–6 horas', feature: 'Quadro baixo e cesta', use: 'Perfil urbano · Praticidade' },
    { range: 'Até 60 km', charge: '5–7 horas', feature: 'Pneus largos e suspensão dupla', use: 'Perfil cross · Pisos irregulares' }
  ];
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

  function rankModels() {
    const scores = [0, 0, 0];
    questions.forEach((question, i) => {
      if (answers[i] === null) return;
      question.options[answers[i]].scores.forEach((score, model) => { scores[model] += score; });
    });
    // Range is a constraint before preference: Whale's estimated range is 60 km.
    const longRange = answers[3] === 3;
    return models.map(model => ({ model, score: scores[model.id] }))
      .sort((a, b) => {
        if (longRange && (a.model.id === 2 || b.model.id === 2)) return a.model.id === 2 ? 1 : -1;
        return b.score - a.score || a.model.id - b.model.id;
      });
  }
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
              ${q.options.map((option, i) => `<button type="button" class="quiz-option" data-answer="${i}" aria-pressed="${answers[step] === i}"><span class="quiz-radio" aria-hidden="true"></span><span><strong>${option.title}</strong><span>${option.text}</span></span></button>`).join('')}
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
    const ranking = rankModels();
    const winner = ranking[0].model;
    const fact = facts[winner.id];
    const reasons = questions.flatMap((q, i) => {
      const option = q.options[answers[i]];
      return option.reason && option.scores[winner.id] === Math.max(...option.scores) && Math.max(...option.scores) > 2 ? [option.reason] : [];
    }).slice(0, 2);
    const longRange = answers[3] === 3;
    const rangeText = longRange ? 'Você indicou de 61 a 100 km entre recargas. Marlin e Tuna têm autonomia estimada de até 100 km; a Whale, de até 60 km. Por isso, a distância teve prioridade na recomendação.' : 'A autonomia e a recarga são estimadas e variam com o percurso, a carga e o modo de uso.';
    dialog.classList.add('quiz-showing-result');
    content.innerHTML = `
      <div class="quiz-result">
        <div class="quiz-result-intro"><p class="eyebrow">SEU PERFIL BYKE</p><h2 id="quiz-title" tabindex="-1">Sua combinação: <span>${winner.name}.</span></h2><p>A partir das suas respostas, este é o modelo que mais combina com o seu uso.</p></div>
        <div class="quiz-match">
          <div class="quiz-match-visual"><span class="quiz-match-tag">01 / SEU DESTAQUE</span><img src="${imageFor(winner)}" width="1536" height="1024" alt="${winner.imageAlt}"><p>${fact.use}</p></div>
          <div class="quiz-match-copy"><p class="eyebrow">POR QUE A ${winner.name.toUpperCase()}?</p><p>${winner.desc}</p>
            ${reasons.length ? `<ul class="quiz-reasons">${reasons.map(reason => `<li>${reason}</li>`).join('')}</ul>` : ''}
            <dl class="quiz-result-specs"><div><dt>Autonomia estimada</dt><dd>${fact.range} por carga</dd></div><div><dt>Recarga estimada</dt><dd>${fact.charge}</dd></div><div><dt>Diferencial</dt><dd>${fact.feature}</dd></div></dl>
            <a class="btn btn-dark quiz-choose" href="planos.html?modelo=${winner.name.toLowerCase()}#opcoes">Escolher ${winner.name} ${arrow}</a><span class="quiz-plan-hint">Continue para escolher 3, 6 ou 12 meses.</span>
          </div>
        </div>
        <section class="quiz-ranking" aria-labelledby="quiz-ranking-title"><div class="quiz-ranking-heading"><h3 id="quiz-ranking-title">Seu ranking de estilos</h3><p>Três propostas, ordenadas pelo seu perfil.</p></div>
          <ol>${ranking.map(({model}, i) => `<li><span class="quiz-rank-position" aria-label="${i+1}º lugar">0${i+1}</span><img src="${imageFor(model)}" width="1536" height="1024" alt=""><div><strong>${model.name}</strong><span>${facts[model.id].use}</span></div><a href="planos.html?modelo=${model.name.toLowerCase()}#opcoes" aria-label="Escolher ${model.name} pelo ranking">Escolher ${arrow}</a></li>`).join('')}</ol>
        </section>
        <p class="quiz-result-note">${rangeText} O quiz compara as características do protótipo e não é uma avaliação técnica.</p>
        <div class="quiz-result-actions"><button type="button" class="quiz-edit">← Rever respostas</button><button type="button" class="quiz-restart">Refazer quiz <span aria-hidden="true">↻</span></button></div>
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
