import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/vite-plugin-svelte').SvelteConfig} */
export default {
  // preprocessamento otimizado para Tailwind CSS e Vite
  preprocess: vitePreprocess()
};