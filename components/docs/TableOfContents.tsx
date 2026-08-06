'use client';

import { useEffect, useState } from 'react';
import clsx from 'clsx';
import type { TocItem } from '@/lib/mdx';

type TableOfContentsProps = {
  items: TocItem[];
};

export default function TableOfContents({ items }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    if (items.length === 0) return;

    const headingElements = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);

    if (headingElements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target?.id) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: '-80px 0px -60% 0px',
        threshold: [0, 0.25, 0.5, 1],
      },
    );

    for (const el of headingElements) observer.observe(el);
    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <aside className="hidden w-56 shrink-0 xl:block">
      <div className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-[var(--color-muted)]">
          On this page
        </p>
        <nav aria-label="Table of contents">
          <ul className="space-y-1 border-l border-[var(--color-border)] text-sm">
            {items.map((item) => (
              <li key={`${item.id}-${item.text}`}>
                <a
                  href={`#${item.id}`}
                  className={clsx(
                    'block border-l-2 py-1 transition-colors',
                    item.level === 2 && 'pl-3',
                    item.level === 3 && 'pl-5',
                    item.level >= 4 && 'pl-7',
                    activeId === item.id
                      ? 'border-[var(--color-primary)] font-medium text-[var(--color-primary)]'
                      : 'border-transparent text-[var(--color-muted)] hover:text-[var(--color-foreground)]',
                  )}
                >
                  {item.text}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
}
