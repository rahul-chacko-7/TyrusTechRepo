import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel/serverless';

export default defineConfig({
  site: 'https://tyrustech.com',
  srcDir: './src',
  outDir: './dist',
  output: 'server',
  trailingSlash: 'never',
  adapter: vercel(),
  integrations: [tailwind()]
});