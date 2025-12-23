import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // base: '/forniture', // This was causing the issue on Vercel root deploy
  base: '/',
 /*  build: {
    outDir: '../public',
    emptyOutDir: true,
  }, */
/*   server: {
    port: 3100,
    proxy: {
      '/api': {
        target: 'http://localhost:4000/',
        changeOrigin: true,
      },
    },
  }, */
});
