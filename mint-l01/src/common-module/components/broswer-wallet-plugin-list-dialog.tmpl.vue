<!-- 弹窗组件 -->
<template>
    <el-dialog v-model="viewIsShowDialog" class="broswer-wallet-plugin-list-dialog-tmpl" width="25vw" top="25vh">

        <template #header="{ titleId, titleClass }">
            <div :id="titleId" :class="titleClass">{{ props.title }}</div>
        </template>

        <p v-for="broswerWalletPluginItem of viewBroswerWalletPluginList">
            <el-button :type="broswerWalletPluginItem.readyState === `Installed` ? `primary` : `info`"
                @click="connectPluginAction(broswerWalletPluginItem.name)"
                :disabled="broswerWalletPluginItem.readyState === `Installed` ? false : true">
                {{ broswerWalletPluginItem.name }} ( {{ broswerWalletPluginItem.readyState }} )
            </el-button>
        </p>

        <template #footer>
        </template>

    </el-dialog>
</template>

<script setup lang="ts">
import { ref } from "vue";

import { PhantomWalletAdapter, SolflareWalletAdapter } from "@solana/wallet-adapter-wallets";
import {
    initWallet,
    useWallet as useSolanaWalletsAdapterWallet,
    useAnchorWallet as useSolanaWalletsAdapterAnchorWallet,
    type AnchorWallet as tSolanaWalletsAdapterAnchorWallet
} from "solana-wallets-vue";
import type { WalletName as tSolanaWalletAdapterWalletName } from "@solana/wallet-adapter-base";
import { eventTypeEnum } from "@/message-module/services/message.provider";
// import { nftStateEnum } from "@/my-package-module/services/my-package.provider";
// import { marketPlaceModeEnum } from "@/market-place-module/services/market-place.provider";

const props = defineProps({
    title: { type: String },
});

const viewIsShowDialog = ref(false);
const viewBroswerWalletPluginList = ref<any[]>([]);

// [mk] for mint or compound
const viewCloneEventType = ref<eventTypeEnum>();
const viewCloneEventItem = ref<tDbEventItem>();

// // [mk] for nft state change
// const viewCloneOldNftState = ref<nftStateEnum>();
// const viewCloneNewNftState = ref<nftStateEnum>();
// const viewCloneNftItem = ref<tDbNftItem>();

// // [mk] for nft auction bidding
// const viewCloneBiddingItem = ref<tDbNftAuctionBiddingItem>();
// const viewCloneBiddingList = ref<tDbNftAuctionBiddingItem[]>();

// // [mk] for market place mode
// const viewCloneMarketPlaceMode = ref<marketPlaceModeEnum>();
// const viewCloneBlindBoxHeroItem = ref<tDbBlindBoxHeroItem>();

const viewCloneBroswerWalletPluginProvider = ref<tSolanaWalletsAdapterAnchorWallet>();

// [mk] 1 open dialog for mint or compound

const openDialogUnderMintOrCompoundModeAction = () => {
    // const openDialogUnderMintOrCompoundModeAction = (eventType: eventTypeEnum, row: tDbEventItem) => {

    // viewCloneEventType.value = JSON.parse(JSON.stringify(eventType));
    // viewCloneEventItem.value = JSON.parse(JSON.stringify(row));
    __openDialogAction();
}
// const openDialogUnderMintOrCompoundModeAction = (eventType: eventTypeEnum, row: tDbEventItem) => {

//     // console.log(eventType);
//     // console.log(row);

//     viewCloneEventType.value = JSON.parse(JSON.stringify(eventType));
//     viewCloneEventItem.value = JSON.parse(JSON.stringify(row));

//     __openDialogAction();

// };

// // [mk] 2 open dialog for nft state change
// const openDialogUnderNftStateChangeModeAction = (oldNftState: nftStateEnum, newNftState: nftStateEnum, dbNftItem: tDbNftItem, biddingList: tDbNftAuctionBiddingItem[]) => {

//     viewCloneOldNftState.value = JSON.parse(JSON.stringify(oldNftState));
//     viewCloneNewNftState.value = JSON.parse(JSON.stringify(newNftState));
//     viewCloneNftItem.value = JSON.parse(JSON.stringify(dbNftItem));
//     viewCloneBiddingList.value = JSON.parse(JSON.stringify(biddingList));

