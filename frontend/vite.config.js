import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr';


export default defineConfig({
  plugins: [react(), svgr()],
  server: {
    port: 3000, // hoặc cổng bất kỳ bạn dùng cho frontend
    proxy: {
      '/api': {
        // target: 'http://localhost:8888',
        // target: 'https://9500-2405-4803-d734-c200-7926-2102-c243-c659.ngrok-free.app',
        target: 'https://q4qpgjrx-8888.asse.devtunnels.ms/',
        // target: SERVER_BE_URL,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})
