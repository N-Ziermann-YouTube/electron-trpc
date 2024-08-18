import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { DEV_PORT } from './src/electron/constants';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    outDir: 'dist-react',
  },
  server: {
    port: DEV_PORT,
    strictPort: true,
  },
});
