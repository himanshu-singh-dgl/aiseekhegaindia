import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { baseOptions } from '@/lib/layout.shared';

const posts: Record<
  string,
  { title: string; date: string; content: React.ReactNode }
> = {
  '2024-04-24-welcome': {
    title: 'Welcome to AI Seekhega India Blog',
    date: '2024-04-24',
    content: (
      <>
        <p>
          Welcome to the official blog of AI Seekhega India! This is where
          we&apos;ll share updates, tutorials, and insights about artificial
          intelligence and machine learning.
        </p>
        <h2>What to Expect</h2>
        <ul>
          <li>Tutorials and guides</li>
          <li>Project updates</li>
          <li>Community highlights</li>
          <li>Research summaries</li>
          <li>Best practices and tips</li>
        </ul>
        <h2>Get Involved</h2>
        <p>
          We encourage community members to contribute. See our{' '}
          <Link href="/contribute">contribution guidelines</Link>.
        </p>
      </>
    ),
  },
};

export function generateStaticParams() {
  return Object.keys(posts).map((slug) => ({ slug }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await props.params;
  const post = posts[slug];
  if (!post) return {};
  return { title: post.title };
}

export default async function BlogPostPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const post = posts[slug];
  if (!post) notFound();

  return (
    <HomeLayout {...baseOptions()}>
      <article className="prose dark:prose-invert mx-auto max-w-3xl px-4 py-12">
        <p className="text-sm text-fd-muted-foreground">{post.date}</p>
        <h1>{post.title}</h1>
        {post.content}
        <p>
          <Link href="/blog">← Back to blog</Link>
        </p>
      </article>
    </HomeLayout>
  );
}
