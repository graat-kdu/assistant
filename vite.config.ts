import { defineConfig } from 'vite';

export default defineConfig({
  cacheDir: '../../node_modules/.vite/assistant',
  base: '',

  server: {
    port: 4200,
    host: 'localhost',
  },

  preview: {
    port: 4173,
    host: 'localhost',
  },
});