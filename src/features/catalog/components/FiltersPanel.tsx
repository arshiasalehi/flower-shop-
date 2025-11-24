import type { ProductFilterState } from '@/types';

interface FiltersPanelProps {
  filters: ProductFilterState;
  onChange: (next: Partial<ProductFilterState>) => void;
}

const colors = ['blush', 'coral', 'white', 'lavender', 'yellow', 'plum', 'green', 'peach'];
const sizes: ProductFilterState['sizes'] = ['Petite', 'Standard', 'Luxe'];
const deliveryOptions: ProductFilterState['delivery'] = ['same-day', 'next-day', 'pickup'];
const availability: ProductFilterState['availability'] = ['in-stock', 'out-of-stock'];
const tags = ['artisan-crafted', 'eco-friendly', 'local-delivery', 'premium', 'seasonal'];

export const FiltersPanel = ({ filters, onChange }: FiltersPanelProps) => (
  <div className="space-y-6">
    <div>
      <p className="text-sm font-semibold text-ink">Price range</p>
      <div className="mt-3 flex items-center gap-2 text-sm">
        <input
          type="number"
          min={0}
          value={filters.priceRange[0]}
          onChange={(event) =>
            onChange({ priceRange: [Number(event.target.value), filters.priceRange[1]] })
          }
          className="w-20 rounded-lg border px-2 py-1"
        />
        <span>to</span>
        <input
          type="number"
          value={filters.priceRange[1]}
          onChange={(event) =>
            onChange({ priceRange: [filters.priceRange[0], Number(event.target.value)] })
          }
          className="w-20 rounded-lg border px-2 py-1"
        />
      </div>
    </div>

    <label className="flex items-center gap-2 text-sm text-ink">
      <input
        type="checkbox"
        checked={filters.onSaleOnly}
        onChange={(event) => onChange({ onSaleOnly: event.target.checked })}
      />
      On sale only
    </label>

    <div>
      <p className="text-sm font-semibold text-ink">Availability</p>
      <div className="mt-2 flex flex-wrap gap-2 text-sm">
        {availability.map((option) => (
          <label key={option} className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1">
            <input
              type="checkbox"
              checked={filters.availability.includes(option)}
              onChange={(event) =>
                onChange({
                  availability: event.target.checked
                    ? [...filters.availability, option]
                    : filters.availability.filter((value) => value !== option)
                })
              }
            />
            {option}
          </label>
        ))}
      </div>
    </div>

    <div>
      <p className="text-sm font-semibold text-ink">Colors</p>
      <div className="mt-3 flex flex-wrap gap-2 text-xs uppercase">
        {colors.map((color) => (
          <button
            type="button"
            key={color}
            onClick={() =>
              onChange({
                colors: filters.colors.includes(color)
                  ? filters.colors.filter((item) => item !== color)
                  : [...filters.colors, color]
              })
            }
            className={`rounded-full border px-3 py-1 ${filters.colors.includes(color) ? 'border-brand bg-brand-light text-brand-dark' : 'border-slate-200 text-ink/70'}`}
          >
            {color}
          </button>
        ))}
      </div>
    </div>

    <div>
      <p className="text-sm font-semibold text-ink">Size</p>
      <div className="mt-2 flex flex-wrap gap-2 text-sm">
        {sizes.map((size) => (
          <label key={size} className="inline-flex items-center gap-2">
            <input
              type="checkbox"
              checked={filters.sizes.includes(size)}
              onChange={(event) =>
                onChange({
                  sizes: event.target.checked
                    ? [...filters.sizes, size]
                    : filters.sizes.filter((value) => value !== size)
                })
              }
            />
            {size}
          </label>
        ))}
      </div>
    </div>

    <div>
      <p className="text-sm font-semibold text-ink">Tags</p>
      <div className="mt-3 flex flex-wrap gap-2 text-xs">
        {tags.map((tag) => (
          <button
            type="button"
            key={tag}
            onClick={() =>
              onChange({
                tags: filters.tags.includes(tag)
                  ? filters.tags.filter((value) => value !== tag)
                  : [...filters.tags, tag]
              })
            }
            className={`rounded-full border px-3 py-1 ${filters.tags.includes(tag) ? 'border-brand bg-brand-light text-brand-dark' : 'border-slate-200 text-ink/70'}`}
          >
            {tag}
          </button>
        ))}
      </div>
    </div>

    <div>
      <p className="text-sm font-semibold text-ink">Delivery options</p>
      <div className="mt-2 flex flex-col gap-2 text-sm">
        {deliveryOptions.map((option) => (
          <label key={option} className="inline-flex items-center gap-2">
            <input
              type="checkbox"
              checked={filters.delivery.includes(option)}
              onChange={(event) =>
                onChange({
                  delivery: event.target.checked
                    ? [...filters.delivery, option]
                    : filters.delivery.filter((value) => value !== option)
                })
              }
            />
            {option}
          </label>
        ))}
      </div>
    </div>

    <div>
      <p className="text-sm font-semibold text-ink">Minimum rating</p>
      <input
        type="range"
        min={0}
        max={5}
        step={0.5}
        value={filters.rating}
        onChange={(event) => onChange({ rating: Number(event.target.value) })}
        className="mt-3 w-full"
      />
      <p className="text-xs text-ink/60">{filters.rating}+ stars</p>
    </div>
  </div>
);
