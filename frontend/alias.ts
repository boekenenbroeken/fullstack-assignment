import path from 'path';

export const alias = {
  '@': path.resolve(__dirname, './src'),
  api: path.resolve(__dirname, './src/api'),
  pages: path.resolve(__dirname, './src/pages'),
  components: path.resolve(__dirname, './src/components'),
  store: path.resolve(__dirname, './src/store'),
  utils: path.resolve(__dirname, './src/utils'),
};
