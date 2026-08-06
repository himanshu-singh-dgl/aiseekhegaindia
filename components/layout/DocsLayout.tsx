'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight } from 'lucide-react';
import { getDocItemLabel, getSidebarCategories } from '@/lib/content/docs-nav';
import { cn, slugToHref } from '@/lib/cn';
import type { TocHeading } from '@/lib/content/extract-headings';

type DocsLayoutProps = {
  children: React.ReactNode;
  title: string;
  docId: string;
  category?: string;
  headings: TocHeading[];
  prev?: { id: string; href: string; title?: string };
  next?: { id: string; href: string; title?: string };
};

export function DocsLayout({
  children,
  title,
  docId,
  category,
  headings,
  prev,
  next,
}: DocsLayoutProps) {
  const pathname = usePathname();
  const categories = getSidebarCategories();

  return (
    <div className="mx-auto flex w-full max-w-7xl gap-8 px-4 py-8 lg:px-8">
      <aside className="hidden w-64 shrink-0 lg:block">
        <nav className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto pr-4">
          {categories.map((cat) => (
            <div key={cat.label} className="mb-6">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">
                {cat.label}
              </p>
              <ul className="space-y-1">
                {cat.items.map((item) => {
                  const href = slugToHref(item.id);
                  const active = pathname === href;
                  return (
                    <li key={item.id}>
                      <Link
                        href={href}
                        className={cn(
                          'block rounded-md px-2 py-1.5 text-sm hover:bg-[var(--surface)]',
                          active && 'bg-[var(--surface)] font-medium text-primary',
                        )}
                      >
                        {getDocItemLabel(item)}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>
      </aside>

      <main className="min-w-0 flex-1">
        <nav aria-label="Breadcrumb" className="mb-4 text-sm text-[var(--muted)]">
          <ol className="flex flex-wrap items-center gap-1">
            <li>
              <Link href="/docs/resources/intro" className="hover:text-[var(--fg)]">
                Docs
              </Link>
            </li>
            {category && (
              <>
                <li><ChevronRight className="inline h-3 w-3" /></li>
                <li>{category}</li>
              </>
            )}
            <li><ChevronRight className="inline h-3 w-3" /></li>
            <li className="text-[var(--fg)]">{title}</li>
          </ol>
        </nav>

        <article>
          <h1 className="mb-8 text-4xl font-bold tracking-tight">{title}</h1>
          {children}
        </article>

        {(prev || next) && (
          <nav className="mt-12 grid gap-4 border-t border-[var(--border)] pt-8 sm:grid-cols-2">
            {prev ? (
              <Link href={prev.href} className="rounded-lg border border-[var(--border)] p-4 hover:bg-[var(--surface)]">
                <span className="text-xs text-[var(--muted)]">Previous</span>
                <div className="font-medium">{prev.title ?? getDocItemLabel({ type: 'doc', id: prev.id })}</div>
              </Link>
            ) : (
              <div />
            )}
            {next && (
              <Link
                href={next.href}
                className="rounded-lg border border-[var(--border)] p-4 text-right hover:bg-[var(--surface)] sm:col-start-2"
              >
                <span className="text-xs text-[var(--muted)]">Next</span>
                <div className="font-medium">{next.title ?? getDocItemLabel({ type: 'doc', id: next.id })}</div>
              </Link>
            )}
          </nav>
        )}
      </main>

      {headings.length > 0 && (
        <aside className="hidden w-56 shrink-0 xl:block">
          <div className="sticky top-24">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">
              On this page
            </p>
            <ul className="space-y-2 text-sm">
              {headings.map((heading) => (
                <li key={heading.id} style={{ paddingLeft: `${(heading.level - 2) * 12}px` }}>
                  <a href={`#${heading.id}`} className="text-[var(--muted)] hover:text-[var(--fg)]">
                    {heading.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      )}
    </div>
  );
}
