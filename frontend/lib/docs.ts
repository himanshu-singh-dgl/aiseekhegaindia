import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import {compileMDX} from 'next-mdx-remote/rsc';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import {mdxComponents} from '@/mdx-components';
import {flattenSidebarItems} from '@/lib/sidebar';

const DOCS_DIR = path.join(process.cwd(), 'docs');

function preprocessMdx(content: string): string {
  return content.replace(/^import\s+.*from\s+['"]@site\/.*['"];?\s*$/gm, '');
}

function resolveDocPath(slug: string): string | null {
  const candidates = [
    path.join(DOCS_DIR, `${slug}.mdx`),
    path.join(DOCS_DIR, `${slug}.md`),
  ];
  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) {
      return candidate;
    }
  }
  return null;
}

export function getAllDocSlugs(): string[] {
  const fromSidebar = flattenSidebarItems();
  const fromDisk: string[] = [];

  function walk(dir: string, prefix = '') {
    for (const entry of fs.readdirSync(dir, {withFileTypes: true})) {
      if (entry.name.startsWith('.')) continue;
      const rel = prefix ? `${prefix}/${entry.name}` : entry.name;
      if (entry.isDirectory()) {
        walk(path.join(dir, entry.name), rel);
      } else if (/\.(mdx?|md)$/.test(entry.name)) {
        fromDisk.push(rel.replace(/\.(mdx|md)$/, ''));
      }
    }
  }

  walk(DOCS_DIR);
  return [...new Set([...fromSidebar, ...fromDisk])];
}

export async function getDocBySlug(slug: string) {
  const filePath = resolveDocPath(slug);
  if (!filePath) {
    return null;
  }

  const source = fs.readFileSync(filePath, 'utf8');
  const {content, data} = matter(source);
  const cleaned = preprocessMdx(content);

  const {content: mdxContent} = await compileMDX({
    source: cleaned,
    components: mdxComponents,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkMath],
        rehypePlugins: [rehypeKatex],
      },
    },
  });

  return {
    slug,
    frontmatter: data as {title?: string; description?: string},
    content: mdxContent,
  };
}
