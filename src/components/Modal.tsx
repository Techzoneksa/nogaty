import React, { useEffect } from "react";
import { Button } from "./Button";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
}) => {
  // Prevent background scrolling when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Content */}
      <div className="bg-white border border-border-base w-full max-w-lg rounded-2xl shadow-xl z-10 overflow-hidden transform transition-all flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border-base bg-bg-base/50">
          <h3 className="text-base font-bold text-text-primary">{title}</h3>
          <button
            onClick={onClose}
            className="text-text-secondary hover:text-text-primary hover:bg-slate-100 p-1.5 rounded-lg transition-colors cursor-pointer"
            aria-label="إغلاق"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="p-5 overflow-y-auto flex-1 text-sm text-text-primary leading-relaxed">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="p-4 border-t border-border-base bg-bg-base/50 flex justify-end gap-2">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};
