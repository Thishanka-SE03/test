// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import reactNativeWeb from 'vite-plugin-react-native-web';
import mkcert from 'vite-plugin-mkcert';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
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
        scope: '/',                 
        display: 'standalone',      
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
      ],

      // Fix for the Workbox precache size error
      workbox: {
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024 // 5 MB – allows your current 2.37 MB bundle to be precached
      }
    })
  ],

  resolve: {
    alias: {
      'react-native': 'react-native-web',
    },
  },

  /*server: {
    https: true,
    host: true,
    port: 2000,
    strictPort: true,
  },*/

  // Recommended: Code splitting to reduce the main bundle size long-term
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // Split react-native-web and related heavy deps into their own chunk
            if (id.includes('react-native') || id.includes('react-native-web')) {
              return 'react-native-vendor';
            }
            // Add other heavy libraries here if needed (e.g., lodash, axios, charts, etc.)
            // Example:
            // if (id.includes('lodash')) return 'lodash';
            return 'vendor'; // everything else from node_modules
          }
        }
      }
    },
    // Optional: reduce noise from the 500kB warning until chunks are smaller
    chunkSizeWarningLimit: 1000
  }
});