import { defineConfig } from 'vite';
import { resolve } from 'node:path';

// Library build: ESM + CJS (types via `npm run dts`)
export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'U8G2MenuEditor',
      formats: ['es', 'cjs'],
      fileName: (format) => `u8g2-menu-editor.${format === 'es' ? 'js' : 'cjs'}`,
    },
    rollupOptions: {
      // lit-html & zustand are runtime deps — keep them external for library consumers
      external: ['lit-html', 'lit-html/directives/*', 'zustand/vanilla'],
    },
    minify: 'esbuild',
    sourcemap: true,
  },
});
