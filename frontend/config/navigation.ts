export type NavLink = {
  label: string;
  href: string;
  external?: boolean;
};

export type NavDropdown = {
  label: string;
  items: NavLink[];
};

export type NavItem =
  | ({ type: 'link' } & NavLink)
  | ({ type: 'dropdown' } & NavDropdown);

export const navbarLogo = {
  alt: 'AISeekhegaIndia',
  src: '/img/logo.svg',
  href: '/',
} as const;

export const navbarItems: NavItem[] = [
  {
    type: 'link',
    label: 'Resources',
    // Docusaurus docSidebar item → first docsSidebar entry
    href: '/docs/ai-for-leaders/intro',
  },
  {
    type: 'dropdown',
    label: 'Topics',
    items: [
      { label: 'AI for Leaders', href: '/docs/ai-for-leaders/intro' },
      { label: 'Machine Learning', href: '/docs/machine-learning/intro' },
      { label: 'Deep Learning', href: '/docs/deep-learning/intro' },
      { label: 'Language Models', href: '/docs/language-models/intro' },
      { label: 'Resources', href: '/docs/resources/intro' },
    ],
  },
  {
    type: 'link',
    label: 'AI Fellowship',
    href: '/fellowship',
  },
  {
    type: 'dropdown',
    label: 'Tutorials',
    items: [
      {
        label: 'Interactive Logistic Regression',
        href: '/docs/tutorials/logistic-regression',
      },
    ],
  },
  {
    type: 'link',
    label: 'GitHub',
    href: 'https://github.com/ai-ml-community/ai-ml-docs',
    external: true,
  },
  {
    type: 'link',
    label: 'Contribute',
    href: '/contribute',
  },
];

export type FooterColumn = {
  title: string;
  items: NavLink[];
};

export const footerLinks: FooterColumn[] = [
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
      {
        label: 'GitHub',
        href: 'https://github.com/ai-ml-community/ai-ml-docs',
        external: true,
      },
      { label: 'Contribute', href: '/contribute' },
    ],
  },
];
