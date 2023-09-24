<template>
    <div class="frame-page">

        <!-- <SlideBarTmpl /> -->

        <div class="frame-content">
            <HeaderTmpl />
            <div class="wrapper">
                <RouterView />
            </div>
        </div>

    </div>
</template>

<script setup lang="ts">
import { RouterView } from "vue-router";
import HeaderTmpl from '@/components/header.tmpl.vue';
// import SlideBarTmpl from "@/common-module/components/slide-bar.tmpl.vue";
</script>

<style lang="less" scoped>
@import "../styles/frame.page.less";
</style>