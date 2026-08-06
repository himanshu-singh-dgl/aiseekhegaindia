import fs from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';
import { compileMDX } from 'next-mdx-remote/rsc';
import { mdxComponents } from '@/lib/mdx-components';

const BLOG_DIR = path.join(process.cwd(), 'content/blog');

export type BlogPostMeta = {
  slug: string;
  title: string;
  date: string;
  author?: string;
  tags?: string[];
};

export async function getBlogPosts(): Promise<BlogPostMeta[]> {
  const files = await fs.readdir(BLOG_DIR);
  const posts = await Promise.all(
    files
      .filter((file) => file.endsWith('.mdx') || file.endsWith('.md'))
      .map(async (file) => {
        const raw = await fs.readFile(path.join(BLOG_DIR, file), 'utf8');
        const { data } = matter(raw);
        const slug = file.replace(/\.(mdx|md)$/, '');
        return {
          slug,
          title: typeof data.title === 'string' ? data.title : slug,
          date: typeof data.date === 'string' ? data.date : '',
          author: typeof data.author === 'string' ? data.author : undefined,
          tags: Array.isArray(data.tags)
            ? data.tags.filter((tag): tag is string => typeof tag === 'string')
            : undefined,
        };
      }),
  );

  return posts.sort((a, b) => b.date.localeCompare(a.date));
}

export async function getBlogPost(slug: string) {
  for (const ext of ['.mdx', '.md']) {
    const filePath = path.join(BLOG_DIR, `${slug}${ext}`);
    try {
      const raw = await fs.readFile(filePath, 'utf8');
      const { content, frontmatter } = await compileMDX({
        source: raw,
        components: mdxComponents,
        options: { parseFrontmatter: true },
      });
      return { content, frontmatter, slug };
    } catch {
      // try next extension
    }
  }
  return null;
}
