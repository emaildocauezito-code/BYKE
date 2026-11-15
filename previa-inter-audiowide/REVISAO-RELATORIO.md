# Conferência do relatório BYKE

Referência: `BYKE_Relatorio_para_Codex (1).md`, enviado pela Manu em 15/11/2026. A revisão aplica o conteúdo desse relatório à versão ativa em `previa-inter-audiowide/`; não transforma o checklist acadêmico em conteúdo do site nem reabre a direção visual aprovada.

A versão anterior foi preservada na branch `backup/antes-revisao-relatorio-2026-11-15`, commit `9f95e0b75e2f469d261bd2e4cf75c5dac420995e`. Os assets, as páginas legadas e os scripts compartilhados dessas versões permanecem preservados. O README principal agora identifica a versão ativa para evitar que preços históricos sejam confundidos com os novos.

## Alterações no site

| Ponto do documento | Aplicação |
|---|---|
| Mensalidades confirmadas | `catalogo.js` local alimenta menu, cards, ficha, duração, comparação, quiz, revisão e comprovante. |
| Total do período | Mantida a multiplicação de mensalidade pela duração; o total aparece antes da entrega, na revisão e na confirmação. |
| Posicionamento Marlin | Leveza no conceito, pedalada esportiva no asfalto e ciclocomputador com mapas; nenhum peso em kg ou alegação de maior velocidade elétrica. |
| Posicionamento Tuna | Maior autonomia, cesta e praticidade para a rotina. O argumento antigo sobre o quadro foi removido dos textos ativos, inclusive quiz e FAQ. |
| Posicionamento Whale | Maior torque de referência, ajuda nas subidas, pneus largos e suspensão dupla. As cenas urbanas aprovadas foram mantidas. |
| Parâmetros técnicos | Autonomia, torque, bateria, assistência, instrumentação e recarga unificados. Ficha Saiba mais com 14 itens; comparação com 13 características. |
| Linguagem de estimativa | Nota curta de parâmetros conceituais sem ensaios, variação da autonomia e explicação de torque nas fichas e comparação. |
| Comparação responsiva | Preservados tabela no computador e blocos por característica no celular; atualizado somente o conteúdo. |
| Tipografia | Inter e Audiowide, nomes em maiúsculas e hierarquia aprovada preservados. |
| Abertura | Foto mantém título e slogan; vídeos mantêm somente o slogan. Sem alteração de imagens, vídeos ou enquadramentos. |
| Público geral | Explicitação na apresentação do serviço e FAQ; parceria empresarial é benefício adicional, sem requisito de vínculo. |
| Navegação | Removidos atalhos do fluxo ativo para as páginas de valores antigos. Menu, quiz, ranking e comparação permanecem na versão atual. |
| Conclusão | Mantidos plano → entrega → revisão → comprovante, edição e preenchimento livre para teste. Não foram adicionadas validações que impeçam chegar ao fim. |

### Preços e totais de referência

| Modelo | 3 meses: mensal / total | 6 meses: mensal / total | 12 meses: mensal / total |
|---|---:|---:|---:|
| Marlin | R$ 389 / R$ 1.167 | R$ 369 / R$ 2.214 | R$ 339 / R$ 4.068 |
| Tuna | R$ 289 / R$ 867 | R$ 269 / R$ 1.614 | R$ 249 / R$ 2.988 |
| Whale | R$ 369 / R$ 1.107 | R$ 349 / R$ 2.094 | R$ 319 / R$ 3.828 |

Todos os primeiros valores são mensalidades durante o prazo indicado. Não há desconto empresarial numérico inventado ou valor condicionado a uma empresa.

## Quiz revisado

As cinco perguntas seguem os temas e opções do documento: percurso, finalidade, prioridade, distância até recarga e orçamento para 12 meses. Avanço com um clique, progresso, Voltar, Rever respostas e Refazer continuam disponíveis.

Regras implementadas em `quiz-perfil.js`:

