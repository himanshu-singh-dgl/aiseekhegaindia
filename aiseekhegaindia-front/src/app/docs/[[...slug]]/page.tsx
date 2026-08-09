import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import { DocsSidebar } from "@/components/DocsSidebar";
import CurriculumTree from "@/components/CurriculumTree";
import LogisticRegressionTutorial from "@/components/LogisticRegression/LogisticRegressionTutorial";
import { getDocBySlug, getDocSlugs } from "@/lib/docs";

type PageProps = {
  params: Promise<{ slug?: string[] }>;
};

const components = {
  CurriculumTree,
  LogisticRegressionTutorial,
};

export function generateStaticParams() {
  return getDocSlugs().map((slug) => ({
    slug: slug.split("/"),
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  if (!slug?.length) return { title: "Docs" };
  const doc = getDocBySlug(slug.join("/"));
  return { title: doc?.title ?? "Docs" };
}

export default async function DocsPage({ params }: PageProps) {
  const { slug } = await params;
  if (!slug?.length) notFound();
  const joined = slug.join("/");
  const doc = getDocBySlug(joined);
  if (!doc) notFound();

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-8 md:flex-row">
      <DocsSidebar activeSlug={joined} />
      <article className="prose prose-slate max-w-none flex-1 prose-headings:scroll-mt-24 prose-pre:bg-slate-900">
        <MDXRemote
          source={doc.content}
          components={components}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkGfm, remarkMath],
              rehypePlugins: [rehypeKatex],
            },
          }}
        />
      </article>
    </div>
  );
}
