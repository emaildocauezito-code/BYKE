# Variante Inter + Audiowide

Versão separada para comparar somente a direção tipográfica, preservando o conteúdo e os fluxos da prévia anterior.

## Versão exata preservada

- Commit de referência: `4299f3f7f3a81067195707d89e13080247e657ff`.
- Backup do projeto inteiro: branch `backup/antes-inter-audiowide-2026-11-15`.
- Versão anterior: https://emaildocauezito-code.github.io/BYKE/previa/index.html
- Nova versão: https://emaildocauezito-code.github.io/BYKE/previa-inter-audiowide/index.html

Nenhum arquivo existente de `previa/` ou da raiz foi modificado para criar esta variante.

## Aplicação das fontes

- **Audiowide 400:** somente a palavra BYKE no título de abertura, slogan, nomes das bicicletas em destaque, títulos curtos de apresentação e nome da bike no resultado do quiz.
- **Inter 400:** textos corridos, descrições, respostas e campos.
- **Inter 500:** menu e identificadores.
- **Inter 500:** frase do título de abertura, com tamanho reduzido levemente no computador e no celular.
- **Inter 600:** botões, perguntas do quiz, títulos funcionais, preços e etapas da assinatura.

`tipografia.css` concentra a hierarquia e os ajustes de tamanho para telas pequenas. `base.css`, `home.css` e `quiz.css` são cópias locais dos estilos compartilhados da versão de referência. As referências a DM Sans, Manrope e Montserrat foram substituídas por Inter nesta variante; o import externo dessas fontes foi removido. Os demais CSS locais também usam somente Inter e Audiowide.

As fontes são servidas por esta pasta, em `assets/fonts/`, com suas licenças SIL OFL. A Inter é o arquivo variável Latin do Google Fonts. A Audiowide é a mesma fonte usada na versão anterior. A fonte do logo permanece na imagem original da marca.

`inicio.js` adapta o menu para manter todos os links da versão nova dentro de `/previa-inter-audiowide/`. Modelos, galeria, comparação móvel, cinco perguntas do FAQ, quiz, preços, preenchimento livre, comprovante, Instagram e créditos foram preservados.

## Opção de nomes em maiúsculas

- Normal: `index.html`.
- Comparação: `index.html?nomes=maiusculos#marlin`.

`variantes.js` ativa MARLIN, TUNA e WHALE nos nomes em destaque quando a URL contém `nomes=maiusculos`. A opção acompanha os links, o quiz, a escolha de duração e a assinatura, sem alterar os dados dos modelos ou armazenar preferências. Uma aba normal continua independente da opção em maiúsculas. Os textos corridos e botões mantêm sua capitalização original.

## Conferência

1. Abra a versão anterior e a nova lado a lado no mesmo tamanho de tela.
2. Compare a abertura e os nomes Marlin, Tuna e Whale.
3. Confira os textos, menu, FAQ e comparação em Inter.
4. Faça o quiz e escolha uma bike. As perguntas usam Inter; o nome recomendado ganha Audiowide.
5. Escolha 3, 6 ou 12 meses e avance pela assinatura com dados de teste ou campos vazios.
6. Confira no celular se títulos, botões, preços e comparações cabem na largura disponível.

Esta variante continua sendo uma demonstração de navegação: não efetua cobrança, contratação ou entrega real e não envia nem persiste os dados do formulário.
