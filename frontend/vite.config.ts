import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import { defineConfig } from 'vitest/config';

import { alias } from './alias';

export default defineConfig({
  plugins: [
    react(),
    svgr({
      svgrOptions: { exportType: 'default', svgo: false },
    }),
    tailwindcss(),
  ],
  server: {
    proxy: {
      '/api': 'http://localhost:3000',
    },
  },
  resolve: { alias },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/tests/setupTests.ts',
  },
});
