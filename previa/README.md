# Prévia — Catálogo e assinatura BYKE

Esta pasta contém uma proposta isolada para revisão. Os arquivos da versão atual na raiz do repositório não foram alterados.

## Versão preservada

- Commit de referência: `6e21e09781b29753411a5180d3c81b11e3c6bbf5`.
- Branch remota: `backup/antes-loja-2026-11-15`.
- Site atual: https://emaildocauezito-code.github.io/BYKE/index.html
- Prévia completa: https://emaildocauezito-code.github.io/BYKE/previa/index.html
- Catálogo das três bicicletas: https://emaildocauezito-code.github.io/BYKE/previa/bicicletas.html
- Marlin diretamente: https://emaildocauezito-code.github.io/BYKE/previa/loja.html?modelo=marlin

Para continuar usando a versão anterior, basta abrir o endereço do site atual. A prévia não substitui a navegação publicada na raiz. A branch de backup guarda o projeto inteiro antes desta proposta.

## Organização

- `index.html`: cópia da página inicial, com as mesmas imagens, vídeos, textos e estilos. No menu, “Bicicletas” abre o catálogo das três; “Planos” abre a seção de cards desse mesmo catálogo. Os botões de modelos específicos continuam levando diretamente à ficha correspondente.
- `inicio.js`: adapta os links criados pelo menu compartilhado para manter o visitante dentro da prévia. “Ver todas as bicicletas” sempre leva ao catálogo, sem pré-selecionar a Marlin.
- `bicicletas.html`, `bicicletas.css`, `bicicletas.js`: catálogo de entrada com a imagem existente das três bicicletas, quiz e botão de explorar sobre a foto. A seção seguinte apresenta três cards com seleção do prazo e valores. Escolher um card abre a ficha individual; o quiz também encaminha para o modelo escolhido.
- `loja.html`, `loja.js`, `loja.css`: página de um modelo por vez, com galeria, ficha técnica e preços de 3, 6 e 12 meses juntos. Dois cards abaixo apresentam os outros modelos. Trocar o prazo atualiza os valores dos cards; trocar o modelo conserva a duração. Voltar e avançar do navegador respeitam o modelo e o prazo escolhidos.
- `dados.js`: adapta caminhos de imagens do catálogo compartilhado e concentra os links, informações, controles de duração e o componente de card reutilizado no catálogo e nas fichas individuais. A primeira vista da galeria é lateral. Os preços continuam vindo de `../catalogo.js`.
- `assinatura.html`, `assinatura.js`, `assinatura.css`: página completa com plano, contato/endereço/data desejada, revisão e comprovante demonstrativo, com opção de impressão.

Os acessos genéricos a `loja.html`, sem um modelo válido, são redirecionados ao catálogo. Os links de modelos específicos e os dois cards relacionados conservam o comportamento da ficha individual.

O catálogo e as fichas individuais incluem um quadro de comparação com os três modelos e as mensalidades do prazo escolhido. A ficha usa um painel “Saiba mais” ampliado, com nove características disponíveis no catálogo: perfil, uso, posição, autonomia, recarga, pneus/aros, conforto, acessórios e iluminação. O FAQ tem cinco perguntas; na ficha individual, muda conforme a bicicleta escolhida. A página inicial e o catálogo também apresentam cinco perguntas frequentes. Não foram criados valores de potência, peso ou capacidade de bateria sem fonte.

O rodapé das quatro páginas usa `rodape.css`, com os créditos de Manuela Valone, Davi Freitas e Caue Mathias e o Instagram @bykeenergy, informado pela autora, com link para https://www.instagram.com/bykeenergy/ e abertura em outra aba.

O quiz existente é reutilizado de `../quiz.js`. A aba “Quiz” aparece nos quatro cabeçalhos. `quiz-acesso.js` centraliza os destinos dos resultados, mantém o prazo escolhido e abre o teste também em `bicicletas.html?quiz=1`. Abrir e fechar o quiz na assinatura preserva o preenchimento. No celular, fechar pelo menu retorna o foco ao botão de navegação. Seus resultados levam ao modelo escolhido na loja da prévia. Os estilos do quiz também são compartilhados; os arquivos publicados na raiz permanecem iguais.

## Entrega e confirmação

Este é um protótipo acadêmico. Não há pagamento, contratação, reserva de estoque ou agendamento real. O comprovante demonstra a conclusão do fluxo e tem uma referência gerada no navegador; não existe registro em servidor nem envio de e-mail.

Nome, contato e endereço ficam apenas na memória da página. O formulário não faz requisições nem grava em armazenamento local. Recarregar ou sair da página descarta o preenchimento. Os dados apresentados na revisão e no comprovante são inseridos como texto, sem interpretar HTML. O preenchimento é livre para testar o fluxo: não há campos obrigatórios, validações de e-mail/telefone/CEP nem restrição de data. Estado e data também aceitam qualquer texto. Campos vazios aparecem como “Não informado” na revisão. Datas ISO válidas são apresentadas no calendário de São Paulo; qualquer outro texto é preservado.

## Conferência

1. No menu da página inicial da prévia, abra “Ver todas as bicicletas”: deve aparecer a imagem das três com os botões do quiz e de explorar. “Planos” deve levar aos três cards do catálogo.
2. Role até os cards, escolha cada modelo e confira que sua ficha apresenta somente os outros dois abaixo. Os botões “Conhecer modelo” específicos da página inicial continuam abrindo a ficha correspondente.
3. Confira as três fotos e os valores dos três prazos. Os cards devem mostrar somente os outros dois modelos e seus valores para a mesma duração.
4. Troque de modelo por um card, volte pelo navegador e confira que o prazo foi preservado.
5. Faça o quiz e confira que o resultado abre a loja da prévia.
6. Clique em “Assinar”, ajuste o plano, preencha qualquer texto (ou deixe tudo em branco). A revisão e a conclusão devem continuar funcionando. Revise, edite e conclua.
7. Confira o comprovante e a opção de salvar/imprimir. Confira também a navegação em celular, teclado e a preferência por movimento reduzido.

Para executar localmente, inicie um servidor na raiz do repositório e abra `/previa/index.html`.

Para conferir os novos detalhes: abra “Saiba mais” em cada modelo, confira as nove informações, troque o prazo e compare os valores do quadro. No celular, a comparação usa blocos por característica: cada bloco exibe os valores de Marlin, Tuna e Whale em linhas identificadas. Não é preciso arrastar o quadro. A tabela no computador foi preservada. Teste e-mail “teste”, CEP “abc”, estado livre, data “a combinar” e campos vazios até o comprovante. Confira os três créditos nas quatro páginas.

## Tipografia da abertura

Na versão anterior, o título e o subtítulo usavam DM Sans, respectivamente nos pesos 500 e 400 (estilo aplicado conferido no navegador). O título agora diz “Sua próxima BYKE, por assinatura.” e mantém DM Sans 500. O subtítulo é “Build Your Keen Energy”, em Audiowide 400. A fonte Audiowide Latin foi obtida do Google Fonts e está em `assets/fonts/audiowide-latin.woff2`, acompanhada da licença SIL OFL. A apresentação e a comparação móvel estão em `ajustes.css`, carregado apenas pela prévia.
