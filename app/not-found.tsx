import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-4 py-20 text-center">
      <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-[var(--color-primary)]">
        404
      </p>
      <h1 className="mb-4 text-3xl font-bold text-[var(--color-foreground)] sm:text-4xl">
        Page not found
      </h1>
      <p className="mb-8 text-[var(--color-muted)]">
        The page you are looking for does not exist or has been moved.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="rounded-md bg-[var(--color-primary)] px-5 py-2.5 text-sm font-semibold text-white no-underline transition-opacity hover:opacity-90"
        >
          Go home
        </Link>
        <Link
          href="/docs/machine-learning/intro"
          className="rounded-md border border-[var(--color-border)] px-5 py-2.5 text-sm font-semibold text-[var(--color-foreground)] no-underline transition-colors hover:bg-black/5 dark:hover:bg-white/10"
        >
          Browse docs
        </Link>
      </div>
    </main>
  );
}
