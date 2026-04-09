import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';

export default defineConfig({
  site: 'https://tyrustech.com',
  srcDir: './src',
  outDir: './dist',
  output: 'static', 
  trailingSlash: 'never',
  adapter: vercel(),
  integrations: [tailwind(), sitemap()]
});