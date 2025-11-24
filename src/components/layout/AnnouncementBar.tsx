import { useCountdown } from '@/hooks/useCountdown';
import { useUIStore } from '@/app/store/ui-store';

export const AnnouncementBar = () => {
  const countdown = useCountdown(14);
  const dismissed = useUIStore((state) => state.announcementDismissed);
  const dismiss = useUIStore((state) => state.dismissAnnouncement);

  if (dismissed) return null;

  return (
    <div className="bg-ink text-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-2 text-sm">
        <p>
          Order before 2:00 p.m. for same-day delivery · {countdown.hours.toString().padStart(2, '0')}h
          {countdown.minutes.toString().padStart(2, '0')}m {countdown.seconds.toString().padStart(2, '0')}s
        </p>
        <button className="text-xs uppercase tracking-wide opacity-80" onClick={dismiss}>
          Dismiss
        </button>
      </div>
    </div>
  );
};
