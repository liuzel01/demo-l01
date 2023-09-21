import HttpProvider from "@/common-module/services/http.provider";

export enum eventTypeEnum {
    mint = 1,
    compound = 2,
    others = 3,
};

export enum eventTypeLabelEnum {
    mint = "mint",
    compound = "compound",
    others = "others",
};

/**
 * mapping status
 */
export enum eventStatusEnum {
    /**
     * 2
     */
    calcelled = 2,
    /**
     * 1
     */
    pending = 1,
    /**
     * 4
     */
    miniting = 4,
    /**
     * 3
     */
    minted = 3,
};

/**
 * mapping gasType
 */
export enum eventPayTypeEnum {
    /**
     * 1钱包付
     */
    userPaySol = 1,
    /**
     * 2金币付
     */
    userPayGameCurrency = 2
}

export enum eventDepositEnum {
    /**
    * 1自动托管
    */
    autoDeposit = 1,
    /**
     * 0不托管
     */
    unDeposit = 0,
}

/**
 * import MessageProvider from "@/message-module/services/message.provider";
 */
export default {
    getEventStatusLabel: (tabName: eventTypeLabelEnum, eventStatusEnumValue: eventStatusEnum): string => {

        let output = "";

        switch (eventStatusEnumValue) {

            case eventStatusEnum.calcelled:
                output = "calcelled";
                break;

            case eventStatusEnum.pending:
                output = "pending";
                break;

            case eventStatusEnum.miniting:
                output = `${tabName}ing`;
                break;

            case eventStatusEnum.minted:
                output = `${tabName}ed`;
                break;
        }

        return output;

    },
    getEventTypeEnumValueByQueryTab: (tabName: eventTypeLabelEnum): eventTypeEnum => {

        let output: eventTypeEnum = eventTypeEnum.mint;

        switch (tabName) {

            case eventTypeLabelEnum.mint:
                output = eventTypeEnum.mint;
                break;

            case eventTypeLabelEnum.compound:
                output = eventTypeEnum.compound;
                break;

            case eventTypeLabelEnum.others:
                output = eventTypeEnum.others;
                break;
        }

        return output;

    },

    getEventList: (pageParams: tEventListPageParams): Promise<iProviderOutputWithT<tResEventList>> => {

        return new Promise(
            (resolve, reject) => {

                let output: iProviderOutputWithT<tResEventList> = {
                    result: false,
                    data: [],
                    message: "",
                };

                HttpProvider.post(`/game/web/nft-event/page`, pageParams).then(
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
    cancelEventItem: (eventId: number): Promise<iProviderOutput> => {

        return new Promise(
            (resolve, reject) => {

                let output: iProviderOutput = {
                    result: false,
                    message: "",
                };

                HttpProvider.put(`/game/web/nft-event/cancel/${eventId}`).then(
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
    mintOrCompound: (eventId: number, userWalletPublicKeyBase58: string, isDeposit: boolean): Promise<iProviderOutput> => {

        return new Promise(
            (resolve, reject) => {

                let output: iProviderOutput = {
                    result: false,
                    message: "",
                };

                HttpProvider.post(`/game/web/nft-event/mint-compose`,
                    {
                        eventId,
                        toUserAddress: userWalletPublicKeyBase58,
                        autoDeposite: isDeposit ? eventDepositEnum.autoDeposit : eventDepositEnum.unDeposit
                    },
                    {
                        timeoutSeconds: 3 * 60
                    }
                ).then(
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

    }
};