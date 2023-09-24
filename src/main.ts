import "./styles/reset.less";
import "./styles/global.less";
import { createApp } from 'vue';
import App from '@/App.vue'
import AppRouter from "@/App.router";
import AppStore from "@/App.store";
// import '@/lesson'

// [mk] inject element-plus
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import "./styles/element-plus.reset.less";

const app = createApp(App);

// [mk] inject element-plus icon
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
for (const [iconKey, iconComponent] of Object.entries(ElementPlusIconsVue)) {
    app.component(iconKey, iconComponent);
}

// [mk] inject xh-icon
import "virtual:svg-icons-register";
import XHIconTmpl from "@/common-module/components/xh-icon.tmpl.vue";
app.component(`xh-icon`, XHIconTmpl);

app.use(AppRouter)
app.use(AppStore)
app.use(ElementPlus);
// app.use(router)
app.mount("#app");