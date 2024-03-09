import { defineConfig } from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@pages': path.resolve(__dirname, './src/pages'),
      '@features': path.resolve(__dirname, './src/features'),
      '@config': path.resolve(__dirname, './src/app/config/'),
      '@store': path.resolve(__dirname, './src/app/store/'),
      '@services': path.resolve(__dirname, './src/app/services/'),
      '@hooks': path.resolve(__dirname, './src/app/hooks/'),
    },
  },
});
