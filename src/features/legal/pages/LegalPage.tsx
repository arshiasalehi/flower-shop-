import { useParams } from 'react-router-dom';
import { Seo } from '@/components/layout/Seo';

const legalCopy: Record<string, { title: string; body: string }> = {
  terms: {
    title: 'Terms of service',
    body: 'These terms govern your use of the Fleuriste website and services. Orders become final once confirmed and are subject to seasonal availability.'
  },
  privacy: {
    title: 'Privacy policy',
    body: 'We collect contact details, preferences, and cart data to fulfill orders. We never sell your personal information and honour CPRA/CPPA requests.'
  },
  shipping: {
    title: 'Shipping, order & return policy',
    body: 'Same-day orders must be placed before 2 p.m. Orders may be adjusted when specific stems are unavailable. Quality concerns reported within 24 hours receive replacements or credits.'
  },
  'do-not-sell': {
    title: 'Do not sell or share my personal information',
    body: 'Submit your privacy preference using the contact form or email privacy@fleuristemtl.com and we will honour within 30 days.'
  }
};

export const LegalPage = ({ slugOverride }: { slugOverride?: string }) => {
  const params = useParams();
  const slug = slugOverride ?? params.slug ?? 'terms';
  const content = legalCopy[slug];

  if (!content) {
    return <p className="text-sm text-ink/70">Policy coming soon.</p>;
  }

  return (
    <article className="rounded-3xl border border-slate-100 bg-white/90 p-8">
      <Seo title={content.title} description={content.body} />
      <h1 className="text-3xl font-semibold text-ink">{content.title}</h1>
      <p className="mt-4 whitespace-pre-line text-sm leading-relaxed text-ink/70">{content.body}</p>
    </article>
  );
};
