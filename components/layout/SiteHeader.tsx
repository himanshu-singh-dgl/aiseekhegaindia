'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';
import { mainNav, isNavDropdown, type NavItem } from '@/config/navigation';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/cn';
import { Container } from '@/components/ui/Container';
import { SearchDialog } from '@/components/ui/SearchDialog';
import { ThemeToggle } from '@/components/ui/ThemeToggle';

function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <>
      {mainNav.map((item) => {
        if (isNavDropdown(item)) {
          return (
            <div key={item.label} className="group relative">
              <button
                type="button"
                className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-[var(--fg)] hover:bg-[var(--surface)]"
              >
                {item.label}
                <ChevronDown className="h-4 w-4" />
              </button>
              <div className="invisible absolute left-0 top-full z-50 min-w-56 rounded-lg border border-[var(--border)] bg-[var(--bg)] p-2 opacity-0 shadow-lg transition group-hover:visible group-hover:opacity-100">
                {item.items.map((sub) => (
                  <Link
                    key={sub.href}
                    href={sub.href}
                    onClick={onNavigate}
                    className="block rounded-md px-3 py-2 text-sm hover:bg-[var(--surface)]"
                  >
                    {sub.label}
                  </Link>
                ))}
              </div>
            </div>
          );
        }

        const isActive = pathname === item.href;
        if (item.external) {
          return (
            <a
              key={item.href}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg px-3 py-2 text-sm font-medium text-[var(--fg)] hover:bg-[var(--surface)]"
            >
              {item.label}
            </a>
          );
        }

        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={cn(
              'rounded-lg px-3 py-2 text-sm font-medium hover:bg-[var(--surface)]',
              isActive && 'bg-[var(--surface)] text-primary',
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </>
  );
}

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--border)] bg-[var(--header-bg)] backdrop-blur">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Image src={siteConfig.logo} alt={siteConfig.title} width={32} height={32} />
          <span>{siteConfig.title}</span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          <NavLinks />
        </nav>

        <div className="flex items-center gap-2">
          <SearchDialog />
          <ThemeToggle />
          <button
            type="button"
            className="rounded-lg border border-[var(--border)] p-2 lg:hidden"
            onClick={() => setMobileOpen((value) => !value)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </Container>

      {mobileOpen && (
        <div className="border-t border-[var(--border)] lg:hidden">
          <Container className="flex flex-col gap-1 py-3">
            <NavLinks onNavigate={() => setMobileOpen(false)} />
          </Container>
        </div>
      )}
    </header>
  );
}
