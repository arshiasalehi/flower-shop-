import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import products from '@/data/products.json';
import type { Product, ProductSize } from '@/types';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Accordion } from '@/components/ui/Accordion';
import { ProductCard } from '@/features/catalog/components/ProductCard';
import { useCartStore } from '@/features/cart/cart.store';
import { formatCurrency } from '@/lib/currency';
import { Seo } from '@/components/layout/Seo';
import { getProductGallery, getProductImage } from '@/lib/product-media';

const data = products as Product[];

export const ProductDetailPage = () => {
  const params = useParams();
  const slug = params.slug;
  const product = data.find((item) => item.slug === slug);
  const addItem = useCartStore((state) => state.addItem);
  const [selectedSize, setSelectedSize] = useState<ProductSize>(product?.size ?? 'Standard');

  const related = useMemo(() => {
    if (!product) return [] as Product[];
    return data
      .filter((candidate) =>
        candidate.id !== product.id &&
        candidate.categories.some((category) => product.categories.includes(category))
      )
      .slice(0, 4);
  }, [product]);

  if (!product) {
    return <p className="text-sm text-ink/70">Product not found.</p>;
  }

  const crumbs = [
    { label: 'Home', href: '/' },
    { label: 'Catalog', href: `/catalog/${product.categories[0]}` },
    { label: product.title, href: `/product/${product.slug}` }
  ];

  const heroImage = getProductImage(product);
  const gallery = getProductGallery(product);

  return (
    <div className="space-y-10">
      <Seo title={product.title} description={product.description} image={heroImage} />
      <Breadcrumbs crumbs={crumbs} />
      <div className="grid gap-10 md:grid-cols-[minmax(0,1fr),minmax(0,400px)]">
        <div className="grid gap-4">
          <div className="grid gap-4 rounded-[32px] border border-slate-100 bg-white p-4">
            <img src={heroImage} alt={product.title} className="w-full rounded-[24px] object-cover" />
            <div className="grid gap-4 sm:grid-cols-3">
              {gallery.map((image) => (
                <img key={image} src={image} alt={product.title} className="h-32 w-full rounded-2xl object-cover" />
              ))}
            </div>
          </div>
          <div className="rounded-[32px] border border-slate-100 bg-white p-6">
            <h2 className="text-2xl font-semibold text-ink">Care tips</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-ink/70">
              <li>Refresh water daily and trim stems at an angle.</li>
              <li>Keep away from direct heat vents or harsh sun.</li>
              <li>Complimentary care packet included with every delivery.</li>
            </ul>
          </div>
        </div>
        <div className="space-y-6 rounded-[32px] border border-slate-100 bg-white p-6">
          <div className="space-y-2">
            <div className="flex flex-wrap gap-2">
              {product.badges.map((badge) => (
                <Badge key={badge} label={badge} />
              ))}
            </div>
            <h1 className="text-4xl font-semibold text-ink">{product.title}</h1>
            <p className="text-sm text-ink/70">{product.description}</p>
          </div>
          <div>
            <p className="text-3xl font-semibold text-ink">{formatCurrency(product.price)}</p>
            {product.compareAtPrice && (
              <p className="text-sm text-ink/50">
                <span className="line-through">{formatCurrency(product.compareAtPrice)}</span> save up to 12%
              </p>
            )}
          </div>
          <div>
            <p className="text-sm font-semibold text-ink">Size</p>
            <div className="mt-3 flex flex-wrap gap-3">
              {(['Petite', 'Standard', 'Luxe'] as ProductSize[]).map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`rounded-full border px-4 py-2 text-sm ${selectedSize === size ? 'border-brand bg-brand-light text-brand-dark' : 'border-slate-200 text-ink/70'}`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold text-ink">Delivery options</p>
            <div className="mt-3 flex flex-wrap gap-2 text-xs uppercase tracking-[0.2em] text-ink/60">
              {product.deliveryOptions.map((option) => (
                <span key={option} className="rounded-full border border-slate-200 px-3 py-1">
                  {option}
                </span>
              ))}
            </div>
          </div>
          <Button onClick={() => addItem(product, { size: selectedSize })} fullWidth>
            Add to cart
          </Button>
          <div className="flex flex-wrap items-center gap-3 text-xs text-ink/60">
            <button
              className="rounded-full bg-slate-100 px-3 py-1"
              onClick={() => navigator.share?.({ title: product.title, url: window.location.href })}
            >
              Share
            </button>
            <span>Secure checkout · Carbon-neutral delivery</span>
          </div>
          <Accordion
            items={[
              {
                id: 'shipping',
                title: 'Shipping & delivery',
                content: 'Same-day delivery across Greater Montréal before 2 p.m. and next-day shipping across Quebec.'
              },
              {
                id: 'returns',
                title: 'Satisfaction guarantee',
                content: 'If your blooms arrive below expectations, contact us within 24 hours for a refresh or credit.'
              }
            ]}
          />
        </div>
      </div>
      <section>
        <h2 className="text-2xl font-semibold text-ink">You may also like</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {related.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      </section>
    </div>
  );
};
