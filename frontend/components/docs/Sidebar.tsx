'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useMemo, useState } from 'react';
import clsx from 'clsx';
import { ChevronDown, Menu, X } from 'lucide-react';
import { docsSidebar } from '@/config/sidebar';

export type SidebarLabels = Record<string, string>;

type SidebarProps = {
  /** slug → display title (from frontmatter / H1) */
  labels?: SidebarLabels;
};

function docHref(id: string): string {
  return `/docs/${id}`;
}

export default function Sidebar({ labels = {} }: SidebarProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const activeId = useMemo(() => {
    if (!pathname?.startsWith('/docs/')) return '';
    return pathname.slice('/docs/'.length);
  }, [pathname]);

  const initialOpen = useMemo(() => {
    const open = new Set<string>();
    for (const category of docsSidebar) {
      if (category.items.includes(activeId)) {
        open.add(category.label);
      }
    }
    if (open.size === 0 && docsSidebar[0]) {
      open.add(docsSidebar[0].label);
    }
    return open;
  }, [activeId]);

  const [openCategories, setOpenCategories] = useState<Set<string>>(initialOpen);

  function toggleCategory(label: string) {
    setOpenCategories((prev) => {
      const next = new Set(prev);
      if (next.has(label)) next.delete(label);
      else next.add(label);
      return next;
    });
  }

  const nav = (
    <nav aria-label="Docs sidebar" className="space-y-1 text-sm">
      {docsSidebar.map((category) => {
        const isOpen = openCategories.has(category.label);
        return (
          <div key={category.label} className="pb-2">
            <button
              type="button"
              onClick={() => toggleCategory(category.label)}
              className="flex w-full items-center justify-between rounded-md px-2 py-1.5 text-left text-xs font-semibold uppercase tracking-wide text-[var(--color-muted)] hover:text-[var(--color-foreground)]"
              aria-expanded={isOpen}
            >
              {category.label}
              <ChevronDown
                className={clsx(
                  'h-3.5 w-3.5 transition-transform',
                  isOpen && 'rotate-180',
                )}
              />
            </button>
            {isOpen && (
              <ul className="mt-1 space-y-0.5 border-l border-[var(--color-border)] pl-2">
                {category.items.map((id) => {
                  const href = docHref(id);
                  const isActive = activeId === id;
                  const label =
                    labels[id] || id.split('/').pop()?.replace(/_/g, ' ') || id;
                  return (
                    <li key={id}>
                      <Link
                        href={href}
                        onClick={() => setMobileOpen(false)}
                        className={clsx(
                          'block rounded-md px-2 py-1.5 transition-colors',
                          isActive
                            ? 'bg-[var(--color-primary)]/10 font-medium text-[var(--color-primary)]'
                            : 'text-[var(--color-foreground)] hover:bg-black/5 dark:hover:bg-white/10',
                        )}
                        aria-current={isActive ? 'page' : undefined}
                      >
                        {label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        );
      })}
    </nav>
  );

  return (
    <>
      <div className="mb-4 lg:hidden">
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-md border border-[var(--color-border)] px-3 py-2 text-sm"
          onClick={() => setMobileOpen((v) => !v)}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          Docs menu
        </button>
        {mobileOpen && (
          <div className="mt-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] p-3">
            {nav}
          </div>
        )}
      </div>
      <aside className="hidden w-64 shrink-0 lg:block">
        <div className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto pr-2">
          {nav}
        </div>
      </aside>
    </>
  );
}
