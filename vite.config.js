// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  base: './', // ensures relative paths if deployed to a subdirectory
  build: {
    outDir: 'dist', // default build directory
    emptyOutDir: true // clean 'dist' folder before building
  }
});