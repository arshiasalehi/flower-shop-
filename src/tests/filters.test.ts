import { describe, expect, it } from 'vitest';
import { applyFilters, defaultFilterState, sortProducts } from '@/lib/filters';
import products from '@/data/products.json';
import type { Product } from '@/types';

const data = products as Product[];

describe('filter + sort logic', () => {
  it('filters by category and sale flag', () => {
    const filters = { ...defaultFilterState, category: 'bouquets', onSaleOnly: true };
    const results = applyFilters(data, filters);
    expect(results.every((product) => product.categories.includes('bouquets'))).toBe(true);
    expect(results.every((product) => product.isOnSale)).toBe(true);
  });

  it('sorts by price descending', () => {
    const sorted = sortProducts(data.slice(0, 10), 'price-desc');
    expect(sorted[0].price).toBeGreaterThanOrEqual(sorted[sorted.length - 1].price);
  });
});
