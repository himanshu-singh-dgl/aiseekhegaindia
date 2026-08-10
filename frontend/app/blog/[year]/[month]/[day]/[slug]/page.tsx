import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import EditLink from '@/components/docs/EditLink';
import { getAllBlogPosts, getBlogPost, tagToSlug } from '@/lib/blog';
import { siteConfig } from '@/config/site';

type PageProps = {
  params: Promise<{
    year: string;
    month: string;
    day: string;
    slug: string;
  }>;
};

export async function generateStaticParams() {
  return getAllBlogPosts().map((post) => ({
    year: post.year,
    month: post.month,
    day: post.day,
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { year, month, day, slug } = await params;
  const post = await getBlogPost(year, month, day, slug);
  if (!post) return { title: 'Blog' };

  const absoluteTitle = `${post.title} | ${siteConfig.title}`;
  const description = post.description || siteConfig.tagline;

  return {
    title: post.title,
    description,
    openGraph: {
      title: absoluteTitle,
      description,
      url: `${siteConfig.url}${post.href}`,
      type: 'article',
      publishedTime: post.date,
      images: [siteConfig.socialImage],
    },
    twitter: {
      card: 'summary_large_image',
      title: absoluteTitle,
      description,
      images: [siteConfig.socialImage],
    },
  };
}

function formatDate(date: string): string {
  const d = new Date(`${date}T00:00:00Z`);
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
}

export default async function BlogPostPage({ params }: PageProps) {
  const { year, month, day, slug } = await params;
  const post = await getBlogPost(year, month, day, slug);
  if (!post) notFound();

  return (
    <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <article>
        <header className="mb-8 border-b border-[var(--color-border)] pb-6">
          <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-[var(--color-muted)]">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span aria-hidden="true">·</span>
            <span>{post.readingTimeMinutes} min read</span>
            {post.author && (
              <>
                <span aria-hidden="true">·</span>
                <span>{post.author}</span>
              </>
            )}
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-[var(--color-foreground)] sm:text-4xl">
            {post.title}
          </h1>
          {post.tags.length > 0 && (
            <ul className="mt-4 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <li key={tag}>
                  <Link
                    href={`/blog/tags/${tagToSlug(tag)}`}
                    className="inline-block rounded-md bg-[var(--color-emphasis-100)] px-2.5 py-1 text-xs font-medium text-[var(--color-foreground)] transition-colors hover:bg-[var(--color-primary)] hover:text-white"
                  >
                    {tag}
                  </Link>
                </li>
              ))}
            </ul>
          )}
          <div className="mt-4">
            <EditLink contentPath={post.contentPath} />
          </div>
        </header>

        <div className="prose prose-slate dark:prose-invert max-w-none prose-headings:scroll-mt-24 prose-a:text-[var(--color-primary)] prose-pre:bg-transparent prose-pre:p-0">
          {post.content}
        </div>
      </article>

      <nav className="mt-12 border-t border-[var(--color-border)] pt-6">
        <Link
          href="/blog"
          className="text-sm font-medium text-[var(--color-primary)] hover:underline"
        >
          ← Back to blog
        </Link>
      </nav>
    </main>
  );
}
