import { useState } from 'react';
import { Drawer } from '@/components/ui/Drawer';
import type { ProductFilterState } from '@/types';
import { FiltersPanel } from './FiltersPanel';

export const FiltersDrawer = ({
  filters,
  onChange
}: {
  filters: ProductFilterState;
  onChange: (next: Partial<ProductFilterState>) => void;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        type="button"
        className="rounded-full border border-slate-200 px-3 py-1 text-sm"
        onClick={() => setOpen(true)}
      >
        Filters
      </button>
      <Drawer open={open} onClose={() => setOpen(false)} title="Filters">
        <FiltersPanel
          filters={filters}
          onChange={(next) => {
            onChange(next);
          }}
        />
      </Drawer>
    </>
  );
};
