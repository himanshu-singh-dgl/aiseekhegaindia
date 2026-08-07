import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { DocsPager } from '@/components/docs/DocsPager';
import { DocsSidebar } from '@/components/docs/DocsSidebar';
import { MdxContent } from '@/components/docs/MdxContent';
import { getDocBySlug, listDocIds } from '@/lib/docs';
import { getDocNav } from '@/lib/sidebar';

type Props = {
  params: Promise<{ slug?: string[] }>;
};

export async function generateStaticParams() {
  return listDocIds().map((id) => ({ slug: id.split('/') }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  if (!slug?.length) {
    return { title: 'Docs' };
  }
  const doc = getDocBySlug(slug);
  if (!doc) return { title: 'Not found' };
  return {
    title: doc.frontmatter.title ?? slug[slug.length - 1],
    description: doc.frontmatter.description,
  };
}

export default async function DocsPage({ params }: Props) {
  const { slug } = await params;
  if (!slug?.length) {
    notFound();
  }

  const doc = getDocBySlug(slug);
  if (!doc) notFound();

  const nav = getDocNav(doc.id);
  const title = doc.frontmatter.title ?? slug[slug.length - 1];

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-10 md:flex-row">
      <DocsSidebar activeId={doc.id} />
      <article className="surface min-w-0 flex-1 rounded-xl p-6 md:p-8">
        <p className="text-xs uppercase tracking-[0.12em] text-[var(--muted)]">
          /docs/{doc.id}
        </p>
        <h1 className="font-display mt-2 text-3xl font-semibold tracking-tight md:text-4xl">
          {title}
        </h1>
        <div className="mt-8">
          <MdxContent source={doc.content} />
        </div>
        <DocsPager prev={nav.prev} next={nav.next} />
      </article>
    </div>
  );
}
