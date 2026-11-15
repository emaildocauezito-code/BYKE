const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.join(__dirname, '..');
const context = vm.createContext({ window: {} });
const catalog = fs.readFileSync(path.join(root, 'catalogo.js'), 'utf8');
vm.runInContext(catalog + '\nglobalThis.data = { models, terms };', context);
vm.runInContext(fs.readFileSync(path.join(root, 'quiz-perfil.js'), 'utf8'), context);
const { models, terms } = context.data;
const { questions, recommend } = context.window.BYKEQuizProfile;
const plain = value => JSON.parse(JSON.stringify(value));
const winner = answers => recommend(answers).ranking[0].model.name;
// Valores e parâmetros confirmados no relatório, na ordem Marlin / Tuna / Whale.
assert.deepEqual(plain(terms.quarterly.prices), [389, 289, 369]);
assert.deepEqual(plain(terms.semiannual.prices), [369, 269, 349]);
assert.deepEqual(plain(terms.annual.prices), [339, 249, 319]);
assert.deepEqual(plain(models.map(m => [m.technical.rangeKm, m.technical.torqueNm, m.technical.batteryWh, m.technical.charge, m.technical.assistanceKmh])), [[80,55,540,'6–7 h',32],[100,40,720,'6–7 h',32],[80,70,840,'7–8 h',32]]);
assert.equal(questions.length, 5);
assert.equal(winner([0,1,1,2,3]), 'Marlin'); // Esportivo / asfalto.
assert.equal(winner([0,0,0,2,0]), 'Tuna'); // Rotina / autonomia / até R$250.
assert.equal(winner([2,2,2,3,1]), 'Whale'); // Cross até 80 km / orçamento de até R$320.
assert.equal(winner([1,0,0,1,3]), 'Tuna'); // Calçamento urbano não obriga escolher Cross.
assert.equal(winner([0,1,1,0,0]), 'Tuna'); // Uso esportivo com orçamento insuficiente.
assert.match(recommend([0,1,1,0,0]).notices.join(' '), /Marlin.*orçamento/);
assert.equal(winner([2,2,2,4,3]), 'Tuna'); // Mais de 80 km muda a prioridade para autonomia.
assert.equal(recommend([2,2,2,4,3]).ranking[1].model.name, 'Whale'); // Sem forçar Cross ao último lugar.
assert.match(recommend([2,2,2,4,3]).notices.join(' '), /ultrapassar 100 km/);
assert.equal(winner([2,0,1,0,3]), 'Tuna'); // Empate: o uso cotidiano prevalece, não a ordem do catálogo.
assert.equal(winner([2,1,0,0,3]), 'Marlin'); // Mesmo empate, agora com finalidade esportiva.
assert.throws(() => recommend([0,1,2]), /cinco perguntas/);
assert.throws(() => recommend([0,1,2,5,1]), /cinco perguntas/);
let combinations = 0;
for (let a=0;a<3;a++) for (let b=0;b<3;b++) for (let c=0;c<3;c++) for (let d=0;d<5;d++) for (let e=0;e<4;e++) {
  const result = recommend([a,b,c,d,e]);
  assert.equal(result.reasons.length, 2);
  assert.equal(new Set(result.reasons).size, 2);
  assert.equal(result.ranking.length, 3);
  assert.equal(new Set(result.ranking.map(item => item.model.id)).size, 3);
  assert.ok(result.ranking[0].rangeFits && result.ranking[0].budgetFits);
  assert.ok(result.tradeoff.length > 20);
  assert.ok(result.ranking.every(item => Number.isFinite(item.score)));
  combinations++;
}
console.log(`OK: preços, parâmetros, perfis, limites, empates e ${combinations} combinações do quiz.`);
