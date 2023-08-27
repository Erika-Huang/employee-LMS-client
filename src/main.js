import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import request from './utils/request'
import storage from './utils/storage'
import api from './api'
import store from './store'
// 统一导入el-icon图标
import * as ElIconModules from '@element-plus/icons'


console.log("环境变量=>", import.meta.env)

const app = createApp(App)
app.config.globalProperties.$request = request
app.config.globalProperties.$api = api
app.config.globalProperties.$storage = storage
app.use(ElementPlus)
app.use(router).use(store).mount('#app')


// 统一注册el-icon图标
for(let iconName in ElIconModules){
  app.component(iconName,ElIconModules[iconName])
}
