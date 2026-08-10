# Backend

Express API with Google OAuth and PostgreSQL-backed sessions.

## Setup

```bash
cd backend
npm install
cp .env.example .env
```

Configure the Google OAuth client and generate a session secret:

```bash
openssl rand -base64 48
```

The Google Cloud OAuth client must include:

```text
http://localhost:4000/api/auth/google/callback
```

under **Authorized redirect URIs**.

Create the PostgreSQL database, then apply the initial migration:

```bash
psql "$DATABASE_URL" -f migrations/001_initial.sql
```

## Run

```bash
npm run dev
```

The API listens on `http://localhost:4000` by default.

- `GET /api/health`
- `GET /api/health/database`
- `GET /api/auth/google`
- `GET /api/auth/google/callback`
- `GET /api/auth/me`
- `POST /api/auth/logout`

## Build

```bash
npm run build
npm start
```

`gcp-build` runs `npm run build` so Google Cloud buildpacks compile TypeScript before `npm start`.

## Cloud Run

Build context directory: `backend`. Required env vars:

```text
NODE_ENV=production
HOST=0.0.0.0
FRONTEND_ORIGIN=https://YOUR_FRONTEND_URL
DATABASE_URL=postgresql://USER:PASSWORD@/DB?host=/cloudsql/PROJECT:REGION:INSTANCE
DATABASE_SSL=false
GCP_CLIENT_ID=...
GCP_CLIENT_SECRET=...
GOOGLE_CALLBACK_URL=https://YOUR_API_URL/api/auth/google/callback
SESSION_SECRET=...   # at least 32 characters
```

Cloud Run sets `PORT` (usually `8080`). Attach the Cloud SQL instance on the service if you use the `/cloudsql/...` socket URL.

## Test

```bash
npm test
```
