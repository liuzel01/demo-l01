import { createRouter, createWebHistory } from "vue-router";
import FrameModuleRoures from "@/frame-module/routes/frame.routes";

const appRouter = createRouter(
    {
        // history: createWebHistory(import.meta.env.BASE_URL),
        history: createWebHistory(import.meta.env.BASE_URL),
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

        next();

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