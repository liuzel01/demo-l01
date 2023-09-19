import axios from "axios";
import { type AxiosRequestConfig as tAxiosRequestConfig, type ResponseType as tAxiosResponseType } from "axios";
import qs from "qs";
import AppRouter from "@/App.router";
import AppStore from "@/App.store";
// import { vuexActionKeys } from "@/login-module/services/login.store";
import { ElNotification } from "element-plus";

// import LoginProvider from "@/login-module/services/login.provider";

// axios.interceptors.request.use(
//     req => {

//         const $ucToken = LoginProvider.getUCToken();

//         if (LoginProvider.getUCToken()) {
//             req.headers.Authorization = `${$ucToken}`;
//             req.headers[`seeds-user-token`] = `${$ucToken}`; // [mk] miss will cause invaild token issue
//         }

//         return req;

//     },
//     err => {

//         return Promise.reject(err);

//     }
// );

// // axios.interceptors.response.use(
//     async (res) => {

//         // [mk] login expired
//         if (res.data?.code === 401) {

//             ElNotification({ type: "error", title: "401", message: "登录过期重新登录", });

//             await AppStore.dispatch(vuexActionKeys.logout);

//             AppRouter.push(
//                 {
//                     path: "/login",
//                     query: { redirect: AppRouter.currentRoute.value.fullPath, }
//                 }
//             );

//         }

//         return res.data;

//     },
//     async (err) => {

//         // [mk] if axios res cancel
//         if (axios.isCancel(err) === true) {

//             return Promise.resolve(err);

//         }
//         else {

//             // [mk] login expired
//             if (err.response.status === 401) {

//                 ElNotification({ type: "error", title: "401", message: "登录过期重新登录", });

//                 await AppStore.dispatch(vuexActionKeys.logout);

//                 AppRouter.push(
//                     {
//                         path: "/login",
//                         query: { redirect: AppRouter.currentRoute.value.fullPath, }
//                     }
//                 );

//             }
//             else if (err.response.status === 500) {

//                 ElNotification({ type: "error", title: "500", message: `${err.message}`, });

//             }
//             else {

//                 ElNotification({ type: "error", title: err.response.status, message: `${err.message}`, });

//             }

//             return Promise.reject(err);

//         }

//     }
// );

export interface iHttpOptions {
    baseUrl?: string,
    contentType?: contentTypeEnum,
    timeoutSeconds?: number,
    responseType?: tAxiosResponseType,
}

export enum contentTypeEnum {
    wwwFormUrlencoded = "application/x-www-form-urlencoded;charset=UTF-8",
    json = "application/json;charset=UTF-8",
    formData = "multipart/form-data",
}

/**
 * import HttpProvider from "@/common-module/services/http.provider";
 */
const httpProvider = {
    get: (
        url: string,
        queryStringObj = {},
        {
            baseUrl = "/api/v1",
            contentType = contentTypeEnum.wwwFormUrlencoded,
            timeoutSeconds = 60,
            responseType = "json",
        }: iHttpOptions = {}
    ): Promise<iServerResponseWithT<any>> => {

        const config: tAxiosRequestConfig = {
            method: "GET",
            withCredentials: true,
            headers: {
                "X-Requested-With": "XMLHttpRequest",
                "Content-Type": contentType,
            },
            url: `${baseUrl}${url}`,
            params: queryStringObj,
            timeout: timeoutSeconds * 1000,
            responseType: responseType,
        };

        return axios(config);

    },
    post: (
        url: string,
        requestBodyObj = {},
        {
            baseUrl = "/api/v1",
            contentType = contentTypeEnum.json,
            timeoutSeconds = 60,
            responseType = "json",
        }: iHttpOptions = {}
    ): Promise<iServerResponseWithT<any>> => {

        const config: tAxiosRequestConfig = {
            method: "POST",
            withCredentials: true,
            headers: {
                "X-Requested-With": "XMLHttpRequest",
                "Content-Type": contentType,
            },
            url: `${baseUrl}${url}`,
            data: contentType === contentTypeEnum.wwwFormUrlencoded
                ? qs.stringify(requestBodyObj)
                : requestBodyObj,
            timeout: timeoutSeconds * 1000,
            responseType: responseType,
        };

        return axios(config);

    },
    put: (
        url: string,
        requestBodyObj = {},
        {
            baseUrl = "/api/v1",
            contentType = contentTypeEnum.json,
            timeoutSeconds = 60,
            responseType = "json",
        }: iHttpOptions = {}
    ): Promise<iServerResponseWithT<any>> => {

        const config: tAxiosRequestConfig = {
            method: "PUT",
            withCredentials: true,
            headers: {
                "X-Requested-With": "XMLHttpRequest",
                "Content-Type": contentType,
            },
            url: `${baseUrl}${url}`,
            data: contentType === contentTypeEnum.wwwFormUrlencoded
                ? qs.stringify(requestBodyObj)
                : requestBodyObj,
            timeout: timeoutSeconds * 1000,
            responseType: responseType,
        };

        return axios(config);

    },
    upload: (
        url: string,
        formData = new FormData(),
        {
            baseUrl = "/api/v1",
            contentType = contentTypeEnum.formData,
            timeoutSeconds = 60,
            responseType = "json",
        }: iHttpOptions = {}
    ): Promise<iServerResponseWithT<any>> => {

        return httpProvider.post(url, formData, { baseUrl, contentType, timeoutSeconds, responseType });

    },
};

export default httpProvider;