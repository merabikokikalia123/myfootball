# Deploy Angular frontend to Cloudflare Pages (free)

This repo contains multiple projects. The Angular frontend is in `gadaketebulimyfootballaplikaica/`.

## 1) Prerequisites

- Push your code to GitHub (recommended), or you can use “Direct Upload” in Cloudflare Pages.

## 2) Create the Pages project

1. Go to Cloudflare Dashboard → **Workers & Pages** → **Pages** → **Create a project**.
2. Choose **Connect to Git** (recommended).
3. Select your repository.

## 3) Build settings (important)

In the project configuration:

- **Root directory:** `gadaketebulimyfootballaplikaica`
- **Build command:** `npm ci && npm run build`
- **Build output directory:** `dist/angularprjct/browser`
- **Framework preset:** `Angular` (optional; the values above are what matter)

### Node version

Angular 19 works best with Node 20+.

Add an environment variable:

- `NODE_VERSION` = `20`

## 4) SPA routing (refresh fix)

SPA routing fallback is already configured via:

- `public/_redirects`

It gets copied into the build output as `dist/angularprjct/browser/_redirects`.

## 5) Deploy

- Click **Save and Deploy**.
- Cloudflare will build and give you a URL like `https://<project>.pages.dev`.

## 6) Backend/API notes

Your production config is currently:

- `src/environments/environment.prod.ts` → `apiBaseUrl: '/api'`

That means the frontend expects the API to be served from the **same domain** under `/api`.

If your ASP.NET API will be hosted on a different domain (common), change `apiBaseUrl` to the full API URL (example: `https://your-api.example.com/api`), then redeploy.

Also configure CORS on the backend:

- Set `CORS_ALLOWED_ORIGINS` to include your Pages domain(s), e.g.
  - `https://<project>.pages.dev`
  - `https://yourcustomdomain.com`

(Backend CORS is wired up in `WebApplication6/WebApplication6/Program.cs`.)
