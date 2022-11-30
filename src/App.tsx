import { useState } from "react";
import { ActivityGraph } from "./ActivityGraph";
import { DynamicViewport } from "./DynamicViewport";
import { LongTaskStats } from "./LongTaskStats";
import { RenderMode, RenderModeForm } from "./RenderModeForm";
import "./index.css";

export function App() {
  const [text, setText] = useState("");
  const [mode, setMode] = useState<RenderMode>("transition-linear");

  return (
    <main>
      <h1>useTransitionEffect()</h1>
      <p>
        This example renders many small rectangles to simulate rendering on a
        low-end device. Type something in the input below to test rendering
        performance.
      </p>
      <div className="my-2">
        <input
          className="form-control"
          type="text"
          placeholder="Type something here to trigger re-render..."
          value={text}
          onChange={(event) => setText(event.target.value)}
        />
      </div>
      <LongTaskStats key={mode} />
      <RenderModeForm value={mode} onChange={setMode} />
      <DynamicViewport>
        {({ width }) => (
          <ActivityGraph
            text={text}
            mode={mode}
            width={width}
            height={Math.floor(5000000 / width)}
          />
        )}
      </DynamicViewport>
    </main>
  );
}
