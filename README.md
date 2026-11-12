# BYKE — Build Your Keen Energy

Protótipo acadêmico de assinatura trimestral, semestral ou anual de bicicletas elétricas. Não realiza cadastro, cobrança, reserva ou contratação.

| Modelo | Trimestral (por mês) | Semestral (por mês) | Anual (por mês) |
|---|---:|---:|---:|
| Marlim · Esportiva | R$ 329 | R$ 269 | R$ 239 |
| Tuna · Urbana | R$ 279 | R$ 219 | R$ 199 |
| Whale · Cross | R$ 329 | R$ 269 | R$ 239 |

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
- `assets/bicicletas/`: imagens dos modelos fornecidas pelo autor: tipo 1, Marlim Speed; tipo 2, Tuna urbana com cesto; tipo 3, Whale Cross.
- `assets/BYKE-logo.png`: logo oficial fornecida pelo autor, usada nos cabeçalhos, rodapés e ícones das abas das três páginas.
- `bike.svg`: ilustração conceitual original, preservada como recurso de referência.

O projeto partiu do ZIP BYKE_MVP fornecido pelo autor. As páginas de detalhes usam textos genéricos e campos de especificações para preenchimento posterior. As fontes DM Sans e Manrope são carregadas do Google Fonts; sem acesso à rede, o navegador usa fontes alternativas.

## Vídeos da página inicial

Coloque os MP4 finais em uma pasta `videos` e liste seus caminhos em `motionClips`, no arquivo `script.js`, na ordem de reprodução. A vitrine usa a ilustração da BYKE enquanto a lista está vazia. Com vídeos, a sequência se repete sem som, pausa ao sair da área visível e respeita a preferência por movimento reduzido. Use clipes sem falas essenciais e mantenha a bike na área central para acomodar o recorte em telas de celular.

## Verificação manual

Confira os três modelos e planos, escolha cada modelo e verifique sua mensalidade no simulador. Troque o modelo no seletor e confirme a simulação: deve aparecer um aviso sem efetuar contratação. Verifique também fechamento por botão, sobreposição e Escape, navegação e menu em tela móvel.

## Limites atuais

Marlim, Tuna e Whale usam imagens próprias na página inicial, na apresentação dos modelos e no menu de bicicletas. Os caminhos e textos alternativos usados pelo menu ficam em `catalogo.js`. As imagens PNG originais foram preservadas sem recorte ou alteração de cores. A página de bicicletas apresenta as descrições e características fornecidas pelo autor, com autonomia e recarga estimadas; essas especificações ainda precisam ser validadas em relação aos modelos ilustrados. A página de planos reúne as três modalidades, seus preços e o simulador. As condições de contratação permanecem como espaços para preenchimento. Recuperação de energia na frenagem permanece uma proposta conceitual.

## Revisão visual

A composição usa o site oficial da BYD Brasil (https://www.byd.com/br) como referência para destacar os produtos em áreas amplas, com navegação direta e menos elementos decorativos. Os modelos, imagens originais, especificações, preços e modalidades de assinatura foram preservados. A paleta neutra e os botões retos se aplicam às três páginas; o verde permanece na marca e nas imagens originais. A vitrine da Whale mantém o suporte à sequência opcional de vídeos.

### Cenas dos modelos na landing page

A landing page usa três cenas geradas com Imagegen a partir dos modelos originais: Marlim em uma ciclovia de cidade tecnológica inspirada em Shenzhen, Tuna junto a lojas em uma área comercial inspirada em Milão e Whale em uma trilha rochosa. Arquivos em `assets/cenarios/`, com prompts completos em `assets/cenarios/PROMPTS.md`. As imagens originais de estúdio foram preservadas; a página de bicicletas e o menu usam os recortes transparentes. O texto da Tuna fica à esquerda no desktop; as três paisagens ocupam toda a largura e os textos ficam sobre as imagens, com contraste em gradiente. No celular, o texto ocupa a parte superior da paisagem.

O nome público do modelo Cross foi corrigido para Whale. Arquivos originais com prefixo `wale-` foram preservados; links antigos do simulador com `modelo=wale` continuam aceitos.

### Imagens transparentes na página de bicicletas

A página `bicicletas.html` usa `assets/bicicletas/marlim-sem-fundo.png`, `tuna-sem-fundo.png` e `whale-sem-fundo.png`, recortados com Imagegen a partir das imagens de estúdio, com canal alfa real. O fundo do contêiner também é transparente. O menu compartilhado usa esses mesmos recortes, com fundo transparente nos três cartões. As imagens originais e as cenas da landing page foram preservadas. Prompt em `assets/bicicletas/RECORTES.md`.
