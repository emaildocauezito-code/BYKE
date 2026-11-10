const models = [
  {
    id: 0, name: 'Marlim', price: 239, tag: 'ESPORTIVA',
    tagline: 'Encontre seu ritmo.',
    desc: 'A agilidade do marlim inspira nossa bike de perfil esportivo. ' +
      'Com guidão curvo e uma posição de pedalada mais inclinada, a Marlim é ' +
      'para quem gosta de movimento, ritmo e trajetos no asfalto.',
    specs: ['Autonomia estimada de até 70 km', 'Recarga estimada de 3 a 4 horas',
      'Guidão curvo e posição esportiva']
  },
  {
    id: 1, name: 'Tuna', price: 199, tag: 'URBANA',
    tagline: 'Energia para acompanhar seu dia.',
    desc: 'A Tuna traduz resistência em uma bike feita para a rotina. Sua proposta ' +
      'combina maior autonomia de bateria, posição confortável e praticidade. ' +
      'A cesta e o bagageiro acomodam seus pertences, enquanto o quadro baixo ' +
      'facilita cada parada pelo caminho.',
    specs: ['Autonomia estimada de até 100 km', 'Recarga estimada de 4 a 6 horas',
      'Cesta dianteira e bagageiro traseiro']
  },
  {
    id: 2, name: 'Wale', price: 239, tag: 'CROSS',
    tagline: 'Presença para explorar.',
    desc: 'A força e a presença da baleia dão personalidade à Wale. Com pneus ' +
      'largos, suspensão dianteira e traseira e visual robusto, ela traz uma ' +
      'proposta aventureira para quem quer explorar caminhos de terra e percursos irregulares.',
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
