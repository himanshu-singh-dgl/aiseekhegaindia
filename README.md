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

## Deploy on Netlify

1. Connect this GitHub repo and select branch `feature/frontend`.
2. Base directory is already set in [`netlify.toml`](netlify.toml) to `frontend`.
3. Build command: `npm run build` (from `netlify.toml`).
4. Add site environment variable:
   - `NEXT_PUBLIC_API_URL` = your Cloud Run API origin (no trailing slash), e.g. `https://aiseekhegaindia-….run.app`
5. Deploy.

On the backend, set `FRONTEND_ORIGIN` to your Netlify URL (e.g. `https://puru.aiseekhegaindia.com` or `https://….netlify.app`) and add the same origin to the Google OAuth client's authorized JavaScript origins.
