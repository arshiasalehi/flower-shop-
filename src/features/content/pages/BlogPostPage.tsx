import { useParams } from 'react-router-dom';
import { blogPosts } from '@/data/content-pages';
import { formatDate } from '@/lib/dates';
import { Seo } from '@/components/layout/Seo';

export const BlogPostPage = () => {
  const params = useParams();
  const post = blogPosts.find((entry) => entry.slug === params.slug);

  if (!post) {
    return <p className="text-sm text-ink/70">Post not found.</p>;
  }

  return (
    <article className="space-y-6">
      <Seo title={post.title} description={post.excerpt} image={post.heroImage} />
      <header>
        <p className="text-xs uppercase tracking-[0.3em] text-brand">{formatDate(post.publishedAt)}</p>
        <h1 className="mt-2 text-4xl font-semibold text-ink">{post.title}</h1>
        <p className="text-sm text-ink/60">By {post.author}</p>
      </header>
      <img src={post.heroImage} alt={post.title} className="w-full rounded-[40px] object-cover" />
      <p className="text-lg leading-relaxed text-ink/80">{post.content}</p>
    </article>
  );
};
