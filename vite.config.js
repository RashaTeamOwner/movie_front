import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [
      react(),
    ],
    define: {
      'process.env': env
    },
    server: {
      port: 8000,
    },
    optimizeDeps: {
      exclude: ['js-big-decimal']
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "/src/assets/global.scss";`
        }
      }
    }
  };
});