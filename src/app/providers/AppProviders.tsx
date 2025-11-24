import { useEffect } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from './theme-provider';
import { useUIStore } from '../store/ui-store';
import { setAnalyticsEnabled } from '@/lib/analytics';

const AnalyticsGate = () => {
  const analytics = useUIStore((state) => state.cookieConsent.analytics);
  useEffect(() => {
    setAnalyticsEnabled(analytics);
  }, [analytics]);
  return null;
};

export const AppProviders = ({ children }: { children: React.ReactNode }) => (
  <HelmetProvider>
    <ThemeProvider>
      <AnalyticsGate />
      {children}
      <Toaster position="top-right" gutter={12} toastOptions={{ duration: 4000 }} />
    </ThemeProvider>
  </HelmetProvider>
);
