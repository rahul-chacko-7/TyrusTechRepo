const staticRoutes = [
  '/',
  '/about',
  '/blog',
  '/case-studies',
  '/contact',
  '/industries',
  '/services',
  '/industries/healthcare',
  '/industries/banking-finance',
  '/industries/government',
  '/industries/legal',
  '/industries/education',
  '/industries/manufacturing',
  '/services/document-scanning',
  '/services/document-digitization',
  '/services/data-capture-ocr',
  '/services/digital-archives',
  '/services/medical-record-scanning',
  '/services/legal-document-scanning',
  '/services/hr-document-digitization'
];

const postModules = import.meta.glob('./posts/*.md', { eager: true });
const postRoutes = Object.keys(postModules).map((filePath) =>
  filePath.replace('./posts/', '/posts/').replace('.md', '')
);

const allRoutes = [...staticRoutes, ...postRoutes];
const siteUrl = 'https://tyrustech.com';

export function GET() {
  const now = new Date().toISOString();
  const urls = allRoutes
    .map((path) => `<url><loc>${siteUrl}${path}</loc><lastmod>${now}</lastmod></url>`)
    .join('');

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`;

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8'
    }
  });
}
