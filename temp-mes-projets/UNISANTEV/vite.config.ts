import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import path from "path"
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [
        tailwindcss(), // Utilisation de la fonction importée
        autoprefixer(),
      ],
    },
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
});