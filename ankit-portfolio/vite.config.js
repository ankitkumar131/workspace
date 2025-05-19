import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    host: '0.0.0.0',
    allowedHosts: [
      'work-1-mwpvevvpbyeejbaq.prod-runtime.all-hands.dev',
      'work-2-mwpvevvpbyeejbaq.prod-runtime.all-hands.dev'
    ],
    cors: true
  }
});