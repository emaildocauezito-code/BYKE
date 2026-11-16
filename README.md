# BYKE — Build Your Keen Energy

Versão atual em revisão: [Inter + Audiowide](https://emaildocauezito-code.github.io/BYKE/previa-inter-audiowide/index.html). O código desse fluxo está em `previa-inter-audiowide/`. As páginas antigas da raiz e `previa/` são histórico do projeto; não são a referência dos preços e parâmetros desta revisão.

Assinatura de bicicletas elétricas para o público geral. Empresas parceiras podem contar com descontos especiais para suas equipes, conforme as condições da parceria; o serviço permanece aberto ao público geral. Nenhum percentual foi definido ou aplicado aos preços de referência. A demonstração permite escolher sem quiz, comparar modelos, selecionar 3, 6 ou 12 meses, escolher entrega ou retirada e forma de pagamento e concluir um comprovante local. Não efetua cobrança ou contratação real.

## Mensalidades confirmadas

| Modelo | 3 meses | 6 meses | 12 meses |
|---|---:|---:|---:|
| Tuna | R$ 289/mês | R$ 269/mês | R$ 249/mês |
| Whale | R$ 369/mês | R$ 349/mês | R$ 319/mês |
| Marlin | R$ 389/mês | R$ 369/mês | R$ 339/mês |

O total do período é a mensalidade multiplicada por 3, 6 ou 12. Catálogo, menu, ficha, comparação, quiz, revisão e comprovante usam o mesmo catálogo local.

## Parâmetros propostos para o conceito

Sem ensaios das bicicletas; não são especificações de produto homologado. A autonomia varia conforme percurso, carga e nível de assistência. Torque é a força de giro que contribui nas arrancadas e subidas. Não foi atribuído peso em kg aos modelos.

| Característica | Marlin | Tuna | Whale |
|---|---|---|---|
| Assistência elétrica proposta | Até 32 km/h | Até 32 km/h | Até 32 km/h |
| Autonomia estimada por carga | Até 80 km | Até 100 km | Até 80 km |
| Torque de referência | 55 Nm | 40 Nm | 70 Nm |
| Bateria nominal proposta | 540 Wh | 720 Wh | 840 Wh |
| Recarga completa estimada | 6–7 h | 6–7 h | 7–8 h |
| Instrumentação | Ciclocomputador com mapas | Indicador simples | Indicador simples |
| Diferencial | Leveza no conceito e pedalada esportiva | Autonomia e uso cotidiano | Força e suspensão dupla |

## Executar e conferir

Sem instalação de dependências ou etapa de build. Na pasta do repositório:

```sh
python3 -m http.server 8000 --bind 127.0.0.1
```

Abra `http://127.0.0.1:8000/previa-inter-audiowide/index.html`. Para parar o servidor, pressione Ctrl+C.

Teste a consistência dos preços, parâmetros e regras do quiz com Node.js:

```sh
node previa-inter-audiowide/tests/consistencia.test.cjs
```

## Arquivos da versão atual

- `catalogo.js`: fonte única dos modelos, mensalidades e parâmetros técnicos.
- `dados.js`: fichas, cards, FAQ, comparação para computador/celular e links do fluxo atual.
- `quiz-perfil.js`: cinco perguntas sobre necessidade, afinidade, limites de distância e orçamento.
- `quiz.js`: quiz com avanço pela resposta, voltar, rever, refazer, ranking e escolha do modelo.
- `quiz-acesso.js`: abertura do quiz, prazo selecionado e retorno de foco no menu móvel.
- `index.html`: foto/vídeos aprovados e apresentação dos três modelos.
- `bicicletas.html` e `bicicletas.js`: catálogo e controle de duração.
- `loja.html` e `loja.js`: modelo, galeria, plano e ficha Saiba mais.
- `assinatura.html` e `assinatura.js`: plano, entrega ou retirada, forma de pagamento, revisão, comprovante e notificação de conclusão.
- `tipografia.css`: Inter para textos e interface, Audiowide nos destaques aprovados.

Os arquivos acima estão em `previa-inter-audiowide/`. Imagens, fontes locais, vídeos, enquadramentos e a organização visual aprovados foram preservados. A foto da abertura mantém título e slogan; os dois vídeos exibem somente o slogan.

## Critérios e limites do quiz

O orçamento é informado para 12 meses. Se outro prazo estiver selecionado, o resultado identifica a duração e a mensalidade exibidas e explica a diferença em relação à referência de orçamento. Afinidade considera percurso, uso e prioridade; distância e teto de orçamento vêm antes da afinidade. Empates consideram o uso, a prioridade e a mensalidade menor, sem favorecer a ordem do catálogo. O resultado oferece dois motivos, uma contrapartida e alternativas.

Acima de 80 km, a maior autonomia estimada da Tuna tem prioridade. Acima de 100 km sem recarga, nenhum dos três modelos tem autonomia proposta suficiente; o resultado explica a necessidade de uma recarga intermediária. Uma pequena irregularidade urbana, sozinha, não determina a escolha da Whale.

A primeira pergunta descreve as condições dos caminhos; a segunda pergunta trata da finalidade do uso, evitando repetir as mesmas atividades nas duas. A primeira combina preferências de percurso: asfalto/ciclovias, trajetos urbanos do dia a dia e subidas/caminhos variados. Esses cenários não delimitam os modelos a um único piso. Finalidade, prioridades, autonomia e orçamento também participam da recomendação. O botão Quiz tem fundo transparente e borda verde #64cb46 do logotipo, com as mesmas dimensões de Planos.

A assinatura oferece entrega em casa ou retirada no ponto combinado e seleção de Pix, cartão de crédito ou boleto. O ponto de retirada aparece como local a combinar até que seu endereço seja definido; nenhum endereço real foi inventado. O resumo, a revisão e o comprovante identificam a opção e a forma de pagamento. Ao concluir, uma notificação acessível aparece por oito segundos, acompanhada de um aviso sonoro pré-carregado, com fechamento manual e por Escape; não há envio de e-mail, SMS ou cobrança real.

O som usa um arquivo WAV próprio de 0,95 s em `previa-inter-audiowide/assets/audio/conclusao.wav`, pré-carregado e reproduzido pelo clique em Concluir assinatura. Não há botão de reprodução ou mensagem pedindo para ouvir o aviso. Se o áudio não for reproduzido, a confirmação visual permanece. Não há reprodução sonora ao navegar ou responder ao quiz.

O formulário continua com preenchimento livre para testes. Dados ficam em memória na página, sem envio ou armazenamento persistente. Atualizar/fechar a página perde esses dados; o comprovante pode ser salvo pela impressão do navegador.

## Revisão e versões preservadas

- [Relatório de conferência e pendências do Instagram](previa-inter-audiowide/REVISAO-RELATORIO.md).
- Antes desta revisão: branch `backup/antes-revisao-relatorio-2026-11-15`, commit `9f95e0b75e2f469d261bd2e4cf75c5dac420995e`.
- Antes da variante tipográfica: branch `backup/antes-inter-audiowide-2026-11-15`.

O relatório registra o que foi verificado e o que depende de revisão externa. O acesso Metricool consulta o conteúdo publicado do Instagram, mas não oferece edição das legendas já publicadas nem dos destaques. Nenhuma publicação foi marcada como corrigida sem alteração efetiva.
