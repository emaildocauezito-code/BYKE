const models = [
  {
    id: 0, name: 'Marlin', price: 239, tag: 'ESPORTIVA',
    image: 'assets/bicicletas/marlin-sem-fundo.png',
    imageAlt: 'Bicicleta BYKE Marlin Speed com guidão curvo e GPS',
    gallery: [
      { src: 'assets/bicicletas/angulos/marlin-diagonal.webp', label: 'Vista diagonal' },
      { src: 'assets/bicicletas/angulos/marlin-lateral.webp', label: 'Vista lateral' },
      { src: 'assets/bicicletas/angulos/marlin-frontal.webp', label: 'Vista frontal' }
    ],
    desc: 'Guidão curvo e pneus de perfil liso para trajetos no asfalto. ' +
      'Inclui bagageiro traseiro e suporte para garrafa.',
    specs: ['Autonomia estimada de até 100 km', 'Recarga estimada de 4 a 5 horas',
      'Guidão curvo esportivo']
  },
  {
    id: 1, name: 'Tuna', price: 199, tag: 'URBANA',
    image: 'assets/bicicletas/tuna-sem-fundo.png',
    imageAlt: 'Bicicleta elétrica BYKE Tuna urbana com cesto dianteiro',
    gallery: [
      { src: 'assets/bicicletas/angulos/tuna-diagonal.webp', label: 'Vista diagonal' },
      { src: 'assets/bicicletas/angulos/tuna-lateral.webp', label: 'Vista lateral' },
      { src: 'assets/bicicletas/angulos/tuna-frontal.webp', label: 'Vista frontal' }
    ],
    desc: 'Quadro baixo, cesta dianteira e bagageiro traseiro ' +
      'para os deslocamentos do dia a dia.',
    specs: ['Autonomia estimada de até 100 km', 'Recarga estimada de 4 a 6 horas',
      'Cesta dianteira e bagageiro traseiro']
  },
  {
    id: 2, name: 'Whale', price: 239, tag: 'CROSS',
    image: 'assets/bicicletas/whale-sem-fundo.png',
    imageAlt: 'Bicicleta elétrica BYKE Whale Cross com pneus largos e suspensão dupla',
    gallery: [
      { src: 'assets/bicicletas/angulos/whale-diagonal.webp', label: 'Vista diagonal' },
      { src: 'assets/bicicletas/angulos/whale-lateral.webp', label: 'Vista lateral' },
      { src: 'assets/bicicletas/angulos/whale-frontal.webp', label: 'Vista frontal' }
    ],
    desc: 'Pneus largos e suspensão dianteira e traseira para percursos urbanos ' +
      'com calçamento irregular e variações de piso.',
    specs: ['Autonomia estimada de até 60 km', 'Recarga estimada de 5 a 7 horas',
      'Suspensão dianteira e traseira']
  }
];

const terms = {
  quarterly: { label: 'trimestral', months: 3, prices: [329, 279, 329] },
  semiannual: { label: 'semestral', months: 6, prices: [269, 219, 269] },
  annual: { label: 'anual', months: 12, prices: models.map(model => model.price) }
};

const money = amount => amount.toLocaleString('pt-BR', {
  style: 'currency', currency: 'BRL', maximumFractionDigits: 0
});
const termDuration = term => `${term.months} meses`;
const simulationUrl = (model, term) => {
  const query = new URLSearchParams({ plano: term, modelo: model.name.toLowerCase() });
  return `planos.html?${query}#opcoes`;
};
