/**
 * vite.config.js
 * Vite build configuration for FORGE Studio.
 * - @vitejs/plugin-react: JSX + Fast Refresh in development.
 * - @tailwindcss/vite: Tailwind CSS v4 (configured in CSS, no tailwind.config.js needed).
 */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    // Modern browsers only: smaller bundles, no legacy polyfills.
    target: 'es2020',
    cssCodeSplit: false,
  },
});
