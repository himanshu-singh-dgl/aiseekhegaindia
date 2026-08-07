import Link from 'next/link';

const footerSections = [
  {
    title: 'Docs',
    links: [
      {href: '/docs/ai-for-leaders/intro', label: 'AI for Leaders'},
      {href: '/docs/machine-learning/intro', label: 'Machine Learning'},
      {href: '/docs/deep-learning/intro', label: 'Deep Learning'},
      {href: '/docs/language-models/intro', label: 'Language Models'},
    ],
  },
  {
    title: 'Community',
    links: [
      {
        href: 'https://github.com/retiredbatmanforsale/aiseekhegaindia/discussions',
        label: 'GitHub Discussions',
        external: true,
      },
      {href: 'https://discord.gg/QtzYHmfw', label: 'Discord', external: true},
      {href: 'https://x.com/labs_ai80315', label: 'Twitter', external: true},
    ],
  },
  {
    title: 'More',
    links: [
      {href: '/contribute', label: 'Contribute'},
      {
        href: 'https://github.com/retiredbatmanforsale/aiseekhegaindia',
        label: 'GitHub',
        external: true,
      },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-zinc-800 bg-zinc-900 text-zinc-300">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:grid-cols-3 sm:px-6">
        {footerSections.map((section) => (
          <div key={section.title}>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-white">
              {section.title}
            </h3>
            <ul className="space-y-2 text-sm">
              {section.links.map((link) => (
                <li key={link.label}>
                  {'external' in link && link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-orange-400"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link href={link.href} className="hover:text-orange-400">
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-zinc-800 px-4 py-6 text-center text-sm text-zinc-500">
        Copyright © {new Date().getFullYear()} Lex AI Technologies Pvt Ltd. Proudly built in India
      </div>
    </footer>
  );
}
