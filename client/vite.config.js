import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
    tailwindcss(),
  ],
  server: {
    host: true,
    allowedHosts: [
      "0.0.0.0",
      "https://locally-secure-chamois.ngrok-free.app"
    ],
  },
})
