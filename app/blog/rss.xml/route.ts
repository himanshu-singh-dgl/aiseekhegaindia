import { getAllBlogPosts } from '@/lib/blog';
import { siteConfig } from '@/config/site';

export const dynamic = 'force-static';

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export async function GET() {
  const posts = getAllBlogPosts();
  const lastBuildDate =
    posts[0]?.date != null
      ? new Date(`${posts[0].date}T00:00:00Z`).toUTCString()
      : new Date().toUTCString();

  const items = posts
    .map((post) => {
      const link = `${siteConfig.url}${post.href}`;
      const pubDate = new Date(`${post.date}T00:00:00Z`).toUTCString();
      const description = escapeXml(post.description || '');
      const categories = post.tags
        .map((tag) => `<category>${escapeXml(tag)}</category>`)
        .join('');

      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <pubDate>${pubDate}</pubDate>
      ${post.author ? `<author>${escapeXml(post.author)}</author>` : ''}
      <description>${description}</description>
      ${categories}
    </item>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escapeXml(siteConfig.title)} Blog</title>
    <link>${siteConfig.url}/blog</link>
    <description>${escapeXml(siteConfig.tagline)}</description>
    <language>en-us</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
