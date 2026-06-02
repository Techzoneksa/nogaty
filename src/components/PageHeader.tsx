import React from "react";

interface PageHeaderProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
  breadcrumbs?: string[];
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description,
  action,
  breadcrumbs,
}) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-5 border-b border-border-base mb-6">
      <div className="flex flex-col gap-1">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <div className="flex items-center gap-1.5 text-xs text-text-secondary font-medium">
            {breadcrumbs.map((bc, idx) => (
              <React.Fragment key={idx}>
                {idx > 0 && <span>/</span>}
                <span>{bc}</span>
              </React.Fragment>
            ))}
          </div>
        )}
        <h1 className="text-xl md:text-2xl font-extrabold text-text-primary tracking-tight">
          {title}
        </h1>
        {description && (
          <p className="text-xs md:text-sm text-text-secondary leading-relaxed max-w-2xl">
            {description}
          </p>
        )}
      </div>
      {action && <div className="flex items-center gap-2 shrink-0">{action}</div>}
    </div>
  );
};
