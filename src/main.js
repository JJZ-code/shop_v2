// 项目的入口文件，作用是初始化vue实例，并引入需要的插件
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
// 导入全局样式表
import './assets/css/global.css'
//导入图标样式
import './assets/css/fonts/iconfont.css'
// 发起请求全局配置
import axios from 'axios'
// 设置axios请求的根路径
axios.defaults.baseURL = 'http://127.0.0.3:8888/api/private/v1/'
// 挂载到vue原型对象上/通过this访问到http
Vue.prototype.$http = axios
// 请求拦截
axios.interceptors.request.use(config => {
  
    config.headers.Authorization = window.sessionStorage.getItem('token')
    return config
})

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
