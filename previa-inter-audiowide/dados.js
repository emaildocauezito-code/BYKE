// Imagens aprovadas e dados do catálogo local desta versão.
models.forEach(model => {
  model.image = `../${model.image}`;
  const [diagonal, lateral, frontal] = model.gallery;
  model.gallery = [lateral, diagonal, frontal].map(view => ({ ...view, src: `../${view.src}` }));
});
window.BYKEPreview = (() => {
  const styleUrl = href => window.BYKEStyleVariant?.withVariant(href) || href;
  const facts = models.map(model => ({
    ...model.technical,
    range: `Até ${model.technical.rangeKm} km`,
    torque: `${model.technical.torqueNm} Nm`,
    battery: `${model.technical.batteryWh} Wh`,
    assistance: `Até ${model.technical.assistanceKmh} km/h`
  }));
  const estimateNote = 'Parâmetros propostos para o conceito, sem ensaios das bicicletas. A autonomia varia conforme percurso, carga e nível de assistência.';
  const torqueNote = 'Torque é a força de giro que contribui nas arrancadas e subidas.';
  const slug = model => model.name.toLowerCase();
  const getModel = value => models.find(model => slug(model) === (value === 'wale' ? 'whale' : value)) || models[0];
  const getTerm = value => Object.hasOwn(terms, value) ? value : 'annual';
  const url = (page, model, term) => styleUrl(`${page}?${new URLSearchParams({ modelo: slug(model), plano: getTerm(term) })}`);
  const modelUrl = (model, term) => url('loja.html', model, term);
  const checkoutUrl = (model, term) => url('assinatura.html', model, term);
  const refreshFooter = term => {
    document.querySelectorAll('.byke-footer a[data-model]').forEach(link => {
      link.href = modelUrl(getModel(link.dataset.model), getTerm(term));
    });
  };
  const arrow = '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false"><path d="M5 12h14m-6-6 6 6-6 6" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>';
  const termOptions = (model, selected, name = 'duration') => Object.entries(terms).map(([key, term]) => `
    <label class="shop-term-option">
      <input type="radio" name="${name}" value="${key}" ${key === selected ? 'checked' : ''}>
      <span><strong>${term.months} meses</strong><small>${money(term.prices[model.id])}/mês</small></span>
    </label>`).join('');
  const modelCard = (model, selectedTerm, showAR = false) => {
    const term = terms[getTerm(selectedTerm)];
    return `
      <article class="shop-related-card">
        ${showAR && /\biPhone\b/i.test(navigator.userAgent) ? `<a class="bike-ar-camera" rel="ar" href="assets/ar/${slug(model)}.usdz#allowsContentScaling=0" aria-label="Ver ${model.name} no meu espaço"><img src="assets/ar/quick-look.svg" width="20" height="20" alt=""></a>` : ""}
        <a class="shop-related-image" href="${modelUrl(model, selectedTerm)}#produto" data-model="${slug(model)}" aria-label="Conhecer ${model.name}"><img src="${model.gallery[0].src}" width="1536" height="1024" loading="lazy" alt="${model.imageAlt}"></a>
        <div class="shop-related-info"><div><p class="eyebrow">${model.tag}</p><h3>${model.name}</h3></div><p class="shop-related-price"><strong>${money(term.prices[model.id])}</strong><span>/mês · ${term.months} meses</span></p></div>
        <p class="shop-related-desc">${model.desc}</p>
        <p class="shop-related-specs">${facts[model.id].range} por carga <span aria-hidden="true">·</span> ${facts[model.id].feature}</p>
        <a class="btn btn-outline" href="${modelUrl(model, selectedTerm)}#produto" data-model="${slug(model)}">Conhecer ${model.name} ${arrow}</a>
      </article>`;
  };
  const technicalDetails = model => {
    const fact = facts[model.id];
    const rows = [
      ['Perfil', fact.use], ['Uso indicado', fact.terrain],
      ['Posição de condução', fact.position], ['Autonomia estimada por carga', fact.range],
      ['Assistência elétrica proposta', fact.assistance], ['Torque de referência', fact.torque],
      ['Bateria nominal proposta', fact.battery], ['Instrumentação', fact.instrumentation],
      ['Principal diferencial', fact.feature],
      ['Recarga completa estimada', fact.charge], ['Pneus e aros de referência', fact.tire],
      ['Conforto e controle', fact.comfort], ['Acessórios', fact.accessories],
      ['Iluminação', 'Farol dianteiro']
    ];
    return `<details class="shop-technical"><summary><span><strong>Saiba mais</strong><small>Características, medidas e uso indicado</small></span><span class="technical-toggle" aria-hidden="true">+</span></summary><div class="technical-content"><p>${fact.overview}</p><dl>${rows.map(([label,value]) => `<div><dt>${label}</dt><dd>${value}</dd></div>`).join('')}</dl><p class="technical-note">${torqueNote} ${estimateNote}</p></div></details>`;
  };
  const comparisonTable = (selectedTerm, selectedModel) => {
    const term = terms[getTerm(selectedTerm)];
    const rows = [
      ['Perfil', model => facts[model.id].use],
      ['Principal diferencial', model => facts[model.id].feature],
      ['Assistência elétrica proposta', model => facts[model.id].assistance],
      ['Autonomia estimada por carga', model => facts[model.id].range],
      ['Torque de referência', model => facts[model.id].torque],
      ['Bateria nominal proposta', model => facts[model.id].battery],
      ['Instrumentação', model => facts[model.id].instrumentation],
      ['Recarga estimada', model => facts[model.id].charge],
      ['Pneus e aros', model => facts[model.id].tire],
      ['Conforto e controle', model => facts[model.id].comfort],
      ['Acessórios', model => facts[model.id].accessories],
      ['Percurso indicado', model => facts[model.id].terrain],
      [`Mensalidade · ${term.months} meses`, model => `${money(term.prices[model.id])}/mês`]
    ];
    const current = model => model.id === selectedModel ? ' class="comparison-selected"' : '';
    const mobile = `<div class="byke-comparison-mobile" role="region" aria-label="Comparação dos modelos por característica">${rows.map(([label,value]) => `<div class="comparison-feature"><h3>${label}</h3><dl>${models.map(model => `<div${current(model)}><dt>${model.name}</dt><dd>${value(model)}</dd></div>`).join('')}</dl></div>`).join('')}<div class="comparison-mobile-links">${models.map(model => `<a href="${modelUrl(model,selectedTerm)}#produto" data-model="${slug(model)}" aria-label="Conhecer ${model.name}">${model.name} ${arrow}</a>`).join('')}</div></div>`;

    return `<div class="byke-comparison-scroll" tabindex="0" role="region" aria-label="Quadro de comparação dos três modelos"><table class="byke-comparison-table"><caption class="shop-sr-only">Comparação de Marlin, Tuna e Whale para assinatura de ${term.months} meses</caption><thead><tr><th scope="col">Características</th>${models.map(model => `<th scope="col"${current(model)}><img src="${model.gallery[0].src}" width="1536" height="1024" alt="" loading="lazy"><strong>${model.name}</strong><span>${model.tag}</span></th>`).join('')}</tr></thead><tbody>${rows.map(([label,value]) => `<tr><th scope="row">${label}</th>${models.map(model => `<td${current(model)}>${value(model)}</td>`).join('')}</tr>`).join('')}</tbody><tfoot><tr><th scope="row">Conheça o modelo</th>${models.map(model => `<td${current(model)}><a href="${modelUrl(model,selectedTerm)}#produto" data-model="${slug(model)}">Ver ${model.name} ${arrow}</a></td>`).join('')}</tr></tfoot></table></div>${mobile}<p class="comparison-note">${torqueNote} ${estimateNote}</p>`;
  };
  const modelFaq = model => {
    const fact = facts[model.id];
    const questions = [
      [`Para quais trajetos a ${model.name} é indicada?`, `${fact.overview} Percurso indicado: ${fact.terrain.toLowerCase()}. Acessórios: ${fact.accessories.toLowerCase()}.`],
      [`Quanto custa assinar a ${model.name}?`, `O plano de 3 meses custa ${money(terms.quarterly.prices[model.id])}/mês; o de 6 meses, ${money(terms.semiannual.prices[model.id])}/mês; e o de 12 meses, ${money(terms.annual.prices[model.id])}/mês. O pagamento é mensal. A duração e o total do período aparecem junto à escolha do plano.`],
      [`Qual a autonomia e quanto tempo leva para recarregar?`, `A ${model.name} tem autonomia estimada de ${fact.range.toLowerCase()} por carga e recarga completa estimada de ${fact.charge}. O resultado varia com o piso, a carga transportada e o modo de uso.`],
      ['Posso alterar o modelo ou o prazo antes de concluir?', 'Sim. Escolha outro prazo na página da bicicleta ou na primeira etapa da assinatura. Para comparar outro modelo, use os cards, o quadro de comparação ou “Trocar bicicleta”. Na revisão, os botões “Editar” permitem voltar às etapas anteriores.'],
      ['Como escolho entrega ou retirada e salvo meu comprovante?', 'Depois de escolher a bicicleta e o prazo, selecione entrega em casa ou retirada no ponto combinado. Informe contato, endereço para entrega, se escolher essa opção, e data desejada. Na retirada, local e horário serão combinados. Selecione também a forma de pagamento: Pix, cartão de crédito ou boleto. Confira tudo na revisão e conclua. A notificação confirma a conclusão nesta página; o comprovante pode ser salvo ou impresso pelo navegador.']
    ];
    return questions.map(([question,answer]) => `<details><summary>${question}</summary><p>${answer}</p></details>`).join('');
  };
  const generalFaq = () => {
    const questions = [
      ['Qual a diferença entre Marlin, Tuna e Whale?', 'A Marlin prioriza leveza no conceito, pedalada esportiva no asfalto e ciclocomputador com mapas. A Tuna tem a maior autonomia estimada, cesta dianteira e praticidade para a rotina. A Whale prioriza força para subidas, pneus largos e suspensão dupla. A assistência elétrica proposta é de até 32 km/h nos três modelos.'],
      ['Como funcionam os planos de 3, 6 e 12 meses?', 'O serviço atende ao público geral; não é necessário vínculo com uma empresa. Empresas parceiras podem contar com descontos especiais para suas equipes. Consulte as condições da parceria. Você escolhe a bicicleta e a duração da assinatura, com pagamento mensal. O valor por mês e o total do período aparecem antes de continuar para o recebimento e pagamento.'],
      ['Qual é a autonomia e o tempo de recarga?', `${models.map(model => `${model.name}: ${facts[model.id].range.toLowerCase()} por carga e recarga completa estimada de ${facts[model.id].charge}`).join('; ')}. ${estimateNote}`],
      ['Como descubro qual BYKE combina comigo?', 'Abra o Quiz no menu e responda cinco perguntas sobre seu percurso e sua rotina. O resultado explica a recomendação e mostra os três modelos em ordem de afinidade. Você também pode comparar as características e abrir a ficha de qualquer bicicleta.'],
      ['Como concluo a escolha e salvo o comprovante?', 'Na ficha da bicicleta, escolha o prazo e clique em “Assinar”. Você passa pelas etapas de plano, recebimento e revisão. Escolha entrega em casa ou retirada, informe a data e selecione Pix, cartão de crédito ou boleto. Confira, edite se necessário e conclua. A notificação aparece na página e o comprovante pode ser salvo ou impresso.']
    ];
    return questions.map(([question,answer]) => `<details><summary>${question}</summary><p>${answer}</p></details>`).join('');
  };
  return { facts, estimateNote, torqueNote, slug, getModel, getTerm, modelUrl, checkoutUrl, refreshFooter, arrow, termOptions, modelCard, technicalDetails, comparisonTable, modelFaq, generalFaq };
})();
