import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import glsl from 'vite-plugin-glsl';


const replitConf = {
    host: '0.0.0.0',
    hmr: {
      port: 443,
    }
  }

// https://vitejs.dev/config/
export default defineConfig(() => ({
  plugins: [react(),glsl()],
  server: process.env.REPLIT ? replitConf : {},
}))
