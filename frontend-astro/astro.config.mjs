import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  srcDir: './src',
  outDir: './dist',
  integrations: [tailwind()]
});