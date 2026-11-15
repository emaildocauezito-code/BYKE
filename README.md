# BYKE — Build Your Keen Energy

Protótipo acadêmico de assinatura trimestral, semestral ou anual de bicicletas elétricas. Não realiza cadastro, cobrança, reserva ou contratação.

| Modelo | Trimestral (por mês) | Semestral (por mês) | Anual (por mês) |
|---|---:|---:|---:|
| **Tuna** | R$ 249 | R$ 239 | R$ 219 |
| **Whale** | R$ 369 | R$ 349 | R$ 319 |
| **Marlin** | R$ 389 | R$ 369 | R$ 339 |

## Executar localmente

Requisito: Python 3. Não há dependências npm nem etapa de build.

```sh
cd /workspace/BYKE
python3 -m http.server 8000 --bind 127.0.0.1
```

Abra o servidor local no seu navegador. Para encerrar, use Ctrl+C.

## Arquivos

- `index.html`: vitrine ampla da linha BYKE, apresentação individual dos três modelos e explicação do aluguel.
- `planos.html`: comparação dos planos, simulador, etapas da assinatura e dúvidas frequentes.
- `bicicletas.html`: layout de apresentação dos três modelos, sem preços.
- `detalhes.css`: estilos responsivos exclusivos das páginas de detalhes.
- `style.css`: identidade visual, responsividade e animações.
- `home.css`: vitrines de produto e seções de aluguel da página inicial.
- `catalogo.js`: modelos, características e preços por duração.
- `menu-bicicletas.js`: painel de bicicletas compartilhado pelo cabeçalho.
- `planos.js`: seletor de duração, preços e simulação.
- `navegacao.js`: menu móvel compartilhado pelas três páginas.
- `script.js`: redirecionamento de links antigos e reprodução dos vídeos na página inicial.
- `assets/bicicletas/`: imagens dos modelos fornecidas pelo autor: tipo 1, Marlin Speed; tipo 2, Tuna urbana com cesto; tipo 3, Whale Cross.
- `assets/BYKE-logo.png`: logo oficial fornecida pelo autor, usada nos cabeçalhos, rodapés e ícones das abas das três páginas.
- `bike.svg`: ilustração conceitual original, preservada como recurso de referência.

O projeto partiu do ZIP BYKE_MVP fornecido pelo autor. As páginas de detalhes usam textos genéricos e campos de especificações para preenchimento posterior. As fontes DM Sans e Manrope são carregadas do Google Fonts; sem acesso à rede, o navegador usa fontes alternativas.

## Vídeos da página inicial

Coloque os MP4 finais em uma pasta `videos` e liste seus caminhos em `motionClips`, no arquivo `script.js`, na ordem de reprodução. A vitrine usa a ilustração da BYKE enquanto a lista está vazia. Com vídeos, a sequência se repete sem som, pausa ao sair da área visível e respeita a preferência por movimento reduzido. Use clipes sem falas essenciais e mantenha a bike na área central para acomodar o recorte em telas de celular.

### Versão mais nítida do vídeo da Marlin

O MP4 original `assets/bicicletas/byke-hero.mp4` tem 1600 × 900 pixels, 30 fps e 13 segundos e foi preservado. Para telas acima de 1100 pixels, a abertura oferece `byke-hero-1080p.webm`, em VP9, com ampliação Lanczos para 1920 × 1080, nitidez moderada e leve ajuste de contraste e saturação. É uma melhoria de apresentação a partir da mesma fonte; não equivale a uma nova captura nativa em Full HD. O MP4 original permanece como alternativa para navegadores sem WebM e para telas menores. A sequência e a duração do vídeo foram mantidas. O vídeo da Whale não foi alterado.

## Verificação manual

Confira os três modelos e planos, escolha cada modelo e verifique sua mensalidade no simulador. Troque o modelo no seletor e confirme a simulação: deve aparecer um aviso sem efetuar contratação. Verifique também fechamento por botão, sobreposição e Escape, navegação e menu em tela móvel.

## Fotos nos cartões de planos

Cada cartão de Marlin, Tuna e Whale em `planos.html` tem uma galeria independente, com setas para alternar entre três vistas sem fundo: diagonal, lateral e frontal. As vistas ficam em `models[].gallery`, no `catalogo.js`; a navegação e os textos acessíveis são controlados por `planos.js`, e a apresentação por `detalhes.css`. Trocar o prazo ou abrir o simulador não reinicia a vista escolhida. Não há troca automática.

