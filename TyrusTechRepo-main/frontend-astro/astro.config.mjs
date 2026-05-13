import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel';

/** Canonical URLs for SEO live in public/sitemap.xml and public/sitemap_index.xml (static, always 200 on Vercel). */
export default defineConfig({
  site: 'https://www.tyrustech.com',
  srcDir: './src',
  outDir: './dist',
  output: 'server',
  trailingSlash: 'never',
  adapter: vercel(),
  integrations: [tailwind()]
});
