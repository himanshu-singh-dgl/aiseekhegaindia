import Link from 'next/link';
import type { SidebarItem } from '@/lib/sidebar';

export function DocsPager({
  prev,
  next,
}: {
  prev: SidebarItem | null;
  next: SidebarItem | null;
}) {
  return (
    <div className="mt-12 grid gap-3 border-t border-[var(--line)] pt-6 md:grid-cols-2">
      {prev ? (
        <Link
          href={prev.href}
          className="surface rounded-xl p-4 transition-colors hover:border-[var(--accent)]"
        >
          <p className="text-xs uppercase tracking-[0.12em] text-[var(--muted)]">Previous</p>
          <p className="mt-1 font-display font-semibold">{prev.label}</p>
        </Link>
      ) : (
        <div />
      )}
      {next ? (
        <Link
          href={next.href}
          className="surface rounded-xl p-4 text-right transition-colors hover:border-[var(--accent)]"
        >
          <p className="text-xs uppercase tracking-[0.12em] text-[var(--muted)]">Next</p>
          <p className="mt-1 font-display font-semibold">{next.label}</p>
        </Link>
      ) : null}
    </div>
  );
}
