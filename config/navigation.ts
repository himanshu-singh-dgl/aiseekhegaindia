import { siteConfig } from './site';

export type NavLink = {
  label: string;
  href: string;
  external?: boolean;
};

export type NavDropdown = {
  label: string;
  items: NavLink[];
};

export type NavItem = NavLink | NavDropdown;

export function isNavDropdown(item: NavItem): item is NavDropdown {
  return 'items' in item;
}

export const mainNav: NavItem[] = [
  { label: 'Resources', href: '/docs/resources/intro' },
  {
    label: 'Topics',
    items: [
      { label: 'AI for Leaders', href: '/docs/ai-for-leaders/intro' },
      { label: 'Machine Learning', href: '/docs/machine-learning/intro' },
      { label: 'Deep Learning', href: '/docs/deep-learning/intro' },
      { label: 'Language Models', href: '/docs/language-models/intro' },
      { label: 'Resources', href: '/docs/resources/intro' },
    ],
  },
  { label: 'AI Fellowship', href: '/fellowship' },
  {
    label: 'Tutorials',
    items: [
      {
        label: 'Interactive Logistic Regression',
        href: '/docs/tutorials/logistic-regression',
      },
    ],
  },
  { label: 'GitHub', href: siteConfig.github, external: true },
  { label: 'Contribute', href: '/contribute' },
];

export const footerColumns = [
  {
    title: 'Docs',
    items: [
      { label: 'AI for Leaders', href: '/docs/ai-for-leaders/intro' },
      { label: 'Machine Learning', href: '/docs/machine-learning/intro' },
      { label: 'Deep Learning', href: '/docs/deep-learning/intro' },
      { label: 'Language Models', href: '/docs/language-models/intro' },
    ],
  },
  {
    title: 'Community',
    items: [
      {
        label: 'GitHub Discussions',
        href: 'https://github.com/ai-ml-community/ai-ml-docs/discussions',
        external: true,
      },
      {
        label: 'Join our Discord community here',
        href: 'https://discord.gg/QtzYHmfw',
        external: true,
      },
      {
        label: 'Twitter',
        href: 'https://x.com/labs_ai80315',
        external: true,
      },
    ],
  },
  {
    title: 'More',
    items: [
      { label: 'Blog', href: '/blog' },
      { label: 'GitHub', href: siteConfig.github, external: true },
      { label: 'Contribute', href: '/contribute' },
    ],
  },
];
