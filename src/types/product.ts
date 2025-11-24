export type ProductSize = 'Petite' | 'Standard' | 'Luxe';
export type DeliveryOption = 'same-day' | 'next-day' | 'pickup';

export interface Product {
  id: string;
  title: string;
  slug: string;
  description: string;
  categories: string[];
  occasions: string[];
  tags: string[];
  colors: string[];
  stems: number;
  size: ProductSize;
  price: number;
  compareAtPrice: number | null;
  isOnSale: boolean;
  rating: number;
  reviewsCount: number;
  sku: string;
  availability: 'in-stock' | 'out-of-stock';
  deliveryOptions: DeliveryOption[];
  primaryImage: string;
  imageUrls: string[];
  createdAt: string;
  popularity: number;
  badges: string[];
}

export interface ProductFilterState {
  query: string;
  category?: string;
  occasion?: string;
  priceRange: [number, number];
  colors: string[];
  sizes: ProductSize[];
  delivery: DeliveryOption[];
  availability: Array<'in-stock' | 'out-of-stock'>;
  rating: number;
  onSaleOnly: boolean;
  tags: string[];
  sort: 'featured' | 'price-asc' | 'price-desc' | 'newest' | 'best-rated' | 'popular';
  page: number;
  perPage: number;
}
