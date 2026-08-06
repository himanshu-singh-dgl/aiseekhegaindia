import type { MetadataRoute } from 'next';
import { getAllDocIds } from '@/lib/content/docs-nav';
import { siteConfig } from '@/config/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const docs = getAllDocIds().map((id) => ({
    url: `${siteConfig.url}/docs/${id}`,
    lastModified: new Date(),
  }));

  return [
    { url: siteConfig.url, lastModified: new Date() },
    { url: `${siteConfig.url}/fellowship`, lastModified: new Date() },
    { url: `${siteConfig.url}/contribute`, lastModified: new Date() },
    { url: `${siteConfig.url}/blog`, lastModified: new Date() },
    { url: `${siteConfig.url}/blog/2024-04-24-welcome`, lastModified: new Date() },
    ...docs,
  ];
}
