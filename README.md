# AISeekhegaIndia (Backend)

Backend-only branch for AISeekhegaIndia: Express, Google OAuth, and PostgreSQL in `backend/`.

CORS allows the frontend origin from `FRONTEND_ORIGIN` (default `http://localhost:3000`).

## Setup

```bash
cd backend
npm install
cp .env.example .env
```

Apply the PostgreSQL migration before starting OAuth:

```bash
psql "$DATABASE_URL" -f migrations/001_initial.sql
```

## Development

```bash
cd backend
npm run dev
```

## Verification

```bash
cd backend
npm test
npm run typecheck
npm run build
```
