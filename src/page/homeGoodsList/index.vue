<template>
  <div class="homeGoodsList">
    <div class="goods_item" v-for="item in goodslist" :key="item.id" @click="goDetail(item.id)">
      <img :src="item.img_url" alt>
      <h1 class="title">{{item.title}}</h1>
      <div class="info">
        <p class="price">
          <span class="now">¥{{item.sell_price}}</span>
          <span class="old">¥{{item.market_price}}</span>
        </p>
        <p class="sell">
          <span>热卖中</span>
          <span>剩{{item.stock_quantity}}件</span>
        </p>
      </div>
    </div>
    <mt-button type="danger" size="large" @click="getMore">加载更多</mt-button>
  </div>
</template>

<script>
import { Toast } from "mint-ui";

export default {
  data() {
    return {
      number: 1, //分页页数
      goodslist: [] //存放商品列表的数组
    };
  },
  created() {
    this.getGoodsList();
  },
  methods: {
    getGoodsList() {
      //获取商品列表数据
      this.$http.get("api/getgoods?pageindex=" + this.number).then(result => {
        if (result.body.status == 0) {
          this.goodslist =this.goodslist.concat(result.body.message);
        } else {
          Toast("加载商品列表失败");
        }
      });
    },
    getMore(){
        this.number++;
        this.getGoodsList();
    },
    goDetail(id){//使用js的形式进行路由导航
        this.$router.push({name:"goodsinfo",params:{id}});
    },
  }
};
</script>


<style scoped  lang="less">
.homeGoodsList {
  display: flex;
  flex-wrap: wrap;
  padding: 10px;
  justify-content: space-between;
  .goods_item {
    width: 48%;
    border: 1px solid #ccc;
    box-shadow: 0 0 8px #ccc;
    margin: 5px 0;
    padding: 2px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 293px;
    img {
      width: 100%;
    }
    .title {
      font-size: 14px;
    }
    .info {
      background-color: #eee;
      p {
        margin: 0;
        padding: 5px;
      }
      .price {
        .now {
          color: red;
          font-weight: bold;
          font-size: 16px;
        }
        .old {
          text-decoration: line-through;
          font-size: 12px;
          margin-left: 10px;
        }
      }
      .sell {
        display: flex;
        justify-content: space-between;
      }
    }
  }
}
</style>