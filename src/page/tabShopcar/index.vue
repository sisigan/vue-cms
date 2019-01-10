<template>
  <div class="tabShopcar">
    <div class="mui-card" v-for="(item,index) in goodslist" :key="item.id">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <mt-switch v-model="$store.getters.getGoodsSelected[item.id]
          " @change="selectedChange(item.id,$store.getters.getGoodsSelected[item.id])"></mt-switch>
          <img :src="item.thumb_path">
          <div class="info">
            <h1>{{item.title}}</h1>
            <div class="p_box">
              <span class="price">¥{{item.sell_price}}</span>
              <div class="buy_count">
                <div class="num_box">
                  <input type="button" value="-" @click="jian(item.id,index)">
                  <input
                    type="text"
                    :value="$store.getters.getGoodsCount[item.id]"
                    readonly
                    ref="GoodsCount"
                    @change="changeCount(item.id,index)"
                  >
                  <input type="button" value="+" @click="jia(item.id,index)">
                </div>
                <a href="#" @click.prevent="remove(item.id,index)">删除</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner jiesuan">
            <div class="left">
                <p>总计(不含运费)</p>
                <p>已勾选商品 <span class="color_red">0</span> 件,总价 <span class="color_red">¥ 0</span></p>
            </div>
             <mt-button type="danger">去结算</mt-button>
        </div>
       
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      goodslist: [],//购物车所有商品的数据
    };
  },
  methods: {
    getShopCar() {
      //获取购物车列表
      var idAll = [];
      this.$store.state.car.forEach(element => {
        idAll.push(element.id);
      });
      if (idAll.length <= 0) {
        return;
      }
      this.$http
        .get("api/goods/getshopcarlist/" + idAll.join(","))
        .then(result => {
          if (result.body.status == 0) {
            this.goodslist = result.body.message;
          } else {
            Toast("购物车列表获取失败");
          }
        });
    },
    jian(id, index) {
      //减一
      let GoodsCountInp = this.$refs.GoodsCount[index];
      if (GoodsCountInp.value <= 1) return;
      GoodsCountInp.value--;
      this.changeCount(id, index);
    },
    jia(id, index) {
      //加一
      let GoodsCountInp = this.$refs.GoodsCount[index];
      GoodsCountInp.value++;
      this.changeCount(id, index);
    },
    changeCount(id, index) {
      //数量变化后
      let GoodsCountInp = this.$refs.GoodsCount[index];
      this.$store.commit("updatedCar", { id, count: GoodsCountInp.value });
    },
    remove(id, index){//根据ID删除购物车的数据,并调用removeCar同步到本地localStorage
        this.goodslist.splice(index,1);
        this.$store.commit("removeCar",id);
    },
    selectedChange(id,val){
        this.$store.commit("updatedSelected",{id,selected:val})
    },
  },
  created() {
    this.getShopCar();
  }
};
</script>


<style scoped lang="less">
.tabShopcar {
  background-color: #eee;
  overflow: hidden;
  .mui-card-content-inner {
    display: flex;
    align-items: center;
  }
  img {
    width: 60px;
  }
  h1 {
    font-size: 13px;
  }
  .price {
        color: red;
        font-weight: bold;
      }
  .info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .p_box {
      display: flex;
      .buy_count {
        display: flex;
        .num_box {
          display: flex;
          height: 25px;
          line-height: 25px;
          text-align: center;
          margin:0 5px;
          input[type="text"] {
            width: 40px;
            height: 100%;
            text-align: center;
            padding: 0;
            margin: 0;
            box-sizing: border-box;
          }
          input[type="button"] {
            width: 30px;
            height: 100%;
             margin: 0;
          padding: 0;
          }
        }
      }
    }
  }
  .jiesuan{
       display: flex;
       justify-content: space-between;
       align-items: center;
       .color_red{
           color:red;
           font-weight:bold;
           font-size: 16px;
       }
  }
}
</style>