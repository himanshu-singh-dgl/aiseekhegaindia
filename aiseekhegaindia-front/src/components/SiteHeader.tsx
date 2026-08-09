"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { navbarItems, type NavbarItem, type NavbarLink } from "@/lib/site";
import styles from "./SiteHeader.module.css";
import { AuthControls } from "./AuthControls";

const THEME_EVENT = "aiseekhegaindia-theme-change";

function subscribeToTheme(onChange: () => void) {
  const media = window.matchMedia("(prefers-color-scheme: dark)");
  media.addEventListener("change", onChange);
  window.addEventListener("storage", onChange);
  window.addEventListener(THEME_EVENT, onChange);

  return () => {
    media.removeEventListener("change", onChange);
    window.removeEventListener("storage", onChange);
    window.removeEventListener(THEME_EVENT, onChange);
  };
}

function getTheme() {
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

function useTheme() {
  return useSyncExternalStore(subscribeToTheme, getTheme, () => "light");
}

function setTheme(theme: "light" | "dark") {
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
  localStorage.setItem("theme", theme);
  window.dispatchEvent(new Event(THEME_EVENT));
}

function isExactPath(pathname: string, href: string) {
  const normalizedPath = pathname.replace(/\/$/, "") || "/";
  const normalizedHref = href.replace(/\/$/, "") || "/";
  return normalizedPath === normalizedHref;
}

function isItemActive(item: NavbarItem | NavbarLink, pathname: string) {
  if ("activeSection" in item && item.activeSection === "docs") {
    return pathname === "/docs" || pathname.startsWith("/docs/");
  }
  return item.href !== "#" && isExactPath(pathname, item.href);
}

function ExternalIcon() {
  return (
    <svg
      className={styles.externalIcon}
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M14 3h7v7m0-7-9 9M10 5H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5" />
    </svg>
  );
}

function NavLink({
  item,
  pathname,
  className,
  onNavigate,
}: {
  item: NavbarLink;
  pathname: string;
  className: string;
  onNavigate?: () => void;
}) {
  const active = isItemActive(item, pathname);
  const content: ReactNode = (
    <>
      {item.label}
      {item.external ? <ExternalIcon /> : null}
    </>
  );

  if (item.external) {
    return (
      <a
        href={item.href}
        className={className}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onNavigate}
      >
        {content}
      </a>
    );
  }

  return (
    <Link
      href={item.href}
      className={`${className} ${active ? styles.active : ""}`}
      aria-current={active ? "page" : undefined}
      onClick={onNavigate}
    >
      {content}
    </Link>
  );
}

function ThemeToggle({ className = "" }: { className?: string }) {
  const theme = useTheme();
  const nextTheme = theme === "dark" ? "light" : "dark";

  return (
    <button
      type="button"
      className={`${styles.themeToggle} ${className}`}
      onClick={() => setTheme(nextTheme)}
      aria-label={`Switch to ${nextTheme} mode`}
      title={`Switch to ${nextTheme} mode`}
    >
      {theme === "dark" ? (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />
        </svg>
      )}
    </button>
  );
}

