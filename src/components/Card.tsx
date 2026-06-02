import React from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  hoverEffect = false,
  className = "",
  ...props
}) => {
  return (
    <div
      className={`bg-card-base border border-border-base rounded-2xl p-5 shadow-xs transition-all duration-300 ${
        hoverEffect ? "hover:shadow-md hover:-translate-y-1 hover:border-primary/20" : ""
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
