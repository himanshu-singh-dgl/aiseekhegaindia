import fs from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';
import { getAllDocIds } from '../lib/content/docs-nav';
import { mainNav, footerColumns } from '../config/navigation';

const CONTENT_DIR = path.join(process.cwd(), 'content/docs');
const INTERACTIVE = new Set([
  'ai-for-leaders/curriculum-tree',
  'tutorials/logistic-regression',
]);

function collectNavLinks(): string[] {
  const links: string[] = ['/', '/fellowship', '/contribute', '/blog', '/blog/2024-04-24-welcome'];

  for (const item of mainNav) {
    if ('href' in item) links.push(item.href);
    else item.items.forEach((sub) => links.push(sub.href));
  }

  for (const column of footerColumns) {
    column.items.forEach((item) => links.push(item.href));
  }

  getAllDocIds().forEach((id) => links.push(`/docs/${id}`));
  return [...new Set(links.filter((link) => link.startsWith('/')))];
}

function extractInternalLinks(content: string): string[] {
  const links: string[] = [];
  const markdownLink = /\]\((\/[^)]+)\)/g;
  const htmlLink = /href="(\/[^"]+)"/g;
  let match: RegExpExecArray | null;

  while ((match = markdownLink.exec(content)) !== null) links.push(match[1]);
  while ((match = htmlLink.exec(content)) !== null) links.push(match[1]);

  return links;
}

async function readDocContent(docId: string): Promise<string | null> {
  const base = path.join(CONTENT_DIR, docId);
  for (const ext of ['.html', '.mdx', '.md']) {
    try {
      return await fs.readFile(`${base}${ext}`, 'utf8');
    } catch {
      // continue
    }
  }
  return null;
}

async function main() {
  const required = collectNavLinks();
  const broken: string[] = [];

  for (const href of required) {
    if (href.startsWith('/docs/')) {
      const docId = href.replace('/docs/', '');
      const content = await readDocContent(docId);
      if (!content) broken.push(href);
    }
  }

  for (const docId of getAllDocIds()) {
    const raw = await readDocContent(docId);
    if (!raw) continue;
    const { content } = matter(raw);
    for (const link of extractInternalLinks(content)) {
      if (link.startsWith('/docs/')) {
        const target = link.replace('/docs/', '');
        const exists = await readDocContent(target);
        if (!exists) broken.push(`${docId} -> ${link}`);
      }
    }
  }

  if (broken.length > 0) {
    console.error('Broken internal links found:');
    broken.forEach((item) => console.error(`  - ${item}`));
    process.exit(1);
  }

  console.log(`Link check passed (${required.length} parity URLs, ${INTERACTIVE.size} interactive docs)`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
