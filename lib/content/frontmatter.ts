export type DocFrontmatter = {
  title?: string;
  description?: string;
  sidebar_label?: string;
  sidebar_position?: number;
  keywords?: string[];
  hide_table_of_contents?: boolean;
  [key: string]: unknown;
};

export function normalizeFrontmatter(data: Record<string, unknown>): DocFrontmatter {
  return {
    title: typeof data.title === 'string' ? data.title : undefined,
    description: typeof data.description === 'string' ? data.description : undefined,
    sidebar_label:
      typeof data.sidebar_label === 'string' ? data.sidebar_label : undefined,
    sidebar_position:
      typeof data.sidebar_position === 'number' ? data.sidebar_position : undefined,
    keywords: Array.isArray(data.keywords)
      ? data.keywords.filter((k): k is string => typeof k === 'string')
      : undefined,
    hide_table_of_contents:
      typeof data.hide_table_of_contents === 'boolean'
        ? data.hide_table_of_contents
        : undefined,
    ...data,
  };
}

export function getDocTitle(
  frontmatter: DocFrontmatter,
  fallbackSlug: string,
): string {
  if (frontmatter.title) return frontmatter.title;
  if (frontmatter.sidebar_label) return frontmatter.sidebar_label;
  const segment = fallbackSlug.split('/').pop() ?? fallbackSlug;
  return segment
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());
}
