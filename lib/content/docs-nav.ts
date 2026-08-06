import {
  docsSidebar,
  type SidebarCategoryItem,
  type SidebarDocItem,
  type SidebarItem,
} from '@/config/docs-sidebar';
import { slugToHref } from '@/lib/cn';

export type FlatDoc = {
  id: string;
  href: string;
  category: string;
};

export type DocNavEntry = FlatDoc & {
  title?: string;
};

export function flattenSidebar(sidebar: SidebarItem[] = docsSidebar): FlatDoc[] {
  const result: FlatDoc[] = [];

  for (const item of sidebar) {
    if (item.type === 'category') {
      for (const doc of item.items) {
        result.push({
          id: doc.id,
          href: slugToHref(doc.id),
          category: item.label,
        });
      }
    }
  }

  return result;
}

export function getAllDocIds(): string[] {
  return flattenSidebar().map((doc) => doc.id);
}

export function getPrevNextNav(currentId: string): {
  prev?: DocNavEntry;
  next?: DocNavEntry;
} {
  const flat = flattenSidebar();
  const index = flat.findIndex((doc) => doc.id === currentId);
  if (index === -1) return {};

  return {
    prev: index > 0 ? flat[index - 1] : undefined,
    next: index < flat.length - 1 ? flat[index + 1] : undefined,
  };
}

export function getCategoryForDoc(docId: string): string | undefined {
  return flattenSidebar().find((doc) => doc.id === docId)?.category;
}

export function getSidebarCategories(): SidebarCategoryItem[] {
  return docsSidebar.filter(
    (item): item is SidebarCategoryItem => item.type === 'category',
  );
}

export function getDocItemLabel(item: SidebarDocItem): string {
  if (item.label) return item.label;
  const segment = item.id.split('/').pop() ?? item.id;
  return segment
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export function docIdFromSlug(slug: string[]): string {
  return slug.join('/');
}

export function slugFromDocId(docId: string): string[] {
  return docId.split('/');
}
