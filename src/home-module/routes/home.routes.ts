import HomePage from "../views/home.page.vue";

export default [
    {
        path: "/home",
        component: HomePage,
        meta: {
            title: "home",
            auth: false,
        },
    },
];