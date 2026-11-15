// Perguntas e recomendação independentes da interface; preços e dados vêm do catálogo.
window.BYKEQuizProfile = (() => {
  const questions = [
    {
      title: 'Em que tipo de piso você mais pedala?', hint: 'Pense no piso mais frequente. Pode haver subidas em qualquer uma das opções.', label: 'Seu caminho', icon: 'route',
      options: [
        { title: 'Asfalto regular e ciclovias', text: 'Superfícies lisas, com poucas imperfeições.', scores: [3, 2, 0] },
        { title: 'Ruas com pavimentação irregular', text: 'Paralelepípedos, remendos e desníveis no pavimento.', scores: [0, 2, 3] },
        { title: 'Caminhos sem pavimentação', text: 'Terra e pedras soltas na maior parte do trajeto.', scores: [0, 0, 5] }
      ]
    },
    {
      title: 'Como você pretende usar a bike com mais frequência?', hint: 'Escolha o uso mais presente na sua rotina.', label: 'Seu uso', icon: 'compass',
      options: [
        { title: 'Ir ao trabalho, estudar, fazer compras e resolver tarefas.', scores: [0, 7, 1], reason: 'Você quer uma bike para as tarefas da rotina; a Tuna combina autonomia, cesta dianteira e praticidade.' },
        { title: 'Pedalar no asfalto por lazer ou atividade física, em ritmo esportivo.', scores: [7, 0, 1], reason: 'Você quer pedalar no asfalto com proposta esportiva; esse é o foco da Marlin, com leveza no conceito e mapas.' },
        { title: 'Fazer passeios por caminhos variados e explorar trilhas leves.', scores: [1, 1, 7], reason: 'Você quer passeios em caminhos variados; os pneus largos e a suspensão dupla da Whale atendem a essa proposta.' }
      ]
    },
    {
      title: 'O que mais faria diferença na sua experiência?', hint: 'Escolha sua prioridade ao pedalar.', label: 'Sua prioridade', icon: 'spark',
      options: [
        { title: 'Percorrer mais quilômetros entre recargas.', scores: [0, 7, 0], reason: 'Você prioriza mais quilômetros entre recargas; a Tuna tem a maior autonomia estimada da linha.' },
        { title: 'Ter uma pedalada com proposta esportiva no asfalto.', scores: [7, 0, 0], reason: 'Sua prioridade é a pedalada esportiva no asfalto; a Marlin foi pensada para esse uso.' },
        { title: 'Receber mais ajuda nas subidas e sentir menos os impactos do piso.', scores: [0, 1, 7], reason: 'Você prioriza ajuda nas subidas e absorção de impactos; a Whale tem o maior torque de referência e suspensão dupla.' }
      ]
    },
    {
      title: 'Qual distância você costuma percorrer antes de poder recarregar?', hint: 'Some os trajetos feitos com a mesma carga, incluindo ida e volta.', label: 'Sua distância', icon: 'range',
      options: [
        { title: 'Até 20 km.', maxKm: 20 }, { title: 'De 21 a 40 km.', maxKm: 40 },
        { title: 'De 41 a 60 km.', maxKm: 60 }, { title: 'De 61 a 80 km.', maxKm: 80 },
        { title: 'Mais de 80 km.', maxKm: null }
      ]
    },
    {
      title: 'Pensando no plano de 12 meses, qual é seu orçamento mensal?', hint: 'Nos contratos de 3 ou 6 meses, a mensalidade é diferente.', label: 'Seu orçamento', icon: 'bag',
      options: [
        { title: 'Até R$ 250.', limit: 250 }, { title: 'Entre R$ 251 e R$ 320.', limit: 320 },
        { title: 'R$ 321 ou mais.', limit: null }, { title: 'Ainda quero comparar os valores.', limit: null }
      ]
    }
  ];

  function recommend(answers) {
    if (answers.length !== questions.length || answers.some((answer, i) => !Number.isInteger(answer) || !questions[i].options[answer])) {
      throw new Error('Responda às cinco perguntas para ver o resultado.');
    }
    const distance = questions[3].options[answers[3]];
    const requiredKm = distance.maxKm ?? 81;
    const budgetLimit = questions[4].options[answers[4]].limit ?? Infinity;
    const points = (question, model) => questions[question].options[answers[question]].scores[model.id];
    // Empates consideram o uso informado, a prioridade e, por fim, a mensalidade menor.
    const byAffinity = (a, b) => b.score - a.score || points(1, b.model) - points(1, a.model) || points(2, b.model) - points(2, a.model) || terms.annual.prices[a.model.id] - terms.annual.prices[b.model.id];
    const candidates = models.map(model => {
      const rangeFits = model.technical.rangeKm >= requiredKm;
      const budgetFits = terms.annual.prices[model.id] <= budgetLimit;
      return { model, score: [0, 1, 2].reduce((sum, q) => sum + points(q, model), 0), rangeFits, budgetFits, violations: Number(!rangeFits) + Number(!budgetFits) };
    });
    const preferred = [...candidates].sort(byAffinity)[0];
    const ranking = [...candidates].sort((a, b) => a.violations - b.violations || Number(b.rangeFits) - Number(a.rangeFits) || byAffinity(a, b));
    const winner = ranking[0];
    const model = winner.model;
    const reasons = [];
    for (const question of [1, 2]) {
      const option = questions[question].options[answers[question]];
      if (option.scores[model.id] === Math.max(...option.scores)) reasons.push(option.reason);
    }
    if (points(0, model) >= 2) {
      reasons.push([
        'Você informou asfalto regular e ciclovias; esse percurso combina com a proposta de uso do modelo.',
        'A pavimentação irregular faz parte do seu percurso; o resultado considera esse piso junto ao uso e à prioridade que você informou.',
        'Você pedala em terra e pedras soltas; os pneus largos e a suspensão dupla da Whale combinam com essa proposta.'
      ][answers[0]]);
    }
    if (Number.isFinite(budgetLimit) && winner.budgetFits) reasons.push(`Seu limite de ${money(budgetLimit)}/mês é respeitado no prazo de 12 meses: a ${model.name} custa ${money(terms.annual.prices[model.id])}/mês.`);
    if (winner.rangeFits) reasons.push(`Você marcou “${distance.title.replace(/\.$/, '')}”; a autonomia estimada da ${model.name} é de até ${model.technical.rangeKm} km por carga.`);
    if (reasons.length < 2 && preferred.model.id !== model.id) reasons.push(`Sua combinação de uso e prioridade favorece a ${preferred.model.name}. A ${model.name} aparece primeiro para respeitar a distância e o orçamento informados, com as diferenças explicadas abaixo.`);

    const notices = [];
    if (!preferred.budgetFits) notices.push(`Seu uso favorece a ${preferred.model.name}, mas sua mensalidade de ${money(terms.annual.prices[preferred.model.id])} no prazo de 12 meses supera a faixa de orçamento informada. A ${model.name} respeita esse orçamento de referência.`);
    if (!preferred.rangeFits) notices.push(`Você informou mais de 80 km entre recargas. A ${preferred.model.name} tem até ${preferred.model.technical.rangeKm} km estimados; por isso, a autonomia deu prioridade à ${model.name}.`);
    if (distance.maxKm === null) notices.push('A Tuna tem até 100 km estimados. Se o percurso ultrapassar 100 km, nenhum dos três modelos tem autonomia proposta suficiente: planeje uma recarga intermediária. Reserve margem para o percurso e a carga.');
    const tradeoff = preferred.model.id !== model.id
      ? `A ${model.name} prioriza ${model.technical.feature.toLowerCase()}. Para ${preferred.model.technical.feature.toLowerCase()}, a alternativa é a ${preferred.model.name}, considerando as diferenças de orçamento e autonomia indicadas acima.`
      : model.technical.tradeoff;
    return { ranking, preferred, reasons: reasons.slice(0, 2), tradeoff, notices, budgetLimit, requiredKm };
  }
  return { questions, recommend };
})();
