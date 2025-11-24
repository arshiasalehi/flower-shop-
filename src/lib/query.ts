import qs from 'query-string';
import type { ProductFilterState } from '@/types';
import { defaultFilterState } from './filters';

export const filtersToQuery = (filters: ProductFilterState) =>
  qs.stringify(
    {
      query: filters.query,
      category: filters.category,
      occasion: filters.occasion,
      minPrice: filters.priceRange[0],
      maxPrice: filters.priceRange[1],
      colors: filters.colors.join(','),
      sizes: filters.sizes.join(','),
      delivery: filters.delivery.join(','),
      availability: filters.availability.join(','),
      rating: filters.rating,
      onSale: filters.onSaleOnly ? 'true' : undefined,
      tags: filters.tags.join(','),
      sort: filters.sort,
      page: filters.page,
      perPage: filters.perPage
    },
    { skipNull: true, skipEmptyString: true }
  );

export const queryToFilters = (search: string): ProductFilterState => {
  const parsed = qs.parse(search);
  const toArray = (value: string | (string | null)[] | null | undefined) => {
    if (typeof value === 'string' && value.length) {
      return value.split(',').filter(Boolean);
    }
    if (Array.isArray(value)) {
      return value.filter((entry): entry is string => typeof entry === 'string' && entry.length > 0);
    }
    return [];
  };

  return {
    ...defaultFilterState,
    query: (parsed.query as string) ?? defaultFilterState.query,
    category: (parsed.category as string) ?? undefined,
    occasion: (parsed.occasion as string) ?? undefined,
    priceRange: [
      Number(parsed.minPrice ?? defaultFilterState.priceRange[0]),
      Number(parsed.maxPrice ?? defaultFilterState.priceRange[1])
    ],
    colors: toArray(parsed.colors),
    sizes: toArray(parsed.sizes) as ProductFilterState['sizes'],
    delivery: toArray(parsed.delivery) as ProductFilterState['delivery'],
    availability: toArray(parsed.availability) as ProductFilterState['availability'],
    rating: parsed.rating ? Number(parsed.rating) : defaultFilterState.rating,
    onSaleOnly: parsed.onSale === 'true',
    tags: toArray(parsed.tags),
    sort: (parsed.sort as ProductFilterState['sort']) ?? defaultFilterState.sort,
    page: parsed.page ? Number(parsed.page) : defaultFilterState.page,
    perPage: parsed.perPage ? Number(parsed.perPage) : defaultFilterState.perPage
  };
};
