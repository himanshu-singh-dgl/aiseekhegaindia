import fs from 'node:fs';
import path from 'node:path';
import { getOrderedDocIds } from '@/config/sidebar';
import { siteConfig } from '@/config/site';
import {
  DOCS_CONTENT_DIR,
  compileDocMdx,
  extractTitleFromSource,
  extractToc,
  readDocFile,
  type DocFrontmatter,
  type TocItem,
} from '@/lib/mdx';

export const MAIN_DOC_ID = 'ai-for-leaders/intro';

export type DocMeta = {
  slug: string;
  /** Path segments for the App Router catch-all, e.g. ['deep-learning', 'CNNS'] */
  slugParts: string[];
  title: string;
  description?: string;
  keywords?: string[];
  frontmatter: DocFrontmatter;
  /** Absolute filesystem path to the source file */
  filePath: string;
  /** Repo-relative path for edit links, e.g. content/docs/deep-learning/CNNS.mdx */
  contentPath: string;
};

export type DocPage = DocMeta & {
  content: Awaited<ReturnType<typeof compileDocMdx>>;
  toc: TocItem[];
};

function walkDocFiles(dir: string, base = ''): string[] {
  if (!fs.existsSync(dir)) return [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files: string[] = [];
  for (const entry of entries) {
    const rel = base ? `${base}/${entry.name}` : entry.name;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...walkDocFiles(full, rel));
    } else if (/\.(mdx?|MDX?)$/.test(entry.name)) {
      files.push(rel);
    }
  }
  return files;
}

/** Resolve slug from a path relative to content/docs (preserves case). */
export function filePathToSlug(relativePath: string): string {
  return relativePath.replace(/\.(mdx?|MDX?)$/, '').replace(/\\/g, '/');
}

export function slugToFilePath(slug: string): string | null {
  const candidates = [
    path.join(DOCS_CONTENT_DIR, `${slug}.mdx`),
    path.join(DOCS_CONTENT_DIR, `${slug}.md`),
    path.join(DOCS_CONTENT_DIR, `${slug}.MDX`),
    path.join(DOCS_CONTENT_DIR, `${slug}.MD`),
  ];
  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) return candidate;
  }
  return null;
}

function normalizeKeywords(
  keywords: DocFrontmatter['keywords'],
): string[] | undefined {
  if (!keywords) return undefined;
  if (Array.isArray(keywords)) return keywords.map(String);
  return String(keywords)
    .split(',')
    .map((k) => k.trim())
    .filter(Boolean);
}

export function getAllDocSlugs(): string[] {
  return walkDocFiles(DOCS_CONTENT_DIR).map(filePathToSlug);
}

export function getDocMeta(slug: string): DocMeta | null {
  const filePath = slugToFilePath(slug);
  if (!filePath) return null;

  const { frontmatter, content } = readDocFile(filePath);
  const title =
    (typeof frontmatter.title === 'string' && frontmatter.title) ||
    extractTitleFromSource(content) ||
    slug.split('/').pop() ||
    slug;

  const relativeFromContent = path
    .relative(path.join(process.cwd(), 'content'), filePath)
    .replace(/\\/g, '/');

  return {
    slug,
    slugParts: slug.split('/').filter(Boolean),
    title,
    description:
      typeof frontmatter.description === 'string'
        ? frontmatter.description
        : undefined,
    keywords: normalizeKeywords(frontmatter.keywords),
    frontmatter,
    filePath,
    contentPath: `content/${relativeFromContent}`,
  };
}

export function getAllDocs(): DocMeta[] {
  return getAllDocSlugs()
    .map((slug) => getDocMeta(slug))
    .filter((doc): doc is DocMeta => doc !== null);
}

/** Docs ordered by sidebar; orphans (not in sidebar) appended alphabetically. */
export function getDocsInSidebarOrder(): DocMeta[] {
  const all = getAllDocs();
  const bySlug = new Map(all.map((d) => [d.slug, d]));
  const orderedIds = getOrderedDocIds();
  const ordered: DocMeta[] = [];

  for (const id of orderedIds) {
    const doc = bySlug.get(id);
    if (doc) {
      ordered.push(doc);
      bySlug.delete(id);
    }
  }

  const orphans = [...bySlug.values()].sort((a, b) =>
    a.slug.localeCompare(b.slug),
  );
  return [...ordered, ...orphans];
}

export function getPrevNext(slug: string): {
  prev: DocMeta | null;
  next: DocMeta | null;
} {
  const orderedIds = getOrderedDocIds();
  const index = orderedIds.indexOf(slug);
  if (index === -1) {
    return { prev: null, next: null };
  }
  const prevId = index > 0 ? orderedIds[index - 1] : null;
  const nextId = index < orderedIds.length - 1 ? orderedIds[index + 1] : null;
  return {
    prev: prevId ? getDocMeta(prevId) : null,
    next: nextId ? getDocMeta(nextId) : null,
  };
}

export async function getDocBySlug(slug: string): Promise<DocPage | null> {
  const meta = getDocMeta(slug);
  if (!meta) return null;

  const { content: source } = readDocFile(meta.filePath);
  const toc = extractToc(source);
  const content = await compileDocMdx(source, slug);

  return {
    ...meta,
    content,
    toc,
  };
}

export function getEditUrl(contentPath: string): string {
  // Edit URL historically pointed at docs/ under the repo root; content now lives in content/docs/
  return `${siteConfig.editBaseUrl}${contentPath}`;
}

export function slugPartsToSlug(parts: string[] | undefined): string {
  if (!parts || parts.length === 0) return MAIN_DOC_ID;
  return parts.join('/');
}
