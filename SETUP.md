# Church App Backend Setup

1. Copy `.env.example` to `.env`.
2. Fill these required values:
   - `MONGO_URI`
   - `JWT_SECRET`
   - `ADMIN_EMAIL`
   - `ADMIN_PASSWORD`
3. Optional but recommended:
   - `TURNSTILE_SECRET_KEY`
   - `VITE_TURNSTILE_SITE_KEY`
   - `PAYNOW_WEBHOOK_SECRET`

## Run locally

- `npm run dev` starts both API and frontend.
- Frontend runs on `http://localhost:5173`.
- API runs on `http://localhost:4000`.
- MongoDB must be running and reachable from `MONGO_URI`.

## Initialize first admin

The first admin account is auto-created from `ADMIN_EMAIL` and `ADMIN_PASSWORD` when the API boots.

## Paynow webhook

- Endpoint: `POST /api/webhooks/paynow`
- Expected payload includes `reference` and `status`.
- If `PAYNOW_WEBHOOK_SECRET` is set, compute an HMAC SHA-256 hex signature over the raw request body and send it in `x-paynow-signature`.

