'use client';

import { useEffect, useMemo, useState } from 'react';
import FlexSearch from 'flexsearch';
import Link from 'next/link';
import { Search, X } from 'lucide-react';

type SearchDocument = {
  id: string;
  title: string;
  description?: string;
  href: string;
  content: string;
};

export function SearchDialog() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [docs, setDocs] = useState<SearchDocument[]>([]);
  const [results, setResults] = useState<SearchDocument[]>([]);

  useEffect(() => {
    fetch('/search-index.json')
      .then((res) => res.json())
      .then((data: SearchDocument[]) => setDocs(data))
      .catch(() => setDocs([]));
  }, []);

  const index = useMemo(() => {
    const idx = new FlexSearch.Document({
      document: {
        id: 'id',
        index: ['title', 'description', 'content'],
      },
      tokenize: 'forward',
    });
    docs.forEach((doc) => idx.add(doc));
    return idx;
  }, [docs]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    const found = index.search(query, { enrich: true, limit: 8 }) as Array<{
      result: string[];
    }>;
    const ids = found.flatMap((group) => group.result);
    setResults(
      ids
        .map((id) => docs.find((doc) => doc.id === id))
        .filter((doc): doc is SearchDocument => Boolean(doc)),
    );
  }, [query, index, docs]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setOpen(true);
      }
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="hidden items-center gap-2 rounded-lg border border-[var(--border)] px-3 py-1.5 text-sm text-[var(--muted)] hover:bg-[var(--surface)] md:inline-flex"
        aria-label="Open search"
      >
        <Search className="h-4 w-4" />
        <span>Search</span>
        <kbd className="rounded border border-[var(--border)] px-1.5 text-xs">⌘K</kbd>
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 p-4 pt-[10vh]">
          <div className="w-full max-w-xl rounded-xl border border-[var(--border)] bg-[var(--bg)] shadow-2xl">
            <div className="flex items-center gap-2 border-b border-[var(--border)] px-4 py-3">
              <Search className="h-4 w-4 text-[var(--muted)]" />
              <input
                autoFocus
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search documentation..."
                className="flex-1 bg-transparent text-sm outline-none"
              />
              <button type="button" onClick={() => setOpen(false)} aria-label="Close search">
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="max-h-80 overflow-y-auto p-2">
              {results.length === 0 && query && (
                <p className="px-3 py-6 text-center text-sm text-[var(--muted)]">No results found.</p>
              )}
              {results.map((result) => (
                <Link
                  key={result.id}
                  href={result.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-2 hover:bg-[var(--surface)]"
                >
                  <div className="font-medium">{result.title}</div>
                  {result.description && (
                    <div className="text-sm text-[var(--muted)]">{result.description}</div>
                  )}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
