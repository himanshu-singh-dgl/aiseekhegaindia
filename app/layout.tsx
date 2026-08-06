import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import 'katex/dist/katex.min.css';
import '@/styles/globals.css';
import { RootProviders } from '@/components/providers/RootProviders';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { createMetadata } from '@/lib/metadata';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = createMetadata({});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <body className="flex min-h-screen flex-col">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <RootProviders>
          <SiteHeader />
          <div id="main-content" className="flex-1">
            {children}
          </div>
          <SiteFooter />
        </RootProviders>
      </body>
    </html>
  );
}
