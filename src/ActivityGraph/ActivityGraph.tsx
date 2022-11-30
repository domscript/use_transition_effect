import { useEffect, useState } from "react";
import { useTransitionEffect } from "use-transition-effect";
import { RenderMode } from "../RenderModeForm";
import { useDebouncedValue } from "../lib/use-debounced-value";
import { generateActivityGraphData } from "./generate-data";
import { renderTilesLinear } from "./renderer/render-tiles-linear";
import { renderTilesProgressive } from "./renderer/render-tiles-progressive";

interface ActivityGraphProps {
  text: string;
  mode: RenderMode;
  width: number;
  height: number;
  tileSize?: number;
  gapSize?: number;
}

export function ActivityGraph({
  text,
  mode,
  width,
  height,
  tileSize = 4,
  gapSize = 0.5,
}: ActivityGraphProps) {
  const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null);
  const debouncedText = useDebouncedValue(text);
  const maybeDebouncedText = mode === "debounced" ? debouncedText : text;

  // version with transition effect
  const [isPending, startTransitionEffect, stopTransitionEffect] =
    useTransitionEffect();
  useEffect(() => {
    if (
      mode === "debounced" ||
      mode === "direct" ||
      !canvas ||
      width === 0 ||
      height === 0
    ) {
      return;
    }

    startTransitionEffect(function* () {
      // generate data
      const data = generateActivityGraphData({
        width,
        height,
        tileSize,
      });

      // render
      const renderTiles =
        mode === "transition-linear"
          ? renderTilesLinear
          : renderTilesProgressive;

      yield* renderTiles({
        canvas,
        width,
        height,
        tileSize,
        gapSize,
        data,
      });
    });

    return () => stopTransitionEffect();
  }, [
    text,
    mode,
    canvas,
    width,
    height,
    tileSize,
    gapSize,
    startTransitionEffect,
    stopTransitionEffect,
  ]);

  // version without transition effect (use debounced value instead)
  useEffect(() => {
    if (
      (mode !== "debounced" && mode !== "direct") ||
      !canvas ||
      width === 0 ||
      height === 0
    ) {
      return;
    }

    // generate data
    const data = generateActivityGraphData({
      width,
      height,
      tileSize,
    });

    // render synchronously on the visible canvas
    const generator = renderTilesLinear({
      canvas,
      width,
      height,
      tileSize,
      gapSize,
      data,
    });
    while (!generator.next().done);
  }, [maybeDebouncedText, mode, canvas, width, height, tileSize, gapSize]);

  return (
    <div>
      {isPending ? "Rendering..." : "Rendered"}
      <canvas ref={setCanvas} className="activity-graph" />
    </div>
  );
}
