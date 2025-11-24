import { create } from 'zustand';
import type { ProductFilterState } from '@/types';
import { defaultFilterState } from '@/lib/filters';

interface CatalogState {
  filters: ProductFilterState;
  setFilters: (next: Partial<ProductFilterState>) => void;
  resetFilters: () => void;
}

export const useCatalogStore = create<CatalogState>((set) => ({
  filters: defaultFilterState,
  setFilters: (next) => set((state) => ({ filters: { ...state.filters, ...next } })),
  resetFilters: () => set({ filters: defaultFilterState })
}));
