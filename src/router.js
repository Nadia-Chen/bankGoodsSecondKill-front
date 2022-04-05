import { createRouter, createWebHashHistory } from 'vue-router'

import Login from './components/MyLogin.vue'
import Home from './components/MyHome.vue'

import Main from './components/menus/MyMain.vue'
import Goods from './components/menus/MyGoods.vue'
import Client from './components/menus/MyClient.vue'
import Company from './components/menus/MyCompany.vue'
import Kill from './components/kill/MyKill.vue'
import Logup from './components/MyLogup.vue'

// 创建路由实例对象
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login, name: 'login' },
    { path: '/logup', component: Logup, name: 'logup' },
    {
      path: '/home',
      redirect: '/home/main',
      component: Home,
      name: 'home',
      children: [
        { path: 'main', component: Main },
        { path: 'goods', component: Goods },
        { path: 'client', component: Client },
        { path: 'company', component: Company },
        { path: 'kill/:id', component: Kill, props: true },
      ],
    },
  ],
})

// 全局路由导航守卫
router.beforeEach((to, from, next) => {
  // 判断用户访问的是否为登录页
  if (to.path === '/login' || to.path === '/logup') return next()
  // 获取 token 值
  else {
    const tokenStr = localStorage.getItem('token')
    if (!tokenStr) {
      next('/login')
    } else {
      next()
    }
  }

})

export default router
