import type { MDXComponents } from "mdx/types";

const components: MDXComponents = {
  a: (props) => (
    <a
      {...props}
      className="text-teal-700 underline underline-offset-2 hover:text-teal-900"
    />
  ),
};

export function useMDXComponents(): MDXComponents {
  return components;
}
