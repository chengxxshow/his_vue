import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/Login'
import Home from '@/components/Home'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/hello',
      name: 'HelloWorld',
      component: HelloWorld,
      meta:{isLogin:true}
    },
    {
      path: '/',
      name: 'Login',
      component: Login,
      meta:{isLogin:false}
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      meta:{isLogin:true}
    },
  ]
})
