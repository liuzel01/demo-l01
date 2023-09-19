import * as SolanaAnchorJs from "@project-serum/anchor";
import { type AnchorWallet as tSolanaWalletsAdapterAnchorWallet } from "solana-wallets-vue";
import { Metaplex, walletAdapterIdentity, } from "@metaplex-foundation/js";
import { AccountLayout, TOKEN_PROGRAM_ID, } from "@solana/spl-token";

import HttpProvider from "@/services/http.provider";

export enum nftTypeEnum {
    /**
     * 1装备
     */
    equipment = 1,
    /**
     * 2消耗品
     */
    item = 2,
    /**
     * 3英雄
     */
    hero = 3
};

export enum nftTypeQueryTabEnum {
    /**
     * 1装备
     */
    equipment = "equipment",
    /**
     * 2消耗品
     */
    item = "item",
    /**
     * 3英雄
     */
    hero = "hero",
};

export enum nftTypeLabelEnum {
    /**
     * 1装备
     */
    equipment = "Equip",
    /**
     * 2消耗品
     */
    item = "Item",
    /**
     * 3英雄
     */
    hero = "Hero",
};

/**
 * mapping state
 */
export const nftStateEnumObj = {

    /**
     * 1销毁
     */
    burned: 1,

    /**
     * 2锁定(作为合成材料被临时锁定)
     */
    locked: 2,

    /**
     * 8质押/托管给平台 处理中
     */
    depositing: 8,
    /**
     * 3质押/托管给平台
     */
    deposited: 3,

    /**
     * 9赎回/不托管给平台 处理中
     */
    undepositing: 9,
    /**
     * 4赎回/不托管给平台
     */
    undeposited: 4,

    /**
     * 5固定价格 售卖中
     */
    fixPriceListed: 5,
    /**
     * 6竞拍 售卖中
     */
    auctionListed: 6,

    /**
     * 7结算中(成交之前的状态)
     */
    inSettlement: 7,


    /**
     * 10过期
     */
    expired: 10,

};

export enum nftStateEnum {
    /**
     * 1销毁
     */
    burned = nftStateEnumObj.burned,

    /**
     * 2锁定(作为合成材料被临时锁定)
     */
    locked = nftStateEnumObj.locked,

    /**
     * 8质押/托管给平台 处理中
     */
    depositing = nftStateEnumObj.depositing,
    /**
     * 3质押/托管给平台
     */
    deposited = nftStateEnumObj.deposited,

    /**
     * 9赎回/不托管给平台 处理中
     */
    undepositing = nftStateEnumObj.undepositing,
    /**
     * 4赎回/不托管给平台
     */
    undeposited = nftStateEnumObj.undeposited,

    /**
     * 5一口价 售卖中
     */
    fixPriceListed = nftStateEnumObj.fixPriceListed,
    /**
     * 6竞拍 售卖中
     */
    auctionListed = nftStateEnumObj.auctionListed,

    /**
     * 7结算中(成交之前的状态)
     */
    inSettlement = nftStateEnumObj.inSettlement,


    /**
     * 10过期
     */
    expired = nftStateEnumObj.expired,
}

export const nftStateLabelEnum = {

    [nftStateEnumObj.burned]: "burned",
    [nftStateEnumObj.locked]: "locked",

    [nftStateEnumObj.depositing]: "depositing",
    [nftStateEnumObj.deposited]: "deposited",

    [nftStateEnumObj.undepositing]: "undepositing",
    [nftStateEnumObj.undeposited]: "undeposited",

    [nftStateEnumObj.fixPriceListed]: "fixPriceOnShelf",
    [nftStateEnumObj.auctionListed]: "auctionOnShelf",

    [nftStateEnumObj.inSettlement]: "inSettlement",

    [nftStateEnumObj.expired]: "expired",

};

export enum nftAucionBiddingStatusEnum {
    /**
     * 2买家已出价
     */
    buyerBidDone = 2,
    /**
     * 8交易完成，接受报价
     */
    aucionDone = 8
}

/**
 * import MyPackageProvider from "@/my-package-module/services/my-package.provider";
 */
