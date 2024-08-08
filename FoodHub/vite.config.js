import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server:{
    proxy: {
      // '/api': 'http://localhost:3000' 
      target: 'https://your-backend-server.com',
        changeOrigin: true
    }
  },
  plugins: [react()],
})
