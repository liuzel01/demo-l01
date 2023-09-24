import XHIconTmpl from "@/common-module/components/xh-icon.tmpl.vue";

declare module "@vue/runtime-core" {
    export interface GlobalComponents {
        "xh-icon": typeof XHIconTmpl;
    }
}