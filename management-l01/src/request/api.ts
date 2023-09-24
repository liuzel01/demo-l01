import request from './request'

interface adminLoginData {
    password: string
    username: string
}

// 使用类型别名来定义 PromiseRes，否则下面使用时会是一大串
type PromiseRes<T> = Promise<manageRes<T>>

// 这里是自定义了 Promise 的接口类型，在 login.vue 中的 adminLoginApi 中可以看到，类型已经变成了自定义的了
// 使用泛型来做封装
interface manageRes<T> {
    code: number,
    data: T
    // message: string
}

// 登录返回接口
interface adminLoginRes {
    token: string,
    tokenHead: string
}

// 当前用户信息
interface adminInfoRes {
    menus: []
}

// 登录返回 token
// export const adminLoginApi = (data: unknown) => request.post('/admin/login', data)
export const adminLoginApi = (data: adminLoginData): PromiseRes<adminLoginRes> => request.post('/admin/login', data)

// 获取当前登录用户信息
export const getAdminInfoApi = (): PromiseRes<adminInfoRes> => request.get('/admin/info')