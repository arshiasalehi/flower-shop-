import { useEffect, useState } from 'react';
import { getCountdown } from '@/lib/countdown';

export const useCountdown = (cutoffHour = 14) => {
  const [countdown, setCountdown] = useState(() => getCountdown(cutoffHour));

  useEffect(() => {
    const id = window.setInterval(() => {
      setCountdown(getCountdown(cutoffHour));
    }, 1000);
    return () => window.clearInterval(id);
  }, [cutoffHour]);

  return countdown;
};
