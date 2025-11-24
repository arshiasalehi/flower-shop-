import { create } from 'zustand';
import type { Product, ProductSize } from '@/types';

export interface CartItem {
  product: Product;
  quantity: number;
  size?: ProductSize;
}

interface CartState {
  items: CartItem[];
  promoCode: string | null;
  addItem: (product: Product, options?: { size?: ProductSize }) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clear: () => void;
  applyPromo: (code: string) => void;
  subtotal: () => number;
  savings: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  promoCode: null,
  addItem: (product, options) => {
    set((state) => {
      const existing = state.items.find((item) => item.product.id === product.id);
      if (existing) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.product.id === product.id
              ? { ...item, quantity: Math.min(99, item.quantity + 1), size: options?.size ?? item.size }
              : item
          )
        };
      }
      return {
        ...state,
        items: [...state.items, { product, quantity: 1, size: options?.size }]
      };
    });
  },
  removeItem: (productId) =>
    set((state) => ({
      ...state,
      items: state.items.filter((item) => item.product.id !== productId)
    })),
  updateQuantity: (productId, quantity) =>
    set((state) => ({
      ...state,
      items: state.items.map((item) =>
        item.product.id === productId
          ? { ...item, quantity: Math.max(1, Number.isNaN(quantity) ? 1 : quantity) }
          : item
      )
    })),
  clear: () => set({ items: [], promoCode: null }),
  applyPromo: (code) => set({ promoCode: code.trim().toUpperCase() }),
  subtotal: () =>
    get().items.reduce((total, item) => total + item.product.price * item.quantity, 0),
  savings: () =>
    get().items.reduce((total, item) => {
      if (!item.product.compareAtPrice) return total;
      return total + (item.product.compareAtPrice - item.product.price) * item.quantity;
    }, 0)
}));
