import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const docsRoot = path.join(process.cwd(), "content/docs");

export type DocMeta = {
  slug: string;
  title: string;
  description?: string;
};

export function getDocSlugs(): string[] {
  const slugs: string[] = [];

  function walk(dir: string, prefix = "") {
    if (!fs.existsSync(dir)) return;
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      if (entry.name.startsWith(".")) continue;
      const rel = prefix ? `${prefix}/${entry.name}` : entry.name;
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(full, rel);
      } else if (/\.(mdx|md)$/.test(entry.name)) {
        slugs.push(rel.replace(/\.(mdx|md)$/, ""));
      }
    }
  }

  walk(docsRoot);
  return slugs;
}

export function getDocBySlug(slug: string) {
  const mdxPath = path.join(docsRoot, `${slug}.mdx`);
  const mdPath = path.join(docsRoot, `${slug}.md`);
  const filePath = fs.existsSync(mdxPath) ? mdxPath : mdPath;
  if (!fs.existsSync(filePath)) {
    return null;
  }
  const raw = fs.readFileSync(filePath, "utf8");
  const { content, data } = matter(raw);
  const title =
    (typeof data.title === "string" && data.title) ||
    content.match(/^#\s+(.+)$/m)?.[1] ||
    slug.split("/").pop() ||
    slug;

  return {
    slug,
    frontMatter: data as Record<string, unknown>,
    title,
    description: typeof data.description === "string" ? data.description : undefined,
    content,
  };
}
