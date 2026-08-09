# Deferred decisions (secondary — resolve later)

Pulled from `migration-plan.html` approval checklist. Primary path is locked: **Next.js App Router + MDX**, keep `/docs/...` URLs, two-repo split.

| # | Topic | Default for now | Resolve when |
|---|--------|-----------------|--------------|
| 1 | Search (Algolia / Orama / Pagefind) | Ship without search | Phase 4 |
| 2 | Blog migration depth | Defer blog | After docs spike |
| 3 | Visual redesign | Port as-is | After cutover |
| 4 | Hosting (Vercel / Cloudflare / other) | Local + TBD | Before prod cutover |
| 5 | Canonical GitHub for Edit this page | TBD | Phase 4 |
| 6 | Doc versioning / i18n | Out of scope v1 | Future |
| 7 | Auth / CMS / payments | Out of scope v1 | Future |
| 8 | Fumadocs vs custom docs chrome | Custom MDX layout first | If docs UX gaps hurt |
| 9 | Backend API shape / DB | Health + stub only | When features need API |
| 10 | Content freeze window | Soft freeze preferred | With contributors |

## Locked for this migration loop

- Framework: **Next.js** (App Router, TypeScript, Tailwind)
- Docs: MDX via `@next/mdx` (per [Next.js MDX guide](https://nextjs.org/docs/app/guides/mdx))
- Source content: copy from existing Docusaurus `aiseekhegaindia/docs`
- Repos: `aiseekhegaindia-front`, `aiseekhegaindia-backend`
- URL policy: preserve `/docs/...` paths
