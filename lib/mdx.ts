import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { compileMDX } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrettyCode from 'rehype-pretty-code';
import type { ReactElement } from 'react';
import { mdxComponents } from '@/components/mdx/MDXComponents';

export type DocFrontmatter = {
  title?: string;
  description?: string;
  keywords?: string[] | string;
  sidebar_position?: number;
  [key: string]: unknown;
};

export type TocItem = {
  id: string;
  text: string;
  level: number;
};

const DOCS_CONTENT_DIR = path.join(process.cwd(), 'content/docs');

/** Strip MDX imports that we inject via the component map (next-mdx-remote does not bundle them). */
function stripMappedImports(source: string): string {
  return source.replace(
    /^import\s+(?:CurriculumTree|LogisticRegressionTutorial)\s+from\s+['"][^'"]+['"];?\s*$/gm,
    '',
  );
}

/** Remove the first H1 so the page shell can own the document title. */
function stripLeadingH1(source: string): string {
  return source.replace(/^\s*#\s+.+\n+/, '');
}

/**
 * Rewrite relative markdown/HTML image paths to `/docs-assets/<docDir>/…`
 * so colocated PNGs resolve via the public symlink.
 */
function rewriteRelativeImages(source: string, slug: string): string {
  const dir = path.posix.dirname(slug);
  const base = dir === '.' ? '' : `${dir}/`;

  const resolve = (src: string): string => {
    if (
      !src ||
      src.startsWith('http://') ||
      src.startsWith('https://') ||
      src.startsWith('//') ||
      src.startsWith('/') ||
      src.startsWith('data:')
    ) {
      return src;
    }
    const cleaned = src.replace(/^\.\//, '');
    return `/docs-assets/${base}${cleaned}`;
  };

  let out = source.replace(
    /!\[([^\]]*)\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g,
    (_match, alt: string, src: string) => `![${alt}](${resolve(src)})`,
  );

  out = out.replace(
    /(<img\b[^>]*\bsrc=["'])([^"']+)(["'])/gi,
    (_match, pre: string, src: string, post: string) =>
      `${pre}${resolve(src)}${post}`,
  );

  return out;
}

function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-');
}

/** Extract TOC from markdown headings (h2–h4). */
export function extractToc(source: string): TocItem[] {
  const toc: TocItem[] = [];
  const headingRe = /^(#{2,4})\s+(.+)$/gm;
  let match: RegExpExecArray | null;
  while ((match = headingRe.exec(source)) !== null) {
    const level = match[1].length;
    const text = match[2].replace(/#+\s*$/, '').replace(/[*_`]/g, '').trim();
    if (!text) continue;
    toc.push({ id: slugifyHeading(text), text, level });
  }
  return toc;
}

export function extractTitleFromSource(source: string): string | undefined {
  const match = source.match(/^#\s+(.+)$/m);
  return match?.[1]?.replace(/[*_`]/g, '').trim();
}

export function readDocFile(filePath: string): {
  frontmatter: DocFrontmatter;
  content: string;
} {
  const raw = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(raw);
  return {
    frontmatter: data as DocFrontmatter,
    content,
  };
}

export async function compileDocMdx(
  source: string,
  slug: string,
): Promise<ReactElement> {
  const prepared = rewriteRelativeImages(
    stripLeadingH1(stripMappedImports(source)),
    slug,
  );

  const { content } = await compileMDX({
    source: prepared,
    components: mdxComponents,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm, remarkMath],
        rehypePlugins: [
          rehypeSlug,
          [
            rehypeAutolinkHeadings,
            {
              behavior: 'wrap',
              properties: {
                className: ['anchor-link'],
              },
            },
          ],
          rehypeKatex,
          [
            rehypePrettyCode,
            {
              theme: {
                light: 'github-light',
                dark: 'github-dark',
              },
              keepBackground: false,
            },
          ],
        ],
      },
    },
  });

  return content;
}

export { DOCS_CONTENT_DIR };
