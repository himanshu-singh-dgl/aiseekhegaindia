import type { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import DocPager from '@/components/docs/DocPager';
import EditLink from '@/components/docs/EditLink';
import TableOfContents from '@/components/docs/TableOfContents';
import {
  MAIN_DOC_ID,
  getAllDocSlugs,
  getDocBySlug,
  getPrevNext,
  slugPartsToSlug,
} from '@/lib/docs';
import { siteConfig } from '@/config/site';

type PageProps = {
  params: Promise<{ slug?: string[] }>;
};

export async function generateStaticParams() {
  const slugs = getAllDocSlugs();
  return [
    { slug: undefined },
    ...slugs.map((slug) => ({
      slug: slug.split('/').filter(Boolean),
    })),
  ];
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug: parts } = await params;
  if (!parts || parts.length === 0) {
    return { title: 'Docs' };
  }

  const slug = slugPartsToSlug(parts);
  const doc = await getDocBySlug(slug);
  if (!doc) return { title: siteConfig.title };

  const title = doc.title;
  const description = doc.description || siteConfig.tagline;
  const absoluteTitle = `${title} | ${siteConfig.title}`;

  return {
    title,
    description,
    keywords: doc.keywords,
    openGraph: {
      title: absoluteTitle,
      description,
      url: `${siteConfig.url}/docs/${doc.slug}`,
      images: [siteConfig.socialImage],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: absoluteTitle,
      description,
      images: [siteConfig.socialImage],
    },
  };
}

export default async function DocPage({ params }: PageProps) {
  const { slug: parts } = await params;

  if (!parts || parts.length === 0) {
    redirect(`/docs/${MAIN_DOC_ID}`);
  }

  const slug = slugPartsToSlug(parts);
  const doc = await getDocBySlug(slug);
  if (!doc) notFound();

  const { prev, next } = getPrevNext(slug);

  return (
    <div className="flex gap-10">
      <article className="min-w-0 flex-1">
        <header className="mb-8 border-b border-[var(--color-border)] pb-6">
          <h1 className="text-3xl font-bold tracking-tight text-[var(--color-foreground)] sm:text-4xl">
            {doc.title}
          </h1>
          {doc.description && (
            <p className="mt-3 text-base text-[var(--color-muted)]">
              {doc.description}
            </p>
          )}
          <div className="mt-4">
            <EditLink contentPath={doc.contentPath} />
          </div>
        </header>

        <div className="prose prose-slate dark:prose-invert max-w-none prose-headings:scroll-mt-24 prose-a:text-[var(--color-primary)] prose-img:rounded-md prose-pre:bg-transparent prose-pre:p-0">
          {doc.content}
        </div>

        <DocPager
          prev={prev ? { slug: prev.slug, title: prev.title } : null}
          next={next ? { slug: next.slug, title: next.title } : null}
        />
      </article>

      <TableOfContents items={doc.toc} />
    </div>
  );
}
