# AISeekhegaIndia

AISeekhegaIndia is organized as an npm-workspaces monorepo:

- `frontend/` — Next.js and Fumadocs
- `backend/` — Express, Google OAuth, and PostgreSQL

## Setup

```bash
npm install
cp frontend/.env.example frontend/.env.local
cp backend/.env.example backend/.env
```

Apply the PostgreSQL migration before starting OAuth:

```bash
psql "$DATABASE_URL" -f backend/migrations/001_initial.sql
```

## Development

```bash
npm run dev:frontend
npm run dev:backend
```

## Verification

```bash
npm test
npm run typecheck
npm run build
```
