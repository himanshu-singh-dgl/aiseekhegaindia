import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export type PagerLink = {
  slug: string;
  title: string;
};

type DocPagerProps = {
  prev: PagerLink | null;
  next: PagerLink | null;
};

export default function DocPager({ prev, next }: DocPagerProps) {
  if (!prev && !next) return null;

  return (
    <nav
      aria-label="Docs pagination"
      className="mt-12 flex flex-col gap-4 border-t border-[var(--color-border)] pt-8 sm:flex-row sm:justify-between"
    >
      {prev ? (
        <Link
          href={`/docs/${prev.slug}`}
          className="group flex min-w-0 flex-1 items-start gap-2 rounded-lg border border-[var(--color-border)] px-4 py-3 transition-colors hover:border-[var(--color-primary)] hover:bg-[var(--color-primary)]/5"
        >
          <ChevronLeft className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-muted)] group-hover:text-[var(--color-primary)]" />
          <span className="min-w-0">
            <span className="block text-xs text-[var(--color-muted)]">
              Previous
            </span>
            <span className="block truncate font-medium text-[var(--color-foreground)]">
              {prev.title}
            </span>
          </span>
        </Link>
      ) : (
        <span className="flex-1" />
      )}

      {next ? (
        <Link
          href={`/docs/${next.slug}`}
          className="group flex min-w-0 flex-1 items-start justify-end gap-2 rounded-lg border border-[var(--color-border)] px-4 py-3 text-right transition-colors hover:border-[var(--color-primary)] hover:bg-[var(--color-primary)]/5"
        >
          <span className="min-w-0">
            <span className="block text-xs text-[var(--color-muted)]">Next</span>
            <span className="block truncate font-medium text-[var(--color-foreground)]">
              {next.title}
            </span>
          </span>
          <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-muted)] group-hover:text-[var(--color-primary)]" />
        </Link>
      ) : (
        <span className="flex-1" />
      )}
    </nav>
  );
}
