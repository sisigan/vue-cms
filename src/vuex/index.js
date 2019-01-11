import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations.js'
import getters from './getters.js'

Vue.use(Vuex);
const car =JSON.parse(localStorage.getItem('car') || '[]');
export default new Vuex.Store({//创建实例
    state:{//data this.$store.state.***
        car,//购物车中的数据
    },
    mutations,
    getters,
})