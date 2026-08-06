import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { siteConfig } from '@/config/site';
import {
  compileDocMdx,
  extractTitleFromSource,
  extractToc,
  type TocItem,
} from '@/lib/mdx';

const BLOG_CONTENT_DIR = path.join(process.cwd(), 'content/blog');

/** Filename pattern: YYYY-MM-DD-slug.mdx */
const FILENAME_RE = /^(\d{4})-(\d{2})-(\d{2})-(.+)\.(mdx?|MDX?)$/;

const WORDS_PER_MINUTE = 200;

export type BlogFrontmatter = {
  title?: string;
  author?: string;
  tags?: string[] | string;
  date?: string;
  description?: string;
  [key: string]: unknown;
};

export type BlogPostMeta = {
  /** Slug segment from filename (no date), e.g. "welcome" */
  slug: string;
  year: string;
  month: string;
  day: string;
  /** ISO date YYYY-MM-DD */
  date: string;
  title: string;
  description?: string;
  author?: string;
  tags: string[];
  /** Estimated minutes */
  readingTimeMinutes: number;
  /** Canonical path, e.g. /blog/2024/04/24/welcome */
  href: string;
  /** Absolute filesystem path */
  filePath: string;
  /** Repo-relative path for edit links */
  contentPath: string;
  /** Original filename */
  filename: string;
};

export type BlogPost = BlogPostMeta & {
  content: Awaited<ReturnType<typeof compileDocMdx>>;
  toc: TocItem[];
  excerpt: string;
};

function normalizeTags(tags: BlogFrontmatter['tags']): string[] {
  if (!tags) return [];
  if (Array.isArray(tags)) return tags.map(String).map((t) => t.trim()).filter(Boolean);
  return String(tags)
    .split(',')
    .map((t) => t.trim())
    .filter(Boolean);
}

function estimateReadingTime(text: string): number {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
}

function excerptFromContent(content: string, maxLen = 180): string {
  const plain = content
    .replace(/^---[\s\S]*?---\s*/, '')
    .replace(/```[\s\S]*?```/g, '')
    .replace(/!\[[^\]]*\]\([^)]+\)/g, '')
    .replace(/\[[^\]]*\]\([^)]+\)/g, '')
    .replace(/[#>*_`~]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  if (plain.length <= maxLen) return plain;
  return `${plain.slice(0, maxLen).replace(/\s+\S*$/, '')}…`;
}

export function tagToSlug(tag: string): string {
  return tag
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-');
}

export function parseBlogFilename(filename: string): {
  year: string;
  month: string;
  day: string;
  slug: string;
} | null {
  const match = FILENAME_RE.exec(filename);
  if (!match) return null;
  return {
    year: match[1],
    month: match[2],
    day: match[3],
    slug: match[4],
  };
}

function listBlogFilenames(): string[] {
  if (!fs.existsSync(BLOG_CONTENT_DIR)) return [];
  return fs
    .readdirSync(BLOG_CONTENT_DIR)
    .filter((name) => FILENAME_RE.test(name))
    .sort()
    .reverse();
}

export function getAllBlogPosts(): BlogPostMeta[] {
  return listBlogFilenames()
    .map((filename) => getBlogPostMetaByFilename(filename))
    .filter((post): post is BlogPostMeta => post !== null)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getBlogPostMetaByFilename(
  filename: string,
): BlogPostMeta | null {
  const parsed = parseBlogFilename(filename);
  if (!parsed) return null;

  const filePath = path.join(BLOG_CONTENT_DIR, filename);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(raw);
  const frontmatter = data as BlogFrontmatter;

  const dateFromFm =
    typeof frontmatter.date === 'string'
      ? frontmatter.date.slice(0, 10)
      : `${parsed.year}-${parsed.month}-${parsed.day}`;

  const title =
    (typeof frontmatter.title === 'string' && frontmatter.title) ||
    extractTitleFromSource(content) ||
    parsed.slug;

  const description =
    typeof frontmatter.description === 'string'
      ? frontmatter.description
      : excerptFromContent(content);

  const relativeFromContent = path
    .relative(path.join(process.cwd(), 'content'), filePath)
    .replace(/\\/g, '/');

  return {
    slug: parsed.slug,
    year: parsed.year,
    month: parsed.month,
    day: parsed.day,
    date: dateFromFm,
    title,
    description,
    author:
      typeof frontmatter.author === 'string' ? frontmatter.author : undefined,
    tags: normalizeTags(frontmatter.tags),
    readingTimeMinutes: estimateReadingTime(content),
    href: `/blog/${parsed.year}/${parsed.month}/${parsed.day}/${parsed.slug}`,
    filePath,
    contentPath: `content/${relativeFromContent}`,
    filename,
  };
}

export function getBlogPostMeta(
  year: string,
  month: string,
  day: string,
  slug: string,
): BlogPostMeta | null {
  const candidates = [
    `${year}-${month}-${day}-${slug}.mdx`,
    `${year}-${month}-${day}-${slug}.md`,
  ];
  for (const filename of candidates) {
    const meta = getBlogPostMetaByFilename(filename);
    if (meta) return meta;
  }
  return null;
}

export async function getBlogPost(
  year: string,
  month: string,
  day: string,
  slug: string,
): Promise<BlogPost | null> {
  const meta = getBlogPostMeta(year, month, day, slug);
  if (!meta) return null;

  const raw = fs.readFileSync(meta.filePath, 'utf8');
  const { content: source } = matter(raw);
  const toc = extractToc(source);
  const content = await compileDocMdx(source, `blog/${slug}`);

  return {
    ...meta,
    content,
    toc,
    excerpt: meta.description || excerptFromContent(source),
  };
}

export function getAllTags(): { tag: string; slug: string; count: number }[] {
  const counts = new Map<string, { tag: string; count: number }>();
  for (const post of getAllBlogPosts()) {
    for (const tag of post.tags) {
      const key = tagToSlug(tag);
      const existing = counts.get(key);
      if (existing) {
        existing.count += 1;
      } else {
        counts.set(key, { tag, count: 1 });
      }
    }
  }
  return [...counts.entries()]
    .map(([slug, { tag, count }]) => ({ tag, slug, count }))
    .sort((a, b) => a.tag.localeCompare(b.tag));
}

export function getPostsByTag(tagSlug: string): BlogPostMeta[] {
  return getAllBlogPosts().filter((post) =>
    post.tags.some((t) => tagToSlug(t) === tagSlug),
  );
}

export function getBlogEditUrl(contentPath: string): string {
  return `${siteConfig.editBaseUrl}${contentPath}`;
}

export { BLOG_CONTENT_DIR };
