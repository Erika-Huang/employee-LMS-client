/**
 * api 管理
 */
import request from './../utils/request'
export default {
    login(params) {
        return request({
            url:'/users/login',
            method: 'post',
            data:params,
            // config的index.js已经打卡全局mock，但是也可以局部关闭。
            mock:false
        })
    }
}