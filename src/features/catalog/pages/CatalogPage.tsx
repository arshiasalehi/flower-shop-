import { useEffect, useMemo } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import products from '@/data/products.json';
import type { Product, ProductFilterState } from '@/types';
import { applyFilters, defaultFilterState, paginate, sortProducts } from '@/lib/filters';
import { filtersToQuery, queryToFilters } from '@/lib/query';
import { useCatalogStore } from '@/features/catalog/catalog.store';
import { ProductCard } from '../components/ProductCard';
import { FiltersPanel } from '../components/FiltersPanel';
import { FiltersDrawer } from '../components/FiltersDrawer';
import { SortMenu } from '../components/SortMenu';
import { Pagination } from '@/components/ui/Pagination';
import { PromoBanner } from '../components/PromoBanner';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Seo } from '@/components/layout/Seo';

const productList = products as Product[];

export const CatalogPage = () => {
  const params = useParams();
  const categorySlug = params.categorySlug;
  const occasionSlug = params.occasionSlug;
  const location = useLocation();
  const navigate = useNavigate();
  const filters = useCatalogStore((state) => state.filters);
  const setFilters = useCatalogStore((state) => state.setFilters);

  useEffect(() => {
    const parsed = queryToFilters(location.search);
    setFilters({
      ...defaultFilterState,
      ...parsed,
      category: categorySlug ?? parsed.category,
      occasion: occasionSlug ?? parsed.occasion
    });
  }, [categorySlug, occasionSlug, location.search, setFilters]);

  const filteredProducts = useMemo(() => {
    const filtered = applyFilters(productList, filters);
    return sortProducts(filtered, filters.sort);
  }, [filters]);

  const pageItems = paginate(filteredProducts, filters.page, filters.perPage);
  const totalPages = Math.ceil(filteredProducts.length / filters.perPage) || 1;

  const handleChange = (next: Partial<ProductFilterState>) => {
    const merged = { ...filters, ...next };
    setFilters(merged);
    const query = filtersToQuery(merged);
    navigate({ search: `?${query}` }, { replace: true });
  };

  const crumbs = [{ label: 'Home', href: '/' }, { label: 'Catalog', href: '/catalog' }];
  if (categorySlug) {
    crumbs.push({ label: categorySlug.replace(/-/g, ' '), href: location.pathname });
  }
  if (occasionSlug) {
    crumbs.push({ label: occasionSlug.replace(/-/g, ' '), href: location.pathname });
  }

  return (
    <div className="space-y-8">
      <Seo title={`Shop ${(categorySlug ?? occasionSlug ?? 'catalog').replace(/-/g, ' ')}`} />
      <Breadcrumbs crumbs={crumbs} />
      <div className="flex flex-col gap-8">
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-semibold text-ink capitalize">
                {(categorySlug ?? occasionSlug ?? 'All florals').replace(/-/g, ' ')}
              </h1>
              <p className="text-sm text-ink/60">{filteredProducts.length} creations</p>
            </div>
            <div className="flex items-center gap-3">
              <FiltersDrawer filters={filters} onChange={handleChange} />
              <SortMenu value={filters.sort} onChange={(value) => handleChange({ sort: value })} />
            </div>
          </div>
          <PromoBanner />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {pageItems.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <Pagination page={filters.page} totalPages={totalPages} onPageChange={(page) => handleChange({ page })} />
        </div>
      </div>
    </div>
  );
};
