# BYKE — checklist final da AP2

Revisão de 16/11/2026 baseada no documento `BYKE_Relatorio_para_Codex (1).md` enviado pela Manu. O documento resume a AP2 e as fotografias do checklist; as imagens originais dessas instruções não vieram neste anexo. Esta conferência não substitui a avaliação da professora.

**Conclusão:** o fluxo principal da versão aprovada está completo e os requisitos funcionais testados estão atendidos. A entrega inteira ainda depende de alinhar a divulgação e compartilhar o endereço correto. Há ressalvas de inspeção visual/acessibilidade detalhadas abaixo, sem impedimento de navegação identificado nos testes.

## Versão correta para entregar

[Site aprovado](https://emaildocauezito-code.github.io/BYKE/previa-inter-audiowide/index.html?v=checklist-final-1).

O endereço antigo `https://emaildocauezito-code.github.io/BYKE/index.html` ainda abre uma versão anterior. Na consulta, o catálogo antigo retornou mensalidades anuais de R$ 239/199/239 para Marlin/Tuna/Whale; a versão aprovada usa R$ 339/249/319. Por isso, o link em slides, QR code, Instagram e mensagens deve apontar para a versão aprovada. A rota antiga não foi substituída nesta revisão.

## Correções pequenas feitas durante a conferência

1. **Prazo preservado no rodapé:** escolher 3 ou 6 meses e depois abrir outra bike pelo rodapé agora mantém essa duração. Antes, o atalho genérico abria 12 meses. Ajustados `dados.js`, `inicio.js` e `assinatura.js`.
2. **Identificação para leitores de tela:** a faixa Prévia em `loja.html` e `assinatura.html` passou a ter uma região nomeada. Isso resolveu a ocorrência de boa prática sem mudar o visual.

Os arquivos HTML e `variantes.js` também receberam versão de cache para carregar essas correções. Imagens, fontes, textos aprovados do quiz, preços e layout foram preservados. O botão Ouvir não foi recolocado.

Para conferir o rodapé: selecione **3 meses** no catálogo, abra **WHALE** pelo rodapé e confira **R$ 369/mês**, prazo de 3 meses e total de **R$ 1.107**.

## Os 30 critérios do documento

“Conferido” indica evidência nesta revisão; não representa uma nota. “Com ressalva” explicita limite do teste ou refinamento recomendado. “Pendência externa” não significa ausência de funcionalidade no site.

### Clareza da jornada

| Critério | Situação | Evidência / observação |
|---|---|---|
| O visitante entende o serviço e o que pode alcançar no site. | Conferido | A abertura identifica bicicletas elétricas por assinatura; Como funciona, modelos, prazos e ações explicam a proposta. |
| Cada etapa contribui para escolher a bicicleta e a duração da assinatura. | Conferido | Catálogo → modelo/plano → recebimento/pagamento → revisão → comprovante. |
| A sequência tem início, meio e fim claros, sem etapas repetidas ou confusas. | Conferido | Etapas numeradas, resumo de preço e confirmação final. A primeira etapa da assinatura permite confirmar/editar o prazo. |
| É possível escolher sem fazer o quiz. | Conferido | Explorar modelos, Conhecer modelo, cards, comparação e Assinar funcionam sem quiz. |
| O resultado final é visível: modelo, prazo, mensalidade e conclusão compreensível. | Conferido | Nove combinações de modelo e prazo conferidas até a confirmação, com mensalidade e total iguais aos da escolha. |
| As dúvidas e frustrações do usuário são consideradas; feedbacks orientam ajustes. | Conferido | Feedbacks da Manu estão registrados no Git e nos relatórios: imagens, mobile, fontes, perguntas, menu e notificação. O som foi confirmado pela usuária nesta conversa. |

### Consistência visual e textual

| Critério | Situação | Evidência / observação |
|---|---|---|
| Manter a consistência visual entre as páginas, preservando as escolhas já concluídas. | Conferido | Inter/Audiowide, paleta, fotos e vídeos aprovados preservados nas quatro páginas. |
| Hierarquia clara entre títulos, subtítulos, informações e ações. | Conferido | Nomes e destaques em Audiowide; textos e controles em Inter; preço, duração e CTA próximos. |
| Contraste, leitura e tamanhos adequados, inclusive no celular. | Conferido com ressalva | Telas e textos inspecionados em seis larguras. A checagem automática não mede com segurança todo contraste sobre fotografias; não é certificado completo de acessibilidade. |
| Alinhamentos, margens e espaçamentos comuns; informações relacionadas próximas. | Conferido | Grids e espaçamentos compartilhados; sem overflow horizontal nos tamanhos testados. |
| Ausência de sombras, gradientes e efeitos desnecessários. | Conferido com ressalva | Há overlays de contraste necessários nas imagens e efeitos leves aprovados no quiz/galeria. Elementos decorativos podem ser simplificados se a professora aplicar esse critério de maneira estrita; o visual aprovado não foi refeito. |
| Mesmo tom de voz, nomes, unidades, maiúsculas e pontuação padronizados. | Conferido | MARLIN/TUNA/WHALE em destaque, texto corrido coerente, R$/mês, km, km/h, Nm, Wh e h consistentes. |
| Frases simples e objetivas; termos técnicos explicados quando necessários. | Conferido | Torque explicado em linguagem simples; autonomia/recarga identificadas como estimativas do conceito. |
| Informações aparecem na quantidade e no momento adequados, sem sobrecarregar a tela. | Conferido | Fichas detalhadas sob Saiba mais, comparação por característica no celular e uma pergunta por etapa no quiz. |

### CTAs, navegação e interação

| Critério | Situação | Evidência / observação |
|---|---|---|
| Botões com verbos claros e consistentes para as mesmas ações. | Conferido | Conhecer, Escolher, Assinar, Revisar, Concluir e Salvar/imprimir têm ações correspondentes. |
| Ações principais distinguíveis, sem botões redundantes ou ambíguos. | Conferido | Planos com preenchimento escuro e Quiz com contorno verde do mesmo tamanho; ações de revisão/edição identificadas. |
| Ícones compreensíveis, controles visíveis e áreas de toque adequadas. | Conferido | Controles com nomes acessíveis, setas identificadas e opções clicáveis. Testes de navegação e inspeção de telas realizados. |
| Voltar, editar, fechar e cancelar funcionam sem perda desnecessária das escolhas. | Conferido | Voltar, Editar e Escape no quiz testados; campos e escolhas mantidos entre etapas. Corrigido o prazo nos atalhos de modelos do rodapé. |
| Seleções, carregamento, erro e sucesso têm feedback claro e útil. | Conferido com ressalva | Seleção, preços, ângulos, progresso e sucesso conferidos. Falhas possíveis de conexão não foram testadas exaustivamente; não houve travamento ou erro JavaScript nos fluxos percorridos. |
| Erros são prevenidos e a pessoa entende como corrigi-los, quando aplicável. | Conferido | Escolhas limitadas a modelos/prazos válidos, revisão antes de concluir e prevenção de conclusão duplicada. Campos livres são uma decisão explícita para o teste acadêmico. |
| Navegação por teclado, foco visível, fechamento por Escape e retorno do foco conferidos. | Conferido | Enter, Espaço, Escape e retorno do foco conferidos. A faixa Prévia recebeu região nomeada; a rechecagem automatizada não apontou ocorrências nas páginas corrigidas. |
| Ajuda e explicações disponíveis quando necessárias. | Conferido | Cinco perguntas frequentes, informações técnicas, explicação de torque e limitações da recomendação disponíveis. |
| Tempo de resposta e carregamento conferidos; animações não dificultam o uso. | Conferido com ressalva | Interações e carregamento observados sem bloqueios no ambiente de teste; movimento reduzido respeitado. Um controle explícito de Pausar nos vídeos automáticos seria um refinamento recomendado para uma exigência formal de acessibilidade. |
| Versões responsivas verificadas, sem cortes, sobreposição ou conteúdo inacessível. | Conferido | 1920, 1366, 1024, 768, 390 e 320 px testados; comparação muda de tabela para blocos no mobile, sem conteúdo funcional cortado. |

### Conferência da entrega

| Critério | Situação | Evidência / observação |
|---|---|---|
| Preço, prazo e total do período coincidem em toda a jornada. | Conferido | Três modelos × três durações verificados no catálogo, ficha e comprovante; totais calculados pela mensalidade × meses. |
| Mudanças de modelo e prazo atualizam as informações corretamente. | Conferido | Mudanças de prazo/modelo atualizam valores. A correção do rodapé foi testada com os três prazos em catálogo e assinatura. |
| Dados da comparação, fichas, FAQ e resultado do quiz são consistentes. | Conferido | Dados de 80/100/80 km, 55/40/70 Nm, 540/720/840 Wh, 6–7/6–7/7–8 h e 32 km/h conferidos. As 540 combinações do quiz passaram no teste de regras. |
| Registro da evolução e dos feedbacks disponível para a apresentação. | Conferido | Histórico de commits, backups e REVISAO-RELATORIO.md disponíveis; este documento registra a checagem final. |
| Testes e ajustes relatados correspondem ao que realmente foi realizado. | Conferido | Métodos e limites descritos abaixo. Não se afirmam pesquisa formal com usuários, ensaios das bicicletas, certificação WCAG ou nota da professora. |
| Site, Instagram e materiais de divulgação apresentam a mesma proposta de marca e produto. | Pendência externa | A consulta atual ao Instagram e suas artes ainda divergem do site nos pontos listados abaixo. Cartaz A3 e apresentação final não foram fornecidos para esta checagem. |

## Verificações executadas

- Fluxos no site publicado em 1920 × 1080, 1366 × 768, 1024 × 768, 768 × 1024, 390 × 844 e 320 × 568.
- Compra conceitual sem quiz, catálogo e menu com nove mensalidades, fichas com 14 itens, comparação com 13 características, cinco FAQ, galeria e resumo.
- Nove combinações de modelo/prazo até o comprovante, edição de contato, campos de teste livres e impressão do comprovante em PDF.
- Entrega ou retirada e forma de pagamento presentes na confirmação; nenhum envio de formulário ou cobrança real foi realizado.
- Quiz automático, ranking, dois motivos, contrapartida, revisão de respostas e preservação de prazo/modelo. `node previa-inter-audiowide/tests/consistencia.test.cjs`: 540 combinações aprovadas.
- Teclado e foco: Enter/Espaço para interação, Voltar, fechamento por Escape e retorno ao convite do quiz.
- Fontes Inter/Audiowide carregadas, footer e links mantidos dentro do fluxo aprovado; ausência de overflow horizontal nos tamanhos testados.
- Axe-core 4.10.3 em 18 estados/páginas no computador e celular, com regras WCAG A/AA e boas práticas. A ocorrência da faixa Prévia foi corrigida e as duas páginas foram rechecadas nas duas larguras, sem ocorrências automáticas. Contraste sobre fotografias exige verificação humana; testes automatizados não certificam toda a acessibilidade.
- Não houve erro JavaScript nos fluxos. Cancelamentos `ERR_ABORTED` de pré-carregamento de vídeo ocorreram ao navegar para outra página e não foram classificados como arquivos ausentes.
- Carregamento e interação observados no ambiente de teste; os resultados não representam uma medição de desempenho em todas as conexões/dispositivos nem um relatório Lighthouse.

A auditoria principal começou na versão `91ae954`. As duas correções descritas acima foram rechecadas no computador e celular antes da publicação desta revisão. A usuária confirmou que o áudio funciona após ligar o som do aparelho; esse problema não permanece como pendência.

## Instagram e divulgação: pendências confirmadas pela consulta

Conta [@bykeenergy](https://www.instagram.com/bykeenergy/), consultada pelo Metricool em 16/11. Retornaram nove publicações de 14/11. As nove imagens foram baixadas novamente e são idênticas às imagens da consulta anterior. A ferramenta não retornou Stories; isso não confirma que os destaques estejam corretos. Bio e destaques não foram integralmente verificáveis por essa conexão.

| Peça | O que ainda diverge | Alinhamento necessário |
|---|---|---|
| [Tuna — DfuwEe_DeBx](https://www.instagram.com/p/DfuwEe_DeBx/) | A legenda e o texto da arte ainda usam “quadro baixo”. | Trocar o argumento por autonomia, cesta e praticidade; na arte, “Autonomia · Cesta · Praticidade”. |
| [Planos — Dfur5W9iPLB](https://www.instagram.com/p/Dfur5W9iPLB/) | Legenda e arte: Tuna R$ 219/mês e exclusividade para funcionários de empresas parceiras. | No contrato de **12 meses**: Tuna **R$ 249/mês**, Whale **R$ 319/mês**, Marlin **R$ 339/mês**. Público geral; empresas parceiras podem contar com descontos especiais para suas equipes, conforme condições da parceria. |
| [Campanha Tuna — DfuryRYCOFt](https://www.instagram.com/p/DfuryRYCOFt/) | A arte diz “Consulte a parceria da sua empresa”, podendo sugerir condição de acesso. | Explicitar atendimento ao público geral; a parceria não deve parecer obrigatória. |

Também convém conferir as pequenas marcas BYD presentes em algumas montagens: elas podem confundir a identidade da BYKE se a referência estética não estiver contextualizada na apresentação. As fotos e peças aprovadas não foram redesenhadas nesta revisão.

Não alterei publicações, feed ou destaques: a conexão disponível permite consulta do publicado e edição de posts agendados, sem edição de legendas/imagens já publicadas. O conteúdo retornado ainda apresenta essas diferenças; eventual alteração manual recente deve ser confirmada diretamente no Instagram.

## Entregáveis que precisam de conferência fora do site

| Entregável da AP2 | Situação desta revisão |
|---|---|
| Protótipo funcional | Conferido no escopo descrito acima. |
| Cartaz impresso A3 | O documento informa que já foi definido. Arquivo final e impressão física não foram fornecidos para conferir tamanho, textos, QR code e valores. |
| Conteúdo digital de divulgação | Nove posts consultados; os ajustes de legendas/artes acima ainda precisam ser aplicados/conferidos. |
| Apresentação | Slides, roteiro e ensaio não foram fornecidos. Use o link correto e o histórico de evolução/feedbacks para fundamentar as decisões de UX. |

Pesos informados no documento: evolução **30%**, protótipo **40%**, divulgação **20%** e apresentação **10%**. Conferir o site, sozinho, não confirma o conjunto desses quatro componentes.

## Fechamento para a entrega

- Compartilhar o **link da versão aprovada**, inclusive em QR code e bio.
- Alinhar os textos e valores identificados no Instagram; conferir também bio e destaques.
- Conferir cartaz A3 e apresentação contra a mesma tabela e proposta.
- Apresentar os números técnicos como parâmetros estimados de um conceito, conforme o site; não afirmar ensaios físicos ou pesquisa com usuários que não tenham sido realizados.

O site aprovado não precisa ganhar novas seções ou ter seu visual refeito para cumprir os requisitos funcionais verificados. As ressalvas do checklist e as pendências externas foram mantidas explícitas para não afirmar que toda a entrega está 100% conferida sem evidência.
