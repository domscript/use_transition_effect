import { useEffect, useState } from "react";

export function LongTaskStats() {
  const [count, setCount] = useState(0);
  const [lastDuration, setLastDuration] = useState<number | undefined>(
    undefined
  );

  const [observer] = useState(
    () =>
      new PerformanceObserver((list) => {
        const entries = list.getEntries();
        setCount((prevCount) => prevCount + entries.length);
        if (entries.length) {
          setLastDuration(entries[entries.length - 1].duration);
        }
      })
  );

  useEffect(() => {
    observer.observe({ entryTypes: ["longtask"] });
    return () => observer.disconnect();
  }, [observer]);

  return (
    <strong>
      {count} long {count === 1 ? "task" : "tasks"} detected
      {lastDuration ? `, last duration: ${Math.round(lastDuration)}ms` : ""}
    </strong>
  );
}
