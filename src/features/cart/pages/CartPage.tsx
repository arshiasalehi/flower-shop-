import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCartStore } from '@/features/cart/cart.store';
import { formatCurrency } from '@/lib/currency';
import { Button } from '@/components/ui/Button';
import { Seo } from '@/components/layout/Seo';
import { getProductImage } from '@/lib/product-media';

export const CartPage = () => {
  const items = useCartStore((state) => state.items);
  const subtotal = useCartStore((state) => state.subtotal);
  const savings = useCartStore((state) => state.savings);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const applyPromo = useCartStore((state) => state.applyPromo);
  const [promo, setPromo] = useState('');

  const taxEstimate = subtotal() * 0.14975;

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr),360px]">
      <Seo title="Cart" />
      <div className="space-y-4">
        <h1 className="text-3xl font-semibold text-ink">Your cart</h1>
        {items.length === 0 ? (
          <p className="text-sm text-ink/70">Your cart is empty.</p>
        ) : (
          <div className="space-y-4">
            {items.map((item, index) => (
              <div key={item.product.id} className="flex gap-4 rounded-3xl border border-slate-100 bg-white/80 p-4">
                <img
                  src={getProductImage(item.product, index)}
                  alt={item.product.title}
                  className="h-28 w-28 rounded-2xl object-cover"
                />
                <div className="flex flex-1 flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold">{item.product.title}</h2>
                    <button
                      type="button"
                      className="text-sm text-brand"
                      onClick={() => removeItem(item.product.id)}
                    >
                      Remove
                    </button>
                  </div>
                  <p className="text-sm text-ink/60">{formatCurrency(item.product.price)}</p>
                  <div className="flex items-center gap-2 text-sm">
                    <span>Qty</span>
                    <input
                      type="number"
                      min={1}
                      value={item.quantity}
                      onChange={(event) => updateQuantity(item.product.id, Number(event.target.value))}
                      className="w-16 rounded-lg border px-2"
                    />
                    {item.size && <span className="rounded-full bg-slate-100 px-3 py-1 text-xs">{item.size}</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="space-y-4 rounded-3xl border border-slate-100 bg-white/90 p-6">
        <h2 className="text-xl font-semibold text-ink">Summary</h2>
        <div className="space-y-2 text-sm">
          <div className="flex items-center justify-between">
            <span>Subtotal</span>
            <span>{formatCurrency(subtotal())}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Estimated taxes</span>
            <span>{formatCurrency(taxEstimate)}</span>
          </div>
          <div className="flex items-center justify-between text-emerald-600">
            <span>Savings</span>
            <span>-{formatCurrency(savings())}</span>
          </div>
        </div>
        <div className="border-t pt-4 space-y-4">
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Promo code"
              value={promo}
              onChange={(event) => setPromo(event.target.value)}
              className="flex-1 rounded-full border px-3 py-2"
            />
            <Button variant="secondary" onClick={() => applyPromo(promo)}>
              Apply
            </Button>
          </div>
          <div className="rounded-2xl bg-slate-50 p-4 text-sm">
            <p className="font-semibold text-ink">Shipping estimator</p>
            <input type="text" placeholder="Postal code" className="mt-2 w-full rounded-full border px-3 py-2" />
            <p className="mt-2 text-xs text-ink/60">Live rates populate at checkout based on courier capacity.</p>
          </div>
        </div>
        <div className="border-t pt-4 text-lg font-semibold">
          <div className="flex items-center justify-between">
            <span>Total</span>
            <span>{formatCurrency(subtotal() + taxEstimate - savings())}</span>
          </div>
        </div>
        <Button fullWidth asChild>
          <Link to="/checkout">Checkout</Link>
        </Button>
      </div>
    </div>
  );
};
