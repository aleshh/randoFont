import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react({ include: /\.[jt]sx?$/ })],
  esbuild: {
    loader: 'jsx',
    include: /src\/.*\.[jt]sx?/
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.js': 'jsx'
      }
    }
  },
  build: {
    outDir: 'build'
  },
  server: {
    port: 3000
  }
});
