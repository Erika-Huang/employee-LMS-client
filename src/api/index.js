/**
 * api 管理
 */
import request from './../utils/request'
export default {
    login(params) {
        return request({
            url: '/users/login',
            method: 'post',
            data: params,
            // config的index.js已经打卡全局mock，但是也可以局部关闭。
            mock: true
        })
    },
    noticeCount() {
        return request({
            url: '/leave/count',
            method: 'get',
            data: {},
            mock: true
        })
    },
    getMenuList() {
        return request({
            url: '/menu/list',
            method: 'get',
            data: {},
            mock: true
        })
    },
    getUserList(params) {
        return request({
            url: '/users/list',
            method: 'get',
            data: params,
            mock: true
        })
    },
    getUserAllList(params) {
        return request({
            url: '/users/all/list',
            method: 'get',
            data: params,
            mock: true
        })
    },
    userDel(params) {
        return request({
            url: '/users/delete',
            method: 'post',
            data: params,
            mock: true
        })
    },
    getRoleList() {
        return request({
            url: '/roles/list',
            method: 'get',
            data: {},
            mock: true
        })
    },
    getRoleAllList() {
        return request({
            url: '/roles/all/list',
            method: 'get',
            data: {},
            mock: true
        })
    },
    getDeptList() {
        return request({
            url: '/dept/list',
            method: 'get',
            data: {},
            mock: true
        })
    },
    userSubmit(params) {
        return request({
            url: '/users/operate',
            method: 'post',
            data: params,
            mock: true
        })
    }
}