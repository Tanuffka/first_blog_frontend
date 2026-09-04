// oxlint-disable no-undef
import react from '@vitejs/plugin-react';
import path from 'node:path';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      src: path.resolve(__dirname, 'src'),
      tests: path.resolve(__dirname, 'tests'),
    },
  },
  server: {
    port: 3000,
    proxy: {
      '/api': {
        changeOrigin: true,
        secure: false,
        target: 'http://localhost:4000',
      },
      '/storage': {
        changeOrigin: true,
        secure: false,
        target: 'http://localhost:4000',
      },
    },
  },
});
