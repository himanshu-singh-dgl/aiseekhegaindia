import Link from 'next/link';
import type {DocNavItem} from '@/lib/sidebar';

type DocsPaginationProps = {
  prev: DocNavItem | null;
  next: DocNavItem | null;
};

function ChevronLeftIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
      aria-hidden
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
      aria-hidden
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

export default function DocsPagination({prev, next}: DocsPaginationProps) {
  if (!prev && !next) {
    return null;
  }

  return (
    <nav
      aria-label="Documentation pagination"
      className="mt-12 grid gap-4 border-t border-zinc-200 pt-8 sm:grid-cols-2"
    >
      {prev ? (
        <Link
          href={prev.href}
          className="group flex flex-col rounded-lg border border-zinc-200 p-4 transition hover:border-orange-300 hover:bg-orange-50/50"
        >
          <span className="mb-1 flex items-center gap-1 text-xs font-medium uppercase tracking-wide text-zinc-500">
            <ChevronLeftIcon />
            Previous
          </span>
          <span className="font-semibold text-zinc-900 group-hover:text-orange-700">
            {prev.title}
          </span>
        </Link>
      ) : (
        <div />
      )}

      {next ? (
        <Link
          href={next.href}
          className="group flex flex-col rounded-lg border border-zinc-200 p-4 text-right transition hover:border-orange-300 hover:bg-orange-50/50 sm:col-start-2"
        >
          <span className="mb-1 flex items-center justify-end gap-1 text-xs font-medium uppercase tracking-wide text-zinc-500">
            Next
            <ChevronRightIcon />
          </span>
          <span className="font-semibold text-zinc-900 group-hover:text-orange-700">
            {next.title}
          </span>
        </Link>
      ) : null}
    </nav>
  );
}
