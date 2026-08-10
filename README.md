# AISeekhegaIndia (Frontend)

Frontend-only branch for AISeekhegaIndia: Next.js and Fumadocs in `frontend/`.

Auth and API calls expect a running backend at `NEXT_PUBLIC_API_URL` (default `http://localhost:4000`).

## Setup

```bash
cd frontend
npm install
cp .env.example .env.local
```

## Development

```bash
cd frontend
npm run dev
```

## Verification

```bash
cd frontend
npm run typecheck
npm run build
```
