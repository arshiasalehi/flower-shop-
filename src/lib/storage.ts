const storageKey = 'fleuriste.preferences';

export interface PreferenceStore<T = Record<string, unknown>> {
  get: () => T | null;
  set: (value: T) => void;
}

export const createStorage = <T extends Record<string, unknown>>(key = storageKey): PreferenceStore<T> => ({
  get: () => {
    if (typeof window === 'undefined') return null;
    try {
      const raw = window.localStorage.getItem(key);
      return raw ? (JSON.parse(raw) as T) : null;
    } catch {
      return null;
    }
  },
  set: (value: T) => {
    if (typeof window === 'undefined') return;
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // ignore write errors
    }
  }
});
