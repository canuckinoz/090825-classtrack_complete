# Architecture Overview

## Routing

- React Router v6
- Public: `/login`
- Private (wrapped by `PrivateRoute`): `/dashboard`, `/quick-log`, `/students/:id`
- `AppLayout` provides nav and user header.

## State

- Zustand store (`src/state/useStore.ts`)
  - `auth`: `user`, `token`, `login`, `logout` (persisted)
  - `students` and `behaviours` slices
  - Optimised `logBehaviour` with O(1) lookup and single set
  - Memoised selectors for dashboards

## Data Flow

- Backend: Express API (`server/app.js`)
  - Helmet, CORS, session (dev), rate limiting
  - Auth: `/api/login` (JWT), `/api/me`
  - Logs: `/api/logs` (list/create)
  - Prisma + SQLite (dev) (`server/db/prisma.js`)
  - Zod validation for mutating routes
  - Central `errorHandler` returns `{ ok:false, error }`

## Environments

- Dev: SQLite file DB
- Prod: Postgres (set `DATABASE_URL`)

## Testing

- Jest + RTL for client
- Jest + Supertest for server
- (Optional) Playwright for E2E
