import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';

const site = 'https://www.tyrustech.com';

/** Every indexable page path (trailingSlash: never). Keeps GSC discovery reliable in SSR. */
const pagePaths = [
  '/',
  '/about',
  '/blog',
  '/contact',
  '/case-studies',
  '/services',
  '/services/document-scanning',
  '/services/document-digitization',
  '/services/data-capture-ocr',
  '/services/digital-archives',
  '/services/medical-record-scanning',
  '/services/legal-document-scanning',
  '/services/hr-document-digitization',
  '/industries',
  '/industries/healthcare',
  '/industries/banking-finance',
  '/industries/government',
  '/industries/legal',
  '/industries/education',
  '/industries/manufacturing',
  '/posts/benefits-of-document-digitization',
  '/posts/government-archive-digitization-checklist',
  '/posts/how-to-estimate-digitization-costs',
  '/posts/medical-record-digitization-guide',
  '/posts/secure-document-scanning-for-banks'
];

const customPages = pagePaths.map((path) => `${site}${path}`);

export default defineConfig({
  site,
  srcDir: './src',
  outDir: './dist',
  output: 'server',
  trailingSlash: 'never',
  adapter: vercel(),
  integrations: [
    tailwind(),
    sitemap({
      customPages
    })
  ]
});
