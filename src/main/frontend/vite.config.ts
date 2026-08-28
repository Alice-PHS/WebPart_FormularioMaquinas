import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Node global (sem @types/node no projeto).
declare const process: { env: Record<string, string | undefined> };

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
    // Em dev o front roda na :3000 e o backend Spring em outra porta.
    // Encaminha /api para o backend (ajuste a porta ou use VITE_DEV_API).
    proxy: {
      '/api': {
        target: process.env.VITE_DEV_API ?? 'http://localhost:5153',
        changeOrigin: true,
      },
    },
  },
  build: {
    // O build.gradle (node-gradle) espera a saida em src/main/frontend/build
    // e o processResources copia essa pasta para static/ do .war.
    outDir: 'build',
    emptyOutDir: true,
    sourcemap: false,
  },
});
