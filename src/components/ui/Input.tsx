import { forwardRef } from 'react';
import { clsx } from 'clsx';

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  description?: string;
  error?: string;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, description, error, className, ...props }, ref) => (
    <label className={clsx('flex flex-col gap-2 text-sm text-ink/90', className)}>
      {label && <span className="font-medium text-ink">{label}</span>}
      <input
        ref={ref}
        className={clsx(
          'rounded-xl border border-slate-200 bg-white px-4 py-2 text-base text-ink shadow-sm transition focus:border-brand focus-visible:outline focus-visible:outline-brand/80',
          error && 'border-red-500'
        )}
        {...props}
      />
      {description && <span className="text-xs text-ink/70">{description}</span>}
      {error && <span className="text-xs text-red-500">{error}</span>}
    </label>
  )
);

Input.displayName = 'Input';
