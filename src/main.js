// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

//导入VueRouter包,并手动安装
import VueRouter from 'vue-router'
Vue.use(VueRouter)

//导入Mint-ui,并导入了MintUi的所有组件
import MintUi from 'mint-ui'
// import 'mint-ui/lib/style.css'
// Vue.use(MintUi)

//按需导入Mint-ui组件
import { Header } from 'mint-ui'
Vue.component(Header.name,Header)


//导入mui的样式
import './lib/mui/css/mui.min.css'



import App from './App'
import router from './router'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render:c=>c(App),
})
