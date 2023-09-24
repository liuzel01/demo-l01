import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import appRouter from '@/router/index'
import { initStore } from '@/store/index'

const app = createApp(App)
// 初始化路由
app.use(appRouter)
// 初始化 vuex
initStore(app)
app.mount('#app')