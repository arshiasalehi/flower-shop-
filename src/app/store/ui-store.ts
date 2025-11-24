import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CookieConsent {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  decided: boolean;
  updatedAt?: string;
}

interface UIState {
  cookieConsent: CookieConsent;
  announcementDismissed: boolean;
  recentSearches: string[];
  dismissAnnouncement: () => void;
  setCookieConsent: (consent: Partial<CookieConsent>) => void;
  addRecentSearch: (query: string) => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      announcementDismissed: false,
      cookieConsent: {
        necessary: true,
        analytics: true,
        marketing: false,
        decided: false
      },
      recentSearches: [],
      dismissAnnouncement: () => set({ announcementDismissed: true }),
      setCookieConsent: (consent) =>
        set((state) => ({
          cookieConsent: {
            ...state.cookieConsent,
            ...consent,
            updatedAt: new Date().toISOString()
          }
        })),
      addRecentSearch: (query) =>
        set((state) => ({
          recentSearches: [query, ...state.recentSearches.filter((item) => item !== query)].slice(
            0,
            8
          )
        }))
    }),
    { name: 'fleuriste-ui' }
  )
);
