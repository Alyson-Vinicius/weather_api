import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      srcDir: 'public',           // Pasta onde está seu custom-sw.js
      filename: 'custom-sw.js',   // Nome do seu service worker customizado
      strategies: 'injectManifest', // Usa seu próprio service worker e injeta o manifest
      registerType: 'autoUpdate', // Atualiza automaticamente o SW
      manifest: {
        name: "Weather API",
        short_name: "Weather",
        theme_color: "#2196f3",
        background_color: "#2196f3",
        display: "standalone",
        scope: "/",
        start_url: "/",
        description: "Aplicação para consultar a temperatura de cidades.",
        icons: [
          {
            src: "/android-chrome-192x192.png",
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "/android-chrome-512x512.png",
            sizes: "512x512",
            type: "image/png"
          }
        ]
      }
    })
  ]
})
