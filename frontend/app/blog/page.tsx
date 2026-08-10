import type { Metadata } from 'next';
import Link from 'next/link';
import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { baseOptions } from '@/lib/layout.shared';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'AISeekhegaIndia blog',
};

export default function BlogIndexPage() {
  return (
    <HomeLayout {...baseOptions()}>
      <main className="mx-auto max-w-3xl px-4 py-12">
        <h1 className="mb-6 text-3xl font-bold">Blog</h1>
        <ul className="space-y-4">
          <li>
            <Link
              href="/blog/2024-04-24-welcome"
              className="text-lg font-medium underline"
            >
              Welcome
            </Link>
            <p className="text-fd-muted-foreground text-sm">24 April 2024</p>
          </li>
        </ul>
      </main>
    </HomeLayout>
  );
}
