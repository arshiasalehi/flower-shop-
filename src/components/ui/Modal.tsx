import { createPortal } from 'react-dom';
import { clsx } from 'clsx';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export const Modal = ({ open, onClose, title, children }: ModalProps) => {
  if (typeof document === 'undefined' || !open) return null;
  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className={clsx('w-full max-w-lg rounded-3xl bg-white p-6 shadow-card')}
        onClick={(event) => event.stopPropagation()}
      >
        {title && <h2 className="mb-4 text-2xl font-semibold text-ink">{title}</h2>}
        {children}
      </div>
    </div>,
    document.body
  );
};
