import Link from 'next/link';
import { docsSidebar } from '@/lib/sidebar';

export function DocsSidebar({ activeId }: { activeId?: string }) {
  return (
    <aside className="w-full shrink-0 md:w-64">
      <div className="surface sticky top-20 space-y-6 rounded-xl p-4">
        {docsSidebar.map((category) => (
          <div key={category.label}>
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">
              {category.label}
            </p>
            <ul className="space-y-0.5">
              {category.items.map((item) => {
                const active = item.id === activeId;
                return (
                  <li key={item.id}>
                    <Link
                      href={item.href}
                      className={`block rounded-md px-2.5 py-1.5 text-sm transition-colors ${
                        active
                          ? 'bg-[var(--accent-soft)] font-semibold text-[var(--accent-ink)]'
                          : 'text-[var(--muted)] hover:bg-black/[0.03] hover:text-[var(--foreground)]'
                      }`}
                    >
                      <span
                        className={`mr-2 inline-block h-1.5 w-1.5 rounded-sm ${
                          active ? 'bg-[var(--accent)]' : 'bg-transparent'
                        }`}
                      />
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </aside>
  );
}
