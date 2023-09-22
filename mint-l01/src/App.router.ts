import { createRouter, createWebHistory } from "vue-router";
import homeModuleResors from "@/frame-module/routes/frame.routes";

const appRouter = createRouter(
    {
        history: createWebHistory(import.meta.env.BASE_URL), // [mk] use history mode
        routes: [
            ...homeModuleResors,
        ]
    }
);

export default appRouter;
