/**
 * axios 二次封装
 */

import axios from "axios"
import config from './../config'
import { ElMessage } from "element-plus"
import router from './../router'
import storage from './storage'

const TOKEN_INVALID = 'Token认证失败，请重新登录'
const NETWORK_ERROR = '网络请求异常，请稍后重试'

/**
 * 通过 axios 创建一个实例对象，添加全局配置
 */
const service = axios.create({
    baseURL: config.baseApi,
    timeout: 8000
})


/**
 * 请求拦截
 * @desc description Authorization 是jwt本身名字的命名
 */
service.interceptors.request.use((req) => {
    const headers = req.headers
    const { token } = storage.getItem('userInfo') || {}
    if (!headers.Authorization) headers.Authorization = 'Bearer ' + token
    return req
})

/**
 * 响应拦截
 * @desc 返回值，返回报错，返回状态码，都可以在这里做判断 
 * @param  code  if  code===200 成功 & else if code===40001 & else 报错
 */
service.interceptors.response.use((res) => {
    const { code, data, msg } = res.data;
    if (code === 200 || code === 0) {
        return data;
    } else if (code === 40001) {
        ElMessage.error(TOKEN_INVALID)
        // return Promise.reject(res.data)
        setTimeout(() => {
            router.push('/login')
        }, 1500)
        // return Promise.reject(TOKEN_INVALID,res,data)
        return Promise.reject(res.data)
    } else {
        ElMessage.error(msg || NETWORK_ERROR)
        // return Promise.reject(msg || NETWORK_ERROR,res.data)
        return Promise.reject(res.data)
    }
})

/**
 * 请求的核心函数
 * @param {*} options 请求配置
 * @returns service(options)
 */
function request(options) {
    options.method = options.method || 'get'
    if (options.method.toLowerCase() === 'get') {
        options.params = options.data
    }
    let isMock = config.mock
    if (typeof options.mock != 'undefined') {
        isMock = options.mock
    }
    // prod 生产环境
    if (config.env === 'prod') {
        service.defaults.baseURL = config.baseApi
    } else {
        service.defaults.baseURL = isMock ? config.mockApi : config.baseApi
    }
    return service(options)
}

['get', 'post', 'put', 'delete', 'patch'].forEach((item) => {
    request[item] = (url, data, options) => {
        return request({
            url,
            data,
            method: item,
            ...options
        })
    }
})

export default request