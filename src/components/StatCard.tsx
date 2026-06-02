import React from "react";
import { Card } from "./Card";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  color?: "primary" | "secondary" | "accent";
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  trend,
  color = "primary",
}) => {
  const iconColors = {
    primary: "bg-primary-light/60 text-primary",
    secondary: "bg-secondary-light/60 text-secondary",
    accent: "bg-accent-light/60 text-accent",
  };

  return (
    <Card hoverEffect className="flex items-center justify-between p-5 bg-white">
      <div className="flex flex-col gap-1.5">
        <span className="text-xs font-bold text-text-secondary">{title}</span>
        <span className="text-2xl font-extrabold text-text-primary tracking-tight">{value}</span>
        
        {trend && (
          <div className="flex items-center gap-1 mt-1 text-xs">
            <span
              className={`font-semibold ${
                trend.isPositive ? "text-emerald-600" : "text-rose-600"
              }`}
            >
              {trend.value}
            </span>
            <span className="text-text-secondary">مقارنة بالشهر الماضي</span>
          </div>
        )}
      </div>
      
      <div className={`p-3 rounded-xl ${iconColors[color]} flex items-center justify-center`}>
        {icon}
      </div>
    </Card>
  );
};
