import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  icon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  icon,
  className = "",
  id,
  type = "text",
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
      <div className="relative flex items-center">
        {icon && (
          <div className="absolute right-3 text-text-secondary pointer-events-none">
            {icon}
          </div>
        )}
        <input
          id={id}
          type={type}
          className={`w-full bg-white border rounded-xl py-2 px-3 text-sm focus:outline-none focus:ring-2 transition-all ${
            icon ? "pr-9" : ""
          } ${
            error
              ? "border-red-500 focus:ring-red-200 focus:border-red-500"
              : "border-border-base focus:ring-primary/20 focus:border-primary"
          } ${className}`}
          {...props}
        />
      </div>
      {error && <span className="text-xs text-red-500 font-medium">{error}</span>}
      {!error && helperText && (
        <span className="text-xs text-text-secondary">{helperText}</span>
      )}
    </div>
  );
};
