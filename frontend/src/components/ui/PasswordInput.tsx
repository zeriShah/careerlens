import { useState, useEffect, forwardRef } from 'react';
import type { InputHTMLAttributes } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { cn } from '../../utils/cn';

export interface PasswordInputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  showStrength?: boolean;
}

const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, error, showStrength = false, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const [strength, setStrength] = useState<'none' | 'weak' | 'medium' | 'strong'>('none');
    const [localValue, setLocalValue] = useState((props.value as string) || '');

    useEffect(() => {
      if (props.value !== undefined) {
        setLocalValue(props.value as string);
      }
    }, [props.value]);

    useEffect(() => {
      if (!localValue) {
        setStrength('none');
        return;
      }

      let score = 0;
      if (localValue.length >= 8) score++;
      if (/[A-Z]/.test(localValue) && /[a-z]/.test(localValue)) score++;
      if (/[0-9]/.test(localValue)) score++;

      if (score === 1) {
        setStrength('weak');
      } else if (score === 2) {
        setStrength('medium');
      } else if (score === 3) {
        setStrength('strong');
      } else {
        setStrength('weak');
      }
    }, [localValue]);

    const handleToggle = () => setShowPassword(!showPassword);

    return (
      <div className="w-full relative space-y-1">
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            className={cn(
              "flex w-full rounded-lg border border-border bg-white pl-3 pr-10 py-2 text-sm text-text-primary shadow-sm placeholder:text-text-secondary/40 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all duration-150 disabled:cursor-not-allowed disabled:opacity-50",
              error && "border-danger focus:border-danger focus:ring-danger/10",
              className
            )}
            ref={ref}
            {...props}
            onChange={(e) => {
              setLocalValue(e.target.value);
              props.onChange?.(e);
            }}
          />
          <button
            type="button"
            onClick={handleToggle}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary/50 hover:text-text-primary focus:outline-none"
            tabIndex={-1}
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>

        {/* Dynamic Compact Dots strength Indicator */}
        {showStrength && localValue && (
          <div className="flex items-center justify-between mt-1 px-1 select-none animate-fade-in">
            <span className="text-[10px] font-bold text-text-secondary/80">Security Strength</span>
            <div className="flex items-center gap-1.5">
              <span
                className={cn(
                  "text-[9px] font-extrabold uppercase mr-1 tracking-wider",
                  strength === 'weak' && "text-danger",
                  strength === 'medium' && "text-warning",
                  strength === 'strong' && "text-success"
                )}
              >
                {strength}
              </span>
              <span
                className={cn(
                  "w-1.5 h-1.5 rounded-full transition-colors duration-200 bg-slate-200",
                  strength !== 'none' && (strength === 'weak' ? 'bg-danger' : strength === 'medium' ? 'bg-warning' : 'bg-success')
                )}
              />
              <span
                className={cn(
                  "w-1.5 h-1.5 rounded-full transition-colors duration-200 bg-slate-200",
                  (strength === 'medium' || strength === 'strong') && (strength === 'medium' ? 'bg-warning' : 'bg-success')
                )}
              />
              <span
                className={cn(
                  "w-1.5 h-1.5 rounded-full transition-colors duration-200 bg-slate-200",
                  strength === 'strong' && 'bg-success'
                )}
              />
            </div>
          </div>
        )}
      </div>
    );
  }
);

PasswordInput.displayName = "PasswordInput";

export { PasswordInput };
