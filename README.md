# AISeekhegaIndia

Monorepo for the AISeekhegaIndia platform.

## Structure

```
aiseekhegaindia/
├── frontend/     Next.js docs site (App Router + MDX)
└── backend/      Express API (health check + future services)
```

## Development

From the repo root:

```bash
npm install

# Frontend only (http://localhost:3000)
npm run dev

# Backend only (http://localhost:4000)
npm run dev:backend

# Both in separate terminals
npm run dev:frontend
npm run dev:backend
```

## Build

```bash
npm run build
```

## API

Backend health check: `GET http://localhost:4000/api/health`
