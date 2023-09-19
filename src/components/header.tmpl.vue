<template>
    <div class="header">

        <div class="logo-box" v-if="viewIsLogin === false">
            <img src="../assets/images/header_logo.png" />
        </div>

        <div class="nav-box">

            <div class="nav-item">
                <el-popover v-model:visible="viewIsHomeNavItemExpand" :show-arrow="false"
                    popper-class="home-nav-item-popper" placement="bottom"
                    @show="viewIsAvatarAndOperateEntryItemExpand = false">
                    <template #reference>
                        <div class="home-nav-item">

                            <el-link href="/home" :type="$route.path === `/home` ? `primary` : `default`">
                                Home
                            </el-link>

                            <el-icon :class="[`nav-item-arrow-icon`,
                                viewIsHomeNavItemExpand === true ? `el-icon-rotate180` : ``,
                                $route.path === `/home` ? `el-icon-active` : ``,
                            ]">
                                <ArrowDown />
                            </el-icon>

                        </div>
                    </template>
                    <template #default>
                        <div class="popper-content">

                            <div class="popper-nav-item">
                                <el-link href="/home#news">
                                    News
                                </el-link>
                            </div>

                            <div class="popper-nav-item">
                                <el-link href="/home#gamefeatures">
                                    Game Features
                                </el-link>
                            </div>

                            <div class="popper-nav-item">
                                <el-link href="/home#heroes">
                                    Heroes
                                </el-link>
                            </div>

                        </div>
                    </template>
                </el-popover>
            </div>

            <div class="nav-item">
                <el-popover v-model:visible="viewIsMarketPlaceNavItemExpand" :show-arrow="false"
                    popper-class="market-place-nav-item-popper" placement="bottom"
                    @show="viewIsAvatarAndOperateEntryItemExpand = false">
                    <template #reference>
                        <div class="market-place-nav-item">

                            <el-link href="/market-place" :type="$route.path === `/market-place` ? `primary` : `default`">
                                Market Place
                            </el-link>

                            <el-icon :class="[`nav-item-arrow-icon`,
                                viewIsMarketPlaceNavItemExpand === true ? `el-icon-rotate180` : ``,
                                $route.path === `/market-place` ? `el-icon-active` : ``,
                            ]">
                                <ArrowDown />
                            </el-icon>

                        </div>
                    </template>
                    <template #default>
                        <div class="popper-content">

                            <div class="popper-nav-item">
                                <el-link href="/market-place#blindbox">
                                    Blind Box
                                </el-link>
                            </div>

                            <div class="popper-nav-item">
                                <el-link href="/market-place#hero">
                                    Hero
                                </el-link>
                            </div>

                            <div class="popper-nav-item">
                                <el-link href="/market-place#equipanditem">
                                    Equip & Item
                                </el-link>
                            </div>

                        </div>
                    </template>
                </el-popover>

            </div>

            <div class="nav-item">
                <el-link href="/videos" :type="$route.path === `/videos` ? `primary` : `default`">
                    Videos
                </el-link>
            </div>

            <div class="nav-item">
                <el-link href="/ranking" :type="$route.path === `/videos` ? `primary` : `default`">
                    Ranking
                </el-link>
            </div>

            <div class="nav-item">
                <el-link href="https://bladerite.gitbook.io/bladerite" type="default" target="_blank">
                    Whitepaper
                </el-link>
            </div>

        </div>

        <div class="entry-box">

            <el-icon v-if="viewIsLogin === false" class="wallet-icon-entry-item" @click="loginByBroswerWalletPluginAction">
                <Wallet />
            </el-icon>

            <el-button v-if="viewIsLogin === false" type="primary" round @click.prevent="gotoPageAction(`/login`)">
                Login
            </el-button>

            <el-badge v-if="viewIsLogin === true" is-dot @click="gotoPageAction(`/message`)"
                :class="[`event-icon-entry-item`]">
                <el-icon>
                    <Message />
                </el-icon>
            </el-badge>

            <!-- <el-link v-if="viewIsLogin === true && viewUserInfo.publicAddress" class="user-info-entry-item">
                {{ viewUserInfo.shortPublicAddress }}
            </el-link> -->

            <!-- <div class="entry-item">
                <el-popover v-model:visible="viewIsAvatarAndOperateEntryItemExpand" :show-arrow="false"
                    popper-class="avatar-and-operate-entry-item-popper" trigger="click" placement="bottom-end"
                    :hide-after="0">
                    <template #reference>
                        <div class="avatar-and-operate-entry-item">

                            <template v-if="viewIsLogin === true && viewUserInfo.avatarUrl">
                                <img class="avatar-icon-entry-item" :src="viewUserInfo.avatarUrl" />
                            </template>
                            <template v-if="viewIsLogin === true && !viewUserInfo.avatarUrl">
                                <img class="avatar-icon-entry-item" src="../assets/images/default-avatar.png" width="72"
                                    height="72" />
                            </template>

                            <el-icon v-if="viewIsLogin === false" :class="[`dot-icon-entry-item`]">
                                <MoreFilled />
                            </el-icon>

                            <el-icon v-if="viewIsLogin === true" :class="[`arrow-icon-entry-item`,
                                viewIsAvatarAndOperateEntryItemExpand === true ? `el-icon-rotate180` : ``,
                            ]">
                                <ArrowDown />
                            </el-icon>
                        </div>
                    </template>
                    <template #default>
                        <div class="avatar-and-operate-entry-item-popper-content">

                            <div v-if="viewIsLogin === true" class="operate-entry-item">
                                <el-icon>
                                    <Remove />
                                </el-icon>
                                <el-link href="/offers">Offers</el-link>
                            </div>

                            <div v-if="viewIsLogin === true" class="operate-entry-item">
                                <el-icon>
                                    <Remove />
                                </el-icon>
                                <el-link href="/orders">Orders</el-link>
                            </div>

                            <div class="operate-entry-item">
                                <el-icon>
                                    <Remove />
                                </el-icon>

                                <el-link href="/help-center">Help Center</el-link>
                            </div>

                            <div class="operate-entry-item">
                                <el-icon>
                                    <Remove />
                                </el-icon>
                                <el-link>Language</el-link>
                            </div>

                            <div v-if="viewIsLogin === true" class="operate-entry-item">
                                <el-icon>
                                    <Remove />
                                </el-icon>
                                <el-link href="/setting">Setting</el-link>
                            </div>

                            <div v-if="viewIsLogin === true" class="operate-entry-item" @click="logoutAction">
                                <el-icon>
                                    <Remove />
                                </el-icon>
                                <el-link>Log Out</el-link>
                            </div>

                        </div>
                    </template>
                </el-popover>
            </div> -->

        </div>

    </div>
    <!-- Sidebar. -->
    <!-- <the-sidebar class="py-4 md:py-8 md:pl-4 md:pr-8 fixed w-20 md:w-64"></the-sidebar> -->
