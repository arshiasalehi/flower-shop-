export interface CountdownResult {
  hours: number;
  minutes: number;
  seconds: number;
  expired: boolean;
}

export const getNextCutoff = (cutoffHour = 14) => {
  const now = new Date();
  const target = new Date();
  target.setHours(cutoffHour, 0, 0, 0);
  if (now >= target) {
    target.setDate(target.getDate() + 1);
  }
  return target;
};

export const getCountdown = (cutoffHour = 14): CountdownResult => {
  const target = getNextCutoff(cutoffHour);
  const diff = target.getTime() - Date.now();
  if (diff <= 0) {
    return { hours: 0, minutes: 0, seconds: 0, expired: true };
  }
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  return { hours, minutes, seconds, expired: false };
};
