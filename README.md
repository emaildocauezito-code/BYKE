# BYKE — Build Your Keen Energy

Protótipo acadêmico de assinatura trimestral, semestral ou anual de bicicletas elétricas. Não realiza cadastro, cobrança, reserva ou contratação.

| Modelo | Trimestral (por mês) | Semestral (por mês) | Anual (por mês) |
|---|---:|---:|---:|
| Marlim · Esportiva | R$ 329 | R$ 269 | R$ 239 |
| Tuna · Urbana | R$ 279 | R$ 219 | R$ 199 |
| Wale · Cross | R$ 329 | R$ 269 | R$ 239 |

## Executar localmente

Requisito: Python 3. Não há dependências npm nem etapa de build.

```sh
cd /workspace/BYKE
python3 -m http.server 8000 --bind 127.0.0.1
```

Abra o servidor local no seu navegador. Para encerrar, use Ctrl+C.

## Arquivos

- `index.html`: estrutura e conteúdo das seções e do simulador.
- `planos.html`: layout de detalhes dos planos, etapas da assinatura e dúvidas frequentes.
- `bicicletas.html`: layout de apresentação dos três modelos, sem preços.
- `detalhes.css`: estilos responsivos exclusivos das páginas de detalhes.
- `style.css`: identidade visual, responsividade e animações.
- `catalogo.js`: modelos, características e preços por duração.
- `menu-bicicletas.js`: painel de bicicletas compartilhado pelo cabeçalho.
- `planos.js`: seletor de duração e preços na página de planos.
- `script.js`: navegação, planos e simulação na página inicial.
- `bike.svg`: ilustração conceitual compartilhada pelos modelos.

O projeto partiu do ZIP BYKE_MVP fornecido pelo autor. As páginas de detalhes usam textos genéricos e campos de especificações para preenchimento posterior. As fontes DM Sans e Manrope são carregadas do Google Fonts; sem acesso à rede, o navegador usa fontes alternativas.

## Verificação manual

Confira os três modelos e planos, escolha cada modelo e verifique sua mensalidade no simulador. Troque o modelo no seletor e confirme a simulação: deve aparecer um aviso sem efetuar contratação. Verifique também fechamento por botão, sobreposição e Escape, navegação e menu em tela móvel.

## Limites atuais

Marlim, Tuna e Wale usam a mesma ilustração conceitual. A página de bicicletas apresenta as descrições e características fornecidas pelo autor, com autonomia e recarga estimadas; os cartões da página inicial abrem o simulador. A página de planos reúne as três modalidades e seus preços. As condições de contratação permanecem como espaços para preenchimento. Recuperação de energia na frenagem permanece uma proposta conceitual.
