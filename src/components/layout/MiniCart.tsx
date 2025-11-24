import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import { useCartStore } from '@/features/cart/cart.store';
import { Drawer } from '@/components/ui/Drawer';
import { formatCurrency } from '@/lib/currency';
import { getProductImage } from '@/lib/product-media';

export const MiniCart = () => {
  const items = useCartStore((state) => state.items);
  const subtotal = useCartStore((state) => state.subtotal);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className="relative rounded-full bg-white/80 p-2"
        onClick={() => setOpen(true)}
        aria-label="Open cart"
      >
        <ShoppingBag className="h-5 w-5 text-ink" />
        {items.length > 0 && (
          <span className="absolute -right-1 -top-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-brand text-xs text-white">
            {items.length}
          </span>
        )}
      </button>
      <Drawer open={open} onClose={() => setOpen(false)} title="Your cart">
        {items.length === 0 ? (
          <p className="text-sm text-ink/70">Your cart is empty.</p>
        ) : (
          <div className="space-y-4">
            {items.map((item, index) => (
              <div key={item.product.id} className="flex gap-4">
                <img
                  src={getProductImage(item.product, index)}
                  alt={item.product.title}
                  className="h-20 w-20 rounded-2xl object-cover"
                />
                <div className="flex-1">
                  <p className="text-sm font-semibold text-ink">{item.product.title}</p>
                  <p className="text-xs text-ink/60">{formatCurrency(item.product.price)}</p>
                  <div className="mt-2 flex items-center gap-2">
                    <button
                      className="rounded-full bg-slate-100 px-2"
                      onClick={() => updateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                    >
                      -
                    </button>
                    <span className="text-sm">{item.quantity}</span>
                    <button
                      className="rounded-full bg-slate-100 px-2"
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                  <button
                    className="mt-2 text-xs text-brand underline"
                    onClick={() => removeItem(item.product.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
            <div className="flex items-center justify-between border-t pt-4">
              <p className="text-sm font-semibold">Subtotal</p>
              <p>{formatCurrency(subtotal())}</p>
            </div>
            <Link
              to="/cart"
              className="block rounded-full bg-brand py-3 text-center font-semibold text-white"
              onClick={() => setOpen(false)}
            >
              View cart & checkout
            </Link>
          </div>
        )}
      </Drawer>
    </>
  );
};
