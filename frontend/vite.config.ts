import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

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
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      pages: path.resolve(__dirname, './src/pages'),
      components: path.resolve(__dirname, './src/components'),
      store: path.resolve(__dirname, './src/store'),
      utils: path.resolve(__dirname, './src/utils'),
    },
  },
});
