import type { ReactNode } from 'react';
import { cn } from '../../utils/cn';

interface FormFieldProps {
  label: string;
  error?: string;
  className?: string;
  children: ReactNode;
}

export function FormField({ label, error, className, children }: FormFieldProps) {
  return (
    <div className={cn("space-y-1.5 text-left w-full", className)}>
      <label className="text-xs font-semibold text-text-primary tracking-wide block">
        {label}
      </label>
      {children}
      {error && (
        <span className="text-xs font-medium text-danger block animate-fade-in">
          {error}
        </span>
      )}
    </div>
  );
}
