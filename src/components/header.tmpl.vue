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
import { ref, computed } from "vue";
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import {
    initWallet,
    useWallet as useSolanaWalletsAdapterWallet,
    useAnchorWallet as useSolanaWalletsAdapterAnchorWallet,
    type AnchorWallet as tSolanaWalletsAdapterAnchorWallet
} from "solana-wallets-vue"
import { PhantomWalletAdapter, SolflareWalletAdapter } from "@solana/wallet-adapter-wallets";

const viewBroswerWalletPluginList = ref<any[]>([]);

const viewIsPhantomInstall = computed<boolean>(
    () => {
        const matchBroswerWalletPlugInItem = viewBroswerWalletPluginList.value.find(
            bnroswerWalletPlugInItem =>
                bnroswerWalletPlugInItem.name === `Phantom` && bnroswerWalletPlugInItem.readyState === `Installed`
        );
        return matchBroswerWalletPlugInItem ? true : false;
    }
);
const $route = useRoute();
const $router = useRouter();
const $store = useStore();

const viewIsShowDialog = ref(false);
const viewIsLogin = computed<boolean>(
    () => {
        return $store.getters.getVuexUserInfo ? true : false;
    }
);

const loginByBroswerWalletPluginAction = () => {
    // alert("[todo]");

    // [mk] 1 init
    initWallet(
        {
            wallets: [new PhantomWalletAdapter(), new SolflareWalletAdapter(),],
            autoConnect: false,
            // cluster: SolanaAnchorJs.web3.clusterApiUrl("mainnet-beta"), [todo]
        }
    );

    // [mk] 2 load broswer wallet plugin list
    const solanaWalletsAdapterWallet = useSolanaWalletsAdapterWallet();

    const broswerWalletPluginList = solanaWalletsAdapterWallet.wallets.value;

    let tmpBroswerWalletPluginList = [];

    for (let index = 0; index < broswerWalletPluginList.length; index++) {
        tmpBroswerWalletPluginList.push(
            {
                name: broswerWalletPluginList[index].adapter.name,
                readyState: broswerWalletPluginList[index].readyState,
            }
        );
    }

    viewBroswerWalletPluginList.value = tmpBroswerWalletPluginList;

    // [mk] 3
    viewIsShowDialog.value = true;

    // const { wallet, publicKey, connectWallet, disconnectWallet, connected } = useSolanaWalletsAdapterWallet()

    // function connect() {
    //     connectWallet().then(() => {
    //         if (wallet.value) {
    //             alert(`Connected with the address: ${publicKey.value?.toBase58()}`);
    //         } else {
    //             alert('Failed to connect wallet');
    //         }
    //     })
    // }

    // // Initial setup. Pass in the desired wallets for your application
    // initWallet({
    //     wallets: [
    //         { name: 'Phantom', url: 'https://phantom.app/' }
    //     ],
    //     autoConnect: true, 
    // });

    // return {
    //     connect,
    // }
};

const gotoPageAction = (routePath: string = "/login") => {
    $router.push(routePath)
}

const viewUserInfo = computed<tDbUserInfo>(() => {
    return $store.getters.getVuexUserInfo
})

</script>