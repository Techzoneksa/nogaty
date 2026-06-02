import React from "react";

interface Option {
  value: string | number;
  label: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: Option[];
  error?: string;
  helperText?: string;
}

export const Select: React.FC<SelectProps> = ({
  label,
  options,
  error,
  helperText,
  className = "",
  id,
  ...props
}) => {
  return (
    <div className="w-full flex flex-col gap-1">
      {label && (
        <label
          htmlFor={id}
          className="text-xs font-semibold text-text-primary"
        >
          {label}
        </label>
      )}
      <select
        id={id}
        className={`w-full bg-white border rounded-xl py-2 px-3 text-sm focus:outline-none focus:ring-2 transition-all cursor-pointer ${
          error
            ? "border-red-500 focus:ring-red-200 focus:border-red-500"
            : "border-border-base focus:ring-primary/20 focus:border-primary"
        } ${className}`}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <span className="text-xs text-red-500 font-medium">{error}</span>}
      {!error && helperText && (
        <span className="text-xs text-text-secondary">{helperText}</span>
      )}
    </div>
  );
};
