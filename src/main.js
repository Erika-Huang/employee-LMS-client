import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/dist/index.css'
import request from './utils/request'
import storage from './utils/storage'
import api from './api'
import store from './store'
// 统一导入el-icon图标
// import * as ElIconModules from '@element-plus/icons-vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

console.log("环境变量=>", import.meta.env)

const app = createApp(App)
app.config.globalProperties.$request = request
app.config.globalProperties.$api = api
app.config.globalProperties.$storage = storage
app.use(ElementPlus)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(router).use(store).mount('#app')

