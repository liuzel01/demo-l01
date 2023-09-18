import { createRouter, createWebHistory } from "vue-router";
// import AppStore from "@/App.store";

// import CommonModuleRoutes from "@/common-module/routes/common.routes";
// import LoginModuleRoutes from "@/login-module/routes/login.routes";
import FrameModuleRoures from "@/frame-module/routes/frame.routes";

// import HttpProvider from "@/login-module/services/login.provider";
// import { vuexActionKeys } from "@/login-module/services/login.store";

const appRouter = createRouter(
    {
        history: createWebHistory(import.meta.env.BASE_URL), // [mk] use history mode
        routes: [
            ...FrameModuleRoures,
        ]
    }
);

appRouter.beforeEach(
    async (to, from, next) => {

        // console.log("%c[vuex]", "color:#1E90FF;", AppStore);
        console.log("%c[vue-router routes]", "color:#1E90FF;", appRouter.getRoutes());
        console.log("%c[vue-router from]", "color:#32CD32;", from.path, from.query, from);
        console.log("%c[vue-router to  ]", "color:#32CD32;", to.path, to.query, to);

        // // [mk] 1 if has cookie
        // if (HttpProvider.getUCToken()) {

        //     // [mk] 2 if has vuex user info
        //     if (AppStore.getters.getVuexUserInfo) {

        //     }
        //     else {

        //         // [mk] 3 load db user info and fullfill vuex
        //         await AppStore.dispatch(vuexActionKeys.setVuexUserInfoAction);

        //     }

        // }
        next();
        // if (to.meta.auth === true) {

        //     if (HttpProvider.getUCToken() && AppStore.getters.getVuexUserInfo) {

        //         next();

        //     }
        //     else {

        //         next(`/login?redirect=${to.fullPath}`);

        //     }

        // }
        // else if (to.meta.auth === false) {

        //     next();

        // }
        // else {
        //     next("/404");
        // }

    }
);

appRouter.afterEach(
    (to) => {
        if (to.meta.title) {
            document.title = `${to.meta.title} | the seeds`;
        }
    }
);

export default appRouter;