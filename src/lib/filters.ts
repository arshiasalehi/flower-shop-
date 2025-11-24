import type { Product, ProductFilterState } from '@/types';

export const defaultFilterState: ProductFilterState = {
  query: '',
  priceRange: [0, 500],
  colors: [],
  sizes: [],
  delivery: [],
  availability: ['in-stock'],
  rating: 0,
  onSaleOnly: false,
  tags: [],
  sort: 'featured',
  page: 1,
  perPage: 20
};

export const sortProducts = (products: Product[], sort: ProductFilterState['sort']) => {
  switch (sort) {
    case 'price-asc':
      return [...products].sort((a, b) => a.price - b.price);
    case 'price-desc':
      return [...products].sort((a, b) => b.price - a.price);
    case 'newest':
      return [...products].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    case 'best-rated':
      return [...products].sort((a, b) => b.rating - a.rating);
    case 'popular':
      return [...products].sort((a, b) => b.popularity - a.popularity);
    default:
      return [...products].sort((a, b) => b.popularity - a.popularity);
  }
};

export const applyFilters = (products: Product[], filters: ProductFilterState) => {
  const [minPrice, maxPrice] = filters.priceRange;
  const normalizedQuery = filters.query.trim().toLowerCase();

  return products.filter((product) => {
    if (filters.category && !product.categories.includes(filters.category)) {
      return false;
    }
    if (filters.occasion && !product.occasions.includes(filters.occasion)) {
      return false;
    }
    if (filters.onSaleOnly && !product.isOnSale) {
      return false;
    }
    if (filters.colors.length && !filters.colors.some((color) => product.colors.includes(color))) {
      return false;
    }
    if (filters.sizes.length && !filters.sizes.includes(product.size)) {
      return false;
    }
    if (
      filters.delivery.length &&
      !filters.delivery.some((delivery) => product.deliveryOptions.includes(delivery))
    ) {
      return false;
    }
    if (filters.availability.length && !filters.availability.includes(product.availability)) {
      return false;
    }
    if (filters.rating && product.rating < filters.rating) {
      return false;
    }
    if (filters.tags.length && !filters.tags.some((tag) => product.tags.includes(tag))) {
      return false;
    }
    if (product.price < minPrice || product.price > maxPrice) {
      return false;
    }
    if (
      normalizedQuery &&
      !(
        product.title.toLowerCase().includes(normalizedQuery) ||
        product.description.toLowerCase().includes(normalizedQuery)
      )
    ) {
      return false;
    }
    return true;
  });
};

export const paginate = (products: Product[], page: number, perPage: number) => {
  const start = (page - 1) * perPage;
  return products.slice(start, start + perPage);
};
