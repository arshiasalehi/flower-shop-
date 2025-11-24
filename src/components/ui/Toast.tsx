import toast, { type Toast } from 'react-hot-toast';

export const showToast = (message: string, options?: Partial<Toast>) =>
  toast(message, {
    ...options,
    style: { borderRadius: '16px', padding: '12px 16px' }
  });
