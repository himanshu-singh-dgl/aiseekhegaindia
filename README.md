# AISeekhegaIndia (Backend)

Backend-only branch for AISeekhegaIndia: Express, Google OAuth, and PostgreSQL in `backend/`.

CORS allows the frontend origin from `FRONTEND_ORIGIN` (default `http://localhost:3000`).

## Setup

```bash
npm install
cp backend/.env.example backend/.env
```

Apply the PostgreSQL migration before starting OAuth:

```bash
psql "$DATABASE_URL" -f backend/migrations/001_initial.sql
```

## Development

```bash
npm run dev:backend
```

## Verification

```bash
npm test
npm run typecheck
npm run build
```
