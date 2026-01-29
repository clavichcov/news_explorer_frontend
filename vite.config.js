import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {     
    port: 3000,
    open: true,
    proxy: {
      '/api': {
        target: 'https://api.newsfinalsprint.chickenkiller.com',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''),
        configure: (proxy, _options) => {
          proxy.on('proxyReq', (proxyReq, req, _res) => {
            console.log('Proxy Request:', req.method, req.url);
          });
        }
      },
      '/newsapi': {
        target: 'https://newsapi.org/v2',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/newsapi/, ''),
      }

  }
  
  },
  root: "./",
})
