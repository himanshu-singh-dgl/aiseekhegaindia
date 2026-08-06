import { DocsLayout } from '@/components/layout/DocsLayout';
import { createMetadata } from '@/lib/metadata';
import {
  docIdFromSlug,
  getCategoryForDoc,
  getPrevNextNav,
} from '@/lib/content/docs-nav';
import { loadDoc, getStaticDocParams } from '@/lib/content/load-doc';
import { notFound } from 'next/navigation';

type PageProps = {
  params: Promise<{ slug?: string[] }>;
};

export async function generateStaticParams() {
  return getStaticDocParams();
}

export async function generateMetadata({ params }: PageProps) {
  const { slug = [] } = await params;
  const docId = docIdFromSlug(slug);
  const doc = await loadDoc(docId);
  if (!doc) return {};
  return createMetadata({
    title: doc.title,
    description: doc.frontmatter.description,
    path: `/docs/${docId}`,
  });
}

export default async function DocPage({ params }: PageProps) {
  const { slug = [] } = await params;
  const docId = docIdFromSlug(slug);
  const doc = await loadDoc(docId);
  if (!doc) notFound();

  const { prev, next } = getPrevNextNav(docId);
  const category = getCategoryForDoc(docId);

  return (
    <DocsLayout
      title={doc.title}
      docId={docId}
      category={category}
      headings={doc.headings}
      prev={prev}
      next={next}
    >
      {doc.content}
    </DocsLayout>
  );
}
