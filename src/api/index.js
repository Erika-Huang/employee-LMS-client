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
            mock: false
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
    getMenuList(params) {
        return request({
            url: '/menu/list',
            method: 'get',
            data: params,
            mock: false
        })
    },
    getUserList(params) {
        return request({
            url: '/users/list',
            method: 'get',
            data: params,
            mock: false
        })
    },
    getUserAllList(params) {
        return request({
            url: '/users/all/list',
            method: 'get',
            data: params,
            mock: false
        })
    },
    userDel(params) {
        return request({
            url: '/users/delete',
            method: 'post',
            data: params,
            mock: false
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
            mock: false
        })
    },
    menuSubmit(params) {
        return request({
            url: '/menu/operate',
            method: 'post',
            data: params,
            mock: false
        })
    },
    roleOperate(params) {
        return request({
            url: '/roles/operate',
            method: 'post',
            data: params,
            mock: true
        })
    }
}