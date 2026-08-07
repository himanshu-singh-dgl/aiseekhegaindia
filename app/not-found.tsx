import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <h1 className="text-3xl font-semibold">Page not found</h1>
      <p className="mt-3 text-[var(--muted)]">That URL is not in the migrated route map yet.</p>
      <Link href="/" className="mt-6 inline-flex text-[var(--accent)] underline">
        Back home
      </Link>
    </div>
  );
}
