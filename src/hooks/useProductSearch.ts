import { useCallback, useMemo } from 'react';
import products from '@/data/products.json';
import { createProductSearch } from '@/lib/search';
import type { Product } from '@/types';

export const useProductSearch = () => {
  const fuse = useMemo(() => createProductSearch(products as Product[]), []);

  const search = useCallback(
    (query: string) => {
      if (!query.trim()) return [] as Product[];
      return fuse.search(query).slice(0, 6).map((result) => result.item);
    },
    [fuse]
  );

  return { search };
};
