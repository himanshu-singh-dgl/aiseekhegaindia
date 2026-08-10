# AI Seekhega India

Monorepo with a Next.js frontend and a NestJS + MongoDB backend (Google OAuth via GCP).

## Structure

```text
aiseekhegaindia/
├── frontend/     # Next.js 15 app (docs, blog, fellowship)
├── backend/      # NestJS API (health + Google OAuth)
└── package.json  # npm workspaces orchestrator
```

## Prerequisites

- Node.js 18+
- MongoDB running locally (default: `mongodb://127.0.0.1:27017/aiseekhegaindia`)
- Google Cloud OAuth 2.0 Web client credentials

## Setup

```bash
npm install
cp frontend/.env.example frontend/.env.local
cp backend/.env.example backend/.env
```

Fill in `backend/.env`:

- `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` from [Google Cloud Console](https://console.cloud.google.com/) → APIs & Services → Credentials → OAuth client ID (Web application)
- Authorized JavaScript origins: `http://localhost:3000`, `http://localhost:4000`
- Authorized redirect URI: `http://localhost:4000/api/auth/google/callback`
- Set a strong `JWT_SECRET`

See [backend/README.md](backend/README.md) for more detail.

## Scripts

| Command | Action |
| --- | --- |
| `npm run dev` | Run frontend and backend in parallel |
| `npm run dev:frontend` | Next.js only (`http://localhost:3000`) |
| `npm run dev:backend` | NestJS only (`http://localhost:4000`) |
| `npm run build` | Build both workspaces |
| `npm run build:frontend` | Build frontend |
| `npm run build:backend` | Build backend |
| `npm run start` | Start both production builds |
| `npm run start:frontend` | Start frontend only |
| `npm run start:backend` | Start backend only |
| `npm run lint` | Lint frontend |

## Auth flow

1. Click **Sign in with Google** in the navbar
2. Browser redirects to `GET /api/auth/google` on the backend
3. After Google consent, callback sets an httpOnly JWT cookie and redirects to the frontend
4. Frontend calls `GET /api/auth/me` with credentials to load the user
5. **Sign out** calls `POST /api/auth/logout` and clears the cookie
