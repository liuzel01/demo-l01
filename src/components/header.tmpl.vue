<template>
    <div class="header">

        <div class="logo-box" v-if="viewIsLogin === false">
            <!-- <img src="@/assets/images/header_logo.png" /> -->
        </div>

        <div class="entry-box">

            <xh-icon v-if="viewIsLogin === false" custom-class="wallet-icon-entry-item" icon-class="wallet" icon-size="31px"
                fill-color="#191B28" @click="loginByBroswerWalletPluginAction" />


            <el-badge v-if="viewIsLogin === true" is-dot @click="gotoPageAction(`/message`)"
                :class="[`event-icon-entry-item`]">
                <xh-icon icon-class="qukuailian" icon-size="30px" fill-color="rgb(44,44,44)"
                    style="transform: scale(1.6);" />
            </el-badge>

            <el-link v-if="viewIsLogin === true && viewUserInfo.publicAddress" class="user-info-entry-item">
                {{ viewUserInfo.shortPublicAddress }}
            </el-link>


        </div>

    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'

const $route = useRoute();
const $router = useRouter();
const $store = useStore();

const viewIsLogin = computed<boolean>(
    () => {
        return $store.getters.getVuexUserInfo ? true : false;
    }
);

const loginByBroswerWalletPluginAction = () => {
    alert("[todo]");
};

const gotoPageAction = (routePath: string = "/login") => {
    $router.push(routePath)
}

const viewUserInfo = computed<tDbUserInfo>(() => {
    return $store.getters.getVuexUserInfo
})


</script>