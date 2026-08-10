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

## Test

```bash
npm test
```
