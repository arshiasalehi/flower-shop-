import { Link } from 'react-router-dom';
import products from '@/data/products.json';
import { flowerCategories, occasionCategories } from '@/data/navigation';
import { testimonials, uspList, seasonalPromos } from '@/data/home';
import { blogPosts } from '@/data/content-pages';
import type { Product } from '@/types';
import { Hero } from '@/components/layout/Hero';
import { Section } from '@/components/layout/Section';
import { Seo } from '@/components/layout/Seo';
import { Button } from '@/components/ui/Button';
import { formatCurrency } from '@/lib/currency';
import { Badge } from '@/components/ui/Badge';
import { getImage } from '@/assets/images';
import { getProductImage } from '@/lib/product-media';

const data = products as Product[];

const bestSellers = data
  .filter((product) => product.rating > 4.4)
  .sort((a, b) => b.popularity - a.popularity)
  .slice(0, 12);

const featuredCategories = [...flowerCategories.slice(0, 4), ...occasionCategories.slice(0, 2)];

const heroImage = getImage('luxury bouquet in a neutral interior') ?? getImage('bouquet1');

const categoryArt: Record<string, string | undefined> = {
  bouquets: getImage('bouquet1'),
  roses: getImage('rose1'),
  orchids: getImage('orchid1'),
  'single-variety': getImage('ranunculus'),
  'mothers-day': getImage('mothers day1'),
  'best-sellers': getImage('bouquet5')
};

export const HomePage = () => (
  <div>
    <Seo title="Luxury flower shop" description="Same-day premium bouquets, plants, and floral experiences across Montréal." />
    <Hero
      eyebrow="Luxury botanicals"
      title="Bespoke flowers delivered across Montréal"
      description="Curated stems, climate-controlled vehicles, and concierge updates. Order before 2 p.m. for handcrafted same-day delivery."
      actions={
        <>
          <Button asChild>
            <Link to="/catalog/bouquets">Shop bouquets</Link>
          </Button>
          <Button variant="secondary" asChild>
            <Link to="/subscriptions">Subscriptions</Link>
          </Button>
        </>
      }
      image={heroImage}
    />

    <Section title="Best sellers" subtitle="Loved this week" id="best-sellers">
      <div className="flex gap-6 overflow-x-auto pb-4">
        {bestSellers.map((product, index) => (
          <Link
            key={product.id}
            to={`/product/${product.slug}`}
            className="min-w-[220px] rounded-3xl border border-slate-100 bg-white p-4 shadow-card transition hover:-translate-y-1"
          >
            <div className="relative">
              <img
                src={getProductImage(product, index)}
                alt={product.title}
                className="h-48 w-full rounded-2xl object-cover"
                loading="lazy"
              />
              {product.isOnSale && <Badge label="Sale" variant="warning" />}
            </div>
            <p className="mt-3 text-sm font-semibold text-ink">{product.title}</p>
            <p className="text-sm text-ink/60">{formatCurrency(product.price)}</p>
          </Link>
        ))}
      </div>
    </Section>

    <Section title="Seasonal highlights" subtitle="Promos & services">
      <div className="grid gap-6 md:grid-cols-2">
        {seasonalPromos.map((promo) => {
          const promoImage = promo.imageKey ? getImage(promo.imageKey) : undefined;
          return (
            <div
              key={promo.label}
              className="overflow-hidden rounded-[32px] border border-brand/20 bg-brand-light/40"
            >
              {promoImage && (
                <img src={promoImage} alt={promo.label} className="h-48 w-full object-cover" loading="lazy" />
              )}
              <div className="p-8">
                <p className="text-xs uppercase tracking-[0.4em] text-brand">{promo.label}</p>
                <h3 className="mt-3 text-2xl font-semibold text-ink">{promo.description}</h3>
                <Button className="mt-6" asChild>
                  <Link to={promo.href}>{promo.cta}</Link>
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </Section>

    <Section title="Featured categories" subtitle="Explore the menu">
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {featuredCategories.map((category) => {
          const art = categoryArt[category.slug];
          return (
            <Link
              key={category.slug}
              to={`/${flowerCategories.some((item) => item.slug === category.slug) ? 'catalog' : 'occasions'}/${category.slug}`}
              className="rounded-3xl border border-slate-100 bg-white/80 p-6 shadow-card"
            >
              {art && (
                <img src={art} alt={category.label} className="mb-4 h-32 w-full rounded-2xl object-cover" loading="lazy" />
              )}
              <p className="text-xl font-semibold">{category.label}</p>
              <p className="mt-2 text-sm text-ink/60">Hand-selected stems updated daily.</p>
            </Link>
          );
        })}
      </div>
    </Section>

    <Section title="Why choose us" subtitle="Obsessively crafted">
      <div className="grid gap-6 md:grid-cols-3">
        {uspList.map((usp) => (
          <div key={usp.title} className="rounded-3xl border border-slate-100 bg-white p-6 shadow-card">
            <h3 className="text-xl font-semibold text-ink">{usp.title}</h3>
            <p className="mt-3 text-sm text-ink/70">{usp.body}</p>
          </div>
        ))}
      </div>
    </Section>

    <Section title="Testimonials" subtitle="Loved by Montréal">
      <div className="grid gap-6 md:grid-cols-3">
        {testimonials.map((testimonial) => (
          <blockquote key={testimonial.author} className="rounded-3xl border border-slate-100 bg-white p-6 shadow-card">
            <p className="text-lg text-ink/80">“{testimonial.quote}”</p>
            <cite className="mt-4 block text-sm font-semibold text-ink">{testimonial.author}</cite>
          </blockquote>
        ))}
      </div>
    </Section>

    <Section title="From the journal" subtitle="Latest stories">
      <div className="grid gap-6 md:grid-cols-3">
        {blogPosts.map((post) => (
          <Link key={post.slug} to={`/blog/${post.slug}`} className="rounded-3xl border border-slate-100 bg-white">
            <img src={post.heroImage} alt={post.title} className="h-48 w-full rounded-3xl object-cover" />
            <div className="p-6">
              <p className="text-xs uppercase tracking-[0.3em] text-brand">{post.publishedAt}</p>
              <h3 className="mt-3 text-xl font-semibold text-ink">{post.title}</h3>
              <p className="mt-2 text-sm text-ink/70">{post.excerpt}</p>
            </div>
          </Link>
        ))}
      </div>
    </Section>

    <section className="rounded-[40px] border border-slate-100 bg-white/90 p-10 text-sm leading-relaxed text-ink/80">
      <h2 className="text-2xl font-semibold text-ink">Luxury florist in Montréal</h2>
      <p className="mt-4">
        Our atelier sources regenerative stems, Canadian-grown botanicals, and rare imports curated
        for architectural spaces. With concierge delivery, temperature-controlled fleet, and
        sustainability reporting, Fleuriste Montréal blends timeless craft with modern commerce.
      </p>
    </section>
  </div>
);
