import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import tailwindcss from '@tailwindcss/vite';
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
      '/api': 'http://localhost:8080',
    },
  },
  resolve: { alias },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/tests/setupTests.ts',
  },
});
