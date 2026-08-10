import Link from 'next/link';
import { tagToSlug, type BlogPostMeta } from '@/lib/blog';

type PostCardProps = {
  post: BlogPostMeta;
};

function formatDate(date: string): string {
  const d = new Date(`${date}T00:00:00Z`);
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <article className="border-b border-[var(--color-border)] py-8 last:border-b-0">
      <header className="mb-3">
        <div className="mb-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-[var(--color-muted)]">
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
        <h2 className="text-2xl font-semibold tracking-tight text-[var(--color-foreground)]">
          <Link
            href={post.href}
            className="transition-colors hover:text-[var(--color-primary)]"
          >
            {post.title}
          </Link>
        </h2>
      </header>
      {post.description && (
        <p className="mb-4 text-base leading-relaxed text-[var(--color-muted)]">
          {post.description}
        </p>
      )}
      {post.tags.length > 0 && (
        <ul className="flex flex-wrap gap-2">
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
    </article>
  );
}
