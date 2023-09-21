import { createApp } from 'vue'
import './style.css'
import App from '@/App.vue'
import AppRouter from "@/App.router";

const app = createApp(App)

// [mk] inject xh-icon
import "virtual:svg-icons-register";
import XHIconTmpl from "@/home-module/views/xh-icon.tmpl.vue"
app.component(`xh-icon`, XHIconTmpl);

app.use(AppRouter)
app.mount('#app')