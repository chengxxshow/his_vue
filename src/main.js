// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI)

import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)

axios.defaults.baseURL='http://localhost:8090'
axios.defaults.headers.post['Content-Type']='application/x-www-form-urlencoded'
Vue.prototype.$axios=axios

import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
     isLogin:false
  },
  //获取状态
  getters: {
    //isLogin:state=>state.isLogin  或者
    isLogin:state=>{return state.isLogin }
  },
  //设置状态
  mutations: {
    userStatus (state,flag) {
      // 变更状态
      state.isLogin=flag
    }
  },
  //应用 mutations
  actions: {
    // SetUserStatus (context,flag) {
    //   context.commit('userStatus',flag)
    // }

    SetUserStatus ({commit},flag) {
      commit('userStatus', flag)
    }
  }

})


//前置守卫：访问组件时用户身份验证
router.beforeEach((to, from, next) => {
  let flag=sessionStorage.getItem("Loginflag")
 
  if(flag ==='isLogin'){
    console.log("*已登录*"+to.meta.isLogin)
    //用户已登录
    store.state.isLogin=true;
    next()

     //用户已登录，又想进入登录页面，定向主页
    if(to.meta.isLogin==false){
      next({path:"/hello"})
     }
  }else{
    //未登录
     //1.用户进入其他页面，定向登录页
     console.log("*未登录*"+to.meta.isLogin)
     if(to.meta.isLogin==true){
      next({path:"/login"})
     }else{
       next()
     }
  }

 
   
})



Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
