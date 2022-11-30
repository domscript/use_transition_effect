import { createCanvas } from "../../lib/canvas";
import { shouldYield } from "../../lib/scheduler";
import { renderTilesLinear } from "./render-tiles-linear";

interface RenderTilesProgressiveParams {
  canvas: HTMLCanvasElement;
  width: number;
  height: number;
  tileSize: number;
  gapSize: number;
  data: number[][];
}

export function* renderTilesProgressive({
  canvas,
  width,
  height,
  tileSize,
  gapSize,
  data,
}: RenderTilesProgressiveParams) {
  // create background canvas to render on
  const backgroundCanvas = createCanvas(width, height);

  // render smaller resolution iteratively
  let currentTileSize = Math.min(
    tileSize * 8,
    Math.floor(Math.min(width, height) / 2)
  );
  while (currentTileSize > tileSize) {
    yield* renderTilesLinear({
      canvas,
      backgroundCanvas,
      width,
      height,
      tileSize: currentTileSize,
      gapSize,
      // we should use avg of tiles, but for the rendering
      // demo we don't need this :)
      data,
    });

    if (shouldYield()) {
      yield;
    }

    currentTileSize = Math.floor(currentTileSize / 2);
  }

  // render target resolution
  yield* renderTilesLinear({
    canvas,
    backgroundCanvas,
    width,
    height,
    tileSize,
    gapSize,
    data,
  });
}
