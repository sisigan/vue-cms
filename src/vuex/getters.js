export default {
    //只负责对外提供数据,不负责修改数据
    getAllCount(state) {
        var c = 0;
        state.car.forEach(item => {
            c += item.count
        })
        return c;
    },
    getGoodsCount(state) {
        var o = {};
        state.car.forEach(item => {
            o[item.id] = item.count;
        })
        return o;
    },
    getGoodsSelected(state) {
        var o = {};
        state.car.forEach(item => {
            o[item.id] = item.selected;
        });
        return o;
    },
    getGoodsCountAnd(state){
        var o={
            count:0,//勾选的数量
            allmount:0//勾选的总价
        };
        state.car.forEach(item=>{
            if(item.selected){//被选中
                o.count +=item.count
                o.allmount +=item.price*item.count
            }
        })
        return o;
    }
}