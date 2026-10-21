import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const repositoryRoot = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  root: resolve(repositoryRoot, 'app'),
  publicDir: resolve(repositoryRoot, 'app/public'),
  base: '/',
  plugins: [react()],
  build: {
    outDir: resolve(repositoryRoot, 'dist'),
    emptyOutDir: true,
    assetsDir: 'build-assets',
    target: 'es2020',
  },
});
