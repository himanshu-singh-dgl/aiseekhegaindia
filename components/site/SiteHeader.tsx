import Link from 'next/link';
import { siteConfig } from '@/lib/site-config';

const nav = [
  { href: '/docs/ai-for-leaders/intro', label: 'Resources' },
  { href: '/docs/machine-learning/intro', label: 'Machine Learning' },
  { href: '/docs/deep-learning/intro', label: 'Deep Learning' },
  { href: '/docs/language-models/intro', label: 'Language Models' },
  { href: '/fellowship', label: 'Fellowship' },
  { href: '/docs/tutorials/logistic-regression', label: 'Tutorials' },
  { href: '/contribute', label: 'Contribute' },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--line)] bg-white/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-3.5">
        <Link href="/" className="group flex items-center gap-3">
          <img
            src={siteConfig.logo.src}
            alt={siteConfig.logo.alt}
            className="h-8 w-8 transition-transform duration-300 group-hover:scale-105"
          />
          <span className="font-display text-lg font-semibold tracking-tight text-[var(--accent-ink)]">
            {siteConfig.title}
          </span>
        </Link>
        <nav className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-[var(--muted)]">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="relative transition-colors hover:text-[var(--foreground)] after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-[var(--accent)] after:transition-all hover:after:w-full"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href={siteConfig.github}
            className="rounded-md border border-[var(--line)] bg-[var(--card)] px-3 py-1.5 text-[var(--foreground)] transition-colors hover:border-[var(--accent)]"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </Link>
        </nav>
      </div>
    </header>
  );
}
