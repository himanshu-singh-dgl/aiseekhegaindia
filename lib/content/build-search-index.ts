import fs from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';
import { getAllDocIds } from '@/lib/content/docs-nav';
import { getDocTitle, normalizeFrontmatter } from '@/lib/content/frontmatter';

export type SearchDocument = {
  id: string;
  title: string;
  description?: string;
  href: string;
  content: string;
};

const CONTENT_DIR = path.join(process.cwd(), 'content/docs');

function stripMarkdown(content: string): string {
  return content
    .replace(/^---[\s\S]*?---/m, '')
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`[^`]+`/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]+\)/g, ' ')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/<[^>]+>/g, ' ')
    .replace(/[#>*_~|-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

async function readDocText(docId: string): Promise<string | null> {
  const basePath = path.join(CONTENT_DIR, docId);
  for (const ext of ['.html', '.mdx', '.md']) {
    try {
      return await fs.readFile(`${basePath}${ext}`, 'utf8');
    } catch {
      // continue
    }
  }
  return null;
}

export async function buildSearchIndex(): Promise<SearchDocument[]> {
  const docs = getAllDocIds();
  const index: SearchDocument[] = [];

  for (const id of docs) {
    const raw = await readDocText(id);
    if (!raw) continue;

    const { data, content } = matter(raw);
    const frontmatter = normalizeFrontmatter(data);

    index.push({
      id,
      title: getDocTitle(frontmatter, id),
      description:
        typeof frontmatter.description === 'string'
          ? frontmatter.description
          : undefined,
      href: `/docs/${id}`,
      content: stripMarkdown(content),
    });
  }

  return index;
}
