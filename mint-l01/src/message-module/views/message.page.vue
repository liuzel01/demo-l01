<template>
    <p>
        <el-link :type="routeQueryTab === eventTypeLabelEnum.mint ? `primary` : `default`"
            @click.prevent="gotoTabAction(eventTypeLabelEnum.mint)">mint</el-link>&nbsp;

        <el-link :type="routeQueryTab === eventTypeLabelEnum.compound ? `primary` : `default`"
            @click.prevent="gotoTabAction(eventTypeLabelEnum.compound)">compound</el-link>&nbsp;

        <el-link :type="routeQueryTab === eventTypeLabelEnum.others ? `primary` : `default`"
            @click.prevent="gotoTabAction(eventTypeLabelEnum.others)">others</el-link>
    </p>

    <el-table :key="`table-${routeQueryTab}}-${new Date().getTime()}`" :data="viewEventList" style="width: 100%"
        v-loading="viewPageLoading" v-infinite-scroll="loadMoreDataFn"
        :infinite-scroll-disabled="viewPageHasMore === true && viewPageLoading === false ? false : true">
        <el-table-column type="index" label="No." width="50" />
        <el-table-column label="Equipment" width="150">
            <template #default="scope">
                <img v-for="eventEquipmentItem in scope.row.eventEquipments" :key="eventEquipmentItem.id"
                    :data-event-id="scope.row.id" :data-gas-type="scope.row.gasType"
                    :data-nft-token-address="eventEquipmentItem.mintAddress" :src="eventEquipmentItem.imageUrl" width="60"
                    height="60" />
            </template>
        </el-table-column>
        <el-table-column prop="name" label="name" width="150" />
        <el-table-column prop="createdAt" label="Time" width="200">
            <template #default="scope">{{ new Date(scope.row.createdAt).toLocaleString() }}</template>
        </el-table-column>
        <el-table-column prop="status" label="Status" width="150">
            <template #default="scope">
                {{ MessageProvider.getEventStatusLabel(routeQueryTab, scope.row.status) }}
            </template>
        </el-table-column>
        <el-table-column label="Grade" width="100">
            <template #default="scope">{{ scope.row.eventEquipments[0].grade }}</template>
        </el-table-column>
        <el-table-column label="Action">
            <template #default="scope">
                <template v-if="scope.row.status === eventStatusEnum.pending">
                    <el-button type="info" round @click="cancelEventAction(scope.row)">cancel</el-button>
                    <el-button v-if="scope.row.gasType === eventPayTypeEnum.userPaySol" type="primary" round
                        @click="selectBroswerWalletPluginAction(routeQueryTab, scope.row)">
                        {{ routeQueryTab }}
                    </el-button>
                    <el-button v-else-if="scope.row.gasType === eventPayTypeEnum.userPayGameCurrency" type="primary" round
                        @click="confirmMintOrCompoundNftAction(routeQueryTab, scope.row)">
                        {{ routeQueryTab }}
                    </el-button>
                </template>
                <template v-else-if="scope.row.status === eventStatusEnum.miniting">
                    <el-button type="info" round disabled>cancel</el-button>
                    <el-button type="primary" round disabled loading>
                        {{ MessageProvider.getEventStatusLabel(routeQueryTab, scope.row.status) }}
                    </el-button>
                </template>
            </template>
        </el-table-column>
    </el-table>

    <BroswerWalletPluginListDialogTmpl ref="refBroswerWalletListDialogTmpl" title="选择钱包插件"
        @submitTransfer="afterSelectBroswerWalletPluginTransfer" />

    <ComfirmMintOrCompoundDialogTmpl ref="refComfirmMintOrCompoundDialogTmpl" title="确认mint or compound吗"
        @pollingTransfer="pollingTransfer" />
</template>

<script setup lang="ts">
import { onMounted, computed, ref, onBeforeUnmount } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";

const $route = useRoute();
const $router = useRouter();
const $store = useStore();

import { ElMessageBox, ElMessage } from "element-plus";

import BroswerWalletPluginListDialogTmpl from "@/common-module/components/broswer-wallet-plugin-list-dialog.tmpl.vue";
const refBroswerWalletListDialogTmpl = ref<InstanceType<typeof BroswerWalletPluginListDialogTmpl> | null>(null);

// import ComfirmMintOrCompoundDialogTmpl from "@/message-module/components/comfirm-mint-or-compound-dialog.tmpl.vue";
// const refComfirmMintOrCompoundDialogTmpl = ref<InstanceType<typeof ComfirmMintOrCompoundDialogTmpl> | null>(null);

// import UserProvider from "@/user-module/services/user.provider";
import MessageProvider, { eventTypeLabelEnum, eventStatusEnum, eventPayTypeEnum } from "@/message-module/services/message.provider";

const routeQueryTab = ref<eventTypeLabelEnum>(eventTypeLabelEnum.mint);

const viewUserInfo = computed<tDbUserInfo>(() => {
    return $store.getters.getVuexUserInfo;
});

const viewPollingTimer = ref();

const viewEventList = ref<tDbEventItem[]>([]);
const viewPageLoading = ref(false);
const viewPageHasMore = ref(true);

const viewPageIndex = ref(0);
const viewPageSize = ref(10);
const viewPageTotalCount = ref(0);
const viewPageSortRuleList = ref<tEventListPageSortParams[]>([{ sort: "created_at", sortType: 1 }]);

onMounted(() => {

    routeQueryTab.value = $route.query?.tab
        ? $route.query.tab as eventTypeLabelEnum
        : eventTypeLabelEnum.mint;

});

