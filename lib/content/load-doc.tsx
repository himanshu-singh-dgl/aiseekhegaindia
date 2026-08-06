import fs from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';
import { compileMDX } from 'next-mdx-remote/rsc';
import rehypeKatex from 'rehype-katex';
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize';
import rehypeSlug from 'rehype-slug';
import remarkMath from 'remark-math';
import { getAllDocIds } from '@/lib/content/docs-nav';
import {
  getDocTitle,
  normalizeFrontmatter,
  type DocFrontmatter,
} from '@/lib/content/frontmatter';
import {
  extractHeadingsFromHtml,
  extractHeadingsFromMarkdown,
  type TocHeading,
} from '@/lib/content/extract-headings';
import { mdxComponents } from '@/lib/mdx-components';

const CONTENT_DIR = path.join(process.cwd(), 'content/docs');
const INTERACTIVE_MDX = new Set([
  'ai-for-leaders/curriculum-tree',
  'tutorials/logistic-regression',
]);

const sanitizeSchema = {
  ...defaultSchema,
  attributes: {
    ...defaultSchema.attributes,
    '*': [
      ...(defaultSchema.attributes?.['*'] ?? []),
      'className',
      'class',
      'id',
      'style',
      'target',
      'rel',
      'ariaHidden',
      'aria-hidden',
    ],
    img: [...(defaultSchema.attributes?.img ?? []), 'src', 'alt', 'width', 'height'],
    a: [...(defaultSchema.attributes?.a ?? []), 'href', 'target', 'rel'],
    code: [...(defaultSchema.attributes?.code ?? []), 'className'],
    span: [...(defaultSchema.attributes?.span ?? []), 'className'],
  },
  tagNames: [
    ...(defaultSchema.tagNames ?? []),
    'details',
    'summary',
    'figure',
    'figcaption',
    'sup',
    'sub',
  ],
};

export type LoadedDoc = {
  id: string;
  format: 'mdx' | 'html';
  frontmatter: DocFrontmatter;
  title: string;
  headings: TocHeading[];
  content: React.ReactNode;
};

async function findDocFile(docId: string): Promise<{
  filePath: string;
  format: 'mdx' | 'html';
} | null> {
  const basePath = path.join(CONTENT_DIR, docId);
  const candidates: Array<{ ext: string; format: 'mdx' | 'html' }> = [
    { ext: '.html', format: 'html' },
    { ext: '.mdx', format: 'mdx' },
    { ext: '.md', format: 'mdx' },
  ];

  for (const candidate of candidates) {
    const filePath = `${basePath}${candidate.ext}`;
    try {
      await fs.access(filePath);
      return { filePath, format: candidate.format };
    } catch {
      // try next extension
    }
  }

  return null;
}

function stripDocusaurusImports(source: string): string {
  return source
    .replace(/^import\s+.+from\s+['"]@site\/src\/components\/.+['"];?\s*$/gm, '')
    .replace(/^import\s+.+from\s+['"]@theme\/.+['"];?\s*$/gm, '');
}

function rewriteAssetPaths(source: string, docId?: string): string {
  let result = source
    .replace(/\]\(\.\/img\//g, '](/img/')
    .replace(/src="\.\/img\//g, 'src="/img/')
    .replace(/src='\.\/img\//g, "src='/img/");

  if (docId) {
    const dir = docId.includes('/') ? docId.slice(0, docId.lastIndexOf('/')) : '';
    const assetBase = `/content-assets/${dir}`;
    result = result
      .replace(/src="\.\/([^"]+)"/g, `src="${assetBase}/$1"`)
      .replace(/src='\.\/([^']+)'/g, `src='${assetBase}/$1'`)
      .replace(/\]\(\.\/([^)]+)\)/g, `](${assetBase}/$1)`);
  }

  return result;
}

export async function loadDoc(docId: string): Promise<LoadedDoc | null> {
  const located = await findDocFile(docId);
  if (!located) return null;

  const raw = await fs.readFile(located.filePath, 'utf8');

  if (located.format === 'html') {
    const { data, content: htmlBody } = matter(raw);
    const frontmatter = normalizeFrontmatter(data);
    const sanitizedHtml = rewriteAssetPaths(htmlBody, docId);
    const headings = extractHeadingsFromHtml(sanitizedHtml);

    return {
      id: docId,
      format: 'html',
      frontmatter,
      title: getDocTitle(frontmatter, docId),
      headings,
      content: (
        <div
          className="doc-content prose prose-slate dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
        />
      ),
    };
  }

  const cleaned = rewriteAssetPaths(stripDocusaurusImports(raw), docId);
  const { content, frontmatter: rawFrontmatter } = await compileMDX<DocFrontmatter>({
    source: cleaned,
    components: mdxComponents,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [remarkMath],
        rehypePlugins: [
          rehypeSlug,
          rehypeKatex,
          [rehypeSanitize, sanitizeSchema],
        ],
      },
    },
  });

  const frontmatter = normalizeFrontmatter(rawFrontmatter ?? {});
  const headings = extractHeadingsFromMarkdown(cleaned);

  return {
    id: docId,
    format: 'mdx',
    frontmatter,
    title: getDocTitle(frontmatter, docId),
    headings,
    content,
  };
}

export async function getStaticDocParams(): Promise<{ slug: string[] }[]> {
  return getAllDocIds().map((id) => ({
    slug: id.split('/'),
  }));
}

export function isInteractiveDoc(docId: string): boolean {
  return INTERACTIVE_MDX.has(docId);
}

export async function docExists(docId: string): Promise<boolean> {
  return (await findDocFile(docId)) !== null;
}
