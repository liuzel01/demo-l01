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
            <!-- <div class="nav-item">
                <Wallet />
            </div> -->

        </div>

        <div class="entry-box">

            <el-icon v-if="viewIsLogin === false" class="wallet-icon-entry-item" @click="loginByBroswerWalletPluginAction">
                <Wallet />
            </el-icon>

            <!-- <el-icon v-if="viewIsLogin === false" class="wallet-icon-entry-item">
                <wallet-multi-button />
            </el-icon> -->

            <el-button v-if="viewIsLogin === false" type="primary" round @click.prevent="gotoPageAction(`/login`)">
                Login
            </el-button>

            <el-badge v-if="viewIsLogin === true" is-dot @click="gotoPageAction(`/message`)"
                :class="[`event-icon-entry-item`]">
                <el-icon>
                    <Message />
                </el-icon>
            </el-badge>


        </div>
    </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { ref, computed } from "vue";
import { useStore } from "vuex";
import { PhantomWalletAdapter, SolflareWalletAdapter } from '@solana/wallet-adapter-wallets'
import {
    initWallet,
    useWallet as useSolanaWalletsAdapterWallet,
    useAnchorWallet as useSolanaWalletsAdapterAnchorWallet,
    type AnchorWallet as tSolanaWalletsAdapterAnchorWallet
} from "solana-wallets-vue";
import * as SolanaAnchorJs from "@project-serum/anchor";
import { solanaAlchemyUrl } from "@/services/consts";
import { solanaCommitmentEnum } from "@/solana/v1/services/libs/enums";
import MyPackageProvider, { nftTypeEnum, nftTypeQueryTabEnum, nftTypeLabelEnum, nftStateLabelEnum } from "@/my-package-module/services/my-package.provider";
import type { WalletName as tSolanaWalletAdapterWalletName } from "@solana/wallet-adapter-base";
// import { vuexActionKeys } from "@/login-module/services/login.store";

const $route = useRoute();
const $router = useRouter();
const $store = useStore();

// // 可以后面再研究按钮调用wallet
// const wallets = [
//     new PhantomWalletAdapter(),
//     new SolflareWalletAdapter(),
// ]
// initWallet({ wallets, autoConnect: true })
// initWorkspace()

// import LoginProvider from "@/login-module/services/login.provider";

const viewIsHomeNavItemExpand = ref<boolean>(false);
const viewIsMarketPlaceNavItemExpand = ref<boolean>(false);
const viewIsAvatarAndOperateEntryItemExpand = ref<boolean>(false);

const viewIsLogin = computed<boolean>(
    () => {
        return $store.getters.getVuexUserInfo ? true : false;
    }
);

const gotoPageAction = (routePath: string = "/login") => {
    $router.push(routePath);
};

const loginByBroswerWalletPluginAction = async () => {
    alert("[todo]");

    // // [mk] 3-1 init solana wallets adapter
    // initWallet(
    //     {
    //         wallets: [new PhantomWalletAdapter(), new SolflareWalletAdapter(),],
    //         autoConnect: false,
    //     }
    // );

    // // [mk] 3-2 load installed broswer wallet plugin list
    const solanaWalletsAdapterWallet = useSolanaWalletsAdapterWallet();
    const broswerWalletPluginList = solanaWalletsAdapterWallet.wallets.value;

    console.log(broswerWalletPluginList.length);

    // let enableBroswerWalletPluginCount = 0;
    // for (let index = 0; index < broswerWalletPluginList.length; index++) {

    //     if (broswerWalletPluginList[index].readyState === `Installed`) {
    //         enableBroswerWalletPluginCount++;
    //     }
    // }

    // // [mk] 3-3
    // if (enableBroswerWalletPluginCount === 0) {
    //     return;
    // }

    // // [mk] 3-4 select wallet plugin and connect
    // solanaWalletsAdapterWallet.select("Phantom" as tSolanaWalletAdapterWalletName);
    // await solanaWalletsAdapterWallet.connect();

    // // [mk] 3-5 get my wallet plugin nft token address base58 list 
    // const solanaWalletsAdapterAnchorWallet: any = useSolanaWalletsAdapterAnchorWallet();
    // const solanaAnchorJsWeb3Connection = new SolanaAnchorJs.web3.Connection(solanaAlchemyUrl, solanaCommitmentEnum.confirmed);

    // const tmpMyBroswerWalletPluginNftTokenAddressBase58List = await MyPackageProvider.getMyBroswerWalletPluginNftTokenAddressBase58List(
    //     solanaWalletsAdapterAnchorWallet.value?.publicKey as SolanaAnchorJs.web3.PublicKey,
    //     solanaWalletsAdapterAnchorWallet as tSolanaWalletsAdapterAnchorWallet,
    //     solanaAnchorJsWeb3Connection
    // );

    // // [mk] 3-6
    // if (tmpMyBroswerWalletPluginNftTokenAddressBase58List.length === 0) {
    //     return;
    // }

};

</script>

<style lang="less" scoped>
@import "../styles/header.tmpl.less";
</style>
<style lang="less">
@import "../styles/header.tmpl.reset.less";
</style>