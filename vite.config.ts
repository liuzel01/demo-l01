import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath } from 'url';


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  // resolve: {
  //   alias: {
  //     // 配置路径别名
  //     "@": fileURLToPath(new URL("./src", import.meta.url)),
  //     // "@img": fileURLToPath(new URL("./src/assets/img", import.meta.url)),
  //   },
  // }
})
