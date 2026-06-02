import React from "react";
import { Card } from "./Card";

interface Field {
  label: string;
  value: React.ReactNode;
}

interface MobileCardProps {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  badge?: React.ReactNode;
  fields: Field[];
  onClick?: () => void;
  actions?: React.ReactNode;
}

export const MobileCard: React.FC<MobileCardProps> = ({
  title,
  subtitle,
  badge,
  fields,
  onClick,
  actions,
}) => {
  return (
    <Card
      hoverEffect={!!onClick}
      onClick={onClick}
      className={`flex flex-col gap-3 p-4 bg-white ${onClick ? "cursor-pointer" : ""}`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex flex-col gap-0.5">
          <div className="font-bold text-sm text-text-primary">{title}</div>
          {subtitle && <div className="text-xs text-text-secondary">{subtitle}</div>}
        </div>
        {badge && <div>{badge}</div>}
      </div>

      <div className="grid grid-cols-2 gap-y-2 gap-x-4 border-t border-border-base pt-3 text-xs">
        {fields.map((field, idx) => (
          <div key={idx} className="flex flex-col gap-1">
            <span className="text-text-secondary font-medium">{field.label}</span>
            <span className="text-text-primary font-semibold">{field.value}</span>
          </div>
        ))}
      </div>

      {actions && (
        <div className="flex items-center justify-end gap-2 border-t border-border-base pt-3 mt-1">
          {actions}
        </div>
      )}
    </Card>
  );
};
