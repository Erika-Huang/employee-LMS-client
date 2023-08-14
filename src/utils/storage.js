/**
 * Storage 二次封装
 * @author Erika
 */
import config from "../config"

export default {
    setItem(key,val){
        let storage = this.getStorage()
        storage[key] = val
        window.localStorage.setItem(config.namespace,JSON.stringify(storage))
    },
    getItem(key){
        return this.getStorage()[key]
    },
    getStorage() {
        // 返回存储的对象
        return JSON.parse(window.localStorage.getItem(config.namespace) || "{}")
    },
    clearItem(key){
        let storage = this.getStorage()
        delete storage[key]
        window.localStorage.setItem(config.namespace,JSON.stringify(storage))
    },
    clearAll(){
        window.localStorage.clear()
    }
}