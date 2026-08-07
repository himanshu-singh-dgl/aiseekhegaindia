import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

const contentDocsDir = path.join(process.cwd(), 'content', 'docs');

export type DocFrontmatter = {
  title?: string;
  description?: string;
  keywords?: string[] | string;
};

export type DocRecord = {
  id: string;
  slugParts: string[];
  filePath: string;
  frontmatter: DocFrontmatter;
  content: string;
};

function walkDocs(dir: string, base: string[] = []): string[] {
  if (!fs.existsSync(dir)) return [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files: string[] = [];
  for (const entry of entries) {
    const next = [...base, entry.name];
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...walkDocs(full, next));
    } else if (/\.mdx?$/.test(entry.name)) {
      files.push(path.join(...next));
    }
  }
  return files;
}

export function listDocIds(): string[] {
  return walkDocs(contentDocsDir)
    .map((relative) => relative.replace(/\.mdx?$/, ''))
    .sort();
}

export function getDocBySlug(slugParts: string[]): DocRecord | null {
  const id = slugParts.join('/');
  const candidates = [
    path.join(contentDocsDir, `${id}.mdx`),
    path.join(contentDocsDir, `${id}.md`),
  ];
  const filePath = candidates.find((candidate) => fs.existsSync(candidate));
  if (!filePath) return null;

  const raw = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(raw);
  return {
    id,
    slugParts,
    filePath,
    frontmatter: data as DocFrontmatter,
    content,
  };
}

export function getAllDocs(): DocRecord[] {
  return listDocIds()
    .map((id) => getDocBySlug(id.split('/')))
    .filter((doc): doc is DocRecord => Boolean(doc));
}
