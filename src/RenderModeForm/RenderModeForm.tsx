import { ReactNode, useId } from "react";

export type RenderMode =
  | "transition-linear"
  | "transition-progressive"
  | "debounced"
  | "direct";

interface RenderModeFormProps {
  value: RenderMode;
  onChange: (mode: RenderMode) => void;
}

interface RenderModeOption {
  value: RenderMode;
  label: ReactNode;
}

const OPTIONS: RenderModeOption[] = [
  {
    value: "transition-linear",
    label: (
      <>
        <code>useTransitionEffect()</code> with background canvas{" "}
        <span className="badge bg-success">Concurrent</span>
      </>
    ),
  },
  {
    value: "transition-progressive",
    label: (
      <>
        <code>useTransitionEffect()</code> with progressive canvas{" "}
        <span className="badge bg-success">Concurrent</span>
      </>
    ),
  },
  {
    value: "debounced",
    label: (
      <>
        <code>useDebouncedValue()</code> with background canvas{" "}
        <span className="badge bg-warning">Debounced</span>{" "}
        <span className="badge bg-danger">Blocking</span>
      </>
    ),
  },
  {
    value: "direct",
    label: (
      <>
        rendering directly on the canvas{" "}
        <span className="badge bg-danger">Blocking</span>
      </>
    ),
  },
];

export function RenderModeForm({ value, onChange }: RenderModeFormProps) {
  const id = useId();
  const name = `${id}_render_mode`;

  return (
    <div className="my-3">
      {OPTIONS.map((item, index) => (
        <div className="form-check" key={index}>
          <input
            className="form-check-input"
            type="radio"
            name={name}
            id={`${name}_${item.value}`}
            checked={value === item.value}
            onChange={() => onChange(item.value)}
          />
          <label className="form-check-label" htmlFor={`${name}_${item.value}`}>
            {item.label}
          </label>
        </div>
      ))}
    </div>
  );
}
