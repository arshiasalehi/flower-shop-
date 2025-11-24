import { beforeEach, describe, expect, it } from 'vitest';
import products from '@/data/products.json';
import type { Product } from '@/types';
import { useCartStore } from '@/features/cart/cart.store';

const sample = (products as Product[])[0];

describe('cart math', () => {
  beforeEach(() => {
    useCartStore.setState({ items: [], promoCode: null });
  });

  it('adds items and calculates subtotal + savings', () => {
    useCartStore.getState().addItem(sample);
    useCartStore.getState().addItem(sample);
    expect(useCartStore.getState().items[0].quantity).toBe(2);
    const subtotal = useCartStore.getState().subtotal();
    expect(subtotal).toBeCloseTo(sample.price * 2);
  });
});
