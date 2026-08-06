# Docusaurus → Next.js Migration Plan

**Project:** AISeekhegaIndia (`ai-ml-docs`)  
**Target:** Next.js App Router  
**Generated from:** Codebase analysis (Aug 2026)  
**Companion:** [`migration-plan.html`](./migration-plan.html) (browser-friendly version)

> **Scope:** Analysis and planning only. No migration code, no Next.js scaffold, and no changes to the existing Docusaurus application are included in this blueprint. Items that could not be confirmed from source are marked as _Assumption_.

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Technology Analysis](#2-technology-analysis)
3. [Feature Inventory](#3-feature-inventory)
4. [Docusaurus → Next.js Mapping](#4-docusaurus--nextjs-mapping)
5. [Proposed Next.js Architecture](#5-proposed-nextjs-architecture)
6. [Migration Phases](#6-migration-phases)
7. [File-by-File Analysis](#7-file-by-file-analysis)
8. [Risks & Challenges](#8-risks--challenges)
9. [SEO Considerations](#9-seo-considerations)
10. [Performance Considerations](#10-performance-considerations)
11. [Migration Checklist](#11-migration-checklist)
12. [Estimated Effort](#12-estimated-effort)

**Complexity legend:** `Low` · `Medium` · `High` · `N/A`

**Feature status legend:** `Present` · `Partial` · `Absent` · `Unused`

---

## 1. Project Overview

**AISeekhegaIndia** is a community-driven documentation site for Machine Learning, Deep Learning, Language Models, and AI-for-leaders content. The production application is a **Docusaurus 3.1.1** site using the classic preset, MDX content, custom React pages, and interactive tutorial components.

### Overall architecture

Content and presentation follow the usual Docusaurus layout:

| Layer                     | Location                                                       |
| ------------------------- | -------------------------------------------------------------- |
| Config & navigation       | `docusaurus.config.ts`, `sidebars.ts`                          |
| Docs content              | `docs/` (MDX + colocated images)                               |
| Blog                      | `blog/` (single welcome post)                                  |
| Custom pages & components | `src/pages/`, `src/components/`                                |
| Global styles             | Infima theme variables + Tailwind v4 via `src/css/`            |
| Static assets             | `static/img/` (served at `/img/…`)                             |
| Build output              | `build/` (static site; currently appears incomplete vs source) |

### Important folders and files

| Path                   | Role                                                                          |
| ---------------------- | ----------------------------------------------------------------------------- |
| `docusaurus.config.ts` | Site URL, navbar/footer, Prism, color mode, docs/blog plugins, KaTeX          |
| `sidebars.ts`          | Manual sidebar categories and doc order                                       |
| `docs/`                | ~38 MD/MDX pages + ~100 images (~33 MB)                                       |
| `blog/`                | Blog content (1 post)                                                         |
| `src/pages/`           | Home, Fellowship, Contribute                                                  |
| `src/components/`      | Homepage, CurriculumTree, Logistic Regression tutorial, unused viz components |
| `src/css/`             | Infima overrides + Tailwind entry                                             |
| `static/`              | Logo, favicon, social card, AI-for-leaders images                             |
| `package.json`         | Docusaurus scripts and dependencies (source of truth for runtime)             |

### Non-Docusaurus artifacts present in the repo

**Empty Next.js stubs**

Directories `app/`, `components/`, `hooks/`, `lib/`, `styles/`, `config/`, and a sparse `public/` exist with **no implementation files** (folder scaffolding only). They are not wired into `package.json`.

**Astro leftovers**

`astro.config.mjs`, `src/pages/index.astro`, `src/layouts/Layout.astro`, `src/components/Welcome.astro`, and an Astro-template `README.md` are present but unused by the Docusaurus app.

> **Assumption:** These stubs/leftovers are from earlier migration experiments and should be reconciled or discarded during Phase 0 cleanup—not treated as a working Next.js app.

---

## 2. Technology Analysis

| Area                | Current state                                                   | Notes                                                                                       |
| ------------------- | --------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| Docusaurus          | `@docusaurus/core` / `preset-classic` **3.1.1**                 | Classic preset only; no custom plugins array                                                |
| React               | **^18.2.0** (resolved **18.3.1** in lockfile)                   | Client-centric Docusaurus SPA/SSG model                                                     |
| TypeScript          | **~5.2.2**; config extends `@docusaurus/tsconfig`               | Most components are `.tsx`; `CurriculumTree.jsx` is JS                                      |
| MDX                 | `@mdx-js/react` ^3; docs/blog/pages as MDX                      | Uses `@site/…` imports for custom components                                                |
| Plugins (preset)    | content-docs, content-blog, content-pages, sitemap, debug (dev) | No Algolia config; no Google Analytics / gtag plugin                                        |
| Themes              | Classic theme (Infima); **no swizzled** `src/theme/`            | Navbar/footer from `themeConfig` only                                                       |
| CSS strategy        | Infima CSS vars + `custom.css` + Tailwind v4 + CSS Modules      | Tailwind `preflight: false` for Infima compatibility; Indian-flag palette in Tailwind theme |
| Routing             | File-based docs/blog + `src/pages`                              | URLs like `/docs/…`, `/blog/…`, `/fellowship`, `/contribute`                                |
| Assets              | `static/` + colocated images under `docs/`                      | ~104 markdown/HTML image references in docs                                                 |
| Build configuration | `npm run build` → `docusaurus build`                            | PostCSS via `@tailwindcss/postcss`; Node `>=18`                                             |
| Math / KaTeX        | `remark-math` + `rehype-katex` + CDN stylesheet                 | CDN `integrity` value looks like a placeholder (may fail SRI)                               |
| Syntax highlighting | `prism-react-renderer`; GitHub / Dracula themes                 | Extra langs: python, r, julia                                                               |
| Icons               | `lucide-react`                                                  | Used heavily in Logistic Regression tutorial                                                |

### Site config highlights (`docusaurus.config.ts`)

- **title:** AISeekhegaIndia
- **url:** `https://ai-ml-docs.org`, `baseUrl: /`
- **GitHub:** `ai-ml-community/ai-ml-docs` (edit links point to `tree/main/`)
- **Broken links:** warn (not throw)
- **i18n:** defaultLocale `en` only
- **colorMode:** light default, switch enabled, respects prefers-color-scheme
- **social image:** `img/social-card.jpg`

---

## 3. Feature Inventory

| Feature                 | Status  | Evidence / detail                                                                                                                           | Migration complexity |
| ----------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------- | -------------------- |
| Documentation pages     | Present | ~37 sidebar docs + 1 orphan MD; categories: AI for Leaders, ML, DL, Language Models, Tutorials, Resources                                   | Medium               |
| Blog                    | Present | 1 post (`2024-04-24-welcome.mdx`); reading time + edit URL enabled; tags/archive/RSS in build                                               | Low                  |
| Navbar                  | Present | Logo, Resources sidebar link, Topics dropdown, Fellowship, Tutorials dropdown, GitHub, Contribute                                           | Medium               |
| Sidebar                 | Present | Manual `docsSidebar` in `sidebars.ts`; next/prev via classic theme                                                                          | Medium               |
| Footer                  | Present | Dark footer; Docs / Community / More columns; copyright Lex AI Technologies                                                                 | Low                  |
| Search                  | Absent  | No `themeConfig.algolia` and no local-search plugin. Algolia packages exist only as transitive deps.                                        | N/A                  |
| MDX components          | Partial | No global `MDXComponents` swizzle; page-level imports of `CurriculumTree`, `LogisticRegressionTutorial`                                     | Medium               |
| Admonitions             | Absent  | No `:::` admonition usage found in docs/blog/pages                                                                                          | N/A                  |
| Code blocks             | Present | ~54 fences; languages: python (17), unlabeled (32), text (4), math (1)                                                                      | Low                  |
| Syntax highlighting     | Present | Prism via Docusaurus; light/dark themes configured                                                                                          | Low                  |
| Dark mode               | Present | `colorMode` + `[data-theme='dark']` CSS; Tailwind darkMode synced to that attribute                                                         | Medium               |
| Custom React components | Present | HomepageFeatures, BrainIcon, CurriculumTree (~416 LOC), Logistic Regression suite (~2.5k LOC canvas)                                        | High                 |
| Unused visualizations   | Unused  | `AIVisualization.tsx`, `BrainVisualization.tsx` have no imports from pages/docs                                                             | Low                  |
| Static assets           | Present | `static/img/*` + colocated doc images; some remote Medium CDN images in perceptron doc                                                      | Medium               |
| Analytics               | Absent  | No gtag / GA / Plausible / custom analytics in config                                                                                       | N/A                  |
| SEO                     | Partial | Title/tagline/social image; Layout `description` on custom pages; sparse frontmatter (`title`/`description`/`keywords` mostly on tutorials) | Medium               |
| Sitemap                 | Present | Classic preset generates `sitemap.xml` (checked-in `build/` may be stale)                                                                   | Low                  |
| RSS / Atom              | Present | Blog `rss.xml` / `atom.xml` from content-blog plugin                                                                                        | Low                  |
| Versioning              | Absent  | Single “current” docs version only                                                                                                          | N/A                  |
| i18n                    | Partial | Locale field set to `en` only; no translation directories                                                                                   | N/A                  |
| Custom plugins          | Absent  | No project-authored Docusaurus plugins                                                                                                      | N/A                  |
| Math (KaTeX)            | Present | Used in ML intro, logistic regression tutorial, CNNs, RNNs                                                                                  | Medium               |
| Edit this page          | Present | `editUrl` on docs + blog                                                                                                                    | Low                  |
| Interactive tutorials   | Present | Canvas-based logistic regression; CurriculumTree with `localStorage` progress                                                               | High                 |

### Documentation page inventory (by category)

**AI for Leaders**

- `intro`, `curriculum-tree`, `curriculum-overview`, `machine-learning-fundamentals`
- `classification-regression-supervised-unsupervised`, `algorithms-high-level-overview`, `classical-ml-in-market`
- _Orphan (not in sidebar):_ `curriculum-visual-tree.md`

**Machine Learning**

- `intro`, `supervised-learning`, `logistic_regression_tutorial`

**Deep Learning**

- `intro`, `perceptron`, `CNNS`, `RNNs` (case-sensitive IDs)

**Language Models**

- 21 pages including Tokenization, NNTraining/Inference/Internals, PostTraining\*, EvolutionGpt2, Hallucinations, HandlingHallucinationRAGLoRA, Evaluation, Multimodality, etc.

**Tutorials / Resources**

- `tutorials/logistic-regression` (embeds interactive component)
- `resources/intro`

### Custom pages

| Route         | Source                                              |
| ------------- | --------------------------------------------------- |
| `/`           | `src/pages/index.tsx` (hero, features, topics, CTA) |
| `/fellowship` | Marketing page for Lex AI Fellowship                |
| `/contribute` | MDX contribution guidelines                         |

---

## 4. Docusaurus → Next.js Mapping

Target: **Next.js App Router** with MDX content layer, preserving public URL paths where possible.

| Docusaurus feature                                    | Next.js equivalent (recommended)                                                                                                             | Complexity |
| ----------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| `docs/` MDX + sidebar                                 | Content collection under `content/docs/`; catch-all route `app/docs/[[...slug]]/page.tsx`; sidebar from typed config (port of `sidebars.ts`) | Medium     |
| Blog plugin                                           | `content/blog/` + `app/blog/page.tsx`, `app/blog/[slug]/page.tsx`, tags routes; date/slug parsing from filenames                             | Low        |
| `src/pages/*`                                         | `app/page.tsx`, `app/fellowship/page.tsx`, `app/contribute/page.tsx`                                                                         | Low        |
| `@theme/Layout`                                       | `app/layout.tsx` + nested layouts (`app/docs/layout.tsx`)                                                                                    | Medium     |
| `@docusaurus/Link`                                    | `next/link`                                                                                                                                  | Low        |
| `useDocusaurusContext`                                | Site config module / env vars / `lib/site.ts`                                                                                                | Low        |
| Navbar / Footer themeConfig                           | React layout components driven by `config/navigation.ts`                                                                                     | Medium     |
| Classic sidebar + pager                               | Custom Sidebar + DocPager using sidebar order + current slug                                                                                 | Medium     |
| Prism highlighting                                    | Shiki (preferred for RSC) or `rehype-pretty-code` / Prism client component                                                                   | Medium     |
| remark-math / rehype-katex                            | Same remark/rehype plugins in MDX pipeline (`next-mdx-remote` or `@next/mdx`)                                                                | Medium     |
| Color mode                                            | `next-themes` (class or `data-theme`) + CSS variables                                                                                        | Medium     |
| Infima utility classes (`button`, `container`, `col`) | Replace with Tailwind / design tokens; remove Infima dependency                                                                              | High       |
| Tailwind (preflight off)                              | Tailwind v4 with Next PostCSS; can re-enable preflight once Infima removed                                                                   | Medium     |
| `static/` assets                                      | `public/` (e.g. `public/img/…`)                                                                                                              | Low        |
| Colocated doc images                                  | Keep beside MDX or move to `public/docs-assets/`; update relative paths                                                                      | Medium     |
| Sitemap plugin                                        | `next-sitemap` or App Router `app/sitemap.ts`                                                                                                | Low        |
| Blog RSS                                              | Route Handler `app/blog/rss.xml/route.ts` (or similar)                                                                                       | Low        |
| Edit URL links                                        | Helper building GitHub URLs from content path                                                                                                | Low        |
| Search (currently absent)                             | Optional: Pagefind, Orama, Algolia DocSearch — decide as new capability                                                                      | Medium     |
| `@site/src/components/…` MDX imports                  | Alias `@/components/…` in `tsconfig` / bundler                                                                                               | Medium     |
| Client interactive widgets                            | Client Components (`'use client'`) for canvas / localStorage                                                                                 | High       |
| SEO meta                                              | App Router `metadata` / `generateMetadata` from frontmatter                                                                                  | Medium     |

---

## 5. Proposed Next.js Architecture

Ideal target structure (blueprint only — do not scaffold yet). Reuses empty stub folder names where helpful, but treats them as greenfield design rather than existing code.

```text
aiseekhegaindia/
├── app/
│   ├── layout.tsx                 # root shell: fonts, theme provider, nav, footer
│   ├── page.tsx                   # homepage
│   ├── globals.css                # design tokens + Tailwind
│   ├── fellowship/page.tsx
│   ├── contribute/page.tsx
│   ├── docs/
│   │   ├── layout.tsx             # docs chrome: sidebar + TOC slot
│   │   └── [[...slug]]/page.tsx   # MDX docs renderer
│   ├── blog/
│   │   ├── page.tsx
│   │   ├── [slug]/page.tsx
│   │   ├── tags/...
│   │   └── rss.xml/route.ts
│   ├── sitemap.ts
│   ├── robots.ts
│   └── not-found.tsx
├── content/
│   ├── docs/                      # migrated from docs/ (MDX + images)
│   └── blog/                      # migrated from blog/
├── components/
│   ├── layout/                    # Navbar, Footer, ThemeToggle
│   ├── docs/                      # Sidebar, DocPager, EditLink, TOC
│   ├── blog/
│   ├── home/                      # HomepageFeatures, BrainIcon
│   ├── mdx/                       # MDX component map, Callout (if added later)
│   └── tutorials/
│       └── LogisticRegression/    # client components
├── config/
│   ├── site.ts                    # title, url, social, editBaseUrl
│   ├── navigation.ts              # navbar + footer links
│   └── sidebar.ts                 # port of sidebars.ts
├── lib/
│   ├── mdx.ts                     # compile/load MDX, plugins
│   ├── docs.ts                    # list docs, resolve slug, prev/next
│   └── blog.ts                    # list posts, tags, reading time
├── hooks/
│   └── useScrollSpy.ts            # optional TOC highlight
├── public/
│   └── img/                       # from static/img
├── styles/                        # optional shared CSS modules
├── next.config.ts
├── postcss.config.js
├── tsconfig.json
└── package.json
```

### Architectural principles

1. **Preserve URLs:** keep `/docs/…`, `/blog/…`, `/fellowship`, `/contribute` identical for SEO.
2. **RSC by default:** MDX pages as Server Components; mark canvas/localStorage UI as client-only.
3. **Content outside `app/`:** treat MDX as data (easier content PRs, clearer boundaries).
4. **Drop Infima:** rebuild layout with Tailwind tokens mapped from current CSS variables.
5. **Single sidebar source:** typed config mirroring current `sidebars.ts` order.
6. **Case-sensitive slugs:** preserve `CNNS`, `RNNs`, camel-case LM filenames unless a redirect strategy is approved.

### Suggested content pipeline (conceptual)

1. Read MDX from `content/docs/**` with gray-matter frontmatter.
2. Apply remark-gfm, remark-math, rehype-katex, rehype-slug, rehype-autolink-headings, syntax highlighter.
3. Inject MDX component map for interactive islands.
4. `generateStaticParams` for all known slugs at build time (static export or SSG).

> **Assumption:** Prefer static generation (SSG) first to match today’s Docusaurus static hosting model, unless server features are required later.

---

## 6. Migration Phases

### Phase 0 — Inventory freeze & cleanup decisions · `Low`

**Objective:** Establish baseline URLs, decide fate of Astro leftovers and empty Next stubs, capture current sitemap as redirect source of truth, fix or note broken KaTeX SRI and stale `build/`.

### Phase 1 — Next.js foundation · `Medium`

**Objective:** Create App Router project (separate branch/worktree), design tokens, root layout, theme provider, navbar/footer parity, homepage without Infima.

### Phase 2 — MDX docs engine · `High`

**Objective:** Port docs content + assets; implement slug routing, sidebar, TOC, pager, edit links, KaTeX, code highlighting; validate all doc URLs.

### Phase 3 — Interactive components · `High`

**Objective:** Migrate CurriculumTree and Logistic Regression tutorial as Client Components; resolve hydration and Tailwind class dependencies; decide keep/drop unused viz components.

### Phase 4 — Blog, custom pages, RSS, sitemap · `Low`

**Objective:** Fellowship + Contribute pages; blog list/detail/tags; RSS; `sitemap.ts`/`robots.ts`; social metadata.

### Phase 5 — SEO & redirects hardening · `Medium`

**Objective:** URL parity audit, 301 plan for any intentional renames, Open Graph tags, canonical URLs, frontmatter completeness.

### Phase 6 — Performance & polish · `Medium`

**Objective:** Image optimization, font loading, code-split heavy tutorials, Lighthouse pass, accessibility on nav/sidebar.

### Phase 7 — Cutover · `Medium`

**Objective:** Deploy Next app, DNS/hosting switch, monitor 404s, retire Docusaurus build pipeline, update Contribute docs/scripts.

---

## 7. File-by-File Analysis

Purpose and migration dependencies for files that matter. Generated artifacts (`build/`, `.docusaurus/`, `node_modules/`) are out of scope for porting.

### Root configuration

| File                                       | Purpose                                 | Dependencies / migration notes                                                                      | Cx     |
| ------------------------------------------ | --------------------------------------- | --------------------------------------------------------------------------------------------------- | ------ |
| `package.json`                             | Docusaurus scripts & deps               | Replace with Next scripts; drop Docusaurus packages; keep React 18+, lucide, math plugins as needed | Medium |
| `docusaurus.config.ts`                     | Site + theme + plugin config            | Split into `config/site.ts`, `navigation.ts`, MDX plugin options                                    | Medium |
| `sidebars.ts`                              | Docs navigation order                   | Port 1:1 to `config/sidebar.ts`; drives prev/next                                                   | Low    |
| `tsconfig.json`                            | TS base (Docusaurus extends)            | Replace with Next TS config + path aliases                                                          | Low    |
| `tailwind.config.js` / `postcss.config.js` | Tailwind v4 + typography; preflight off | Retarget content globs to `app/`, `components/`, `content/`; revisit preflight                      | Medium |
| `astro.config.mjs`, Astro README           | Leftover / unused                       | Do not migrate; delete after confirming unused                                                      | Low    |

### Custom pages (`src/pages`)

| File                                              | Purpose                      | Dependencies                                                                                 | Cx     |
| ------------------------------------------------- | ---------------------------- | -------------------------------------------------------------------------------------------- | ------ |
| `src/pages/index.tsx` + `index.module.css`        | Homepage hero / topics / CTA | `Layout`, `Link`, `useDocusaurusContext`, HomepageFeatures, BrainIcon, Infima button classes | Medium |
| `src/pages/fellowship.tsx` + module CSS           | Fellowship marketing         | Layout, Link, Infima buttons; external Lex AI URLs                                           | Low    |
| `src/pages/contribute.mdx`                        | Contribution guide           | Mentions `npm start` Docusaurus workflow — update during cutover                             | Low    |
| `src/pages/index.astro` (+ layouts/Welcome.astro) | Unused Astro samples         | Ignore / delete                                                                              | Low    |

### Components (`src/components`)

| File                                            | Purpose                                      | Dependencies                                                                                | Cx   |
| ----------------------------------------------- | -------------------------------------------- | ------------------------------------------------------------------------------------------- | ---- |
| `HomepageFeatures/*`                            | Homepage feature grid                        | clsx, Infima grid (`col col--4`), CSS module                                                | Low  |
| `BrainIcon.tsx` + CSS module                    | Homepage visual                              | lucide-react `BrainCircuit`                                                                 | Low  |
| `CurriculumTree.jsx` + CSS                      | Interactive curriculum; progress persistence | React state/effects, `localStorage`, hard-coded internal/external links                     | High |
| `LogisticRegression/*`                          | Multi-step interactive tutorial              | Canvas utils, math utils, lucide-react, Tailwind utility classes from `tailwind.css` layers | High |
| `AIVisualization.tsx`, `BrainVisualization.tsx` | Canvas animations                            | **Unused** — optional delete or future homepage enhancement                                 | Low  |

### Styles

| File                   | Purpose                                      | Migration notes                                                             | Cx     |
| ---------------------- | -------------------------------------------- | --------------------------------------------------------------------------- | ------ |
| `src/css/custom.css`   | Infima variable theme + global tweaks        | Extract palette/typography to CSS variables without `--ifm-*`               | Medium |
| `src/css/tailwind.css` | Tailwind layers + tutorial component classes | Keep tutorial `@layer components`; ensure scanned by Tailwind content paths | Medium |

### Content — docs (MDX/MD)

All files under `docs/**/*.mdx` and `docs/**/*.md` migrate as content. Special cases:

| File                                                                        | Special handling                                                                            | Cx     |
| --------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- | ------ |
| `docs/tutorials/logistic-regression.mdx`                                    | Imports `@site/src/components/LogisticRegression/…` — rewrite import alias; client boundary | High   |
| `docs/ai-for-leaders/curriculum-tree.mdx`                                   | Imports CurriculumTree; client boundary + localStorage                                      | High   |
| `docs/ai-for-leaders/classification-regression-supervised-unsupervised.mdx` | Images via `../../static/img/…` — rewrite to `/img/…` or public paths                       | Medium |
| `docs/deep-learning/CNNS.mdx`, `RNNs.mdx`                                   | Many relative `./image_*.png`; heavy pages; KaTeX                                           | Medium |
| `docs/deep-learning/perceptron.mdx`                                         | Hotlinked Medium images — availability/CORS risk                                            | Medium |
| `docs/machine-learning/logistic_regression_tutorial.mdx`                    | Dense KaTeX + notebook-exported images                                                      | Medium |
| `docs/language-models/HandlingHallucinationRAGLoRA.mdx`                     | Colocated `language_model_images/` (note typo filename `Halluciination`)                    | Low    |
| `docs/ai-for-leaders/curriculum-visual-tree.md`                             | Not in sidebar; decide publish vs archive                                                   | Low    |

Remaining MDX files are mostly prose + standard markdown; migrate with shared MDX pipeline. Frontmatter keys observed: `sidebar_position`, `title`, `description`, `keywords`.

### Blog & static assets

| File                                                    | Purpose           | Notes                                                                                 | Cx     |
| ------------------------------------------------------- | ----------------- | ------------------------------------------------------------------------------------- | ------ |
| `blog/2024-04-24-welcome.mdx`                           | Welcome post      | Preserve date-based URL `/blog/2024/04/24/welcome` or add redirect if slug simplified | Low    |
| `static/img/logo.svg`, `favicon.ico`, `social-card.jpg` | Branding / SEO    | Copy to `public/img/`                                                                 | Low    |
| `static/img/ai-for-leaders/*.png`                       | Doc illustrations | Referenced with awkward relative paths today                                          | Low    |
| `docs/**/*.png` (~100 files)                            | Inline diagrams   | Largest content weight (~33 MB docs tree)                                             | Medium |

---

## 8. Risks & Challenges

| Risk                        | Why it matters here                                                                                    | Severity | Mitigation direction                                                                |
| --------------------------- | ------------------------------------------------------------------------------------------------------ | -------- | ----------------------------------------------------------------------------------- |
| MDX compatibility           | MDX 3 + `@site` imports + embedded JSX components; Docusaurus MDX defaults differ from Next MDX setups | High     | Prototype compile of hardest pages (CNNS, logistic tutorial, curriculum-tree) first |
| Routing differences         | Case-sensitive IDs; blog date paths; docs mainDocId is `ai-for-leaders/intro` for `/docs`              | Medium   | URL inventory + automated crawl diff against Docusaurus routes                      |
| Plugin replacement          | Sitemap, blog RSS, edit links, reading time are preset features                                        | Low      | Reimplement with small App Router utilities                                         |
| SEO considerations          | Stale/incomplete `build/sitemap.xml` vs source (e.g. AI-for-leaders missing from checked-in build)     | Medium   | Rebuild Docusaurus once for a clean URL baseline before cutover                     |
| Styling conflicts           | Infima + Tailwind coexistence; many Infima class names in TSX                                          | High     | Remove Infima early; restyle homepage/fellowship with tokens                        |
| Client vs Server Components | Canvas tutorials, `localStorage` CurriculumTree, lucide-heavy UI must be client                        | High     | Isolate islands; keep MDX shell on server                                           |
| Hydration issues            | Theme preference + localStorage progress can mismatch SSR HTML                                         | Medium   | Mount client widgets after hydration; theme script in root layout                   |
| Performance                 | Large PNG sets; heavy canvas sections; full-page client bundles if not split                           | Medium   | dynamic import tutorials; `next/image`; compress assets                             |
| KaTeX SRI / CDN             | Integrity hash in config appears invalid/placeholder                                                   | Medium   | Self-host KaTeX CSS or fix SRI during migration                                     |
| External image hotlinks     | Perceptron doc uses miro.medium.com URLs                                                               | Medium   | Vendor images into repo for reliability                                             |
| Repo noise                  | Empty Next stubs + Astro files confuse contributors                                                    | Low      | Phase 0 cleanup decision documented in PR                                           |

---

## 9. SEO Considerations

- **URL parity first:** Keep existing paths from the live site and from a fresh Docusaurus build. Known public patterns include `/`, `/docs/…`, `/blog/2024/04/24/welcome`, `/fellowship`, `/contribute`, tag/archive blog routes.
- **Canonical domain:** Configured production URL is `https://ai-ml-docs.org` — set Next `metadataBase` accordingly.
- **Metadata:** Map frontmatter + Layout descriptions to `generateMetadata`; ensure every doc has title + description (many currently only have `sidebar_position`).
- **Open Graph:** Preserve `img/social-card.jpg` as default OG image; allow per-page overrides later.
- **Sitemap & robots:** Generate complete sitemap including AI-for-leaders and all LM pages; expose `/robots.txt`.
- **RSS continuity:** Keep `/blog/rss.xml` (and Atom if consumers exist — _Assumption:_ low traffic, but cheap to preserve).
- **Heading / TOC structure:** Maintain heading IDs for deep links when reimplementing rehype-slug.
- **Redirects:** If any slug case is normalized later, ship permanent redirects. Do not silently change `CNNS`/`RNNs`.
- **Contribute/docs references:** Update internal instructions so users aren’t sent to obsolete Docusaurus commands after cutover.

> **Assumption:** Search Console / analytics property details are not in-repo; post-cutover monitoring setup is an ops task outside this blueprint.

---

## 10. Performance Considerations

### Opportunities in Next.js

- Static generation for all docs/blog pages
- `next/image` for PNG-heavy DL/LM pages (resize, modern formats)
- Font optimization via `next/font` (replace ad-hoc Inter / JetBrains references)
- `dynamic(() => import(…), { ssr: false })` for canvas tutorials
- Route-level code splitting vs Docusaurus client navigation bundle
- Self-host KaTeX CSS; avoid broken SRI blocking styles

### Watch-outs

- ~33 MB of doc images — optimize before/during migration
- Logistic Regression sections are individually large; avoid bundling all steps eagerly if possible
- CurriculumTree client JS is fine if not loaded on every doc route
- Dark mode script must be tiny to prevent flash without bloating HTML
- Do not force all MDX to client components

---

## 11. Migration Checklist

### Phase 0

- [ ] Rebuild Docusaurus once; export authoritative route list + sitemap
- [ ] Decide: delete Astro leftovers / empty stubs vs reuse folder names
- [ ] Document keep/drop for unused `AIVisualization` / `BrainVisualization`
- [ ] Note KaTeX CDN integrity issue for fix in Next

### Phase 1 — Foundation

- [ ] Scaffold Next.js App Router + TypeScript on a migration branch
- [ ] Port design tokens from Infima/Tailwind palette
- [ ] Implement Navbar (incl. Topics/Tutorials dropdowns) + Footer + ThemeToggle
- [ ] Migrate homepage (BrainIcon, HomepageFeatures, hero CSS)

### Phase 2 — Docs

- [ ] Copy `docs/` → `content/docs/` (or equivalent)
- [ ] Implement MDX pipeline (GFM, math, highlighting, heading anchors)
- [ ] Port `sidebars.ts`; Sidebar + DocPager + EditLink
- [ ] Catch-all `/docs/[[...slug]]` with `generateStaticParams`
- [ ] Fix image paths (`static/` relatives → `/img` or public assets)
- [ ] Verify case-sensitive routes (`CNNS`, `RNNs`, camelCase LM pages)
- [ ] Decide fate of `curriculum-visual-tree.md`

### Phase 3 — Interactive

- [ ] Migrate LogisticRegression suite as Client Components
- [ ] Migrate CurriculumTree + localStorage behavior
- [ ] Update MDX imports away from `@site/`
- [ ] Hydration / theme smoke tests on those pages

### Phase 4 — Blog & extras

- [ ] Migrate blog post + tags + archive (if desired)
- [ ] RSS route parity
- [ ] Fellowship + Contribute pages
- [ ] `sitemap.ts` + `robots.ts` + OG defaults

### Phase 5–7 — Launch

- [ ] Crawl diff: old URLs vs new (zero unintentional 404s)
- [ ] Lighthouse + a11y pass on home, a long doc, tutorial, blog
- [ ] Update Contribute guide scripts for Next
- [ ] Deploy, cut over hosting, monitor logs
- [ ] Remove Docusaurus toolchain when stable

---

## 12. Estimated Effort

Estimates assume one experienced full-stack engineer familiar with Next.js App Router and MDX. Calendar time depends on review cycles and content QA. Figures are planning ranges, not commitments.

| Phase                                   | Complexity       | Effort (eng-days)   | Primary drivers                                       |
| --------------------------------------- | ---------------- | ------------------- | ----------------------------------------------------- |
| 0 — Inventory & decisions               | Low              | 0.5–1               | Baseline crawl, cleanup decisions                     |
| 1 — Next foundation & chrome            | Medium           | 2–4                 | Layout, theme, homepage restyle without Infima        |
| 2 — Docs MDX engine                     | High             | 4–7                 | MDX pipeline, sidebar/pager, assets, math, URL parity |
| 3 — Interactive components              | High             | 3–5                 | Canvas tutorial + CurriculumTree client boundaries    |
| 4 — Blog, RSS, sitemap, secondary pages | Low              | 1–2                 | Low content volume                                    |
| 5 — SEO / redirects hardening           | Medium           | 1–2                 | Metadata gaps, crawl verification                     |
| 6 — Performance & polish                | Medium           | 2–3                 | Image optimization, bundle splitting                  |
| 7 — Cutover                             | Medium           | 1–2                 | Deploy, monitoring, docs updates                      |
| **Total**                               | **High** overall | **~14–26 eng-days** | Roughly 3–6 weeks elapsed with QA buffer              |

### Complexity summary by workstream

- **High** — Interactive tutorials, Infima removal, MDX pipeline parity
- **Medium** — Navigation chrome, dark mode, KaTeX, image path normalization, SEO metadata fill-in
- **Low** — Blog (1 post), footer, static branding assets, RSS/sitemap once docs engine exists

---

_Migration blueprint for AISeekhegaIndia — analysis only. See also [`migration-plan.html`](./migration-plan.html)._
