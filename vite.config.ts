import path from 'node:path';

import { partytownVite } from '@builder.io/partytown/utils';
import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';

const config = {
  metadata: {
    title: 'RoadEye',
    description: 'RoadEye',
    keywords: 'RoadEye'
  },
  server: {
    host: '0.0.0.0',
    port: 3000
  }
}

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  plugins: [
    react(),
    partytownVite({
      dest: path.join(__dirname, 'dist', '~partytown')
    }),
    {
      name: 'dynamic-html',
      transformIndexHtml(html) {
        return html
          .replace(/%TITLE%/g, config.metadata.title)
          .replace(/%DESCRIPTION%/g, config.metadata.description)
          .replace(/%KEYWORDS%/g, config.metadata.keywords);
      }
    }
  ],
  server: {
    host: config.server.host,
    port: config.server.port,
    proxy: {
      '/api': {
        target: 'https://api-web.roadeye.my',
        // target:'http://localhost:8081',
        // target:'http://192.168.0.53:8080',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/api')
      }
    }
  }
});
