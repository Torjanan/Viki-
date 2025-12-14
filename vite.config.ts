import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react()],
    define: {
      // Expose process.env.API_KEY to the client-side code
      'process.env.API_KEY': JSON.stringify(env.API_KEY)
    },
    server: {
      host: true
    }
  };
});