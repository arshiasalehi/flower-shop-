import { createPortal } from 'react-dom';
import { clsx } from 'clsx';

interface DrawerProps {
  open: boolean;
  onClose: () => void;
  side?: 'left' | 'right';
  title?: string;
  children: React.ReactNode;
}

export const Drawer = ({ open, onClose, side = 'right', title, children }: DrawerProps) => {
  if (typeof document === 'undefined' || !open) return null;
  return createPortal(
    <div className="fixed inset-0 z-40">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <section
        className={clsx(
          'absolute top-0 h-full w-full max-w-md bg-white shadow-card transition-transform',
          side === 'right' ? 'right-0 translate-x-0' : 'left-0'
        )}
      >
        <header className="flex items-center justify-between border-b px-6 py-4">
          <div>
            <p className="text-lg font-semibold text-ink">{title}</p>
          </div>
          <button type="button" onClick={onClose} className="text-sm text-ink/70 hover:text-ink">
            Close
          </button>
        </header>
        <div className="h-[calc(100%-64px)] overflow-y-auto px-6 py-4">{children}</div>
      </section>
    </div>,
    document.body
  );
};
