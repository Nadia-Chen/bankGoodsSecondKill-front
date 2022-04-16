import { createRouter, createWebHashHistory } from 'vue-router'

import Login from './components/MyLogin.vue'
import Home from './components/MyHome.vue'

import Main from './components/menus/MyMain.vue'
import Goods from './components/menus/MyGoods.vue'
import Client from './components/menus/MyClient.vue'
import Company from './components/menus/MyCompany.vue'
import Kill from './components/kill/MyKill.vue'

import AdminHome from './components/admin/Home.vue'
import AdminLogin from './components/admin/Login.vue'

// 创建路由实例对象
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', redirect: '/adminLogin' },
    { path: '/adminLogin', component: AdminLogin, name: 'adminLogin' },
    {
      path:'/adminHome',
      redirect:"/userManage",
      component: AdminHome,
      name: 'adminHome',
      children:[
        {
          path:'/productManage',
          name:'ProductManage',
          component:()=>import("./components/admin/productManage/productManage.vue"),
        },
        {
          path:'/userManage',
          name:'UserManage',
          component:()=>import("./components/admin/userManage/userManage.vue"),
        },
        {
          path:'/activityManage',
          name:'ActivityManage',
          component:()=>import("./components/admin/activityManage/activityManage.vue"),
        }  
      ]
    }
  ],
})

// 全局路由导航守卫
router.beforeEach((to, from, next) => {
  // 判断用户访问的是否为登录页
  if (to.path === '/login') return next()
  // 获取 token 值
  const tokenStr = localStorage.getItem('token')
  if (!tokenStr) {
    next('/login')
  } else {
    next()
  }
})

export default router
