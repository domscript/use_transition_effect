import { useEffect, useMemo, useState } from "react";
import debounce from "lodash.debounce";

// implement traditional way of debouncing values (to compare apples to apples)
export function useDebouncedValue<T>(value: T): T {
  const [debouncedValue, setDebouncedValue] = useState(value);
  const setDebouncedValueDebounced = useMemo(
    () => debounce(setDebouncedValue, 200),
    []
  );
  useEffect(() => {
    setDebouncedValueDebounced(value);
  }, [value, setDebouncedValueDebounced]);
  useEffect(() => {
    return () => {
      // clean-up scheduled callbacks
      setDebouncedValueDebounced.cancel();
    };
  }, [setDebouncedValueDebounced]);

  return debouncedValue;
}
