import type { MDXComponents as MDXComponentsType } from 'mdx/types';
import type { ComponentPropsWithoutRef } from 'react';
import Link from 'next/link';
import CurriculumTree from '@/components/docs/CurriculumTree';
import LogisticRegressionTutorial from '@/components/tutorials/LogisticRegression/LogisticRegressionTutorial';

function isExternalHref(href: string): boolean {
  return (
    href.startsWith('http://') ||
    href.startsWith('https://') ||
    href.startsWith('mailto:') ||
    href.startsWith('//')
  );
}

function MDXLink({
  href = '',
  children,
  ...props
}: ComponentPropsWithoutRef<'a'>) {
  if (!href || isExternalHref(href)) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} {...props}>
      {children}
    </Link>
  );
}

function MDXImage({
  src = '',
  alt = '',
  ...props
}: ComponentPropsWithoutRef<'img'>) {
  // Colocated images are rewritten to /docs-assets/… in lib/mdx.ts.
  // Use native <img> so assets work without next/image remote config.
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      className="my-6 h-auto max-w-full rounded-md"
      {...props}
    />
  );
}

function Pre({ children, ...props }: ComponentPropsWithoutRef<'pre'>) {
  return (
    <pre
      className="my-6 overflow-x-auto rounded-lg border border-[var(--color-border)] bg-[var(--color-code-bg,rgba(0,0,0,0.04))] p-4 text-sm"
      {...props}
    >
      {children}
    </pre>
  );
}

/** Component map passed to next-mdx-remote/rsc. Client islands are imported as client modules. */
export const mdxComponents: MDXComponentsType = {
  a: MDXLink,
  img: MDXImage,
  pre: Pre,
  CurriculumTree,
  LogisticRegressionTutorial,
};
