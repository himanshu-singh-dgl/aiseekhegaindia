# AISeekhegaIndia (Frontend)

Frontend-only branch for AISeekhegaIndia: Next.js and Fumadocs in `frontend/`.

Auth and API calls expect a running backend at `NEXT_PUBLIC_API_URL` (default `http://localhost:4000`).

## Setup

```bash
npm install
cp frontend/.env.example frontend/.env.local
```

## Development

```bash
npm run dev:frontend
```

## Verification

```bash
npm run typecheck
npm run build
```
