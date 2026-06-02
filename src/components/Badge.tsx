import React from "react";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "primary" | "secondary" | "success" | "warning" | "danger" | "neutral" | "accent";
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "primary",
  className = "",
  ...props
}) => {
  const baseStyle =
    "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold select-none border";

  const variants = {
    primary: "bg-primary-light/50 text-primary border-primary/20",
    secondary: "bg-secondary-light/50 text-secondary border-secondary/20",
    success: "bg-emerald-50 text-emerald-700 border-emerald-200",
    warning: "bg-amber-50 text-amber-700 border-amber-200",
    danger: "bg-red-50 text-red-700 border-red-200",
    neutral: "bg-slate-100 text-slate-700 border-slate-200",
    accent: "bg-accent-light/50 text-accent border-accent/20",
  };

  return (
    <span
      className={`${baseStyle} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};
