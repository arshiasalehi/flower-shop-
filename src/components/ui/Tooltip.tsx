import { useState } from 'react';
import { clsx } from 'clsx';

interface TooltipProps {
  label: string;
  children: React.ReactNode;
}

export const Tooltip = ({ label, children }: TooltipProps) => {
  const [open, setOpen] = useState(false);
  return (
    <span
      className="relative inline-flex"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
    >
      {children}
      <span
        role="tooltip"
        className={clsx(
          'pointer-events-none absolute top-full z-30 mt-2 whitespace-nowrap rounded-full bg-ink px-3 py-1 text-xs text-white shadow-lg transition-opacity',
          open ? 'opacity-100' : 'opacity-0'
        )}
      >
        {label}
      </span>
    </span>
  );
};
