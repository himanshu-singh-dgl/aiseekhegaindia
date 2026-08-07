'use client';

import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {
  docsSidebar,
  getDocHref,
  slugToTitle,
  type SidebarCategory,
  type SidebarEntry,
} from '@/lib/sidebar';

function SidebarLink({slug}: {slug: string}) {
  const pathname = usePathname();
  const href = getDocHref(slug);
  const active = pathname === href;

  return (
    <Link
      href={href}
      className={`block rounded-md px-2 py-1.5 text-sm transition ${
        active
          ? 'bg-orange-100 font-medium text-orange-800'
          : 'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900'
      }`}
    >
      {slugToTitle(slug)}
    </Link>
  );
}

function SidebarCategoryBlock({category}: {category: SidebarCategory}) {
  return (
    <div className="mb-4">
      <p className="mb-2 px-2 text-xs font-semibold uppercase tracking-wide text-zinc-500">
        {category.label}
      </p>
      <div className="space-y-0.5">
        {category.items.map((slug) => (
          <SidebarLink key={slug} slug={slug} />
        ))}
      </div>
    </div>
  );
}

export default function DocsSidebar() {
  return (
    <aside className="hidden w-56 shrink-0 border-r border-zinc-200 bg-zinc-50 xl:w-64 lg:block">
      <div className="sticky top-[57px] max-h-[calc(100vh-57px)] overflow-y-auto px-3 py-5">
        <p className="mb-3 px-2 text-sm font-bold text-zinc-900">Documentation</p>
        {docsSidebar.map((entry: SidebarEntry, index) =>
          typeof entry === 'string' ? (
            <SidebarLink key={entry} slug={entry} />
          ) : (
            <SidebarCategoryBlock key={`${entry.label}-${index}`} category={entry} />
          ),
        )}
      </div>
    </aside>
  );
}
