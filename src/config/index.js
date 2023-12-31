/**
 * 环境配置封装
 * @date 2023/8/12
 * @author 黄阿玛 Erika https://juejin.cn/user/2606266581532221/posts
 */

// 1. 获取我们的环境变量
const env = import.meta.env.MODE || 'prod';

const EnvConfig = {
    // 开发环境
    dev: {
        baseApi: '/api',
        // 一般开发环境会去调用mock的接口地址，提测之后才需要访问测试环境地址。
        mockApi: 'https://www.fastmock.site/mock/07e7d4609ab8ceda9c2ca1e31de96dff/api'
    },
    // 测试环境
    test: {
        baseApi: '//test.futurefe.com/api',
        mockApi: 'https://www.fastmock.site/mock/07e7d4609ab8ceda9c2ca1e31de96dff/api'
    },
    // 生产环境
    prod: {
        baseApi: '/futurefe.com/api',
        mockApi: ''
    }
}
export default {
    env,
    mock: false, // 只要是true 就会通过mock的方式访问
    namespace: 'manager', //命名空间
    ...EnvConfig[env] //接口的调用地址
}
