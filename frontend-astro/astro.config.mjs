import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel/serverless';

export default defineConfig({
  srcDir: './src',
  outDir: './dist',
  output: 'server',
  adapter: vercel(),
  integrations: [tailwind()]
});