</template>

<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { ref, computed } from "vue";
import { useStore } from "vuex";
import { PhantomWalletAdapter, SolflareWalletAdapter } from '@solana/wallet-adapter-wallets'
import { initWallet } from 'solana-wallets-vue'
import { initWorkspace } from '@/composables'
// import { vuexActionKeys } from "@/login-module/services/login.store";


const $route = useRoute();
const $router = useRouter();
const $store = useStore();

const wallets = [
    new PhantomWalletAdapter(),
    new SolflareWalletAdapter(),
]

initWallet({ wallets, autoConnect: true })
initWorkspace()

// import LoginProvider from "@/login-module/services/login.provider";

const viewIsHomeNavItemExpand = ref<boolean>(false);
const viewIsMarketPlaceNavItemExpand = ref<boolean>(false);
const viewIsAvatarAndOperateEntryItemExpand = ref<boolean>(false);

const viewIsLogin = computed<boolean>(
    () => {
        return $store.getters.getVuexUserInfo ? true : false;
    }
);

// const viewUserInfo = computed<tDbUserInfo>(() => {
//     return $store.getters.getVuexUserInfo;
// });

const gotoPageAction = (routePath: string = "/login") => {
    $router.push(routePath);
};

const loginByBroswerWalletPluginAction = () => {
    alert("[todo]");
};

// const logoutAction = async () => {

//     viewIsAvatarAndOperateEntryItemExpand.value = false;

//     await LoginProvider.logout();

//     await $store.dispatch(vuexActionKeys.logout);

//     $router.push("/home");

// };
</script>

<style lang="less" scoped>
@import "../styles/header.tmpl.less";
</style>
<style lang="less">
@import "../styles/header.tmpl.reset.less";
</style>