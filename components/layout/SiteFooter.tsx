import Link from 'next/link';
import { footerColumns } from '@/config/navigation';
import { siteConfig } from '@/config/site';
import { Container } from '@/components/ui/Container';

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-[var(--border)] bg-[var(--footer-bg)] text-[var(--footer-fg)]">
      <Container className="grid gap-8 py-12 md:grid-cols-4">
        <div>
          <p className="text-lg font-semibold">{siteConfig.title}</p>
          <p className="mt-2 text-sm text-white/70">{siteConfig.tagline}</p>
        </div>
        {footerColumns.map((column) => (
          <div key={column.title}>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-white/90">
              {column.title}
            </h3>
            <ul className="space-y-2 text-sm">
              {column.items.map((item) => (
                <li key={item.href}>
                  {item.external ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/70 hover:text-white"
                    >
                      {item.label}
                    </a>
                  ) : (
                    <Link href={item.href} className="text-white/70 hover:text-white">
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Container>
      <div className="border-t border-white/10 py-4 text-center text-sm text-white/60">
        {siteConfig.copyright}
      </div>
    </footer>
  );
}
