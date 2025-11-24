import { clsx } from 'clsx';

type BadgeProps = {
  label: string;
  variant?: 'default' | 'success' | 'warning';
};

export const Badge = ({ label, variant = 'default' }: BadgeProps) => (
  <span
    className={clsx(
      'inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold uppercase tracking-wide',
      {
        default: 'bg-brand-light text-brand-dark',
        success: 'bg-emerald-100 text-emerald-800',
        warning: 'bg-amber-100 text-amber-800'
      }[variant]
    )}
  >
    {label}
  </span>
);
