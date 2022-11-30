import { useEffect, useState } from "react";

export interface DynamicSize {
  width: number;
  height: number;
}

function getSizeFromContentRect(rect: DOMRect | undefined) {
  return {
    width: rect?.width || 0,
    height: rect?.height || 0,
  };
}

function getSizeFromElement(element: HTMLElement | null) {
  return getSizeFromContentRect(element?.getBoundingClientRect());
}

/**
 * Get size of the element.
 */
export function useDynamicSize(element: HTMLElement | null): DynamicSize {
  const [size, setSize] = useState<DynamicSize>(() =>
    getSizeFromElement(element)
  );
  const [observer] = useState(
    () =>
      new ResizeObserver(([entry]) => {
        if (entry) {
          setSize(getSizeFromContentRect(entry.contentRect));
        }
      })
  );

  useEffect(() => {
    if (element) {
      observer.observe(element);
      return () => observer.unobserve(element);
    }
  }, [element, observer]);

  return size;
}
