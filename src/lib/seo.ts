export const buildTitle = (pageTitle?: string) => {
  const base = 'Fleuriste Montréal | Luxury Florals & Plants';
  if (!pageTitle) return base;
  return `${pageTitle} · ${base}`;
};

export const buildMetaDescription = (description?: string) =>
  description?.slice(0, 155) ?? 'Same-day delivery of premium bouquets, indoor plants, and curated floral experiences across Greater Montréal.';
