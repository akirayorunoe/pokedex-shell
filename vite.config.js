import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation';
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
  federation({
    name: 'pokedex-shell',
    remotes: {
      remote: 'http://localhost:3001/assets/remoteEntry.js'
    },
    shared: ['react', 'react-dom', '@tanstack/react-query', 'zustand'],
  }),
  tailwindcss(),
  ],
})
