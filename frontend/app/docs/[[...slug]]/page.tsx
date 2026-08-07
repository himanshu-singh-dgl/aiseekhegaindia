import {notFound, redirect} from 'next/navigation';
import DocsSidebar from '@/components/DocsSidebar';
import DocsPagination from '@/components/DocsPagination';
import {getAllDocSlugs, getDocBySlug} from '@/lib/docs';
import {getAdjacentDocs, slugToTitle} from '@/lib/sidebar';

type PageProps = {
  params: Promise<{slug?: string[]}>;
};

export async function generateStaticParams() {
  return getAllDocSlugs().map((slug) => ({
    slug: slug.split('/'),
  }));
}

export async function generateMetadata({params}: PageProps) {
  const {slug: slugParts} = await params;
  const slug = slugParts?.join('/') ?? '';
  if (!slug) {
    return {title: 'Documentation'};
  }
  const doc = await getDocBySlug(slug);
  if (!doc) return {title: 'Not Found'};

  return {
    title: doc.frontmatter.title ?? slugToTitle(slug),
    description: doc.frontmatter.description,
  };
}

export default async function DocPage({params}: PageProps) {
  const {slug: slugParts} = await params;
  const slug = slugParts?.join('/') ?? '';

  if (!slug) {
    redirect('/docs/ai-for-leaders/intro');
  }

  const doc = await getDocBySlug(slug);

  if (!doc) {
    notFound();
  }

  const {prev, next} = getAdjacentDocs(slug);

  return (
    <div className="flex w-full">
      <DocsSidebar />
      <div className="min-w-0 flex-1">
        <article className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6 lg:max-w-4xl lg:px-8">
          <div className="prose-doc">{doc.content}</div>
          <DocsPagination prev={prev} next={next} />
        </article>
      </div>
    </div>
  );
}
