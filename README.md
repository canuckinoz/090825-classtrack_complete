# ClassTrack

## Development

### Environment

Create a `.env` with at least:

- `PORT=3005`
- `JWT_SECRET=change_me`
- `SESSION_SECRET=dev-secret-change-me`
- `FRONTEND_ORIGIN=http://localhost:5173`
- `DATABASE_URL=file:./dev.db`

See `env.example` for a Postgres variant.

### Install & Run

```bash
npm install
# start API (dev)
JWT_SECRET=secret SESSION_SECRET=dev PORT=3005 npm run server
# or: npm run server:dev

# start web (CRA dev server on 5173)
npm run web:dev
```

### Security headers, CORS, and CSP

- CORS defaults to allow only `http://localhost:5173` and `http://127.0.0.1:5173`.
- To add/change allowed origins, set `CORS_ORIGINS` as a comma-separated list (overrides `FRONTEND_ORIGIN`).

Helmet is configured to set strict security headers:

- X-Content-Type-Options: `nosniff`
- X-Frame-Options: `DENY`
- Referrer-Policy: `no-referrer`
- Permissions-Policy: denies sensitive features (geolocation, camera, microphone, etc.)
- Content-Security-Policy: `default-src 'none'`; `img-src 'self' data:`; `connect-src 'self'` by default.

To allow external images or charts (e.g., a CDN or charting service):

1. Add domains to `CSP_IMG_SRC` and/or `CSP_CONNECT_SRC` in `.env` as comma-separated values.

Examples:

```
# Allow images from example CDN and charts from api.example.com
CSP_IMG_SRC=https://cdn.example.com
CSP_CONNECT_SRC=https://api.example.com

# If your frontend dev origin is non-standard:
CORS_ORIGINS=http://localhost:5174,http://127.0.0.1:5174
```

Notes:

- Use scheme and host, no paths. Wildcards are not supported by browsers in CSP; list exact origins.
- For data URIs, `data:` is already allowed in `img-src`.
- Avoid adding `unsafe-inline` or `unsafe-eval` unless absolutely necessary.

### Routes

- `POST /api/login` { email, password }
- `GET /api/me`
- `GET /api/logs` (auth)
- `POST /api/logs` { studentId, type, note } (auth)
- Dev helper: `GET /dev-login`

### Frontend Routing

- `/login`
- `/dashboard`
- `/quick-log`
- `/students/:id`

### State Management

- Zustand store in `src/state/useStore.ts` (auth persist, students, behaviours)
- `PrivateRoute` guards protected routes

### Database

- Prisma + SQLite for dev. Schema in `prisma/schema.prisma`
- Migrate: `npx prisma migrate dev -n init`
- Seed: `npm run prisma:seed`

### Testing

- Unit/Integration: `npm test`
- E2E (optional): `npm run e2e`

### Lint & Format

- `npm run lint`
- `npm run format`
