import type { Metadata } from 'next';
import Link from 'next/link';
import { siteConfig } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'Contribute',
};

export default function ContributePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <div className="surface rounded-xl p-8 md:p-10">
        <h1 className="font-display text-4xl font-semibold tracking-tight">Contribute</h1>
        <p className="mt-4 text-lg leading-relaxed text-[var(--muted)]">
          Help grow AISeekhegaIndia by improving docs, tutorials, and community resources.
        </p>
        <ol className="mt-8 list-decimal space-y-3 pl-5 text-[var(--muted)]">
          <li>Fork the repository on GitHub.</li>
          <li>
            Add or improve content under <code className="rounded bg-black/5 px-1.5 py-0.5">content/docs</code>.
          </li>
          <li>Open a pull request with a clear summary.</li>
        </ol>
        <Link
          href={siteConfig.github}
          className="btn-primary mt-8"
          target="_blank"
          rel="noreferrer"
        >
          Open GitHub
        </Link>
      </div>
    </div>
  );
}
