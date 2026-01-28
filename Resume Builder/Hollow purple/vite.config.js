import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { ViteSitemap } from 'vite-plugin-sitemap'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    ViteSitemap({
      hostname: 'https://hollowpurplex.netlify.app/', // replace with your actual site URL
    }),
  ],
  server: {
    host: '0.0.0.0',
    port: 5175,
    allowedHosts: ['nonrefractive-else-lostly.ngrok-free.dev']
  },
})
