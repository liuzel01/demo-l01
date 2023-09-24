
<template>
    <div class="homepage_container">
        <div class="homepage_header">头部</div>
        <div class="homepage_menu">
            <el-menu active-text-color="#ffd04b" background-color="#545c64" text-color="#fff" @open="handleOpen"
                @close="handleClose">

                <el-sub-menu index="1">
                    <template #title>
                        <span>Navigator One</span>
                    </template>

                    <el-menu-item index="1-4-1">item one</el-menu-item>
                    <el-menu-item index="1-4-1">item one</el-menu-item>
                    <el-menu-item index="1-4-1">item one</el-menu-item>

                </el-sub-menu>
            </el-menu>
        </div>
        <div class="homepage_content">右侧内容</div>
    </div>
</template>

<script setup lang="ts">
import { ElMenu, ElSubMenu, ElMenuItem } from 'element-plus'
</script>

<style lang="less" scoped  >
.homepage_container {
    position: relative;
    height: 100%;

    .homepage_header {
        height: 70px;
        width: 100vh;
        background-color: antiquewhite;
    }

    .homepage_menu {
        position: absolute;
        top: 70px;
        left: 0;
        bottom: 0;
        width: 250px;
        background-color: beige;
    }

    .homepage_content {
        position: absolute;
        top: 70px;
        right: 0;
        left: 100px;
        bottom: 0;
        background-color: skyblue;
    }
}
</style>