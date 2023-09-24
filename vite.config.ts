import { defineConfig, loadEnv } from "vite";
import vue from '@vitejs/plugin-vue'
import { fileURLToPath } from 'url';
import path from 'path';
import vueJsx from "@vitejs/plugin-vue-jsx";
import viteHttps from "@vitejs/plugin-basic-ssl";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
// [ext] polyfill some Node.js modules
import { NodeGlobalsPolyfillPlugin } from "@esbuild-plugins/node-globals-polyfill";
import { NodeModulesPolyfillPlugin } from "@esbuild-plugins/node-modules-polyfill";


export default defineConfig(
  ({ command, mode, ssrBuild }) => {

    const env = loadEnv(mode, process.cwd(), "");
    const APP_ENV = env.APP_ENV;
    console.log(`> process.env : ${APP_ENV}`);

    const isProd = APP_ENV === "production";
    const isUat = APP_ENV === "uat";
    const isTest = APP_ENV === "test";
    const isDev = APP_ENV === "dev";
    console.log(`> isProd : ${isProd} , isUat : ${isUat} , isTest : ${isTest} , isDev : ${isDev}`);

    // [nginx]
    const serverAPIDomain =
      isProd
        ? `https://www.theseeds.io`
        : isUat
          ? `https://uat.seedslabs.io`
          : isTest
            ? `http://192.168.1.104:9999`// `https://test.seedslabs.io`
            : isDev
              ? `http://192.168.1.106:9999`// `https://dev.seedslabs.io`
              : `http://192.168.1.106:9999`;

    const adminServerAPIDomain =
      isProd
        ? `https://mgt.theseeds.io`
        : isUat
          ? `https://uat-admin.seedslabs.io`
          : isTest
            ? `https://test-admin.seedslabs.io`
            : isDev
              ? `https://dev-admin.seedslabs.io`
              : `https://dev-admin.seedslabs.io`;

    console.log(`> server domian : ${serverAPIDomain}`);
    console.log(`> admin server domian : ${adminServerAPIDomain}`);

    return {
      define: {
        /**
         * @usage process.env.APP_ENV
         */
        "process.env.APP_ENV": JSON.stringify(env.APP_ENV), // [hack] as string
        // [ext] polyfill some Node.js modules
        global: "globalThis",
      },
      plugins: [
        vue(),
        vueJsx(),
        viteHttps(),
        // [ext] icon svg
        createSvgIconsPlugin({
          iconDirs: [path.resolve(process.cwd(), "src/assets/svgs")],
          symbolId: "icon-[dir]-[name]",
        }),
        // [ext] polyfill some Node.js modules
        NodeModulesPolyfillPlugin(),
        // [ext] polyfill some Node.js modules
        NodeGlobalsPolyfillPlugin({ buffer: true, process: true }),
      ],
      resolve: {
        alias: {
          "@": fileURLToPath(new URL("./src", import.meta.url)),
          // [ext] polyfill some Node.js modules
          // "buffer": "rollup-plugin-node-polyfills/polyfills/buffer-es6", // [todo]

          // "http": "rollup-plugin-node-polyfills/polyfills/http",
          // "stream": "rollup-plugin-node-polyfills/polyfills/stream",
          // "url": "rollup-plugin-node-polyfills/polyfills/url",
        }
      },
      css: {
        // [ext] less support
        preprocessorOptions: {
          less: {
            math: "always",
            globalVars: {

            },
          },
        },
      },
      server: {
        open: false, // [ext] auto open in broswer
        port: 8004,  // [ext] local port cofig
        host: "0.0.0.0", // [ext] ip visit support
        https: true,

        // [nginx]
        proxy: {
          "/api/v1": {
            target: serverAPIDomain,
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/api\/v1/, ""),
          },
          "/admin-api/v1": {
            target: adminServerAPIDomain,
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/admin-api\/v1/, ""),
          },
        }

      },
      build: {
        minify: "esbuild",
      },
      esbuild: {
        drop: isProd ? ["console", "debugger"] : [],
      },
    };

  }
);
