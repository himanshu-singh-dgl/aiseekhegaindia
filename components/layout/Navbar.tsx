'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ChevronDown, Menu, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import {
  navbarItems,
  navbarLogo,
  type NavItem,
} from '@/config/navigation';
import ThemeToggle from '@/components/layout/ThemeToggle';

function Dropdown({ item }: { item: Extract<NavItem, { type: 'dropdown' }> }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onPointerDown(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', onPointerDown);
    return () => document.removeEventListener('mousedown', onPointerDown);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        className="inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-[var(--color-foreground)] transition-colors hover:bg-black/5 dark:hover:bg-white/10"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        {item.label}
        <ChevronDown
          className={clsx('h-4 w-4 transition-transform', open && 'rotate-180')}
        />
      </button>
      {open && (
        <div className="absolute left-0 top-full z-[var(--z-overlay)] mt-1 min-w-56 rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] py-2 shadow-lg">
          {item.items.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block px-4 py-2 text-sm text-[var(--color-foreground)] no-underline hover:bg-black/5 dark:hover:bg-white/10"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

function NavLinkItem({ item }: { item: Extract<NavItem, { type: 'link' }> }) {
  const className =
    'rounded-md px-3 py-2 text-sm font-medium text-[var(--color-foreground)] no-underline transition-colors hover:bg-black/5 dark:hover:bg-white/10';

  if (item.external) {
    return (
      <a
        href={item.href}
        className={className}
        target="_blank"
        rel="noopener noreferrer"
      >
        {item.label}
      </a>
    );
  }

  return (
    <Link href={item.href} className={className}>
      {item.label}
    </Link>
  );
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const leftItems = navbarItems.filter(
    (item) =>
      item.type === 'dropdown' ||
      (item.type === 'link' &&
        item.label !== 'GitHub' &&
        item.label !== 'Contribute'),
  );
  const rightItems = navbarItems.filter(
    (item) =>
      item.type === 'link' &&
      (item.label === 'GitHub' || item.label === 'Contribute'),
  );

  return (
    <header className="sticky top-0 z-[var(--z-fixed)] border-b border-[var(--color-border)] bg-[var(--color-background)]/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-6">
          <Link href={navbarLogo.href} className="flex items-center gap-2 no-underline">
            <Image
              src={navbarLogo.src}
              alt={navbarLogo.alt}
              width={32}
              height={32}
              className="h-8 w-8"
              priority
            />
            <span className="text-base font-semibold text-[var(--color-foreground)]">
              {navbarLogo.alt}
            </span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {leftItems.map((item) =>
              item.type === 'dropdown' ? (
                <Dropdown key={item.label} item={item} />
              ) : (
                <NavLinkItem key={item.label} item={item} />
              ),
            )}
          </nav>
        </div>

        <div className="flex items-center gap-1">
          <nav className="hidden items-center gap-1 lg:flex">
            {rightItems.map((item) =>
              item.type === 'link' ? (
                <NavLinkItem key={item.label} item={item} />
              ) : null,
            )}
          </nav>
          <ThemeToggle />
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-md text-[var(--color-foreground)] hover:bg-black/5 lg:hidden dark:hover:bg-white/10"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMobileOpen((value) => !value)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-[var(--color-border)] bg-[var(--color-background)] lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4">
            {navbarItems.map((item) => {
              if (item.type === 'link') {
                return (
                  <div key={item.label} onClick={() => setMobileOpen(false)}>
                    <NavLinkItem item={item} />
                  </div>
                );
              }

              return (
                <div key={item.label} className="px-3 py-2">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[var(--color-muted)]">
                    {item.label}
                  </p>
                  <div className="flex flex-col gap-1">
                    {item.items.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="rounded-md px-2 py-2 text-sm text-[var(--color-foreground)] no-underline hover:bg-black/5 dark:hover:bg-white/10"
                        onClick={() => setMobileOpen(false)}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
