// const FramePage = () => import("../views/frame.page.vue");
const homePage = () => import("@/home-module/views/home.page.vue")
import HomeModuleRoutes from "@/home-module/routes/home.routes";

export default [
    {
        path: "/",
        component: homePage,
        // component: FramePage,
        children: [
            {
                path: "/",
                redirect: { path: "/home" },
            },
            ...HomeModuleRoutes,
        ]
    },
];