1. Percurso, finalidade e prioridade determinam afinidade. A finalidade cotidiana e a prioridade de autonomia podem manter a Tuna em primeiro mesmo quando há algumas irregularidades urbanas.
2. A recomendação prioriza atender à faixa de distância e ao teto de orçamento de referência. Marlin e Whale têm a mesma autonomia estimada de até 80 km; a regra antiga de 60 km da Whale foi removida.
3. Empates consideram primeiro a finalidade informada, depois a prioridade e finalmente a mensalidade menor. A ordem do catálogo não é critério de desempate.
4. O resultado traz dois motivos ligados às respostas, uma contrapartida, mensalidade, duração e total. Alternativas ficam disponíveis no ranking e no botão Comparar modelos.
5. Quando a preferência de uso excede o orçamento ou não cobre a distância, o resultado explica, antes da ação de escolha, por que outra opção ganhou prioridade, sem apagar a alternativa preferida.
6. “Mais de 80 km” favorece a Tuna, mas não supõe que qualquer distância acima disso será atendida: o texto informa o limite estimado de 100 km e a necessidade de recarga intermediária acima desse valor. Não há promessa de autonomia real garantida.
7. O orçamento é perguntado para 12 meses. Quando o visitante já escolheu 3 ou 6 meses, esse prazo é preservado e o resultado exibe o preço correspondente; uma nota explica a diferença em relação ao valor de referência de 12 meses.

Não foram criados percentuais fictícios de compatibilidade ou alegações de validação científica do ranking. A recomendação orienta a comparação de um conceito.

## Conferência de UX e entrega

O checklist da professora foi tratado como critério de revisão do que já existe. As fotografias originais da AP2, cartaz A3, slides e demais peças fora das publicações consultadas não vieram anexados a esta solicitação; não é possível atestar esses entregáveis apenas a partir do resumo.

A revisão preserva escolha sem quiz, hierarquia, proximidade entre preço e prazo, botões com verbos claros, alternativas, feedback de seleção e conclusão, fechamento por Escape, foco e navegação por teclado. Os gradientes de contraste sobre fotos e o fundo do diálogo foram mantidos por legibilidade; não foram adicionados efeitos decorativos novos.

### Verificações automatizadas registradas

- Teste de regras: `node previa-inter-audiowide/tests/consistencia.test.cjs`. Confere os nove preços, parâmetros, perfis esportivo/urbano/cross, orçamento insuficiente, distância acima de 80 e 100 km, desempate e as 540 combinações de respostas possíveis.
- Verificação de navegador: catálogo, nove mensalidades/totais, menu com prazo identificado, fichas, FAQ, comparação, galeria, quiz e conclusão em 1920 × 1080, 1366 × 768, 1024 × 768, 768 × 1024, 390 × 844 e 320 × 568.
- Comprovantes: nove combinações de modelo/prazo, revisão e confirmação com os mesmos valores; teste de preenchimento vazio e livre, retorno para editar e impressão em PDF.
- Quiz: perfis esportivo, cotidiano, cross, autonomia longa e orçamento restrito; retorno, revisão, reinício, teclado e preservação do prazo/modelo ao seguir.
- Tipografia e navegação: fontes Inter/Audiowide carregadas, ausência de overflow horizontal, links internos dentro da versão atual e preservação de arquivos aprovados.

Esses são testes de implementação e inspeção de interface, não uma pesquisa de usabilidade com usuários ou ensaios das bicicletas. O resumo final desta revisão deve registrar qualquer falha encontrada e corrigida, sem presumir aprovação da professora.

## Instagram — conteúdo consultado e pendências reais

