type AnalyticsEvent = {
  name: 'page_view' | 'add_to_cart' | 'checkout_step' | 'search';
  payload?: Record<string, unknown>;
};

let enabled = true;

export const setAnalyticsEnabled = (value: boolean) => {
  enabled = value;
};

export const track = (event: AnalyticsEvent) => {
  if (!enabled || typeof window === 'undefined') return;
  if (import.meta.env.DEV) {
    console.info('[analytics]', event);
  }
};
