import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import Link from 'next/link';
import CurriculumTree from '@/components/CurriculumTree';
import LogisticRegressionTutorial from '@/components/LogisticRegression/LogisticRegressionTutorial';

const components = {
  a: (props: React.ComponentProps<'a'>) => {
    const href = props.href ?? '';
    if (href.startsWith('/')) {
      return <Link href={href}>{props.children}</Link>;
    }
    return <a {...props} />;
  },
  CurriculumTree,
  LogisticRegressionTutorial,
};

function stripSiteComponentImports(source: string) {
  return source.replace(
    /^import\s+\w+\s+from\s+['"]@site\/src\/components\/[^'"]+['"];?\s*$/gm,
    '',
  );
}

export function MdxContent({ source }: { source: string }) {
  const prepared = stripSiteComponentImports(source);
  return (
    <div className="prose prose-neutral max-w-none dark:prose-invert">
      <MDXRemote
        source={prepared}
        components={components}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkMath],
            rehypePlugins: [rehypeKatex],
          },
        }}
      />
    </div>
  );
}
