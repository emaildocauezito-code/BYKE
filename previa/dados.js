// A prévia reutiliza o catálogo publicado; preços e especificações continuam iguais.
models.forEach(model => {
  model.image = `../${model.image}`;
  const [diagonal, lateral, frontal] = model.gallery;
  model.gallery = [lateral, diagonal, frontal].map(view => ({ ...view, src: `../${view.src}` }));
});
window.BYKEPreview = (() => {
  const facts = [
    { range: 'Até 100 km', charge: '4–5 horas', tire: '700 × 40C · aro 700C', feature: 'Guidão curvo', use: 'Esportiva · Asfalto', position: 'Esportiva, com diferentes posições para as mãos', terrain: 'Asfalto e ciclovias de piso regular', accessories: 'Bagageiro traseiro, suporte para garrafa e GPS', comfort: 'Guidão curvo com pegadas variadas', overview: 'A Marlin reúne guidão curvo e pneus de perfil liso para o pedal no asfalto. As diferentes pegadas permitem variar a posição das mãos ao longo do percurso.' },
    { range: 'Até 100 km', charge: '4–6 horas', tire: '27,5 × 2,15″ · aro 27,5″', feature: 'Quadro baixo e cesta', use: 'Urbana · Dia a dia', position: 'Urbana, com acesso facilitado pelo quadro baixo', terrain: 'Deslocamentos urbanos e paradas frequentes', accessories: 'Cesta dianteira e bagageiro traseiro', comfort: 'Quadro baixo para facilitar subir e descer', overview: 'A Tuna combina quadro baixo, cesta e bagageiro para os deslocamentos cotidianos. O desenho do quadro facilita subir e descer nas paradas, e a cesta mantém os pequenos objetos à mão.' },
    { range: 'Até 60 km', charge: '5–7 horas', tire: '26 × 4,0″ · aro 26″', feature: 'Suspensão dupla', use: 'Cross · Pisos irregulares', position: 'Condução com guidão reto e pneus largos', terrain: 'Ruas com calçamento irregular e variações de piso', accessories: 'Bagageiro traseiro', comfort: 'Suspensão dianteira e traseira', overview: 'A Whale tem pneus largos e suspensão nos dois eixos para quem procura uma configuração mais robusta. Sua proposta inclui trajetos urbanos com pedras, juntas e diferentes tipos de piso.' }
  ];
  const slug = model => model.name.toLowerCase();
  const getModel = value => models.find(model => slug(model) === (value === 'wale' ? 'whale' : value)) || models[0];
  const getTerm = value => Object.hasOwn(terms, value) ? value : 'annual';
  const url = (page, model, term) => `${page}?${new URLSearchParams({ modelo: slug(model), plano: getTerm(term) })}`;
  const modelUrl = (model, term) => url('loja.html', model, term);
  const checkoutUrl = (model, term) => url('assinatura.html', model, term);
  const arrow = '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false"><path d="M5 12h14m-6-6 6 6-6 6" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>';
  const termOptions = (model, selected, name = 'duration') => Object.entries(terms).map(([key, term]) => `
    <label class="shop-term-option">
      <input type="radio" name="${name}" value="${key}" ${key === selected ? 'checked' : ''}>
      <span><strong>${term.months} meses</strong><small>${money(term.prices[model.id])}/mês</small></span>
    </label>`).join('');
  const modelCard = (model, selectedTerm) => {
    const term = terms[getTerm(selectedTerm)];
    return `
      <article class="shop-related-card">
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
      ['Recarga completa estimada', fact.charge], ['Pneus e aros de referência', fact.tire],
      ['Conforto e controle', fact.comfort], ['Acessórios', fact.accessories],
      ['Iluminação', 'Farol dianteiro']
    ];
    return `<details class="shop-technical"><summary><span><strong>Saiba mais</strong><small>Características, medidas e uso indicado</small></span><span class="technical-toggle" aria-hidden="true">+</span></summary><div class="technical-content"><p>${fact.overview}</p><dl>${rows.map(([label,value]) => `<div><dt>${label}</dt><dd>${value}</dd></div>`).join('')}</dl><p class="technical-note">Autonomia e tempo de recarga são estimativas. Piso, carga transportada e modo de uso influenciam o resultado.</p></div></details>`;
  };
  const comparisonTable = (selectedTerm, selectedModel) => {
    const term = terms[getTerm(selectedTerm)];
    const rows = [
      ['Perfil', model => facts[model.id].use],
      ['Autonomia por carga', model => facts[model.id].range],
      ['Recarga estimada', model => facts[model.id].charge],
      ['Pneus e aros', model => facts[model.id].tire],
      ['Conforto e controle', model => facts[model.id].comfort],
      ['Acessórios', model => facts[model.id].accessories],
      ['Percurso indicado', model => facts[model.id].terrain],
      [`Mensalidade · ${term.months} meses`, model => `${money(term.prices[model.id])}/mês`]
    ];
    const current = model => model.id === selectedModel ? ' class="comparison-selected"' : '';
    return `<div class="byke-comparison-scroll" tabindex="0" role="region" aria-label="Quadro de comparação dos três modelos"><table class="byke-comparison-table"><caption class="shop-sr-only">Comparação de Marlin, Tuna e Whale para assinatura de ${term.months} meses</caption><thead><tr><th scope="col">Características</th>${models.map(model => `<th scope="col"${current(model)}><img src="${model.gallery[0].src}" width="1536" height="1024" alt="" loading="lazy"><strong>${model.name}</strong><span>${model.tag}</span></th>`).join('')}</tr></thead><tbody>${rows.map(([label,value]) => `<tr><th scope="row">${label}</th>${models.map(model => `<td${current(model)}>${value(model)}</td>`).join('')}</tr>`).join('')}</tbody><tfoot><tr><th scope="row">Conheça o modelo</th>${models.map(model => `<td${current(model)}><a href="${modelUrl(model,selectedTerm)}#produto" data-model="${slug(model)}">Ver ${model.name} ${arrow}</a></td>`).join('')}</tr></tfoot></table></div><p class="comparison-note">Autonomia e recarga estimadas; os resultados variam com o percurso, a carga e o modo de uso.</p>`;
  };
  const modelFaq = model => {
    const fact = facts[model.id];
    const questions = [
      [`Para quais trajetos a ${model.name} é indicada?`, `${fact.overview} Percurso indicado: ${fact.terrain.toLowerCase()}.`],
      [`Quanto custa assinar a ${model.name}?`, `O plano de 3 meses custa ${money(terms.quarterly.prices[model.id])}/mês; o de 6 meses, ${money(terms.semiannual.prices[model.id])}/mês; e o de 12 meses, ${money(terms.annual.prices[model.id])}/mês. O pagamento é mensal. A duração e o total do período aparecem junto à escolha do plano.`],
      [`Quais acessórios a ${model.name} possui?`, `${fact.accessories}. O modelo também conta com farol dianteiro.`],
      [`Qual a autonomia e quanto tempo leva para recarregar?`, `A ${model.name} tem autonomia estimada de ${fact.range.toLowerCase()} por carga e recarga completa estimada de ${fact.charge}. O resultado varia com o piso, a carga transportada e o modo de uso.`],
      ['Posso alterar o modelo ou o prazo antes de concluir?', 'Sim. Escolha outro prazo na página da bicicleta ou na primeira etapa da assinatura. Para comparar outro modelo, use os cards, o quadro de comparação ou “Trocar bicicleta”. Na revisão, os botões “Editar” permitem voltar às etapas anteriores.'],
      ['Quais dados aparecem na etapa de entrega?', 'Você encontra campos de nome, e-mail, celular, CEP, rua, número, complemento, bairro, cidade, estado e data desejada. Essas informações aparecem novamente na revisão, antes da conclusão.'],
      ['Como confiro minha escolha e salvo o comprovante?', 'Na etapa “Revisão”, confira a bicicleta, a duração, a mensalidade e os dados de entrega. Depois de concluir, use “Salvar ou imprimir comprovante” para abrir a impressão do navegador e salvar em PDF, se desejar.']
    ];
    return questions.map(([question,answer]) => `<details><summary>${question}</summary><p>${answer}</p></details>`).join('');
  };
  return { facts, slug, getModel, getTerm, modelUrl, checkoutUrl, arrow, termOptions, modelCard, technicalDetails, comparisonTable, modelFaq };
})();
