import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    host: 'localhost', // hoặc '0.0.0.0' nếu muốn truy cập từ mạng LAN
    port: 3000,        // Đổi cổng từ mặc định (5173) sang 3000
    open: true         // Tự động mở trình duyệt khi chạy
  }
})
