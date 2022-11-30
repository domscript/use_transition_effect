/**
 * Create a new canvas element using DOM API
 */
export function createCanvas(width: number, height: number) {
  const backgroundCanvas = document.createElement("canvas");
  backgroundCanvas.width = width;
  backgroundCanvas.height = height;

  return backgroundCanvas;
}

/**
 * Copy canvas content from one canvas to another
 */
export function copyCanvas(
  sourceCanvas: HTMLCanvasElement,
  targetCanvas: HTMLCanvasElement
) {
  targetCanvas.width = sourceCanvas.width;
  targetCanvas.height = sourceCanvas.height;

  const ctx = targetCanvas.getContext("2d");
  if (ctx === null) return;

  ctx.clearRect(0, 0, targetCanvas.width, targetCanvas.height);
  ctx.drawImage(sourceCanvas, 0, 0);
}
