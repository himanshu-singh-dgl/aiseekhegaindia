import Link from 'next/link';
import Image from 'next/image';

const navLinks = [
  {href: '/docs/ai-for-leaders/intro', label: 'Resources'},
  {href: '/fellowship', label: 'AI Fellowship'},
  {href: '/contribute', label: 'Contribute'},
];

const topicLinks = [
  {href: '/docs/ai-for-leaders/intro', label: 'AI for Leaders'},
  {href: '/docs/machine-learning/intro', label: 'Machine Learning'},
  {href: '/docs/deep-learning/intro', label: 'Deep Learning'},
  {href: '/docs/language-models/intro', label: 'Language Models'},
  {href: '/docs/resources/intro', label: 'Resources'},
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/95 backdrop-blur">
      <div className="flex w-full items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold text-zinc-900">
          <Image src="/img/logo.svg" alt="AISeekhegaIndia" width={32} height={32} />
          <span className="hidden sm:inline">AISeekhegaIndia</span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium text-zinc-700 md:flex">
          <div className="group relative">
            <button type="button" className="hover:text-orange-600">
              Topics
            </button>
            <div className="invisible absolute left-0 top-full z-50 min-w-[200px] rounded-lg border border-zinc-200 bg-white py-2 opacity-0 shadow-lg transition group-hover:visible group-hover:opacity-100">
              {topicLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block px-4 py-2 hover:bg-orange-50 hover:text-orange-600"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-orange-600">
              {link.label}
            </Link>
          ))}
          <a
            href="https://github.com/retiredbatmanforsale/aiseekhegaindia"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-orange-600"
          >
            GitHub
          </a>
        </nav>
      </div>
    </header>
  );
}
