import type { ReactNode } from 'react';
import Sidebar from '@/components/docs/Sidebar';
import { getAllDocs } from '@/lib/docs';

export default function DocsLayout({ children }: { children: ReactNode }) {
  const labels = Object.fromEntries(
    getAllDocs().map((doc) => [doc.slug, doc.title]),
  );

  return (
    <div className="mx-auto flex w-full max-w-7xl gap-8 px-4 py-8 sm:px-6 lg:px-8">
      <Sidebar labels={labels} />
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}
