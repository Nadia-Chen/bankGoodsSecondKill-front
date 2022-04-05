import { createApp } from 'vue'
import App from './App.vue'
// 导入 bootstrap 样式表
import './assets/css/bootstrap.css'
// 导入全局自定义样式表
import './index.css'
// 导入 axios
import axios from 'axios'
import router from './router'

// 创建 app 实例
const app = createApp(App)
// 配置请求的根路径
axios.defaults.baseURL = 'http://106.52.2.132:8888/'
// 将 axios 挂载为全局的 $http 自定义属性
app.config.globalProperties.$http = axios

app.use(router)
// 挂载 app 实例
app.mount('#app')
