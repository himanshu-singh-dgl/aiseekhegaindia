import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Container } from '@/components/ui/Container';
import { createMetadata } from '@/lib/metadata';
import { getBlogPost } from '@/lib/content/blog';

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return [{ slug: '2024-04-24-welcome' }];
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) return {};
  const title = typeof post.frontmatter.title === 'string' ? post.frontmatter.title : slug;
  return createMetadata({
    title,
    path: `/blog/${slug}`,
  });
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) notFound();

  const title =
    typeof post.frontmatter.title === 'string' ? post.frontmatter.title : slug;
  const date = typeof post.frontmatter.date === 'string' ? post.frontmatter.date : '';
  const author =
    typeof post.frontmatter.author === 'string' ? post.frontmatter.author : undefined;

  return (
    <Container className="py-12">
      <article className="doc-content mx-auto max-w-3xl">
        <p className="text-sm text-[var(--muted)]">{date}</p>
        <h1>{title}</h1>
        {author && <p className="text-[var(--muted)]">By {author}</p>}
        <div className="mt-8">{post.content}</div>
        <p className="mt-8">
          <Link href="/blog" className="text-primary hover:underline">
            ← Back to blog
          </Link>
        </p>
      </article>
    </Container>
  );
}
