import { Helmet } from 'react-helmet-async';
import { buildMetaDescription, buildTitle } from '@/lib/seo';

interface SeoProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
}

export const Seo = ({ title, description, image, url }: SeoProps) => (
  <Helmet>
    <title>{buildTitle(title)}</title>
    <meta name="description" content={buildMetaDescription(description)} />
    {image && <meta property="og:image" content={image} />}
    {url && <link rel="canonical" href={url} />}
  </Helmet>
);
