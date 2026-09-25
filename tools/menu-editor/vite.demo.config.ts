import { defineConfig } from 'vite';
import { resolve } from 'node:path';

// Demo dev server: serve demo/ with library sources rebuilt on the fly
export default defineConfig({
  root: resolve(__dirname, 'demo'),
  server: {
    port: 5183,
    open: false,
    // 允许访问 ../dist 与 ../prebuilt
    fs: { allow: [resolve(__dirname)] },
  },
  build: {
    outDir: resolve(__dirname, 'demo-dist'),
    rollupOptions: { input: resolve(__dirname, 'demo/index.html') },
  },
});
