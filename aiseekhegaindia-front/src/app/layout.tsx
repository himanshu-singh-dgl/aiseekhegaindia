import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { siteConfig } from "@/lib/site";
import "katex/dist/katex.min.css";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.tagline,
  icons: {
    icon: "/img/favicon.ico",
  },
  openGraph: {
    images: ["/img/social-card.jpg"],
  },
};

const themeBootstrap = `
  (() => {
    try {
      const stored = localStorage.getItem("theme");
      const query = new URLSearchParams(location.search).get("docusaurus-theme");
      const systemDark = matchMedia("(prefers-color-scheme: dark)").matches;
      const theme = stored === "light" || stored === "dark"
        ? stored
        : query === "light" || query === "dark"
          ? query
          : systemDark ? "dark" : "light";
      document.documentElement.dataset.theme = theme;
      document.documentElement.style.colorScheme = theme;
    } catch {
      document.documentElement.dataset.theme = "light";
    }
  })();
`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootstrap }} />
      </head>
      <body className="flex min-h-full flex-col">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <footer className="site-footer py-6 text-center text-xs">
          Copyright © {new Date().getFullYear()} Lex AI Technologies Pvt Ltd · Migrating from
          Docusaurus to Next.js
        </footer>
      </body>
    </html>
  );
}
