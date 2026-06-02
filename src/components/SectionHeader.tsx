import React from "react";

interface SectionHeaderProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  description,
  action,
}) => {
  return (
    <div className="flex items-center justify-between gap-4 mb-4">
      <div className="flex flex-col gap-0.5">
        <h2 className="text-sm font-bold text-text-primary">{title}</h2>
        {description && <p className="text-xs text-text-secondary">{description}</p>}
      </div>
      {action && <div className="flex items-center gap-1">{action}</div>}
    </div>
  );
};
