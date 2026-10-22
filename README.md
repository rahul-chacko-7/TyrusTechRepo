# Tyrus Technologies document digitization platform

Production website and supporting services for Tyrus Technologies Pvt Ltd, an India-wide document scanning and digitization company. The public site covers bulk and onsite scanning, OCR and indexing, metadata capture, searchable archives, DMS-ready handover, and specialist workflows for HR, healthcare, banking, legal and government records.

## Stack

- **Frontend:** Astro with Tailwind CSS in `frontend-astro`
- **Deployment:** Vercel adapter and static assets in `frontend-astro/public`
- **Lead workflow:** Astro server endpoint with Supabase integration
- **Content:** Service pages, location pages, case studies and Markdown guides under `frontend-astro/src/pages`

## Local development

```bash
cd frontend-astro
npm install
npm run dev
```

Create the environment variables expected by the proposal endpoint before testing lead submission. Do not commit production credentials or client data.

## Production build

```bash
cd frontend-astro
npm run build
```

The build uses the Vercel adapter and prerenders the location routes. The production site is [tyrustech.com](https://www.tyrustech.com/).

## SEO structure

- Service and industry landing pages target document scanning and digitization intent.
- `/locations/` contains city and service-location pages with canonical URLs.
- `/posts/` contains practical guides for OCR, indexing, cost planning, quality control, HR files and government archives.
- `frontend-astro/public/robots.txt`, `sitemap.xml` and `llms.txt` provide crawler and AI-search discovery signals.
- Case studies provide project context for healthcare, banking, government, DMS and HR records.

## Contribution notes

Keep page titles, descriptions, canonical URLs, internal links, structured data and sitemap entries aligned when adding a page. Run `npm run build` before pushing. Never add confidential customer documents, credentials or unverified performance claims.
