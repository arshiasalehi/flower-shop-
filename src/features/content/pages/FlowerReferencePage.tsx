import { Link } from 'react-router-dom';
import { flowerGuide } from '@/data/flower-guide';
import { Seo } from '@/components/layout/Seo';

export const FlowerReferencePage = () => (
  <div className="rounded-3xl border border-slate-100 bg-white/90 p-8">
    <Seo title="Flower reference guide" />
    <h1 className="text-3xl font-semibold text-ink">Flower reference guide</h1>
    <p className="mt-2 text-sm text-ink/70">Browse stems alphabetically.</p>
    <div className="mt-6 grid gap-4 md:grid-cols-2">
      {flowerGuide.map((item) => (
        <Link key={item.slug} to={`/flower-reference/${item.slug}`} className="rounded-2xl border border-slate-100 p-4">
          <p className="text-xl font-semibold text-ink">{item.name}</p>
          <p className="text-sm text-ink/70">{item.season}</p>
        </Link>
      ))}
    </div>
  </div>
);
