import Link from 'next/link';
import { siteConfig } from '@/lib/site-config';

const topics = [
  {
    href: '/docs/ai-for-leaders/intro',
    title: 'AI for Leaders',
    body: 'Strategic foundations for decision-makers.',
  },
  {
    href: '/docs/machine-learning/intro',
    title: 'Machine Learning',
    body: 'Core supervised learning and classic algorithms.',
  },
  {
    href: '/docs/deep-learning/intro',
    title: 'Deep Learning',
    body: 'Perceptrons, CNNs, RNNs, and neural foundations.',
  },
  {
    href: '/docs/language-models/intro',
    title: 'Language Models',
    body: 'Tokenization through evaluation and RAG/LoRA.',
  },
];

export default function HomePage() {
  return (
    <div>
      <section className="relative overflow-hidden border-b border-[var(--line)]">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(12,27,42,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(12,27,42,0.05) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />
        <div className="relative mx-auto max-w-6xl px-4 py-20 md:py-28">
          <div className="reveal max-w-3xl">
            <p className="font-display text-5xl font-semibold tracking-tight text-[var(--accent-ink)] md:text-7xl">
              {siteConfig.title}
            </p>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-[var(--muted)] md:text-xl">
              {siteConfig.tagline}
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/docs/machine-learning/intro" className="btn-primary">
                Start Learning
              </Link>
              <Link href="/contribute" className="btn-secondary">
                Join Community
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 md:py-20">
        <div className="max-w-2xl">
          <h2 className="font-display text-3xl font-semibold tracking-tight">Explore topics</h2>
          <p className="mt-2 text-[var(--muted)]">Pick a track and move through the curriculum.</p>
        </div>
        <div className="mt-8 divide-y divide-[var(--line)] overflow-hidden rounded-xl border border-[var(--line)] bg-[var(--card)]">
          {topics.map((topic, index) => (
            <Link
              key={topic.href}
              href={topic.href}
              className="group flex items-start justify-between gap-6 px-5 py-5 transition-colors hover:bg-[var(--accent-soft)]"
              style={{ animationDelay: `${120 + index * 60}ms` }}
            >
              <div>
                <h3 className="font-display text-lg font-semibold tracking-tight group-hover:text-[var(--accent-ink)]">
                  {topic.title}
                </h3>
                <p className="mt-1 text-sm text-[var(--muted)]">{topic.body}</p>
              </div>
              <span className="mt-1 text-[var(--accent)] transition-transform duration-200 group-hover:translate-x-1">
                →
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
