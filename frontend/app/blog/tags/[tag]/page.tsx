import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import PostCard from '@/components/blog/PostCard';
import { getAllTags, getPostsByTag } from '@/lib/blog';
import { siteConfig } from '@/config/site';

type PageProps = {
  params: Promise<{ tag: string }>;
};

export async function generateStaticParams() {
  return getAllTags().map(({ slug }) => ({ tag: slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { tag: tagSlug } = await params;
  const tags = getAllTags();
  const match = tags.find((t) => t.slug === tagSlug);
  const label = match?.tag ?? tagSlug;

  return {
    title: `Tag: ${label}`,
    description: `Blog posts tagged “${label}”.`,
    openGraph: {
      title: `Tag: ${label} | ${siteConfig.title}`,
      description: `Blog posts tagged “${label}”.`,
      url: `${siteConfig.url}/blog/tags/${tagSlug}`,
    },
  };
}

export default async function BlogTagPage({ params }: PageProps) {
  const { tag: tagSlug } = await params;
  const tags = getAllTags();
  const match = tags.find((t) => t.slug === tagSlug);
  if (!match) notFound();

  const posts = getPostsByTag(tagSlug);

  return (
    <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <header className="mb-10 border-b border-[var(--color-border)] pb-8">
        <p className="mb-2 text-sm font-medium uppercase tracking-wide text-[var(--color-muted)]">
          Tag
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-[var(--color-foreground)] sm:text-4xl">
          {match.tag}
        </h1>
        <p className="mt-3 text-base text-[var(--color-muted)]">
          {posts.length} post{posts.length === 1 ? '' : 's'}
        </p>
        <div className="mt-4 flex flex-wrap gap-4 text-sm">
          <Link
            href="/blog/tags"
            className="text-[var(--color-primary)] hover:underline"
          >
            All tags
          </Link>
          <Link
            href="/blog"
            className="text-[var(--color-primary)] hover:underline"
          >
            Blog home
          </Link>
        </div>
      </header>

      <div>
        {posts.map((post) => (
          <PostCard key={post.href} post={post} />
        ))}
      </div>
    </main>
  );
}
