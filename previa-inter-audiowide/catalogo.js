// Fonte única de preços e parâmetros propostos para a versão revisada.
const models = [
  {
    "id": 0,
    "name": "Marlin",
    "price": 339,
    "tag": "ESPORTIVA / SPEED",
    "image": "assets/bicicletas/marlin-sem-fundo.png",
    "imageAlt": "Bicicleta BYKE Marlin Speed com guidão curvo e ciclocomputador com mapas",
    "desc": "A mais leve da linha no conceito, com pedalada esportiva para asfalto e ciclocomputador com mapas.",
    "technical": {
      "rangeKm": 80,
      "charge": "6–7 h",
      "torqueNm": 55,
      "batteryWh": 540,
      "assistanceKmh": 32,
      "instrumentation": "Ciclocomputador com mapas",
      "feature": "Leveza e pedalada esportiva",
      "use": "Esportiva / Speed · Asfalto",
      "tire": "700 × 40C · aro 700C",
      "position": "Esportiva, com diferentes posições para as mãos",
      "terrain": "Asfalto, ruas pavimentadas e ciclovias",
      "accessories": "Bagageiro traseiro e suporte para garrafa",
      "comfort": "Guidão curvo com pegadas variadas",
      "overview": "A Marlin prioriza leveza no conceito e pedalada esportiva no asfalto. O ciclocomputador com mapas ajuda a acompanhar o percurso. A assistência elétrica proposta tem o mesmo limite dos demais modelos.",
      "tradeoff": "Sua proposta é esportiva para asfalto; para maior autonomia, a Tuna oferece até 100 km estimados, contra até 80 km da Marlin."
    },
    "gallery": [
      {
        "src": "assets/bicicletas/angulos/marlin-diagonal.webp",
        "label": "Vista diagonal"
      },
      {
        "src": "assets/bicicletas/angulos/marlin-lateral.webp",
        "label": "Vista lateral"
      },
      {
        "src": "assets/bicicletas/angulos/marlin-frontal.webp",
        "label": "Vista frontal"
      }
    ]
  },
  {
    "id": 1,
    "name": "Tuna",
    "price": 249,
    "tag": "URBANA",
    "image": "assets/bicicletas/tuna-sem-fundo.png",
    "imageAlt": "Bicicleta elétrica BYKE Tuna urbana com cesta dianteira",
    "desc": "Maior autonomia da linha, cesta dianteira e praticidade para os deslocamentos e tarefas da rotina.",
    "technical": {
      "rangeKm": 100,
      "charge": "6–7 h",
      "torqueNm": 40,
      "batteryWh": 720,
      "assistanceKmh": 32,
      "instrumentation": "Indicador simples",
      "feature": "Autonomia e uso cotidiano",
      "use": "Urbana · Dia a dia",
      "tire": "27,5 × 2,15″ · aro 27,5″",
      "position": "Urbana, com guidão reto",
      "terrain": "Deslocamentos urbanos, trabalho, estudo e pequenas compras",
      "accessories": "Cesta dianteira e bagageiro traseiro",
      "comfort": "Condução voltada à rotina urbana",
      "overview": "A Tuna tem a maior autonomia estimada da linha: até 100 km por carga. A cesta dianteira e o bagageiro ajudam a levar os objetos das tarefas cotidianas. Sua proposta combina autonomia e praticidade na cidade.",
      "tradeoff": "A autonomia é seu destaque; para mais ajuda nas subidas e absorção de impactos, a Whale oferece torque de referência maior e suspensão dupla."
    },
    "gallery": [
      {
        "src": "assets/bicicletas/angulos/tuna-diagonal.webp",
        "label": "Vista diagonal"
      },
      {
        "src": "assets/bicicletas/angulos/tuna-lateral.webp",
        "label": "Vista lateral"
      },
      {
        "src": "assets/bicicletas/angulos/tuna-frontal.webp",
        "label": "Vista frontal"
      }
    ]
  },
  {
    "id": 2,
    "name": "Whale",
    "price": 319,
    "tag": "CROSS",
    "image": "assets/bicicletas/whale-sem-fundo.png",
    "imageAlt": "Bicicleta elétrica BYKE Whale Cross com pneus largos e suspensão dupla",
    "desc": "Maior força para subidas, pneus largos e suspensão dianteira e traseira para caminhos irregulares.",
    "technical": {
      "rangeKm": 80,
      "charge": "7–8 h",
      "torqueNm": 70,
      "batteryWh": 840,
      "assistanceKmh": 32,
      "instrumentation": "Indicador simples",
      "feature": "Força e suspensão dupla",
      "use": "Cross · Subidas e pisos irregulares",
      "tire": "26 × 4,0″ · aro 26″",
      "position": "Condução com guidão reto e pneus largos",
      "terrain": "Ruas irregulares, subidas e caminhos de terra",
      "accessories": "Bagageiro traseiro",
      "comfort": "Suspensão dianteira e traseira",
      "overview": "A Whale prioriza ajuda nas subidas e absorção dos impactos do piso. Tem o maior torque de referência da linha, pneus largos e suspensão dianteira e traseira para percursos urbanos irregulares e caminhos variados.",
      "tradeoff": "Sua proposta prioriza força e suspensão; a recarga é estimada em 7–8 h e a autonomia em até 80 km, enquanto a Tuna chega a até 100 km estimados."
    },
    "gallery": [
      {
        "src": "assets/bicicletas/angulos/whale-diagonal.webp",
        "label": "Vista diagonal"
      },
      {
        "src": "assets/bicicletas/angulos/whale-lateral.webp",
        "label": "Vista lateral"
      },
      {
        "src": "assets/bicicletas/angulos/whale-frontal.webp",
        "label": "Vista frontal"
      }
    ]
  }
];

models.forEach(model => { model.specs = [`Autonomia estimada de até ${model.technical.rangeKm} km`, `Recarga estimada de ${model.technical.charge}`, model.technical.feature]; });

const terms = {
  quarterly: { label: "trimestral", months: 3, prices: [389, 289, 369] },
  semiannual: { label: "semestral", months: 6, prices: [369, 269, 349] },
  annual: { label: "anual", months: 12, prices: models.map(model => model.price) }
};

const money = amount => amount.toLocaleString('pt-BR', {
  style: 'currency', currency: 'BRL', maximumFractionDigits: 0
});
const termDuration = term => `${term.months} meses`;
const simulationUrl = (model, term) => {
  const query = new URLSearchParams({ plano: term, modelo: model.name.toLowerCase() });
  const url = `loja.html?${query}#plano`;
  return window.BYKEStyleVariant?.withVariant(url) || url;
};
