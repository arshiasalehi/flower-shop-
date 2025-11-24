import type { ProductFilterState } from '@/types';

const options: Array<{ value: ProductFilterState['sort']; label: string }> = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'newest', label: 'Newest' },
  { value: 'best-rated', label: 'Best rated' },
  { value: 'popular', label: 'Most popular' }
];

export const SortMenu = ({ value, onChange }: { value: ProductFilterState['sort']; onChange: (value: ProductFilterState['sort']) => void }) => (
  <label className="text-sm text-ink">
    Sort by
    <select
      className="ml-2 rounded-full border border-slate-200 px-4 py-2"
      value={value}
      onChange={(event) => onChange(event.target.value as ProductFilterState['sort'])}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </label>
);
