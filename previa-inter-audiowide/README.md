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

## Nomes em maiúsculas e abertura

MARLIN, TUNA e WHALE são o padrão nos nomes em destaque, inclusive ao abrir `index.html` sem parâmetros. Os links antigos com `nomes=maiusculos` continuam funcionando.

`variantes.js` ativa as maiúsculas antes da primeira pintura e mantém os links atualizados, sem alterar os dados dos modelos ou armazenar preferências. Os textos corridos e botões mantêm sua capitalização original.

Na foto das três bicicletas, a abertura exibe título e slogan. Enquanto um dos vídeos está visível, `home.css` oculta visualmente o título e remove seu espaçamento, deixando somente “Build Your Keen Energy”. O seletor acompanha o atributo `hidden` que o carrossel já controla; voltar à foto, inclusive após falha de reprodução, restaura o título automaticamente. O carrossel compartilhado e os arquivos das versões anteriores permanecem intactos.

## Quiz com avanço pela resposta

O `quiz.js` local preserva as perguntas, pontuação e resultados do quiz original. As respostas são botões acessíveis pelo teclado: escolher uma resposta confirma a seleção por 220 ms e avança, sem botão Continuar. A última escolha abre o resultado. Voltar mantém a resposta marcada, e clicar nela novamente também avança. Fechar o quiz ou voltar cancela qualquer avanço pendente. A breve confirmação impede que um clique duplo responda a duas perguntas. O quiz compartilhado das versões anteriores permanece intacto.

## Conferência

1. Abra a versão anterior e a nova lado a lado no mesmo tamanho de tela.
2. Confira os nomes MARLIN, TUNA e WHALE em destaque, sem precisar de parâmetros na URL.
3. Confira os textos, menu, FAQ e comparação em Inter.
4. Faça o quiz clicando uma vez por resposta, confira Voltar e escolha uma bike no resultado. As perguntas usam Inter; o nome recomendado ganha Audiowide.
5. Escolha 3, 6 ou 12 meses e avance pela assinatura com dados de teste ou campos vazios.
6. Confira no celular se títulos, botões, preços e comparações cabem na largura disponível.
7. Na abertura, passe pelas três mídias com as setas: a foto mostra título e slogan; cada vídeo mostra apenas o slogan. Ao voltar à foto, o título deve reaparecer.

Esta variante continua sendo uma demonstração de navegação: não efetua cobrança, contratação ou entrega real e não envia nem persiste os dados do formulário.
