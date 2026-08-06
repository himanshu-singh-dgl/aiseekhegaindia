import Link from 'next/link';
import { footerLinks } from '@/config/navigation';
import { siteConfig } from '@/config/site';

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-white/10 bg-[#1b1b1d] text-[#e3e3e3]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {footerLinks.map((column) => (
            <div key={column.title}>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-white">
                {column.title}
              </h3>
              <ul className="space-y-3">
                {column.items.map((item) => (
                  <li key={`${column.title}-${item.label}`}>
                    {item.external ? (
                      <a
                        href={item.href}
                        className="text-sm text-[#a8a8a8] no-underline transition-colors hover:text-white"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {item.label}
                      </a>
                    ) : (
                      <Link
                        href={item.href}
                        className="text-sm text-[#a8a8a8] no-underline transition-colors hover:text-white"
                      >
                        {item.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-10 border-t border-white/10 pt-6 text-center text-sm text-[#a8a8a8]">
          {siteConfig.copyright}
        </div>
      </div>
    </footer>
  );
}
