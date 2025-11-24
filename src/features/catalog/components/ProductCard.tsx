import { Link } from 'react-router-dom';
import type { Product } from '@/types';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { useCartStore } from '@/features/cart/cart.store';
import { formatCurrency } from '@/lib/currency';
import { getProductImage } from '@/lib/product-media';

export const ProductCard = ({ product }: { product: Product }) => {
  const addItem = useCartStore((state) => state.addItem);

  const heroImage = getProductImage(product);

  return (
    <div className="flex flex-col rounded-3xl border border-slate-100 bg-white p-4 shadow-card">
      <Link to={`/product/${product.slug}`} className="group">
        <div className="relative overflow-hidden rounded-2xl">
          <img
            src={heroImage}
            alt={product.title}
            className="h-64 w-full rounded-2xl object-cover transition duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute left-3 top-3 flex flex-wrap gap-2">
            {product.isOnSale && <Badge variant="warning" label="Sale" />}
            {product.badges.includes('same-day') && <Badge variant="success" label="Same-day" />}
          </div>
        </div>
        <h3 className="mt-4 text-lg font-semibold text-ink">{product.title}</h3>
        <p className="mt-1 text-sm text-ink/60">{product.description.slice(0, 90)}...</p>
      </Link>
      <div className="mt-4 flex items-center justify-between text-sm">
        <div>
          <p className="text-lg font-semibold text-ink">{formatCurrency(product.price)}</p>
          {product.compareAtPrice && (
            <p className="text-xs text-ink/50 line-through">{formatCurrency(product.compareAtPrice)}</p>
          )}
        </div>
        <p className="text-xs text-amber-700">★ {product.rating.toFixed(1)}</p>
      </div>
      <Button className="mt-4" onClick={() => addItem(product)}>
        Add to cart
      </Button>
    </div>
  );
};
