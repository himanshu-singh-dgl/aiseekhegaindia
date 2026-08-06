import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllTags } from '@/lib/blog';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Blog Tags',
  description: 'Browse blog posts by tag.',
  openGraph: {
    title: `Blog Tags | ${siteConfig.title}`,
    description: 'Browse blog posts by tag.',
    url: `${siteConfig.url}/blog/tags`,
  },
};

export default function BlogTagsPage() {
  const tags = getAllTags();

  return (
    <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <header className="mb-10 border-b border-[var(--color-border)] pb-8">
        <h1 className="text-3xl font-bold tracking-tight text-[var(--color-foreground)] sm:text-4xl">
          Tags
        </h1>
        <p className="mt-3 text-base text-[var(--color-muted)]">
          Browse posts by topic.
        </p>
        <Link
          href="/blog"
          className="mt-4 inline-block text-sm text-[var(--color-primary)] hover:underline"
        >
          ← Back to blog
        </Link>
      </header>

      {tags.length === 0 ? (
        <p className="text-[var(--color-muted)]">No tags yet.</p>
      ) : (
        <ul className="flex flex-wrap gap-3">
          {tags.map(({ tag, slug, count }) => (
            <li key={slug}>
              <Link
                href={`/blog/tags/${slug}`}
                className="inline-flex items-center gap-2 rounded-md border border-[var(--color-border)] bg-[var(--color-card)] px-3 py-2 text-sm font-medium text-[var(--color-foreground)] transition-colors hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
              >
                {tag}
                <span className="rounded bg-[var(--color-emphasis-100)] px-1.5 py-0.5 text-xs text-[var(--color-muted)]">
                  {count}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
