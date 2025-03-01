import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation';
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  base: '/pokedex-shell/',
  plugins: [react(),
  federation({
    name: 'pokedex-shell',
    remotes: {
      'pokedex-detail': 'https://akirayorunoe.github.io/pokedex-detail/assets/remoteEntry.js'
    },
    shared: ['react', 'react-dom', '@tanstack/react-query', 'zustand', 'react-router-dom', 'gh-pages'],
  }),
  tailwindcss(),
  ],
  build: {
    target: "esnext",
    rollupOptions: {
      output: {
        entryFileNames: 'assets/[name].js',
        chunkFileNames: 'assets/[name].js',
        assetFileNames: 'assets/[name].[ext]',
      },
    },
  },
})
