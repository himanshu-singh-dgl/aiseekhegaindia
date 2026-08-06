import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { createMetadata } from '@/lib/metadata';
import { getBlogPosts } from '@/lib/content/blog';

export const metadata = createMetadata({
  title: 'Blog',
  description: 'Updates, tutorials, and insights from AI Seekhega India.',
  path: '/blog',
});

export default async function BlogIndexPage() {
  const posts = await getBlogPosts();

  return (
    <Container className="py-12">
      <h1 className="mb-8 text-4xl font-bold">Blog</h1>
      <div className="space-y-6">
        {posts.map((post) => (
          <article key={post.slug} className="rounded-xl border border-[var(--border)] p-6">
            <p className="text-sm text-[var(--muted)]">{post.date}</p>
            <h2 className="mt-1 text-2xl font-semibold">
              <Link href={`/blog/${post.slug}`} className="hover:text-primary">
                {post.title}
              </Link>
            </h2>
            {post.author && <p className="mt-2 text-sm text-[var(--muted)]">By {post.author}</p>}
          </article>
        ))}
      </div>
    </Container>
  );
}
