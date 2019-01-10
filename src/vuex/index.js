import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);
const car =JSON.parse(localStorage.getItem('car') || '[]');
export default new Vuex.Store({//创建实例
    state:{//data this.$store.state.***
        car,//购物车中的数据
    },
    mutations:{//methods this.$store.commit('方法名','')
        addToCar(state,info){
            //假设没有找到对应的商品
            var isCount=false;
            state.car.some(item=>{
                if(item.id==info.id){
                    item.count +=parseInt(info.count);
                    isCount=true;
                    return true;
                }
            });
            if(!isCount){//表示确实没有对应的商品
                state.car.push(info);
            } 
            //当car更新完后,把car数组,存储到本地localStorage中
            localStorage.setItem('car',JSON.stringify(state.car));
        },
        updatedCar(state,info){
            state.car.some(item=>{
                if(item.id==info.id){
                    item.count=parseInt(info.count)
                    return true;
                }
            });
            //当修改了购物车数量时,把最新的数量同步到本地存储
            localStorage.setItem('car',JSON.stringify(state.car));
        },
        removeCar(state,id){//购物车删除
            state.car.some((item,index)=>{
                if(item.id==id){
                    state.car.splice(index,1);
                    return true; 
                }
            });
            //将删除后的最新数据,存储到本地
            localStorage.setItem('car',JSON.stringify(state.car));
        },
        updatedSelected(state,info){
            state.car.some(item=>{
                if(item.id==info.id){
                    item.selected=info.selected;
                }
            });
            //将最新的状态,存储到本地
            localStorage.setItem('car',JSON.stringify(state.car));
        }
        
    },
    getters:{//只负责对外提供数据,不负责修改数据
        getAllCount(state){
            var c=0;
            state.car.forEach(item=>{
                c +=item.count
            })
            return c;
        },
        getGoodsCount(state){
            var o={};
            state.car.forEach(item=>{
                o[item.id]=item.count;
            })
            return o;
        },
        getGoodsSelected(state){
            var o={};
            state.car.forEach(item=>{
                o[item.id]=item.selected;
            });
            return o;
        },
    }
})