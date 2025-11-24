import { forwardRef } from 'react';
import { clsx } from 'clsx';

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
};

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, className, children, ...props }, ref) => (
    <label className="flex flex-col gap-2 text-sm text-ink">
      {label && <span className="font-medium">{label}</span>}
      <select
        ref={ref}
        className={clsx(
          'rounded-xl border border-slate-200 bg-white px-4 py-2 text-base shadow-sm focus:border-brand focus-visible:outline focus-visible:outline-brand',
          className
        )}
        {...props}
      >
        {children}
      </select>
    </label>
  )
);

Select.displayName = 'Select';
