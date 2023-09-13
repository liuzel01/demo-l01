import { createApp } from 'vue';
import App from '@/App.vue'
import router from "@/login-solana-module/router";

// [mk] inject element-plus
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

const app = createApp(App);

// // [mk] inject element-plus icon
// import * as ElementPlusIconsVue from "@element-plus/icons-vue";
// for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
//     app.component(key, component);
// }

app.use(ElementPlus);
app.use(router)
app.mount("#app");