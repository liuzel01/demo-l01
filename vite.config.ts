import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath } from 'url';
import { resolve } from 'path';


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  // 增加以下的配置
  resolve: {
    alias: [
      {
        find: '@',
        replacement: resolve(__dirname, 'src')
      },
      {
        find: 'components',
        replacement: resolve(__dirname, 'src/components')
      }
    ]
  }
})
