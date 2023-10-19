/**
 * 工具函数封装
 */
export default {
    formateDate(date, rule) {
        let fmt = rule || 'yyyy-MM-dd hh:mm:ss'
        const o = {
            'y+': date.getFullYear(),
            'M+': date.getMonth() + 1,
            'd+': date.getDate(),
            'h+': date.getHours(),
            'm+': date.getMinutes(),
            's+': date.getSeconds()
        }
        for (let k in o) {
            const ret = new RegExp(`(${k})`).exec(fmt)
            if (/(y+)/.test(fmt)) {
                fmt = fmt.replace(ret[1], date.getFullYear())
            }
            if (new RegExp(`(${k})`).test(fmt)) {
                const val = o[k] + '';
                fmt = fmt.replace(ret[1], ret[1].length == 1 ? val : ('00' + val).substring(val.length));
            }
        }
        return fmt;
    },
    generateRoute(menuList) {
        let routes = []
        const deepList = (list) => {
            while (list.length) {
                let item = list.pop()
                if (item.action) {
                    routes.push({
                        name: item.component,
                        path: item.path,
                        meta: {
                            title: item.menuName
                        },
                        component: item.component
                    })
                }
                if (item.children && !item.action) {
                    deepList(item.children)
                }
            }
        }
        deepList(menuList)
        return routes;
    }
}
