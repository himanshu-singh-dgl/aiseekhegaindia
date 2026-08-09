# AISeekhegaIndia Front

Next.js App Router migration of the Docusaurus docs site.

## Stack

- Next.js 16 + React 19 + TypeScript + Tailwind 4
- MDX via `next-mdx-remote` + `@next/mdx` (KaTeX, GFM)
- Content: `content/docs` (ported from Docusaurus)

## Run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Docs spike: [/docs/ai-for-leaders/intro](http://localhost:3000/docs/ai-for-leaders/intro).

API (optional): run `aiseekhegaindia-backend` on port 4000. Set `NEXT_PUBLIC_API_BASE_URL` if needed.

## Migration status

See `DEFERRED.md` for secondary decisions. Sequential loop continues porting remaining doc sections.
