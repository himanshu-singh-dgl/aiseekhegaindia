export type TocHeading = {
  id: string;
  text: string;
  level: number;
};

export function extractHeadingsFromHtml(html: string): TocHeading[] {
  const headings: TocHeading[] = [];
  const regex = /<h([2-4])[^>]*(?:id="([^"]*)")?[^>]*>([\s\S]*?)<\/h\1>/gi;

  let match: RegExpExecArray | null;
  while ((match = regex.exec(html)) !== null) {
    const level = Number(match[1]);
    const text = match[3].replace(/<[^>]+>/g, '').trim();
    const id =
      match[2] ||
      text
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-');
    if (text) headings.push({ id, text, level });
  }

  return headings;
}

export function extractHeadingsFromMarkdown(markdown: string): TocHeading[] {
  const headings: TocHeading[] = [];
  const lines = markdown.split('\n');

  for (const line of lines) {
    const match = /^(#{2,4})\s+(.+)$/.exec(line.trim());
    if (!match) continue;
    const level = match[1].length;
    const text = match[2].replace(/\{#.+\}$/, '').trim();
    const id = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-');
    headings.push({ id, text, level });
  }

  return headings;
}
