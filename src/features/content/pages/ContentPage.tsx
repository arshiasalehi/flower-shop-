import { useParams } from 'react-router-dom';
import { contentPages } from '@/data/content-pages';
import { Accordion } from '@/components/ui/Accordion';
import { Seo } from '@/components/layout/Seo';

export const ContentPage = ({ slugOverride }: { slugOverride?: string }) => {
  const params = useParams();
  const slug = slugOverride ?? params.slug ?? 'about';
  const page = contentPages.find((item) => item.slug === slug);

  if (!page) {
    return <p className="text-sm text-ink/70">Page not found.</p>;
  }

  return (
    <article className="rounded-3xl border border-slate-100 bg-white/90 p-8">
      <Seo title={page.title} description={page.description} />
      <header>
        <p className="text-xs uppercase tracking-[0.3em] text-brand">Fleuriste</p>
        <h1 className="mt-2 text-4xl font-semibold text-ink">{page.title}</h1>
        <p className="mt-3 text-sm text-ink/70">{page.description}</p>
      </header>
      <div className="mt-8 space-y-6">
        {page.sections.map((section) => (
          <section key={section.heading}>
            <h2 className="text-2xl font-semibold text-ink">{section.heading}</h2>
            <p className="mt-2 text-sm text-ink/70">{section.body}</p>
            {section.bullets && (
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-ink/70">
                {section.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </div>
      {page.faqs && (
        <div className="mt-10">
          <h2 className="text-2xl font-semibold text-ink">FAQs</h2>
          <Accordion
            items={page.faqs.map((faq) => ({
              id: faq.question,
              title: faq.question,
              content: faq.answer
            }))}
          />
        </div>
      )}
    </article>
  );
};
