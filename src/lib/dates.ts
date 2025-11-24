export const formatDate = (value: string | number | Date, locale: string = 'en-CA') => {
  const date = value instanceof Date ? value : new Date(value);
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
};

export const toIsoDate = (value: Date = new Date()) => value.toISOString();

export const minutesUntil = (target: Date) => {
  const diffMs = target.getTime() - Date.now();
  return Math.max(0, Math.floor(diffMs / 60000));
};
