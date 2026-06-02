import React from "react";
import { Button } from "./Button";

interface EmptyStateProps {
  title: string;
  description: string;
  actionText?: string;
  onAction?: () => void;
  icon?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  actionText,
  onAction,
  icon,
}) => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 border border-dashed border-border-base rounded-2xl bg-white/50 max-w-md mx-auto my-6">
      <div className="mb-4 text-text-secondary/60">
        {icon || (
          <svg
            className="w-16 h-16 mx-auto"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0a2 2 0 01-2 2H6a2 2 0 01-2-2m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m9-4h.01M12 16h.01M9 16h.01M15 16h.01"
            />
          </svg>
        )}
      </div>
      <h3 className="text-sm font-bold text-text-primary mb-1">{title}</h3>
      <p className="text-xs text-text-secondary leading-relaxed max-w-[280px] mb-5">
        {description}
      </p>
      {actionText && onAction && (
        <Button variant="primary" size="sm" onClick={onAction}>
          {actionText}
        </Button>
      )}
    </div>
  );
};
