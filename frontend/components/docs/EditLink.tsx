import { Pencil } from 'lucide-react';
import { getEditUrl } from '@/lib/docs';

type EditLinkProps = {
  /** Repo-relative content path, e.g. content/docs/deep-learning/CNNS.mdx */
  contentPath: string;
};

export default function EditLink({ contentPath }: EditLinkProps) {
  const href = getEditUrl(contentPath);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 text-sm text-[var(--color-muted)] transition-colors hover:text-[var(--color-primary)]"
    >
      <Pencil className="h-3.5 w-3.5" />
      Edit this page
    </a>
  );
}
