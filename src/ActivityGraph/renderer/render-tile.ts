interface RenderTileParams {
  ctx: CanvasRenderingContext2D;
  row: number;
  col: number;
  tileSize: number;
  gapSize: number;
  value: number;
}

export function renderTile({
  ctx,
  row,
  col,
  tileSize,
  gapSize,
  value,
}: RenderTileParams) {
  ctx.beginPath();
  const green = 100 + Math.floor(100 * value);
  ctx.fillStyle = `rgb(0, ${green}, 50)`;
  const x = col * tileSize + gapSize;
  const y = row * tileSize + gapSize;
  const size = tileSize - 2 * gapSize;
  ctx.fillRect(x, y, size, size);
}
