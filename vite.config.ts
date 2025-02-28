import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/wordpress/wp-content/plugins/ielts_checkmate_dashboard/dist/',
  build: {
    outDir: 'dist',
    // assetsDir: 'student-workspace-v3/assets',
    manifest: true,
    rollupOptions: {
      input: {
        main: './index.html',
      },
    },
    
  },
  
});
