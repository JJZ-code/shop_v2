import Vue from 'vue'
import Router from 'vue-router'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
import Welcome from '../views/Welcome.vue'
import Users from '../views/user/Users.vue'
import Rights from '../views/power/Rights.vue'
import Roles from '../views/power/Roles.vue'

Vue.use(Router)

const router = new Router({
  routes:[
    {path:'/',redirect:'/login'},//重定向：到login（刚问/时直接跳转到login）
    {path:'/login',component:Login},
    {path:'/home',component:Home,redirect:'/Welcome',
    children:[
      {path:'/welcome',component:Welcome},
      {path:'/users',component:Users},
      {path:'/rights',component:Rights},
      {path:'/roles',component:Roles},
    ]},
    

  ]
})
router.beforeEach((to,from,next)=>{
  if(to.path==='/login') return next()
  const tokenstr = window.sessionStorage.getItem('token')
  if ( !tokenstr) return next ( '/login' ) 
  next()
})

export default router

// 路由导航守卫//为路由对象，添加beforeEach导航守卫
// router.beforeEach ( (to, from,next) =>{
//   如果用户访问的登隶页，直接放行
//   if (to.path === ' / login ' ) return next ()
//   从sessionstorage中获取到保存的token值
//   const tokenstr = window .sessionstorage.getItem ( 'token ')
//   没有token，强制跳转到登录页
//   if ( !tokenstr) return next ( ' / login ' )next ()
// })

