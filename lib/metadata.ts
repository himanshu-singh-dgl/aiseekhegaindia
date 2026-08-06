import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';

type PageMeta = {
  title?: string;
  description?: string;
  path?: string;
};

export function createMetadata({ title, description, path = '' }: PageMeta): Metadata {
  const pageTitle = title ? `${title} | ${siteConfig.title}` : siteConfig.title;
  const pageDescription = description ?? siteConfig.tagline;
  const url = `${siteConfig.url}${path}`;

  return {
    metadataBase: new URL(siteConfig.url),
    title: pageTitle,
    description: pageDescription,
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url,
      siteName: siteConfig.title,
      images: [{ url: siteConfig.socialImage }],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description: pageDescription,
      images: [siteConfig.socialImage],
    },
    alternates: {
      canonical: url,
    },
  };
}
