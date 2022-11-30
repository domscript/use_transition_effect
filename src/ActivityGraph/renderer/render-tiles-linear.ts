import { copyCanvas, createCanvas } from "../../lib/canvas";
import { shouldYield } from "../../lib/scheduler";
import { renderTile } from "./render-tile";

interface RenderTilesLinearParams {
  canvas: HTMLCanvasElement;
  backgroundCanvas?: HTMLCanvasElement;
  width: number;
  height: number;
  tileSize: number;
  gapSize: number;
  data: number[][];
}

export function* renderTilesLinear({
  canvas,
  backgroundCanvas,
  width,
  height,
  tileSize,
  gapSize,
  data,
}: RenderTilesLinearParams) {
  // create background canvas to render on
  if (!backgroundCanvas) {
    backgroundCanvas = createCanvas(width, height);
  }

  const ctx = backgroundCanvas.getContext("2d");
  if (ctx === null) return;

  // render on a background canvas
  ctx.clearRect(0, 0, width, height);
  for (let row = 0; row < data.length; ++row) {
    for (let col = 0; col < data[row].length; ++col) {
      renderTile({
        ctx,
        row,
        col,
        tileSize,
        gapSize,
        value: data[row][col],
      });
    }
    if (shouldYield()) {
      yield;
    }
  }

  // copy background canvas into the visible canvas
  copyCanvas(backgroundCanvas, canvas);
}
