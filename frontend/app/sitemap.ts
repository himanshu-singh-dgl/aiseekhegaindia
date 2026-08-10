import type { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site';
import { getAllDocs } from '@/lib/docs';
import { getAllBlogPosts, getAllTags } from '@/lib/blog';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: base,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${base}/fellowship`,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${base}/contribute`,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${base}/blog`,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${base}/blog/tags`,
      changeFrequency: 'weekly',
      priority: 0.5,
    },
  ];

  const docRoutes: MetadataRoute.Sitemap = getAllDocs().map((doc) => ({
    url: `${base}/docs/${doc.slug}`,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  const blogRoutes: MetadataRoute.Sitemap = getAllBlogPosts().map((post) => ({
    url: `${base}${post.href}`,
    lastModified: new Date(`${post.date}T00:00:00Z`),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  const tagRoutes: MetadataRoute.Sitemap = getAllTags().map(({ slug }) => ({
    url: `${base}/blog/tags/${slug}`,
    changeFrequency: 'weekly' as const,
    priority: 0.4,
  }));

  return [...staticRoutes, ...docRoutes, ...blogRoutes, ...tagRoutes];
}
