// source.config.ts
import { defineConfig, defineDocs } from "fumadocs-mdx/config";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
var docs = defineDocs({
  dir: "docs"
});
var source_config_default = defineConfig({
  lastModifiedTime: "none",
  mdxOptions: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex],
    rehypeCodeOptions: false,
    remarkImageOptions: false
  }
});
export {
  source_config_default as default,
  docs
};
