# BYKE — Build Your Keen Energy

Protótipo acadêmico de assinatura anual de bicicletas elétricas. Valores ilustrativos: R$ 149, R$ 199 e R$ 279 por mês. Não realiza cadastro, cobrança, reserva ou contratação.

## Executar localmente

Requisito: Python 3. Não há dependências npm nem etapa de build.

```sh
cd /workspace/BYKE
python3 -m http.server 8000 --bind 127.0.0.1
```

Abra o servidor local no seu navegador. Para encerrar, use Ctrl+C.

## Arquivos

- `index.html`: estrutura e conteúdo das seções e do simulador.
- `style.css`: identidade visual, responsividade e animações.
- `script.js`: modelos, preços, planos, navegação e simulação.
- `bike.svg`: ilustração conceitual compartilhada pelos modelos.

Os quatro arquivos foram importados sem alterações do ZIP BYKE_MVP fornecido pelo autor. As fontes DM Sans e Manrope são carregadas do Google Fonts; sem acesso à rede, o navegador usa fontes alternativas.

## Verificação manual

Confira os três modelos e planos, escolha cada modelo e verifique sua mensalidade no simulador. Troque o modelo no seletor e confirme a simulação: deve aparecer um aviso sem efetuar contratação. Verifique também fechamento por botão, sobreposição e Escape, navegação e menu em tela móvel.

## Limites atuais

Os modelos têm nomes e descrições conceituais e usam a mesma ilustração. Ainda não existe uma página ou painel próprio de detalhes de cada bicicleta: os botões dos modelos abrem o simulador. Recuperação de energia na frenagem é uma proposta conceitual, sem autonomia ou especificações técnicas comprovadas.
