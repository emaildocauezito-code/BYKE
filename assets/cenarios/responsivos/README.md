# Enquadramentos responsivos das cenas BYKE

As versões desta pasta foram geradas com Imagegen a partir das imagens originais e exportadas em WebP (qualidade 88), sem substituir os arquivos de origem.

| Versões | Origem |
|---|---|
| `marlin-desktop.webp`, `marlin-mobile.webp` | `../marlin-ciclovia.png` |
| `tuna-desktop.webp`, `tuna-mobile.webp` | `../tuna-comercio.png` |
| `whale-desktop.webp`, `whale-mobile.webp` | `../wale-trilha.png` |
| `grupo-desktop.webp`, `grupo-mobile.webp` | `../../bicicletas/bykes-estudio.png` |

## Orientação aplicada aos prompts

Preservar identidade, cores, marca, geometria e acessórios das bicicletas de referência. Reenquadrar a fotografia com mais cenário ao redor, mantendo as duas rodas e o guidão completos. Não inserir textos, painéis, barras, bordas ou colagens. A fotografia deve preencher o quadro de ponta a ponta.

- Desktop: composição panorâmica, cenário contínuo à esquerda para sobrepor o texto e bicicleta à direita, com margens acima e abaixo. Para a abertura, os três modelos ficam agrupados no centro inferior, com espaço para o título acima.
- Celular: composição vertical 9:16, bicicleta completa na metade inferior, com aproximadamente 76% da largura e espaço de cenário na metade superior para títulos e botões. Na abertura, preservar os três modelos na ordem Marlin, Tuna e Whale.
- Cenários: ciclovia em cidade tecnológica para Marlin; rua comercial com arquitetura de inspiração milanesa para Tuna; trilha de floresta e vale montanhoso para Whale; fundo de estúdio azul-acinzentado e piso com reflexos para o grupo.

## Referência conferida

BYD Brasil, seção Dolphin SE, inspecionada em 15/11/2026: banners com altura ligada à janela, títulos e botões sobrepostos e elemento `picture` com foto horizontal de 2880 × 1660 e alternativa móvel de 1080 × 2160. A BYKE seleciona seus enquadramentos de acordo com a orientação da janela e ajusta o recorte com `object-position`.
