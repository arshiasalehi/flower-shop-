const cadFormatter = new Intl.NumberFormat('en-CA', {
  style: 'currency',
  currency: 'CAD',
  currencyDisplay: 'symbol',
  maximumFractionDigits: 2
});

export const formatCurrency = (value: number | null | undefined) => {
  if (value === null || value === undefined || Number.isNaN(value)) {
    return cadFormatter.format(0);
  }
  return cadFormatter.format(value);
};
