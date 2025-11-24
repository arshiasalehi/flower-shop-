import { Link } from 'react-router-dom';
import { blogPosts } from '@/data/content-pages';
import { formatDate } from '@/lib/dates';
import { Seo } from '@/components/layout/Seo';

export const BlogListPage = () => (
  <div className="space-y-6">
    <Seo title="Blog" description="Studio tours, care guides, and florist tips." />
    <header>
      <p className="text-xs uppercase tracking-[0.3em] text-brand">Journal</p>
      <h1 className="text-4xl font-semibold text-ink">Stories from the studio</h1>
    </header>
    <div className="grid gap-6 md:grid-cols-2">
      {blogPosts.map((post) => (
        <Link key={post.slug} to={`/blog/${post.slug}`} className="rounded-3xl border border-slate-100 bg-white">
          <img src={post.heroImage} alt={post.title} className="h-60 w-full rounded-3xl object-cover" />
          <div className="p-6">
            <p className="text-xs text-ink/50">{formatDate(post.publishedAt)}</p>
            <h2 className="mt-2 text-2xl font-semibold text-ink">{post.title}</h2>
            <p className="mt-2 text-sm text-ink/70">{post.excerpt}</p>
          </div>
        </Link>
      ))}
    </div>
  </div>
);
