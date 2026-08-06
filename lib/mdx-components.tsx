import type { MDXComponents } from 'mdx/types';
import Link from 'next/link';
import LogisticRegressionTutorial from '@/components/features/logistic-regression/LogisticRegressionTutorial';
import CurriculumTree from '@/components/features/curriculum-tree/CurriculumTree';

export const mdxComponents: MDXComponents = {
  a: ({ href, children, ...props }) => {
    const isExternal = href?.startsWith('http');
    if (isExternal) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href ?? '#'} {...props}>
        {children}
      </Link>
    );
  },
  LogisticRegressionTutorial,
  CurriculumTree,
};
