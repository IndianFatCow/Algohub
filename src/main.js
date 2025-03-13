import './assets/main.scss'

import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from '@/router'

import { createPinia } from 'pinia'
import { createPersistedState } from 'pinia-plugin-persistedstate'

import App from './App.vue'

const app = createApp(App)
const pinia=createPinia()
const persist=createPersistedState()
pinia.use(persist)
app.use(ElementPlus)
app.use(pinia)//管理全局状态
app.use(router)//管理路由
app.mount('#app')
