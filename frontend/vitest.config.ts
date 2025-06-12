import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import { alias } from './alias';

export default defineConfig({
  plugins: [react(), svgr()],
  resolve: { alias },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/__tests__/setupTests.ts',
    coverage: {
      reporter: ['text', 'json', 'html'],
    },
  },
});
