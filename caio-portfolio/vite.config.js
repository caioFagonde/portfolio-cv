import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

// Configuração de build limpa e compatível com Rolldown / Rollup
export default defineConfig({
  base: './', // Portabilidade física do index.html
  plugins: [svelte()],
  build: {
    sourcemap: false,
    rollupOptions: {
      output: {
        // Splitting de pacotes pesados como função estrita para compatibilidade com Rolldown
        manualChunks(id) {
          if (id.includes('three')) {
            return 'three';
          }
          if (id.includes('p5')) {
            return 'p5';
          }
        }
      }
    }
  }
});