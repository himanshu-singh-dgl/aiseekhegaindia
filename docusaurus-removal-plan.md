# Remove Docusaurus from the Codebase

## Overview

Docusaurus npm packages were already gone. Leftover Docusaurus source/build folders, migration scaffolding docs, and stale ignore/config references have been removed. The repo is Next.js + Nest only.

## Status

**Completed.**

- No `@docusaurus/*` packages in package manifests or lockfile.
- Next.js serves content from `frontend/content/` and assets from `frontend/public/`.
- Legacy root tree and migration notes deleted.
- Config references cleaned; `npm run lint -w frontend` passes.

## Checklist

- [x] Delete legacy Docusaurus directories
- [x] Delete migration scaffolding docs
- [x] Clean config references (`.gitignore`, `tsconfig`, ESLint, `next.config`)
- [x] Verify no Docusaurus remnants remain

---

## What was deleted

| Path | Why |
| --- | --- |
| `build/` | Old Docusaurus static export |
| `.docusaurus/` | Generated Docusaurus cache |
| `legacy-docusaurus/` | Archived `docusaurus.config.ts`, `sidebars.ts` |
| `docs/` | Duplicate of `frontend/content/docs` |
| `blog/` | Duplicate of `frontend/content/blog` |
| `static/` | Old static assets (kept in `frontend/public/img`) |
| `src/` | Old theme + legacy pages importing `@docusaurus/*` |
| `MIGRATION_STATUS.md` | Migration scaffolding |
| `migration-plan.md` / `migration-plan.html` | Migration scaffolding |
| `.migration-loop-state.json` | Migration scaffolding |

**Kept:** `frontend/content/`, `frontend/public/`, `frontend/components/`, `frontend/lib/`

## Config changes

- `.gitignore` — removed Docusaurus block
- `frontend/tsconfig.json` — removed legacy path excludes
- `frontend/eslint.config.mjs` — removed legacy ignores; kept `content/**` and `components/tutorials/**`
- `frontend/next.config.ts` — comment no longer mentions Docusaurus

## Out of scope (still open)

- Repairing `frontend/public/docs-assets` (Next image-serving issue, not Docusaurus)