export default {
    getNftTypeEnumValueByQueryTab: (tabName: nftTypeQueryTabEnum): nftTypeEnum => {

        let output: nftTypeEnum = nftTypeEnum.hero;

        switch (tabName) {

            case nftTypeQueryTabEnum.hero:
                output = nftTypeEnum.hero;
                break;

            case nftTypeQueryTabEnum.equipment:
                output = nftTypeEnum.equipment;
                break;

            case nftTypeQueryTabEnum.item:
                output = nftTypeEnum.item;
                break;
        }

        return output;

    },
    geQueryTabByNftTypeEnumValue: (nftTypeEnumValue: nftTypeEnum): nftTypeQueryTabEnum => {

        let output: nftTypeQueryTabEnum = nftTypeQueryTabEnum.hero;

        switch (nftTypeEnumValue) {

            case nftTypeEnum.hero:
                output = nftTypeQueryTabEnum.hero;
                break;

            case nftTypeEnum.equipment:
                output = nftTypeQueryTabEnum.equipment;
                break;

            case nftTypeEnum.item:
                output = nftTypeQueryTabEnum.item;
                break;
        }

        return output;

    },
    getMyBroswerWalletPluginNftTokenAddressBase58List: async (
        userWalletAdapterWalletPublicKey: SolanaAnchorJs.web3.PublicKey,
        viewSolanaWalletAdapterAnchorWallet: tSolanaWalletsAdapterAnchorWallet,
        solanaWalletAdapterConnection: SolanaAnchorJs.web3.Connection,
    ): Promise<string[]> => {

        let output: string[] = [];

        // [mk] 1
        const tokenAccounts = await solanaWalletAdapterConnection.getTokenAccountsByOwner(
            userWalletAdapterWalletPublicKey,
            {
                programId: TOKEN_PROGRAM_ID,
            },
        );

        if (tokenAccounts && tokenAccounts.value && tokenAccounts.value.length > 0) {

            // [mk] 2
            const metaplexApi = Metaplex.make(solanaWalletAdapterConnection).use(
                walletAdapterIdentity(
                    {
                        publicKey: userWalletAdapterWalletPublicKey,
                        signTransaction: viewSolanaWalletAdapterAnchorWallet.signTransaction,
                        signAllTransactions: viewSolanaWalletAdapterAnchorWallet.signAllTransactions,
                    }
                ),
            );

            // [mk] 3
            let tokenAccountMintPublickeyList: SolanaAnchorJs.web3.PublicKey[] = [];

            for (let tokenAccount of tokenAccounts.value) {

                const tokenAccountData = AccountLayout.decode(tokenAccount.account.data);

                if (tokenAccountData.amount == BigInt(1)) {
                    tokenAccountMintPublickeyList.push(new SolanaAnchorJs.web3.PublicKey(tokenAccountData.mint));
                }

            }

            // [mk] 4
            const fetchAll = tokenAccountMintPublickeyList.map(
                tokenAccountMintPublicKey => {
                    return metaplexApi.nfts().findByMint({ mintAddress: tokenAccountMintPublicKey });
                }
            );

            // [mk] 5
            const resultAll = await Promise.all(fetchAll);

            // [mk] 6
            output = resultAll.map(metaDataItem => metaDataItem.mint.address.toBase58());

        }

        return output;

    },

    getMyGameServerList: (): Promise<iProviderOutputArrayWithT<tDbGameRegionItem>> => {
        return new Promise(
            (resolve, reject) => {

                let output: iProviderOutputArrayWithT<tDbGameRegionItem> = {
                    result: false,
                    data: [],
                    message: "",
                };

                HttpProvider.post(`/game/web/server-region/self`).then(
                    res => {

                        if (res.code === 200) {

                            output.result = true;
                            output.data = res.data;

                        }
                        else {

                            output.message = res.message;

                        }

                        resolve(output);

                    },
                    err => {

                        output.message = err.message;
                        resolve(output);

                    }
                );

            }
        );
    },
    getMyNftTypeSummary: (): Promise<iProviderOutputArrayWithT<tDbNftTypeSummaryItem>> => {
        return new Promise(
            (resolve, reject) => {

                let output: iProviderOutputArrayWithT<tDbNftTypeSummaryItem> = {
                    result: false,
                    data: [],
                    message: "",
                };

                HttpProvider.get(`/game/web/nft-backpack/type-num`).then(
                    res => {

                        if (res.code === 200) {

                            output.result = true;
                            output.data = res.data;

                        }
                        else {

                            output.message = res.message;

                        }

                        resolve(output);

                    },
                    err => {

                        output.message = err.message;
                        resolve(output);

                    }
                );

            }
        );
    },

    getNftTypeSubTypeList: (nftTypeEnumValue: nftTypeEnum): Promise<iProviderOutputArrayWithT<tDbNftTypeSubTypeItem>> => {
        return new Promise(
            (resolve, reject) => {

                let output: iProviderOutputArrayWithT<tDbNftTypeSubTypeItem> = {
                    result: false,
                    data: [],
                    message: "",
                };

                HttpProvider.get(`/game/web/nft-backpack/type-list`, { type: nftTypeEnumValue }).then(
                    res => {

                        if (res.code === 200) {

                            output.result = true;
                            output.data = res.data;

                        }
                        else {

                            output.message = res.message;

                        }

                        resolve(output);

                    },
                    err => {

                        output.message = err.message;
                        resolve(output);

                    }
                );

            }
        );
    },
    getNftTypeSubTypeLatestSolPriceList: (nftTypeSubType: number): Promise<iProviderOutputWithT<tDbNftTypeSubTypeLatestSolPriceItem>> => {
        return new Promise(
            (resolve, reject) => {

                let output: iProviderOutputWithT<tDbNftTypeSubTypeLatestSolPriceItem> = {
                    result: false,
                    message: "",
                    data: [],
                };

                HttpProvider.get(`/public/web/market/last/price`).then(
                    res => {

                        if (res.code === 200) {

                            output.data = res.data;
                            output.result = true;

                        }
                        else {

                            output.message = res.message;

                        }

                        resolve(output);

                    },
                    err => {

                        output.message = err.message;
                        resolve(output);

                    }
                );

            }
        );
    },

    getMyDespositeNftListByNftTypeSubType: (pageParams: tMyPackagePageParams): Promise<iProviderOutputArrayWithT<tDbDespositeNftItem>> => {

        return new Promise(
            (resolve, reject) => {

                let output: iProviderOutputArrayWithT<tDbDespositeNftItem> = {
                    result: false,
                    data: [],
                    message: "",
                };

                HttpProvider.post(`/game/web/nft-backpack/page`, pageParams).then(
                    res => {

                        if (res.code === 200) {

                            output.result = true;
                            output.data = res.data;

                        }
                        else {

                            output.message = res.message;

                        }

                        resolve(output);

                    },
                    err => {

                        output.message = err.message;
                        resolve(output);

                    }
                );

            }
        );
    },
    getMyUnDespositeNftListByNftTypeSubType: (myUnDespositeNftTokenAddressBase58List: string[]): Promise<iProviderOutputArrayWithT<tDbUnDespositeNftItem>> => {
        return new Promise(
            (resolve, reject) => {

                let output: iProviderOutputArrayWithT<tDbUnDespositeNftItem> = {
                    result: false,
                    data: [],
                    message: "",
                };

                HttpProvider.post(`/game/web/nft-backpack/query-data`, { tokens: myUnDespositeNftTokenAddressBase58List }).then(
                    res => {

                        if (res.code === 200) {

                            output.result = true;
                            output.data = res.data;

                        }
                        else {

                            output.message = res.message;

                        }

                        resolve(output);

                    },
                    err => {

                        output.message = err.message;
                        resolve(output);

                    }
                );

            }
        );
    },

    getSolDollarRate: (): Promise<iProviderOutputWithT<number>> => {
        return new Promise(
            (resolve, reject) => {

                let output: iProviderOutputWithT<number> = {
                    result: false,
                    data: 0,
                    message: "",
                };

                HttpProvider.get(`/game/web/market/usd/rate`).then(
                    res => {

                        if (res.code === 200) {

                            output.result = true;
                            output.data = res.data;

                        }
                        else {

                            output.message = res.message;

                        }

                        resolve(output);

                    },
                    err => {

                        output.message = err.message;
                        resolve(output);

                    }
                );

            }
        );
    },
    getNftItem: (autoId: string): Promise<iProviderOutputWithT<tDbNftItem>> => {
        return new Promise(
            (resolve, reject) => {

                let output: iProviderOutputWithT<tDbNftItem> = {
                    result: false,
                    data: null,
                    message: "",
                };

                HttpProvider.get(`/game/public/web/market/detail/${autoId}`).then(
                    res => {

                        if (res.code === 200) {

                            output.result = true;

                            // [hack] init cloneCurrentPrice and currentPrice
                            res.data.cloneCurrentPrice = res.data.currentPrice;
                            res.data.currentPrice = res.data.currentPrice
                                ? res.data.currentPrice // if has fixPrice or auctionBasePrice
                                : 0.01;

                            // [hack] only for seller input auction days view render
                            res.data.auctionDayCount = 1;

                            output.data = res.data;

                        }
                        else {

                            output.message = res.message;

                        }

                        resolve(output);

                    },
                    err => {

                        output.message = err.message;
                        resolve(output);

                    }
                );

            }
        );
    },

    dbCheckNftUnDepositedToBeDeposited: (userWalletPublicKeyBase58: string, nftTokenAddressBase58: string): Promise<iProviderOutput> => {
        return new Promise(
            (resolve, reject) => {

                let output: iProviderOutput = {
                    result: false,
                    message: "",
                };

                HttpProvider.post(`/game/web/nft-backpack/check-deposited`, { userAddress: userWalletPublicKeyBase58, tokenAddress: nftTokenAddressBase58, }).then(
                    res => {

                        if (res.code === 200) {

                            output.result = true;

                        }
                        else {

                            output.message = res.message;

                        }

                        resolve(output);

                    },
                    err => {

                        output.message = err.message;
                        resolve(output);

                    }
                );

            }
        );

    },
    depositeNft: (userWalletPublicKeyBase58: string, nftTokenAddressBase58: string): Promise<iProviderOutput> => {
        return new Promise(
            (resolve, reject) => {

                let output: iProviderOutput = {
                    result: false,
                    message: "",
                };

                HttpProvider.post(`/game/web/nft-backpack/deposited`, { userAddress: userWalletPublicKeyBase58, tokenAddress: nftTokenAddressBase58, }).then(
                    res => {

                        if (res.code === 200) {

                            output.result = true;

                        }
                        else {

                            output.message = res.message;

                        }

                        resolve(output);

                    },
                    err => {

                        output.message = err.message;
                        resolve(output);

                    }
                );

            }
        );

    },
    dbCheckNftDepositedToBeUnDeposited: (userWalletPublicKeyBase58: string, nftTokenAddressBase58: string): Promise<iProviderOutput> => {
        return new Promise(
            (resolve, reject) => {

                let output: iProviderOutput = {
                    result: false,
                    message: "",
                };

                HttpProvider.post(`/game/web/nft-backpack/check-un-deposited`, { userAddress: userWalletPublicKeyBase58, tokenAddress: nftTokenAddressBase58, }).then(
                    res => {

                        if (res.code === 200) {

                            output.result = true;

                        }
                        else {

                            output.message = res.message;

                        }

                        resolve(output);

                    },
                    err => {

                        output.message = err.message;
                        resolve(output);

                    }
                );

            }
        );
    },
    unDepositeNft: (userWalletPublicKeyBase58: string, nftTokenAddressBase58: string): Promise<iProviderOutput> => {
        return new Promise(
            (resolve, reject) => {

                let output: iProviderOutput = {
                    result: false,
                    message: "",
                };

                HttpProvider.post(`/game/web/nft-backpack/un-deposited`, { userAddress: userWalletPublicKeyBase58, tokenAddress: nftTokenAddressBase58, }).then(
                    res => {

                        if (res.code === 200) {

                            output.result = true;

                        }
                        else {

                            output.message = res.message;

                        }

                        resolve(output);

                    },
                    err => {

                        output.message = err.message;
                        resolve(output);

                    }
                );

            }
        );
    },

    getAuctionListedNftBiddingList: (marketId: number): Promise<iProviderOutputArrayWithT<tDbNftAuctionBiddingItem>> => {
        return new Promise(
            (resolve, reject) => {

                let output: iProviderOutputArrayWithT<tDbNftAuctionBiddingItem> = {
                    result: false,
                    data: [],
                    message: "",
                };

                HttpProvider.post(`/game/web/market/nft/bid/list`, { id: marketId }).then(
                    res => {

                        if (res.code === 200) {

                            output.result = true;
                            output.data = res.data; // [mk] backend already order by bidTime desc

                        }
                        else {

                            output.message = res.message;

                        }

                        resolve(output);

                    },
                    err => {

                        output.message = err.message;
                        resolve(output);

                    }
                );

            }
        );
    },
};