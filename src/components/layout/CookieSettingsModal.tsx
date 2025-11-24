import { useEffect, useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { useUIStore } from '@/app/store/ui-store';
import { setAnalyticsEnabled } from '@/lib/analytics';

interface CookieSettingsModalProps {
  open: boolean;
  onClose: () => void;
}

export const CookieSettingsModal = ({ open, onClose }: CookieSettingsModalProps) => {
  const consent = useUIStore((state) => state.cookieConsent);
  const setConsent = useUIStore((state) => state.setCookieConsent);
  const [analytics, setAnalytics] = useState(consent.analytics);
  const [marketing, setMarketing] = useState(consent.marketing);

  useEffect(() => {
    if (open) {
      setAnalytics(consent.analytics);
      setMarketing(consent.marketing);
    }
  }, [consent.analytics, consent.marketing, open]);

  const handleSave = () => {
    setConsent({ analytics, marketing, decided: true });
    setAnalyticsEnabled(analytics);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} title="Cookie preferences">
      <div className="space-y-4 text-sm text-ink/80">
        <p>Update the optional cookies we use to improve your experience.</p>
        <label className="flex items-start gap-3">
          <input type="checkbox" checked disabled className="mt-1" />
          <span>
            <strong>Essential</strong>
            <br />
            Required for checkout, cart, and security.
          </span>
        </label>
        <label className="flex items-start gap-3">
          <input
            type="checkbox"
            className="mt-1"
            checked={analytics}
            onChange={(event) => setAnalytics(event.target.checked)}
          />
          <span>
            <strong>Analytics</strong>
            <br />
            Helps us understand page performance.
          </span>
        </label>
        <label className="flex items-start gap-3">
          <input
            type="checkbox"
            className="mt-1"
            checked={marketing}
            onChange={(event) => setMarketing(event.target.checked)}
          />
          <span>
            <strong>Marketing</strong>
            <br />
            Personalizes banners and offers.
          </span>
        </label>
        <div className="flex justify-end gap-3 pt-4">
          <button className="text-sm text-ink/60" onClick={onClose}>
            Cancel
          </button>
          <button className="rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white" onClick={handleSave}>
            Save preferences
          </button>
        </div>
      </div>
    </Modal>
  );
};
