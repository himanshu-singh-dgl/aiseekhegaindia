import type { Metadata } from 'next';
import Link from 'next/link';
import PostCard from '@/components/blog/PostCard';
import { getAllBlogPosts } from '@/lib/blog';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Blog',
  description: `Updates, tutorials, and insights from ${siteConfig.title}.`,
  openGraph: {
    title: `Blog | ${siteConfig.title}`,
    description: `Updates, tutorials, and insights from ${siteConfig.title}.`,
    url: `${siteConfig.url}/blog`,
    images: [siteConfig.socialImage],
  },
};

export default function BlogIndexPage() {
  const posts = getAllBlogPosts();

  return (
    <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <header className="mb-10 border-b border-[var(--color-border)] pb-8">
        <h1 className="text-3xl font-bold tracking-tight text-[var(--color-foreground)] sm:text-4xl">
          Blog
        </h1>
        <p className="mt-3 text-base text-[var(--color-muted)]">
          Updates, tutorials, and community highlights from AI Seekhega India.
        </p>
        <div className="mt-4 flex flex-wrap gap-4 text-sm">
          <Link
            href="/blog/tags"
            className="text-[var(--color-primary)] hover:underline"
          >
            Browse tags
          </Link>
          <Link
            href="/blog/rss.xml"
            className="text-[var(--color-primary)] hover:underline"
          >
            RSS feed
          </Link>
        </div>
      </header>

      {posts.length === 0 ? (
        <p className="text-[var(--color-muted)]">No posts yet. Check back soon.</p>
      ) : (
        <div>
          {posts.map((post) => (
            <PostCard key={post.href} post={post} />
          ))}
        </div>
      )}
    </main>
  );
}
