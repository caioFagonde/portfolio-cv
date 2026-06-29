import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://caiofagonde.github.io',
  integrations: [react(), mdx(), tailwind({ applyBaseStyles: false })],
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
      wrap: true
    }
  },
  vite: {
    optimizeDeps: {
      include: ['three', '@react-three/fiber']
    }
  }
});
