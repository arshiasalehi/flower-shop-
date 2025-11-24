import { useParams } from 'react-router-dom';
import { flowerGuide } from '@/data/flower-guide';
import { Seo } from '@/components/layout/Seo';

export const FlowerReferenceDetailPage = () => {
  const params = useParams();
  const item = flowerGuide.find((entry) => entry.slug === params.slug);

  if (!item) {
    return <p className="text-sm text-ink/70">Flower not found.</p>;
  }

  return (
    <article className="rounded-3xl border border-slate-100 bg-white/90 p-8">
      <Seo title={item.name} description={item.care} />
      <h1 className="text-3xl font-semibold text-ink">{item.name}</h1>
      <p className="mt-2 text-sm text-ink/70">Season: {item.season}</p>
      <section className="mt-6">
        <h2 className="text-xl font-semibold">Care</h2>
        <p className="mt-2 text-sm text-ink/70">{item.care}</p>
      </section>
      <section className="mt-6">
        <h2 className="text-xl font-semibold">Pairings</h2>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-ink/70">
          {item.pairings.map((pairing) => (
            <li key={pairing}>{pairing}</li>
          ))}
        </ul>
      </section>
    </article>
  );
};
