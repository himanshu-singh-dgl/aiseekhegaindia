export const siteConfig = {
  title: 'AISeekhegaIndia',
  tagline:
    'Community-driven platform for Machine Learning, Deep Learning, and Language Models',
  url: 'https://ai-ml-docs.org',
  baseUrl: '/',
  favicon: '/img/favicon.ico',
  organizationName: 'ai-ml-community',
  projectName: 'ai-ml-docs',
  editBaseUrl: 'https://github.com/ai-ml-community/ai-ml-docs/tree/main/',
  githubUrl: 'https://github.com/ai-ml-community/ai-ml-docs',
  socialImage: '/img/social-card.jpg',
  copyright: `Copyright © ${new Date().getFullYear()} Lex AI Technologies Pvt Ltd. 🌏❤️ Proudly built in India 🇮🇳`,
} as const;

export type SiteConfig = typeof siteConfig;
