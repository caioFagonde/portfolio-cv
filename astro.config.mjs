import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import tailwind from '@astrojs/tailwind';

const base = process.env.PUBLIC_BASE_PATH ?? '/';
// Markdown content follows the same URL convention as Astro templates.
function prefixMarkdownLinks() {
  return function visit(node) {
    if (typeof node.url === 'string' && node.url.startsWith('/') && !node.url.startsWith('//') && base !== '/' && !node.url.startsWith(`${base}/`)) node.url = `${base.replace(/\/$/, '')}${node.url}`;
    node.children?.forEach(visit);
  };
}

export default defineConfig({
  site: 'https://caiofagonde.github.io',
  base,
  i18n: { defaultLocale: 'en', locales: ['en', 'pt'], routing: { prefixDefaultLocale: false } },
  devToolbar: { enabled: false },
  integrations: [react(), mdx(), tailwind({ applyBaseStyles: false })],
  markdown: {
    remarkPlugins: [prefixMarkdownLinks],
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
