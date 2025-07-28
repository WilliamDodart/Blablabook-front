import react from '@vitejs/plugin-react';
import { type ConfigEnv, defineConfig, loadEnv } from 'vite';

// https://vite.dev/config/
export default ({ mode }: ConfigEnv) => {
  // Charger les variables d'environnement en fonction du mode
  const env = loadEnv(mode, process.cwd());

  const portDev = Number(env.VITE_DEV_PORT); // Type: number
  const portProd = Number(env.VITE_PROD_PORT); // Type: number

  switch (mode) {
    case 'development': {
      return defineConfig({
        // base: '/blabla-book-front/', // nom du repo sur GitHub pour utiliser GitHub Pages en dev
        plugins: [react()],
        server: {
          port: portDev || 5173, // Port souhaité
        },
      });
    }
    case 'production': {
      return defineConfig({
        // base: '/blabla-book-front/', // nom du repo sur GitHub pour utiliser GitHub Pages en production
        plugins: [react()],
        server: {
          port: portProd || 5173, // Port souhaité
        },
      });
    }
  }
};