Conta consultada pelo Metricool: [@bykeenergy](https://www.instagram.com/bykeenergy/). Foram retornadas nove publicações de feed, todas de 14/11/2026. As nove imagens e legendas foram conferidas. Nenhum post agendado foi retornado para o período consultado de 15/11/2026 a 15/11/2027. A consulta de Stories não retornou itens; isso **não confirma** que os destaques estejam vazios ou corretos.

A conexão disponível oferece leitura do conteúdo publicado e edição de posts ainda agendados. Não oferece edição de legendas já publicadas, troca das imagens desses posts, edição de bio ou gestão de destaques. Por isso, **nenhuma mudança foi aplicada ao Instagram**. Não houve republicação, alteração da ordem do feed ou mudança dos destaques.

### Duas legendas que precisam ser corrigidas

1. [Tuna — DfuwEe_DeBx](https://www.instagram.com/p/DfuwEe_DeBx/). A legenda ainda usa o argumento de quadro que o relatório pede retirar. Texto pronto:

> A Tuna foi pensada para os trajetos do dia a dia.
>
> Maior autonomia estimada da linha, de até 100 km por carga, cesta dianteira e praticidade para ir ao trabalho, estudar e resolver as tarefas da rotina.
>
> A autonomia varia conforme percurso, carga e nível de assistência.
>
> #BYKE #Tuna

2. [Planos — Dfur5W9iPLB](https://www.instagram.com/p/Dfur5W9iPLB/). A legenda informa Tuna por R$ 219/mês e valores exclusivos para funcionários de empresas parceiras. Texto pronto:

> Escolha o modelo e o tempo da sua assinatura.
>
> Planos de 3, 6 ou 12 meses, com pagamento mensal. No contrato de 12 meses:
>
> Tuna: R$ 249/mês
>
> Whale: R$ 319/mês
>
> Marlin: R$ 339/mês
>
> O serviço atende ao público geral. Parcerias empresariais são um benefício adicional. Nos contratos de 3 ou 6 meses, a mensalidade é diferente.
>
> #BYKE #Assinatura

As outras sete legendas consultadas não apresentam preços antigos ou o argumento removido. As legendas de Marlin e Whale já citam, respectivamente, pedalada esportiva/mapas e suspensão/pisos irregulares. As artes reforçam leveza e suspensão; não é necessário alterar suas imagens aprovadas para corrigir as duas legendas acima.

### Três artes para revisão, preservando as imagens aprovadas

| Peça | Problema escrito na própria arte | Correção de texto proposta |
|---|---|---|
| [Tuna — DfuwEe_DeBx](https://www.instagram.com/p/DfuwEe_DeBx/) | Rodapé “Cesta · Quadro baixo · Conforto”. | “Autonomia · Cesta · Praticidade”. |
| [Planos — Dfur5W9iPLB](https://www.instagram.com/p/Dfur5W9iPLB/) | Tuna por R$ 219/mês e restrição a funcionários de empresas parceiras. | Tuna por R$ 249/mês no plano de 12 meses; “Para o público geral. Parcerias empresariais são um benefício adicional.” Manter Whale R$ 319 e Marlin R$ 339 nesse mesmo prazo. |
| [Campanha Tuna — DfuryRYCOFt](https://www.instagram.com/p/DfuryRYCOFt/) | “Consulte a parceria da sua empresa.” pode fazer o benefício parecer condição de acesso. | “Planos para o público geral.” A parceria pode aparecer apenas como benefício adicional. |

Alterar só a legenda não corrige texto gravado na imagem. As artes foram apontadas para revisão conforme solicitado, sem trocar as fotos, redesenhar a campanha ou republicar posts. Stories/destaques e a bio permanecem sem verificação completa devido às capacidades da conexão.

## O que ainda impede afirmar compatibilidade total fora do site

- Aplicar as duas legendas corrigidas e revisar os textos das três artes identificadas no Instagram.
- Conferir bio, Stories e destaques diretamente na conta, especialmente preços, vínculo empresarial e o argumento removido da Tuna.
- Comparar o cartaz A3 e outros materiais não fornecidos com a tabela confirmada, se contiverem preço ou característica técnica.
- Validar os parâmetros em ensaios ou documentação técnica antes de apresentá-los como especificações comerciais reais. O site identifica os números como proposta conceitual.

## Atualização após aprovação da revisão

A pedido da Manu, o menu agora destaca Quiz no verde do logotipo (#64cb46), com texto escuro para contraste. A assinatura inclui entrega em casa ou retirada, seleção de Pix, cartão de crédito ou boleto e notificação de conclusão no site. As opções aparecem no resumo, na revisão e no comprovante; nenhum dado de cartão é coletado ou pagamento processado. O local de retirada permanece a combinar, sem endereço fictício.

A comunicação comercial passa a “Empresas parceiras podem contar com descontos especiais para suas equipes. Consulte as condições da parceria.” Não foi informado percentual e nenhum desconto foi aplicado às mensalidades confirmadas. A primeira pergunta do quiz distingue os três tipos de piso, deixando explícito que subidas podem existir em qualquer opção; a pontuação foi preservada.

Essa atualização não foi aplicada às publicações já existentes do Instagram; as limitações de edição e as pendências externas registradas acima permanecem.

Conferência adicional: botão verde nas quatro páginas e fluxos em seis larguras (1920, 1366, 1024, 768, 390 e 320 px); entrega/retirada com as três formas de pagamento no computador e celular; retenção do endereço ao trocar a opção; edição de prazo e pagamento; conclusão com campos vazios; notificação com fechamento manual, Escape e após oito segundos; impressão do comprovante sem a notificação. As 540 combinações do quiz continuam passando no teste de regras.
