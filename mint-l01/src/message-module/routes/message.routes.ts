const MessagePage = () => import("@/message-module/views/message.page.vue");

export default [
    {
        path: "/message",
        component: MessagePage,
        meta: {
            title: "message",
            auth: true,
        },
    },
];