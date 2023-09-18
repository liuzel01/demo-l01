const FramePage = () => import("../views/frame.page.vue");

import HomeModuleRoutes from "../../home-module/routes/home.routes";
// import MarketPlaceModuleRoutes from "@/market-place-module/routes/market-place.routes";
// import MessageModuleRoutes from "@/message-module/routes/message.routes";
// import ProfileModuleRoutes from "@/profile-module/routes/profile.routes";
// import MyPackageModuleRoutes from "@/my-package-module/routes/my-package.routes";
// import HelpCenterModuleRoutes from "@/help-center-module/routes/help-center.routes";

export default [
    {
        path: "/",
        component: FramePage,
        children: [
            {
                path: "/",
                redirect: { path: "/home" },
            },
            ...HomeModuleRoutes,
            // ...MarketPlaceModuleRoutes,
            // ...MessageModuleRoutes,
            // ...ProfileModuleRoutes,
            // ...MyPackageModuleRoutes,
            // ...HelpCenterModuleRoutes,
        ]
    },
];