# Deployment Guide

## Frontend (Astro on Vercel)

- **Build command**: `npm run build` (in the `frontend-astro` directory)
- **Output directory**: `dist`
- **Environment variables**:
  - `PUBLIC_API_URL` – point this to your Railway backend URL, e.g. `https://digitization-api.up.railway.app`

Steps:

1. In `frontend-astro`, run `npm install` locally and confirm `npm run dev` works.
2. Push the project to GitHub.
3. On Vercel, create a new project from this repo and select the `frontend-astro` folder as the root if needed.
4. Set `PUBLIC_API_URL` under project → Settings → Environment Variables.
5. Deploy. Vercel will run `npm run build` and host the static assets globally.

## Backend (Go API on Railway)

Key environment variables:

- `PORT` – Railway usually injects this automatically.
- `DATABASE_URL` – Supabase Postgres connection string.

Steps:

1. From `backend-go`, ensure your Go module builds locally: `go build ./...`.
2. Create a new Railway service using your GitHub repo and select `backend-go` as the working directory.
3. Set the build command to `go build -o server ./...` and the start command to `./server`.
4. Add `DATABASE_URL` pointing to your Supabase Postgres URL.
5. Deploy and copy the public URL (e.g. `https://digitization-api.up.railway.app`).
6. Update `PUBLIC_API_URL` on the Vercel frontend to this value and redeploy frontend if needed.

## Database (Supabase PostgreSQL)

1. Create a new Supabase project.
2. In the Supabase SQL editor, run the migration files from the `supabase/migrations` directory:
   - `001_init.sql`
   - `002_create_leads.sql`
3. Copy the connection string from Supabase → Project Settings → Database and use it as `DATABASE_URL` in Railway.

## Analytics and SEO

- **Google Analytics**:
  - Create a GA property and obtain the measurement ID.
  - Add the GA script to `DefaultLayout.astro` using the provided ID.
- **Google Search Console**:
  - Verify your Vercel domain in Search Console.
  - Submit your sitemap if you generate one, or let Google auto-discover pages via internal links.

