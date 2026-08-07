import Link from 'next/link';
import { siteConfig } from '@/lib/site-config';

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-[var(--line)] bg-[var(--surface-ink)] text-slate-300">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="font-display text-xl font-semibold text-white">{siteConfig.title}</p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-slate-400">
            {siteConfig.tagline}
          </p>
        </div>
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
            Learn
          </p>
          <ul className="space-y-2 text-sm">
            <li>
              <Link className="hover:text-white" href="/docs/machine-learning/intro">
                Machine Learning
              </Link>
            </li>
            <li>
              <Link className="hover:text-white" href="/docs/deep-learning/intro">
                Deep Learning
              </Link>
            </li>
            <li>
              <Link className="hover:text-white" href="/docs/language-models/intro">
                Language Models
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
            Community
          </p>
          <ul className="space-y-2 text-sm">
            <li>
              <Link className="hover:text-white" href="/fellowship">
                Fellowship
              </Link>
            </li>
            <li>
              <Link className="hover:text-white" href="/contribute">
                Contribute
              </Link>
            </li>
            <li>
              <Link className="hover:text-white" href={siteConfig.github} target="_blank" rel="noreferrer">
                GitHub
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-4 text-center text-xs text-slate-500">
        Copyright © {new Date().getFullYear()} Lex AI Technologies Pvt Ltd
      </div>
    </footer>
  );
}
