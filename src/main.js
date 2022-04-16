import { createApp } from 'vue'
import App from './App.vue'
// 导入 bootstrap 样式表
import './assets/css/bootstrap.css'
// 导入全局自定义样式表
import './index1.css'

//导入axios
import axios from 'axios'

import router from './router'
import ElementPlus from 'element-plus'
import './index.css'

// 创建 app 实例
const app = createApp(App)
//配置请求的根路径
axios.defaults.baseURL = 'http://106.52.2.132:8888/'
//将axios挂载为全局的$http自定义属性
app.config.globalProperties.$http = axios

app.use(router)

app.use(ElementPlus)

// 挂载 app 实例
app.mount('#app')
