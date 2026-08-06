# AISeekhegaIndia — AI & ML Docs

Community-driven documentation platform for Machine Learning, Deep Learning, and Language Models.

**Production URL:** https://ai-ml-docs.org

## Stack

- Next.js 15 App Router + React 19 + TypeScript
- Tailwind CSS v4
- Custom docs subsystem (sidebar, TOC, prev/next, search)
- Content: HTML static docs + MDX for interactive tutorials
- Deploy target: Vercel

## Commands

| Command | Action |
| --- | --- |
| `npm install` | Install dependencies |
| `npm run dev` | Start dev server at http://localhost:3000 |
| `npm run build` | Build search index + production build |
| `npm run start` | Serve production build |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Run TypeScript check |
| `npm run check-links` | Validate internal links |
| `npm run build:search-index` | Regenerate `public/search-index.json` |

## Project structure

```text
app/                  Next.js routes (docs, blog, marketing pages)
components/           UI, layout, and interactive features
config/               Site, navigation, and sidebar config
content/docs/         Documentation (HTML + MDX)
content/blog/         Blog posts
lib/content/          Content loaders, search index, nav helpers
public/img/           Static assets
styles/               Global CSS, design tokens, doc prose
scripts/              Build helpers (search index, link check, MDX→HTML)
```

## Contributing

See [/contribute](http://localhost:3000/contribute) or edit files under `content/docs/`.

## Migration

This site was migrated from Docusaurus 3.1.1 to pure Next.js. See `docs-migration/MIGRATION_REPORT.html` for parity status and cutover checklist.
