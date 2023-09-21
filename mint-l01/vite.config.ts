import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath } from 'url'
import path from "path";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),
  // configuration of icon svg 
  createSvgIconsPlugin({
    iconDirs: [path.resolve(process.cwd(), "src/assets/svgs")],
    symbolId: "icon-[dir]-[name]",
  }),],

  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    }
  },
})
