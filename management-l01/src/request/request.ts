import axios from 'axios'
import Cookies from 'js-cookie';
// import { config } from 'process'

const instance = axios.create({
    baseURL: 'http://120.24.64.5:8088/mall-admin',
    timeout: 15000
})

// 请求拦截器
instance.interceptors.request.use(config => {
    let token = Cookies.get('token')
    if (token) {
        // 如果前面 token 没值，就是空的
        config.headers = config.headers || {}
        config.headers.Authorization = token;
    }
    return config;
}, err => {
    return Promise.reject(err)
}
)

instance.interceptors.response.use(result => {
    return result.data
}, err => {
    return Promise.reject(err)
}
)

export default instance