onBeforeUnmount(() => {

    // [mk] stop polling
    clearTimeout(viewPollingTimer.value);
    viewPollingTimer.value = null;

});

const gotoTabAction = (newTabName: eventTypeLabelEnum) => {

    // [mk] 1 
    clearTimeout(viewPollingTimer.value);
    viewPollingTimer.value = null;

    // [mk] 2-1
    $router.replace({ path: $route.path, query: { tab: newTabName } });
    routeQueryTab.value = newTabName;

    // [mk] 2-2
    viewEventList.value = [];
    viewPageLoading.value = false;
    viewPageHasMore.value = true;

    // [mk] 2-3
    viewPageIndex.value = 0; // [mk] should be zero
    viewPageTotalCount.value = 0;
    viewPageSortRuleList.value = [{ sort: "created_at", sortType: 1 }];

};

const loadAllDataFn = async (isShowLoading = false) => {

    if (isShowLoading === true) {

        viewPageLoading.value = true;

    }

    try {

        const res = await MessageProvider.getEventList(
            {
                current: 1,
                size: viewEventList.value.length,
                sorts: viewPageSortRuleList.value,
                type: MessageProvider.getEventTypeEnumValueByQueryTab(routeQueryTab.value),
                status: [],
                userId: viewUserInfo.value.id,
            }
        );

        if (res.result === true) {
            viewEventList.value = res.data.records;
        }

    }
    finally {

        viewPageLoading.value = false;

    }

};

const loadMoreDataFn = () => {

    viewPageLoading.value = true;

    MessageProvider.getEventList(
        {
            current: viewPageIndex.value + 1,
            size: viewPageSize.value,
            sorts: viewPageSortRuleList.value,
            type: MessageProvider.getEventTypeEnumValueByQueryTab(routeQueryTab.value),
            status: [],
            userId: viewUserInfo.value.id,
        }
    ).then(
        async (res) => {

            if (res.result === true) {

                viewEventList.value = viewEventList.value.concat(res.data.records);

                viewPageIndex.value = res.data.current;
                viewPageTotalCount.value = res.data.total;

                // [mk] v-infinite-scroll control
                if (res.data.total > 0 && viewEventList.value.length < res.data.total) {

                    viewPageHasMore.value = true;
                }
                else {

                    viewPageHasMore.value = false;

                    // [mk] auto polling
                    pollingTransfer();

                }

            }

            viewPageLoading.value = false;

        },
        err => {
            viewPageLoading.value = false;
        }
    );

};

const selectBroswerWalletPluginAction = (tabName: eventTypeLabelEnum, row: tDbEventItem) => {

    refBroswerWalletListDialogTmpl.value?.openDialogUnderMintOrCompoundModeAction(MessageProvider.getEventTypeEnumValueByQueryTab(tabName), row);

};

const afterSelectBroswerWalletPluginTransfer = async (params: iBroswerWalletPluginListDialogTmplSubmitTransferParams) => {

    // [mk] 1 vuex user info wallet public key base58 check
    if (viewUserInfo.value.publicAddress) {

    }
    else {

        ElMessage({ dangerouslyUseHTMLString: true, message: `<i style="color:red;">Your account has not been bound to solana wallet, please try again after binding.</i>`, });

        $router.push(`/account#wallet`); // [todo]

        return;

    }

    // [mk] 2 db wallet public key base58 check
    const res2 = await UserProvider.dbCheckUserWalletPublicKeyBase58(viewUserInfo.value.id, params.broswerWalletPluginProvider.publicKey.toBase58());

    if (res2.result === false) {

        ElMessage({ dangerouslyUseHTMLString: true, message: `<i style="color:red;">Current Linked Wallet Tied to account Wallet ${viewUserInfo.value.publicAddress} is inconsistent, please switch and try again</i>`, });
        return;

    }

    refComfirmMintOrCompoundDialogTmpl.value?.openDialogAction(params);

};

const confirmMintOrCompoundNftAction = (tabName: eventTypeLabelEnum, row: tDbEventItem) => {

    refComfirmMintOrCompoundDialogTmpl.value?.openDialogAction(
        {
            eventType: MessageProvider.getEventTypeEnumValueByQueryTab(tabName),
            eventItem: row,
            broswerWalletPluginProvider: void 0,
        }
    );

};

const pollingTransfer = async () => {

    // [mk] 1
    if (viewPollingTimer.value) {

        clearTimeout(viewPollingTimer.value);
        viewPollingTimer.value = null;

    }

    // [mk] 2
    await loadAllDataFn();

    // [mk] 3
    const mintingOrCompoundingCount = viewEventList.value.filter(viewEventItem => viewEventItem.status === eventStatusEnum.miniting).length;

    if (mintingOrCompoundingCount > 0) {

        viewPollingTimer.value = window.setTimeout(() => {
            pollingTransfer();
        }, 3000);

    }

};

const cancelEventAction = (row: tDbEventItem) => {

    ElMessageBox.confirm(`cancel this nft event ?`, ``, { confirmButtonText: `OK`, cancelButtonText: `Cancel`, type: `warning`, }).then(async () => {

        const res = await MessageProvider.cancelEventItem(row.id);

        if (res.result === true) {

            loadAllDataFn(true);

            ElMessage({ dangerouslyUseHTMLString: true, message: `<i style="color:teal;">cancel success</i>`, });

        }
        else {

            ElMessage({ dangerouslyUseHTMLString: true, message: `<i style="color:red;">cancel fail</i>`, });

        }

    }).catch(() => { });

};
</script>