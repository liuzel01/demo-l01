import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
// import { App } from 'vue'

const routes: RouteRecordRaw[] = [{
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/login.vue')
}, {
    path: '/homepage',
    name: 'homepage',
    component: () => import('@/views/homepage/homepage.vue')
}
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
// export const initRouter = (app: App<Element>) => {
//     app.use(router)
// }