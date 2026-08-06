import { type ClassValue, clsx } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function slugToHref(slug: string): string {
  return `/docs/${slug}`;
}

export function slugArrayToPath(slug: string[]): string {
  return slug.join('/');
}
