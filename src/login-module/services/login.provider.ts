import Cookies from "js-cookie";

// import HttpProvider from "../../services/http.provider";

export const authTypeEnum = {
    /**
     * 1 input mail and password to login
     */
    step1: 1,
    /**
     * 2 input mail verify code to login2fa
     */
    step2: 2,
    /**
     * 3 re-send and input mail verify code to login2fa
     */
    step3: 3,

};

/**
 * import LoginProvider from "@/login-module/services/login.provider";
 */
const loginProvider = {
    setUCToken: (newUCToken: string, dayCount: number = 7) => {

        Cookies.set(`seeds-user-token`, newUCToken, { expires: dayCount }); // [mk] cookie time out , unit day

    },
    getUCToken: (): string => {

        return Cookies.get(`seeds-user-token`) || "";

    },
    setEmailAndPassword: (newEmail: string, newPwd: string, dayCount: number = 30) => {

        Cookies.set(`seeds-user-email`, newEmail, { expires: dayCount }); // [mk] cookie time out , unit day
        Cookies.set(`seeds-user-pwd`, newPwd, { expires: dayCount }); // [mk] cookie time out , unit day

    },
    getEmail: (): string => {

        return Cookies.get(`seeds-user-email`) || "";

    },
    getPwd: (): string => {

        return Cookies.get(`seeds-user-pwd`) || "";

    },
    setSlideBarState: (boolVal: boolean, dayCount: number = 365) => {

        Cookies.set(`seeds-slide-bar`, `${boolVal}`, { expires: dayCount }); // [mk] cookie time out , unit day

    },
    getSlideBarState: (): boolean => {

        return (Cookies.get(`seeds-slide-bar`) || "") === "true" ? true : false;

    },

    login: (email: string, password: string): Promise<iProviderOutputWithT<tDbLoginInfo>> => {

        return new Promise(
            (resolve, reject) => {

                let output: iProviderOutputWithT<tDbLoginInfo> = {
                    result: false,
                    code: 200,
                    data: null,
                    message: "",
                };

                HttpProvider.post(`/uc/auth/login`, { email, password }).then(
                    res => {


                        if (res.code === 200) {

                            output.result = true;
                            output.data = res.data;

                        }
                        else {

                            output.result = false;

                            output.code = res.code;
                            output.data = res.data;
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
    login2fa: (token: string, mailCode: string): Promise<iProviderOutputWithT<tDbLoginInfo>> => {

        return new Promise(
            (resolve, reject) => {

                let output: iProviderOutputWithT<tDbLoginInfo> = {
                    result: false,
                    data: null,
                    message: "",
                };

                HttpProvider.post(`/uc/auth/2fa/login`, { token, authCode: mailCode }).then(
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
    logout: (): Promise<iProviderOutput> => {
        return new Promise(
            (resolve, reject) => {

                let output: iProviderOutput = {
                    result: false,
                    message: "",
                };

                HttpProvider.post(`/uc/logout`).then(
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
};

export default loginProvider;