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
import { ucApi } from '@/api/uc';
import { MetamaskOperate } from '@/enum/auth';
import moment from 'moment'
import { useWallet } from '@solana/wallet-adapter-react';
import * as bs58 from 'bs58';
import { writeToken } from '@/storage/token'
import { login$, changeWallet$ } from '@/streams/config';

const $route = useRoute();
const $router = useRouter();
const $store = useStore();

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

// const loginByBroswerWalletPluginAction = async () => {
// alert("[todo]");

// const base58 = useMemo(() => {
//     const address = publicKey?.toBase58()
//     return address
// }, [publicKey]);

const isSign = ref(false);
const {
    publicKey,
    wallet,
    disconnect,
    signMessage,
    select,
    wallets,
    connect,
} = useWallet();
const walletNum = ref<string>('')
const now = moment().utc()
const timeString = now.format('YYYY-MM-DDTHH:mm:ss.SSS') + 'Z'
const publicAddress = base58;
try {
    //1.调用接口获取nonce
    const { nonce } = await ucApi.getMetamaskNonce({
        publicAddress,
        operateEnum: MetamaskOperate.login,
    });
    // // `publicKey` will be null if the wallet isn't connected
    // if (!publicKey) throw new Error(t('solana.notConnect'));
    // if (!signMessage)
    //     throw new Error(t('solana.signError'));
    // const now = moment().utc()
    // const timeString = now.format('YYYY-MM-DDTHH:mm:ss.SSS') + 'Z'

    //2.自定义message,自定文案+publicAddress+nonce
    const message = `Welcome to the Seeds!\n\nThis request will not trigger a blockchain transaction or cost any gas fees.\n\nWallet address:\n${publicAddress}\n\nURL:https://www.theseeds.io/\nVersion:1\nChain ID:mainnet\nNonce:${nonce}\nIssued At:${timeString}`;

    //3.调用钱包api拉起签名,对message做了UTF-8字节流转换(new TextEncoder().encode()),此处API限制必须要转换
    //4.接口返回signature,返回的数据是一个Uint8Array,例[65, 194, 32, 13, 134, 189, 107, 70, 220, 51, 226, 42, 18, 244, 7, 75, 139, 157, 58, 181, 139, 174, 119, 199, 217, 67, 8, 166, 139, 78, 56, 254, 35, 213, 247, 25, 164, 80, 63, 10, 188, 61, 175, 226, 43, 110, 114, 149, 70, 230, 140, 128, 84, 200, 244, 216, 214, 173, 102, 57, 181, 119, 250, 2, buffer: ArrayBuffer(64), byteLength: 64, byteOffset: 0, length: 64, Symbol(Symbol.toStringTag): 'Uint8Array']
    // let address1 = JSON.parse(JSON.stringify(walletNum.value))
    const signature = await signMessage(new TextEncoder().encode(message));
    // let address2 = JSON.parse(JSON.stringify(walletNum.value))
    // if (address1 !== address2) return

    //5.此处针对后端接口要求对返回的signature进行转换
    const newArray = Uint8Array.from(signature);
    const newSignature = bs58.encode(newArray);
    const params = {
        message,
        publicAddress,
        signature: newSignature,
        // inviteCode,
    };
    //8.非首次注册,调用后端接口验证签名
    const result = await ucApi.metamaskLogin(params);
    if (result) {
        await writeToken(result.ucToken);
        // Notification.success({
        //     title: t('login.success'),
        // });
        isSign.value = false
        setTimeout(() => {
            localStorage.setItem('loginMethod', 'wallet')
            login$.next()
        }, 500)
        // loginSuccess();
    }
    // //6.获取是否首次注册
    // const res = await ucApi.inviteFlag({
    //   account: publicAddress,
    // });
    // if (res) {
    //   //7.首次注册,需输入邀请码
    //   dispatchEvent(new CustomEvent('INVITE_FLAG', { detail: params }));
    // } else {
    //   //8.非首次注册,调用后端接口验证签名
    //   const result = await ucApi.metamaskLogin(params);
    //   if (result) {
    //     writeToken(result.ucToken);
    //     Notification.success({
    //       title: 'Login successfully!',
    //     });
    //     isSign.current = false
    //     setTimeout(() => {
    //       localStorage.setItem('loginMethod', 'wallet')
    //       login$.next()
    //     }, 500)
    //     // loginSuccess();
    //   }
    // }
} catch (error) {
    isSign.value = false
    console.warn('error');
}

// };

</script>

<style lang="less" scoped>
@import "../styles/header.tmpl.less";
</style>
<style lang="less">
@import "../styles/header.tmpl.reset.less";
</style>