function DesktopItem({
  item,
  pathname,
  openDropdown,
  setOpenDropdown,
}: {
  item: NavbarItem;
  pathname: string;
  openDropdown: string | null;
  setOpenDropdown: (label: string | null) => void;
}) {
  if (!item.items) {
    return (
      <NavLink item={item} pathname={pathname} className={styles.navLink} />
    );
  }

  const open = openDropdown === item.label;
  const onTriggerKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (["Enter", " ", "ArrowDown"].includes(event.key)) {
      event.preventDefault();
      setOpenDropdown(open ? null : item.label);
    }
    if (event.key === "Escape") setOpenDropdown(null);
  };

  return (
    <div
      className={styles.dropdown}
      onMouseEnter={() => setOpenDropdown(item.label)}
      onMouseLeave={() => setOpenDropdown(null)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setOpenDropdown(null);
        }
      }}
    >
      <button
        type="button"
        className={styles.navLink}
        aria-haspopup="true"
        aria-expanded={open}
        onClick={() => setOpenDropdown(open ? null : item.label)}
        onKeyDown={onTriggerKeyDown}
      >
        {item.label}
        <span className={styles.caret} aria-hidden="true" />
      </button>
      <ul className={`${styles.dropdownMenu} ${open ? styles.dropdownOpen : ""}`}>
        {item.items.map((child) => (
          <li key={child.href}>
            <NavLink
              item={child}
              pathname={pathname}
              className={styles.dropdownLink}
              onNavigate={() => setOpenDropdown(null)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

function MobileItem({
  item,
  pathname,
  onNavigate,
}: {
  item: NavbarItem;
  pathname: string;
  onNavigate: () => void;
}) {
  const childActive = item.items?.some((child) => isItemActive(child, pathname));
  const [expanded, setExpanded] = useState(Boolean(childActive));

  if (!item.items) {
    return (
      <NavLink
        item={item}
        pathname={pathname}
        className={styles.mobileLink}
        onNavigate={onNavigate}
      />
    );
  }

  return (
    <div>
      <button
        type="button"
        className={styles.mobileLink}
        aria-expanded={expanded}
        onClick={() => setExpanded((value) => !value)}
      >
        {item.label}
        <span
          className={`${styles.mobileCaret} ${expanded ? styles.mobileCaretOpen : ""}`}
          aria-hidden="true"
        />
      </button>
      {expanded ? (
        <ul className={styles.mobileSubmenu}>
          {item.items.map((child) => (
            <li key={child.href}>
              <NavLink
                item={child}
                pathname={pathname}
                className={styles.mobileSublink}
                onNavigate={onNavigate}
              />
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const closeDropdown = (event: MouseEvent | TouchEvent | FocusEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };
    const closeOnEscape = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenDropdown(null);
        setMobileOpen(false);
      }
    };
    document.addEventListener("mousedown", closeDropdown);
    document.addEventListener("touchstart", closeDropdown);
    document.addEventListener("focusin", closeDropdown);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("mousedown", closeDropdown);
      document.removeEventListener("touchstart", closeDropdown);
      document.removeEventListener("focusin", closeDropdown);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [mobileOpen]);

  const closeMobile = () => setMobileOpen(false);

  return (
    <header ref={headerRef} className={styles.header}>
      <nav className={styles.navbar} aria-label="Main">
        <div className={styles.leftItems}>
          <button
            type="button"
            className={styles.menuToggle}
            aria-label="Toggle navigation bar"
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMobileOpen(true)}
          >
            <span />
            <span />
            <span />
          </button>
          <Link href="/" className={styles.brand} aria-label="AISeekhegaIndia home">
            {/* The source logo intentionally includes its original white backing. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/img/logo.svg" alt="AISeekhegaIndia" />
          </Link>
          <div className={styles.desktopItems}>
            {navbarItems.left.map((item) => (
              <DesktopItem
                key={item.label}
                item={item}
                pathname={pathname}
                openDropdown={openDropdown}
                setOpenDropdown={setOpenDropdown}
              />
            ))}
          </div>
        </div>
        <div className={styles.rightItems}>
          {navbarItems.right.map((item) => (
            <NavLink
              key={item.label}
              item={item}
              pathname={pathname}
              className={styles.navLink}
            />
          ))}
          <AuthControls />
          <ThemeToggle className={styles.desktopThemeToggle} />
        </div>
      </nav>

      <div
        className={`${styles.backdrop} ${mobileOpen ? styles.backdropOpen : ""}`}
        onClick={closeMobile}
        aria-hidden="true"
      />
      <aside
        id="mobile-navigation"
        className={`${styles.mobileSidebar} ${mobileOpen ? styles.mobileSidebarOpen : ""}`}
        aria-hidden={!mobileOpen}
      >
        <div className={styles.mobileHeader}>
          <Link href="/" className={styles.brand} onClick={closeMobile}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/img/logo.svg" alt="AISeekhegaIndia" />
          </Link>
          <div className={styles.mobileHeaderActions}>
            <AuthControls />
            <ThemeToggle />
            <button
              type="button"
              className={styles.closeButton}
              aria-label="Close navigation bar"
              onClick={closeMobile}
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
        </div>
        <div className={styles.mobileMenu}>
          {[...navbarItems.left, ...navbarItems.right].map((item) => (
            <MobileItem
              key={item.label}
              item={item}
              pathname={pathname}
              onNavigate={closeMobile}
            />
          ))}
        </div>
      </aside>
    </header>
  );
}
