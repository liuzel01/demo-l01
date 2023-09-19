// import LoginProvider from "@/login-module/services/login.provider";
// import UserProvider from "@/user-module/services/user.provider";

export interface iState {
    userInfo: tDbUserInfo | null,
};

export const vuexActionKeys = {
    setVuexUserInfoAction: "setVuexUserInfoAction",
    logout: "logout",
};

const state: iState = {
    userInfo: null,
};

const getters = {

    getVuexUserInfo: (state: iState, getters: any, rootState: any, rootGetters: any): tDbUserInfo | null => {
        return state.userInfo;
    },

};

const mutations = {

    [vuexActionKeys.setVuexUserInfoAction]: (state: iState, newUserInfo: tDbUserInfo) => {
        state.userInfo = newUserInfo;
    },

    [vuexActionKeys.logout]: (state: iState) => {

        LoginProvider.setUCToken("", -1);

        state.userInfo = null;

    },

};

const actions = {

    [vuexActionKeys.setVuexUserInfoAction]({ commit }: iVuexActionContext<iState, any>): Promise<void> {
        return new Promise(
            async (resolve, reject) => {

                const res = await UserProvider.getUserInfo();

                commit(vuexActionKeys.setVuexUserInfoAction, res.data);

                resolve();

            }
        );
    },

    [vuexActionKeys.logout]({ commit }: iVuexActionContext<iState, any>): Promise<void> {
        return new Promise(
            (resolve, reject) => {

                commit(vuexActionKeys.logout);

                resolve();

            }
        );
    },
};

export default {
    state,
    getters,
    vuexActionKeys,
    mutations,
    actions,
};