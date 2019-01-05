import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

//导入对应的路由组件
import tabHome from '../page/tabHome'
import tabMember from '../page/tabMember'
import tabShopcar from '../page/tabShopcar'
import tabSearch from '../page/tabSearch'
import homeNewList from '../page/homeNewList'
import homeNewInfo from '../page/homeNewInfo'
import homePhotolist from '../page/homePhotolist'

export default new Router({
  routes: [
    {path: '/',redirect:'/home'},
    {path: '/home',component: tabHome},
    {path: '/member',component: tabMember},
    {path: '/shopcar',component: tabShopcar},
    {path: '/search',component: tabSearch},
    {path: '/home/newList',component: homeNewList},
    {path: '/home/newinfo/:id',component: homeNewInfo},
    {path: '/home/photolist',component: homePhotolist},


  ],
  //覆盖默认的路由高亮的类
  linkActiveClass:'mui-active'
})
