import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDebounce } from '@/hooks/useDebounce';
import { useProductSearch } from '@/hooks/useProductSearch';
import { useUIStore } from '@/app/store/ui-store';
import type { Product } from '@/types';
import { getProductImage } from '@/lib/product-media';

export const SearchBar = () => {
  const { search } = useProductSearch();
  const addRecentSearch = useUIStore((state) => state.addRecentSearch);
  const recentSearches = useUIStore((state) => state.recentSearches);
  const [query, setQuery] = useState('');
  const [focused, setFocused] = useState(false);
  const debounced = useDebounce(query, 250);
  const navigate = useNavigate();

  const results = useMemo<Product[]>(() => search(debounced), [debounced, search]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!query.trim()) return;
    addRecentSearch(query.trim());
    navigate(`/search?query=${encodeURIComponent(query.trim())}`);
    setFocused(false);
  };

  return (
    <div className="relative w-full max-w-xl">
      <form onSubmit={handleSubmit}>
        <input
          type="search"
          placeholder="Search bouquets, colors, occasions"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => setFocused(false), 150)}
          className="w-full rounded-full border border-slate-200 bg-white/90 px-5 py-2.5 text-sm text-ink shadow-sm focus:border-brand focus:outline-none"
          aria-label="Search our catalog"
        />
      </form>
      {focused && (
        <div className="absolute left-0 right-0 top-12 z-30 rounded-3xl border border-slate-100 bg-white p-4 shadow-card">
          {query && results.length === 0 && (
            <p className="text-sm text-ink/70">No products found.</p>
          )}
          {results.length > 0 && (
            <ul className="flex flex-col gap-3">
              {results.map((product, index) => (
                <li key={product.id}>
                  <Link
                    to={`/product/${product.slug}`}
                    className="flex items-center gap-3 rounded-2xl p-2 hover:bg-brand-light/40"
                    onClick={() => {
                      addRecentSearch(query);
                      setFocused(false);
                    }}
                  >
                    <img
                      src={getProductImage(product, index)}
                      alt={product.title}
                      className="h-12 w-12 rounded-2xl object-cover"
                      loading="lazy"
                    />
                    <div>
                      <p className="text-sm font-semibold text-ink">{product.title}</p>
                      <p className="text-xs text-ink/60">${product.price.toFixed(2)}</p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
          {!query && recentSearches.length > 0 && (
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-wide text-ink/60">Recent searches</p>
              <div className="flex flex-wrap gap-2">
                {recentSearches.map((item) => (
                  <button
                    type="button"
                    key={item}
                    onClick={() => {
                      setQuery(item);
                      addRecentSearch(item);
                      navigate(`/search?query=${encodeURIComponent(item)}`);
                      setFocused(false);
                    }}
                    className="rounded-full bg-slate-100 px-3 py-1 text-xs text-ink/80"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