//     __openDialogAction();

// };

// // [mk] 3 open dialog for nft auction buyer bidding or nft owner accept buyer bidding
// const openDialogUnderNftAuctionModeAction = (biddingItem: tDbNftAuctionBiddingItem, biddingList: tDbNftAuctionBiddingItem[], dbNftItem?: tDbNftItem) => {

//     viewCloneBiddingItem.value = JSON.parse(JSON.stringify(biddingItem));
//     viewCloneBiddingList.value = JSON.parse(JSON.stringify(biddingList));
//     viewCloneNftItem.value = JSON.parse(JSON.stringify(dbNftItem));

//     __openDialogAction();

// };

// // [mk] 4 open dialog for market place mode
// const openDialogUnderMarketPlaceModeAction = (marketPlaceModeEnumValue: marketPlaceModeEnum, dbBlindBoxHeroItem: tDbBlindBoxHeroItem) => {

//     viewCloneMarketPlaceMode.value = JSON.parse(JSON.stringify(marketPlaceModeEnumValue));
//     viewCloneBlindBoxHeroItem.value = JSON.parse(JSON.stringify(dbBlindBoxHeroItem));

//     __openDialogAction();

// };


const __openDialogAction = async () => {

    // [mk] 1 init
    initWallet(
        {
            wallets: [new PhantomWalletAdapter(), new SolflareWalletAdapter(),],
            autoConnect: false,
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

};

const connectPluginAction = async (pluginName: string) => {

    // [mk] 1 select and connect
    const solanaWalletsAdapterWallet = useSolanaWalletsAdapterWallet();
    solanaWalletsAdapterWallet.select(pluginName as tSolanaWalletAdapterWalletName);
    await solanaWalletsAdapterWallet.connect();

    const solanaWalletsAdapterAnchorWallet = useSolanaWalletsAdapterAnchorWallet();
    viewCloneBroswerWalletPluginProvider.value = solanaWalletsAdapterAnchorWallet.value;

    submitAction();

};

const $emit = defineEmits(["submitTransfer"]);

const submitAction = () => {

    const params: iBroswerWalletPluginListDialogTmplSubmitTransferParams = {

        // [mk] for mint or compound
        eventType: viewCloneEventType.value,
        eventItem: viewCloneEventItem.value,

        // // [mk] fot nft state change
        // oldNftState: viewCloneOldNftState.value,
        // newNftState: viewCloneNewNftState.value,
        // nftItem: viewCloneNftItem.value,

        // // [mk] for nft auction bidding
        // biddingItem: viewCloneBiddingItem.value,
        // biddingList: viewCloneBiddingList.value,

        // // [mk] for market place mode
        // marketPlaceMode: viewCloneMarketPlaceMode.value,
        // blindBoxHeroItem: viewCloneBlindBoxHeroItem.value,

        broswerWalletPluginProvider: viewCloneBroswerWalletPluginProvider.value,
    };

    $emit("submitTransfer", params);

    closeDialogAction();

};

const closeDialogAction = () => {

    // [mk] for mint or compound
    viewCloneEventType.value = void 0;
    viewCloneEventItem.value = void 0;

    // // [mk] fot nft state change
    // viewCloneOldNftState.value = void 0;
    // viewCloneNewNftState.value = void 0;
    // viewCloneNftItem.value = void 0;

    // // [mk] for nft auction bidding
    // viewCloneBiddingItem.value = void 0;
    // viewCloneBiddingList.value = void 0;
    // viewCloneNftItem.value = void 0;

    // // [mk] for market place mode
    // viewCloneMarketPlaceMode.value = void 0;
    // viewCloneBlindBoxHeroItem.value = void 0;

    viewCloneBroswerWalletPluginProvider.value = void 0;

    viewIsShowDialog.value = false;

};

defineExpose(
    {
        openDialogUnderMintOrCompoundModeAction,
        // openDialogUnderNftStateChangeModeAction,
        // openDialogUnderNftAuctionModeAction,
        // openDialogUnderMarketPlaceModeAction,
    }
);
</script>