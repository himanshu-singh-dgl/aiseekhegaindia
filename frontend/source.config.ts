import {
  defineConfig,
  defineDocs,
} from 'fumadocs-mdx/config';
import { rehypeCodeDefaultOptions } from 'fumadocs-core/mdx-plugins';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

export const docs = defineDocs({
  dir: 'content/docs',
});

export default defineConfig({
  mdxOptions: {
    // Avoid build-time remote image fetches / invalid local import coercion
    remarkImageOptions: false,
    rehypeCodeOptions: {
      ...rehypeCodeDefaultOptions,
      lazy: false,
      fallbackLanguage: 'plaintext',
      langs: [
        'python',
        'javascript',
        'typescript',
        'tsx',
        'jsx',
        'bash',
        'json',
        'yaml',
        'markdown',
        'mdx',
        'html',
        'css',
        'r',
        'julia',
        'diff',
        'sql',
      ],
      langAlias: {
        ...(rehypeCodeDefaultOptions.langAlias ?? {}),
        math: 'markdown',
        latex: 'markdown',
        text: 'markdown',
        plaintext: 'markdown',
        py: 'python',
        sh: 'bash',
        shell: 'bash',
        js: 'javascript',
        ts: 'typescript',
      },
    } as typeof rehypeCodeDefaultOptions,
    remarkPlugins: (plugins) => [...plugins, remarkMath],
    rehypePlugins: (plugins) => [rehypeKatex, ...plugins],
  },
});
