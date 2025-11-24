import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import products from '@/data/products.json';
import type { Product } from '@/types';
import { createProductSearch } from '@/lib/search';
import { ProductCard } from '../components/ProductCard';
import { Seo } from '@/components/layout/Seo';

const data = products as Product[];
const fuse = createProductSearch(data);

export const SearchPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('query') ?? '';

  const results = useMemo(() => {
    if (!query) return data.slice(0, 12);
    return fuse.search(query).map((entry) => entry.item);
  }, [query]);

  return (
    <div className="space-y-4">
      <Seo title={`Search ${query}`} />
      <h1 className="text-3xl font-semibold text-ink">Search</h1>
      <p className="text-sm text-ink/60">{results.length} results for “{query}”</p>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {results.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};