As nove vistas atuais foram geradas com Imagegen para o protótipo, usando os modelos originais como referência. A revisão visual conferiu o alinhamento de rodas, garfo, guidão e farol, com frente em posição reta e variação da câmera. Os arquivos atuais usam os sufixos `-diagonal.webp`, `-lateral.webp` e `-frontal.webp`, todos com transparência real, em `assets/bicicletas/angulos/`. As versões anteriores e as imagens originais foram preservadas, mas não são usadas nas galerias de planos.

Para conferir: acione as duas setas de cada cartão, verifique que só a foto daquele modelo muda e troque entre os três prazos. As mensalidades e o simulador devem continuar funcionando. Os botões também funcionam por Tab e Enter, e mudanças de ângulo são anunciadas por leitores de tela.

## Limites atuais

Marlin, Tuna e Whale usam imagens próprias na página inicial, na apresentação dos modelos e no menu de bicicletas. Os caminhos e textos alternativos usados pelo menu ficam em `catalogo.js`. As imagens PNG originais foram preservadas sem recorte ou alteração de cores. A página de bicicletas apresenta as descrições e características fornecidas pelo autor, com autonomia e recarga estimadas; essas especificações ainda precisam ser validadas em relação aos modelos ilustrados. A página de planos reúne as três modalidades, seus preços e o simulador. As condições de contratação permanecem como espaços para preenchimento. Recuperação de energia na frenagem permanece uma proposta conceitual.

## Revisão visual

A composição usa o site oficial da BYD Brasil (https://www.byd.com/br) como referência para destacar os produtos em áreas amplas, com navegação direta e menos elementos decorativos. Os modelos, imagens originais, especificações, preços e modalidades de assinatura foram preservados. A paleta neutra e os botões retos se aplicam às três páginas; o verde permanece na marca e nas imagens originais. A vitrine da Whale mantém o suporte à sequência opcional de vídeos.

### Cenas dos modelos na landing page

A landing page usa três cenas geradas com Imagegen a partir dos modelos originais: Marlin em uma ciclovia de cidade tecnológica inspirada em Shenzhen, Tuna junto a lojas em uma área comercial inspirada em Milão e Whale em uma rua urbana em ladeira, com calçamento de pedra irregular. Arquivos em `assets/cenarios/`, com prompts completos em `assets/cenarios/PROMPTS.md`. As imagens originais de estúdio foram preservadas; a página de bicicletas e o menu usam os recortes transparentes.

As vitrines e a abertura preenchem toda a largura e a altura disponível da janela, descontando o cabeçalho. Títulos, descrições e botões ficam sobre a imagem, com um gradiente transparente apenas para contraste. Não há coluna lateral, faixas sólidas ou encaixe com barras.

A referência BYD foi inspecionada no navegador em 1920 × 910, 1366 × 768 e 390 × 844 pixels. Seus banners usam altura da janela, imagens com `object-fit: cover`, títulos e ações sobre a mídia e uma imagem alternativa vertical no celular (`<picture>`). Na seção do Dolphin SE, a foto de desktop tem 2880 × 1660 pixels e a versão móvel tem 1080 × 2160 pixels.

A BYKE aplica esse princípio com versões panorâmicas e verticais das cenas, em `assets/cenarios/responsivos/`. As cenas foram reenquadradas com Imagegen a partir dos arquivos originais para deixar espaço ao redor das bicicletas e preservar rodas e guidão nos recortes responsivos. Os arquivos originais não foram substituídos. As novas versões usam WebP para reduzir o tamanho de download. Em janelas verticais, `<picture>` seleciona a versão móvel; em janelas horizontais, seleciona a panorâmica. O enquadramento é ajustado com `object-position`, mantendo a paisagem contínua e os textos sobre ela. Os vídeos existentes da abertura foram preservados e continuam ocupando a área completa do banner.

O nome público do modelo Cross foi corrigido para Whale. Arquivos originais com prefixo `wale-` foram preservados; links antigos do simulador com `modelo=wale` continuam aceitos.

### Imagens transparentes na página de bicicletas

A página `bicicletas.html` usa `assets/bicicletas/marlin-sem-fundo.png`, `tuna-sem-fundo.png` e `whale-sem-fundo.png`, recortados com Imagegen a partir das imagens de estúdio, com canal alfa real. O fundo do contêiner também é transparente. O menu compartilhado usa esses mesmos recortes, com fundo transparente nos três cartões. As imagens originais e as cenas da landing page foram preservadas. Prompt em `assets/bicicletas/RECORTES.md`.
