import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/Login'
import Home from '@/components/Home'
//挂号收费组件
import Register from '@/components/ghsf/Register'
import Charge from '@/components/ghsf/Charge'
import SignOut from '@/components/ghsf/SignOut'
//系统管理
import  User from '@/components/sysm/User'
import  Dept from '@/components/sysm/Dept'
import  Scheduling from '@/components/sysm/Scheduling'
Vue.use(Router)
//解决tab页面Uncaught (in promise) Error: Avoided redundant navigation to current location:问题
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
  
}
///////////////////////////
export default new Router({
  routes: [
    {
      path: '/hello',
      name: 'HelloWorld',
      hidden:true,
      component: HelloWorld,
      meta:{isLogin:true}
    },
    {
      path: '/',
      name: 'Login',
      hidden:true,
      component: Login,
      meta:{isLogin:false}
    },
    {
      path: '/home',
      name: 'Home',
      hidden:true,
      component: Home,
      meta:{isLogin:true}
    },
    //主页菜单嵌套路由
    {
      path:"/home",
      name:'挂号收费',
      iconCls:'el-icon-location',
      component: Home,
      children:[{
          path:"/register",
          name:"现场挂号",
          component:Register,
          meta:{isLogin:true,keepAlive:false}
      },
      {
        path:"/charge",
        name:"收费",
        component:Charge,
        meta:{isLogin:true,keepAlive:false}
      },
      {
        path:"/signOut",
        name:"退号",
        component:SignOut,
        meta:{isLogin:true,keepAlive:false}
      },
      // {
      //   path:"/charge",
      //   name:"患者费用查询",
      //   component:Charge,
      //   meta:{isLogin:true,keepAlive:false}
      // },
      // {
      //   path:"/charge",
      //   name:"收费员日结",
      //   component:Charge,
      //   meta:{isLogin:true,keepAlive:false}
      // },
  ]

  },
    //系统管理
    {
      path:"/home",
      name:'系统管理',
      iconCls:'el-icon-menu',
      component: Home,
      children:[{
          path:"/user",
          name:"用户管理",
          component:User,
          meta:{isLogin:true,keepAlive:false}
      },
      {
        path:"/dept",
        name:"科室管理",
        component:Dept,
        meta:{isLogin:true,keepAlive:false}
      },
      {
        path:"/hello",
        name:"挂号级别管理",
        component:HelloWorld,
        meta:{isLogin:true,keepAlive:false}
      },
      // {
      //   path:"/hello",
      //   name:"结算类别管理",
      //   component:HelloWorld,
      //   meta:{isLogin:true,keepAlive:false}
      // },
      {
        path:"/scheduling",
        name:"医生排班管理",
        component:Scheduling,
        meta:{isLogin:true,keepAlive:false}
      },
  ]

  },
  ]
})
