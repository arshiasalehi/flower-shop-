import { clsx } from 'clsx';

export const Card = ({
  children,
  className
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={clsx('rounded-3xl border border-slate-100 bg-white p-6 shadow-card', className)}>
    {children}
  </div>
);
