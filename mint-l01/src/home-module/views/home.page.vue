<template>
    <div>
        <p>yige zujian </p>
    </div>
    <div>
        <div class="entry-box">
            <!-- <xh-icon custom-class="wallet-icon-entry-item" icon-class="wallet" icon-size="31px" fill-color="#191B28"
                @click="loginByBroswerWalletPluginAction" /> -->
            <xh-icon custom-class="wallet-icon-entry-item" icon-class="wallet" icon-size="31px" fill-color="#191B28"
                @click="selectBroswerWalletPluginAction" />
        </div>
    </div>

    <!-- <BroswerWalletPluginListDialogTmpl ref="refBroswerWalletListDialogTmpl" title="选择钱包插件"
        @submitTransfer="afterSelectBroswerWalletPluginTransfer" /> -->
</template>

<script setup lang="ts">

// import { defineComponent } from 'vue'


// import { ElMessageBox, ElMessage } from "element-plus";
// import { ref } from "vue";
// import BroswerWalletPluginListDialogTmpl from "@/common-module/components/broswer-wallet-plugin-list-dialog.tmpl.vue";
// const refBroswerWalletListDialogTmpl = ref<InstanceType<typeof BroswerWalletPluginListDialogTmpl> | null>(null);

// const selectBroswerWalletPluginAction = () => {

//     // alert("[todo]") 
//     console.log(refBroswerWalletListDialogTmpl.value);

//     refBroswerWalletListDialogTmpl.value?.openDialogUnderMintOrCompoundModeAction()
//     // refBroswerWalletListDialogTmpl.value?.openDialogUnderMintOrCompoundModeAction(MessageProvider.getEventTypeEnumValueByQueryTab);

// };

// const afterSelectBroswerWalletPluginTransfer = async (params: iBroswerWalletPluginListDialogTmplSubmitTransferParams) => {

// [mk] 1 vuex user info wallet public key base58 check
// if (viewUserInfo.value.publicAddress) {
// }
// else {

// ElMessage({ dangerouslyUseHTMLString: true, message: `<i style="color:red;">Your account has not been bound to solana wallet, please try again after binding.</i>`, });
// $router.push(`/account#wallet`); // [todo]
// return;
// }

// [mk] 2 db wallet public key base58 check
// const res2 = await UserProvider.dbCheckUserWalletPublicKeyBase58(viewUserInfo.value.id, params.broswerWalletPluginProvider.publicKey.toBase58());
// if (res2.result === false) {
//     ElMessage({ dangerouslyUseHTMLString: true, message: `<i style="color:red;">Current Linked Wallet Tied to account Wallet ${viewUserInfo.value.publicAddress} is inconsistent, please switch and try again</i>`, });
//     return;
// }

// refComfirmMintOrCompoundDialogTmpl.value?.openDialogAction(params);

// };
</script>

<style lang="less" scoped>
@import "../../styles/header.tmpl.less";
</style>