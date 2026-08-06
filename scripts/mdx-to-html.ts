import fs from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkMath from 'remark-math';
import remarkRehype from 'remark-rehype';
import rehypeKatex from 'rehype-katex';
import rehypeSlug from 'rehype-slug';
import rehypeStringify from 'rehype-stringify';

const CONTENT_DIR = path.join(process.cwd(), 'content/docs');
const KEEP_MDX = new Set([
  'ai-for-leaders/curriculum-tree',
  'tutorials/logistic-regression',
]);

async function walk(dir: string): Promise<string[]> {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files: string[] = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(fullPath)));
    else if (entry.name.endsWith('.mdx') || entry.name.endsWith('.md')) files.push(fullPath);
  }
  return files;
}

function stripImports(source: string): string {
  return source.replace(/^import\s+.+from\s+['"].+['"];?\s*$/gm, '');
}

async function convertFile(filePath: string) {
  const relative = path.relative(CONTENT_DIR, filePath).replace(/\\/g, '/');
  const docId = relative.replace(/\.(mdx|md)$/, '');

  if (KEEP_MDX.has(docId)) {
    console.log(`skip interactive: ${docId}`);
    return;
  }

  const raw = await fs.readFile(filePath, 'utf8');
  const { data, content } = matter(raw);
  const cleaned = stripImports(content);

  const html = String(
    await unified()
      .use(remarkParse)
      .use(remarkMath)
      .use(remarkRehype, { allowDangerousHtml: false })
      .use(rehypeSlug)
      .use(rehypeKatex)
      .use(rehypeStringify)
      .process(cleaned),
  );

  const outPath = path.join(CONTENT_DIR, `${docId}.html`);
  const output = matter.stringify(html, data);
  await fs.writeFile(outPath, output);
  await fs.unlink(filePath);
  console.log(`converted: ${docId}`);
}

async function main() {
  const files = await walk(CONTENT_DIR);
  for (const file of files) {
    await convertFile(file);
  }
  console.log(`Converted ${files.length - KEEP_MDX.size} docs to HTML`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
