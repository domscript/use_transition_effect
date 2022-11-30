import React, { ReactNode, useState } from "react";
import { DynamicSize, useDynamicSize } from "./use-dynamic-size";

interface DynamicViewportProps {
  children: (size: DynamicSize) => ReactNode;
  width?: number;
  height?: number;
}

export function DynamicViewport({
  children,
  width,
  height,
}: DynamicViewportProps) {
  const [viewport, setViewport] = useState<HTMLDivElement | null>(null);
  const size = useDynamicSize(viewport);

  return (
    <div
      ref={setViewport}
      style={{
        position: "relative",
        width: width || "auto",
        height: height || "auto",
      }}
    >
      <div
        style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
      >
        {children(size)}
      </div>
    </div>
  );
}
