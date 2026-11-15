# Vistas sem fundo para os planos

Cada modelo tem três vistas atuais transparentes em WebP (qualidade 92):

- `marlin-diagonal.webp`, `tuna-diagonal.webp`, `whale-diagonal.webp`: câmera em três quartos pela frente, com a bike inteira visível.
- `marlin-lateral.webp`, `tuna-lateral.webp`, `whale-lateral.webp`: perfil, rodas vistas de lado e farol mostrando a lateral da carcaça.
- `marlin-frontal.webp`, `tuna-frontal.webp`, `whale-frontal.webp`: câmera totalmente de frente, pneu centralizado e guidão simétrico.

## Geometria e geração

As vistas foram geradas com Imagegen a partir dos recortes originais de cada modelo, usando `transparent_background: true`. Primeiro foram preparadas as laterais com direção reta. Em seguida foram criadas as frontais usando lateral e detalhes originais como referências. As diagonais foram feitas a partir das vistas lateral e frontal e revisadas visualmente.

Os prompts pediram manter a dianteira reta: pneu, garfo, guidão e farol orientados no sentido longitudinal da bike, mudando somente a câmera. No perfil, o farol aparece de lado e os punhos do guidão se sobrepõem em perspectiva. Na frente, as rodas ficam alinhadas, o pneu aparece de frente e os dois lados do guidão ficam simétricos. Na diagonal, todas as peças devem compartilhar a mesma perspectiva. Componentes naturalmente ocultos não foram forçados a aparecer.

A revisão também conferiu peças duplicadas, enquadramento completo e transparência entre raios, quadro e cesta. A galeria usa `object-fit: contain`, sem recorte do produto.

São representações geradas para o protótipo acadêmico, não fotografias reais nem um modelo CAD que garanta geometria e detalhes exatos em todas as vistas.

Os arquivos antigos `*-frente.webp` e `*-traseira.webp` foram preservados como versões anteriores para compatibilidade com páginas já abertas, mas não são usados pela galeria atual.
