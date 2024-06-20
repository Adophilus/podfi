import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { TanStackRouterVite } from '@tanstack/router-vite-plugin'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [
    TanStackRouterVite(),
    react(),
    tsconfigPaths(),
  ],
  build: {
    outDir: '../server/build/public'
  },
  server: {
    proxy: {
      '/api': process.env.BACKEND_URL!
    }
  },
})
