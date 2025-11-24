import { useState } from 'react';
import { useUIStore } from '@/app/store/ui-store';
import { Button } from '@/components/ui/Button';
import { setAnalyticsEnabled } from '@/lib/analytics';
import { CookieSettingsModal } from './CookieSettingsModal';

export const CookieBanner = () => {
  const consent = useUIStore((state) => state.cookieConsent);
  const setConsent = useUIStore((state) => state.setCookieConsent);
  const [open, setOpen] = useState(false);

  const acceptAll = () => {
    setConsent({ analytics: true, marketing: true, decided: true });
    setAnalyticsEnabled(true);
  };

  if (consent.decided) return null;

  return (
    <div className="fixed bottom-4 right-4 z-40 max-w-md rounded-3xl bg-white p-5 shadow-card">
      <p className="text-sm text-ink/80">
        We use cookies to power cart reminders, analytics, and marketing experiences. Manage your
        preferences anytime.
      </p>
      <div className="mt-4 flex flex-wrap gap-3">
        <Button onClick={acceptAll}>Accept all</Button>
        <Button variant="secondary" onClick={() => setOpen(true)}>
          Customize
        </Button>
      </div>
      <CookieSettingsModal open={open} onClose={() => setOpen(false)} />
    </div>
  );
};
