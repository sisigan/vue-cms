// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

//导入VueRouter包,并手动安装
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import moment from 'moment'
//定义全局的过滤器
Vue.filter('dateFormat',function(str,pattern="YYYY-MM-DD HH:mm:ss"){
  return moment(str).format(pattern)
});

//导入vue-resource
import vueResource from 'vue-resource'
Vue.use(vueResource)

Vue.http.options.root = 'http://www.lovegf.cn:8899/'
Vue.http.options.emulateJSON = true

//导入Mint-ui,并导入了MintUi的所有组件
import MintUi from 'mint-ui'
// import 'mint-ui/lib/style.css'
// Vue.use(MintUi)

//按需导入Mint-ui组件
import { Header ,Swipe, SwipeItem,Button} from 'mint-ui'
Vue.component(Header.name,Header)
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Button.name, Button);

//导入mui的样式
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'



import App from './App'
import router from './router'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render:c=>c(App),
})
