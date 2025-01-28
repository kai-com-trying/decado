import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import fs from 'node:fs'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': process.env
  },
  server: {
    https: {
      key: fs.readFileSync("localhost-key.pem"),
      cert: fs.readFileSync("localhost.pem"),
    },
  },
    port: 5173, // Keep the same port as your Vite dev server
})
