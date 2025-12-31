import { defineConfig } from 'vite';

export default defineConfig({
  root: '.',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: './index.html',
        menu: './menu.html',
        camera: './camera.html',
        final: './final.html',
        admin: './admin.html',
        upload: './upload.html'
      }
    }
  },
  server: {
    port: 3000
  }
});
