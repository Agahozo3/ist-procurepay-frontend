import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  preview: {
    host: true, // allows external access
    port: 5173, // must match your start script
    allowedHosts: [
      "ist-procurepay-frontend-production.up.railway.app"
    ]
  }
})
