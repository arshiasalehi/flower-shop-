import { clsx } from 'clsx';

export const Skeleton = ({ className }: { className?: string }) => (
  <div className={clsx('animate-pulse rounded-xl bg-slate-200', className)} />
);
