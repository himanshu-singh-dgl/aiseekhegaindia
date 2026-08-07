import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'AI Fellowship',
};

export default function FellowshipPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <div className="surface rounded-xl p-8 md:p-10">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">
          Lex AI Fellowship
        </p>
        <h1 className="font-display mt-3 text-4xl font-semibold tracking-tight">AI Fellowship</h1>
        <p className="mt-4 text-lg leading-relaxed text-[var(--muted)]">
          A community path for builders learning machine learning, deep learning, and language
          models with AISeekhegaIndia.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/docs/ai-for-leaders/intro" className="btn-primary">
            Browse curriculum
          </Link>
          <Link href="/contribute" className="btn-secondary">
            Contribute
          </Link>
        </div>
      </div>
    </div>
  );
}
