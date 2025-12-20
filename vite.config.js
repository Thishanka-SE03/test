// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import reactNativeWeb from 'vite-plugin-react-native-web';
import mkcert from 'vite-plugin-mkcert';
import { VitePWA } from 'vite-plugin-pwa';
import tailwindcss from "@tailwindcss/vite";
    
export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    reactNativeWeb(),
    mkcert(),

    VitePWA({
      registerType: 'autoUpdate',

      devOptions: {
        enabled: true
      },

      manifest: {
        name: 'EcoSphere',
        short_name: 'EcoSphere',
        start_url: '/',
        scope: '/',                 // 🔥 REQUIRED
        display: 'standalone',      // 🔥 CORRECT
        background_color: '#000000',
        theme_color: '#000000',
        orientation: 'portrait',
        icons: [
          {
            src: '/web-app-manifest-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/web-app-manifest-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      },

      includeAssets: [
        'favicon.ico',
        'favicon.svg',
        'favicon-96x96.png',
        'apple-touch-icon.png'
      ]
    })
  ],

  resolve: {
    alias: {
      'react-native': 'react-native-web',
    },
  },

  server: {
    https: true,
    host: true,
    port: 2000,
    strictPort: true,
  },
});
