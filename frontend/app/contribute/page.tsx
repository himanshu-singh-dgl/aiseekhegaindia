import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import {compileMDX} from 'next-mdx-remote/rsc';
import type {Metadata} from 'next';

export const metadata: Metadata = {
  title: 'Contribute',
  description: 'How to contribute to the AI Seekhega India documentation project.',
};

export default async function ContributePage() {
  const filePath = path.join(process.cwd(), 'content/contribute.mdx');
  const source = fs.readFileSync(filePath, 'utf8');
  const {content} = matter(source);

  const {content: mdxContent} = await compileMDX({
    source: content,
    options: {
      mdxOptions: {},
    },
  });

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <article className="prose-doc">{mdxContent}</article>
    </div>
  );
}
