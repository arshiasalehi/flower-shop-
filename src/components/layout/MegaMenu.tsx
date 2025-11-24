import { Link } from 'react-router-dom';
import { flowerCategories, occasionCategories } from '@/data/navigation';

type MegaMenuProps = {
  type: 'flowers' | 'occasions';
};

export const MegaMenu = ({ type }: MegaMenuProps) => {
  const items = type === 'flowers' ? flowerCategories : occasionCategories;
  const heading = type === 'flowers' ? 'Flowers & plants' : 'Occasions';

  return (
    <div className="absolute left-1/2 top-full z-30 hidden min-w-[320px] -translate-x-1/2 rounded-3xl border border-slate-100 bg-white shadow-card group-hover:flex">
      <div className="grid grid-cols-2 gap-8 p-8">
        {items.slice(0, Math.ceil(items.length / 2)).map((item) => (
          <Link key={item.slug} to={`/${type === 'flowers' ? 'catalog' : 'occasions'}/${item.slug}`} className="text-sm text-ink/80 hover:text-brand">
            {item.label}
          </Link>
        ))}
        {items.slice(Math.ceil(items.length / 2)).map((item) => (
          <Link key={item.slug} to={`/${type === 'flowers' ? 'catalog' : 'occasions'}/${item.slug}`} className="text-sm text-ink/80 hover:text-brand">
            {item.label}
          </Link>
        ))}
      </div>
      <p className="sr-only">{heading}</p>
    </div>
  );
};
