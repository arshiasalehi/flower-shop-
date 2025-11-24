import { describe, expect, it, beforeEach } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { render, screen } from '@testing-library/react';
import products from '@/data/products.json';
import type { Product } from '@/types';
import { CatalogPage } from '@/features/catalog/pages/CatalogPage';
import { ProductDetailPage } from '@/features/product/pages/ProductDetailPage';
import { CartPage } from '@/features/cart/pages/CartPage';
import { useCartStore } from '@/features/cart/cart.store';

const firstProduct = (products as Product[])[0];

describe('page rendering smoke tests', () => {
  beforeEach(() => {
    useCartStore.setState({ items: [{ product: firstProduct, quantity: 1 }], promoCode: null });
  });

  it('renders catalog page with category heading', async () => {
    render(
      <HelmetProvider>
        <MemoryRouter initialEntries={[`/catalog/${firstProduct.categories[0]}`]}>
          <Routes>
            <Route path="/catalog/:categorySlug" element={<CatalogPage />} />
          </Routes>
        </MemoryRouter>
      </HelmetProvider>
    );
    expect(await screen.findByText(/catalog/i)).toBeInTheDocument();
  });

  it('renders product detail page', async () => {
    const view = render(
      <HelmetProvider>
        <MemoryRouter initialEntries={[`/product/${firstProduct.slug}`]}>
          <Routes>
            <Route path="/product/:slug" element={<ProductDetailPage />} />
          </Routes>
        </MemoryRouter>
      </HelmetProvider>
    );
    expect((await view.findAllByText(firstProduct.title)).length).toBeGreaterThan(0);
  });

  it('renders cart page with subtotal', () => {
    render(
      <HelmetProvider>
        <MemoryRouter initialEntries={[`/cart`]}>
          <Routes>
            <Route path="/cart" element={<CartPage />} />
          </Routes>
        </MemoryRouter>
      </HelmetProvider>
    );
    expect(screen.getByText(/Subtotal/)).toBeInTheDocument();
  });
});
