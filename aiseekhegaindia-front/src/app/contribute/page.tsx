import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How to Contribute",
  description: "Contribute to the AISeekhegaIndia community documentation.",
};

export default function ContributePage() {
  return (
    <article className="prose prose-slate mx-auto w-full max-w-4xl px-6 py-12 dark:prose-invert">
      <h1>How to Contribute</h1>
      <p>
        Thank you for your interest in contributing to the AI &amp; ML Documentation
        project. This community-driven resource depends on contributions from people
        like you.
      </p>

      <h2>Ways to Contribute</h2>
      <ul>
        <li>Add new tutorials, guides, or reference documentation.</li>
        <li>Fix typos, clarify explanations, and update outdated information.</li>
        <li>Provide practical examples in Python, R, or other languages.</li>
        <li>Review pull requests and provide constructive feedback.</li>
        <li>Report bugs, suggest improvements, or request new content.</li>
      </ul>

      <h2>Getting Started</h2>
      <ol>
        <li>Fork the repository on GitHub and clone your fork.</li>
        <li>Install dependencies with <code>npm install</code>.</li>
        <li>Create a branch and make your documentation changes.</li>
        <li>Push the branch and submit a pull request with a clear description.</li>
      </ol>

      <h2>Content Guidelines</h2>
      <p>
        Use clear, concise language, break complex topics into digestible sections,
        and include runnable examples with explanations. Diagrams and links to
        further reading are encouraged where they improve understanding.
      </p>

      <h2>Community Guidelines</h2>
      <p>
        Be respectful and considerate, assume good intentions, stay open to feedback,
        and help others learn and grow.
      </p>

      <h2>Questions?</h2>
      <p>
        Open an issue on{" "}
        <a href="https://github.com/ai-ml-community/ai-ml-docs" target="_blank" rel="noreferrer">
          GitHub
        </a>{" "}
        or join the{" "}
        <a href="https://discord.gg/QtzYHmfw" target="_blank" rel="noreferrer">
          community Discord
        </a>
        .
      </p>
    </article>
  );
}
