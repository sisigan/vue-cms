<template>
  <div class="homeGoodsInfo">
    <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
      <div class="ball" v-show="isball" ref="ball"></div>
    </transition>
    <!-- 轮播图 -->
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <swiper :lunbotuList="lunbotu" :isfull="false"></swiper>
        </div>
      </div>
    </div>
    <!-- 商品购买区域 -->
    <div class="mui-card">
      <div class="mui-card-header">{{goodsinfo.title}}</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p class="price">
            市场价:
            <del>¥{{goodsinfo.market_price}}</del>&nbsp;&nbsp;销售价:
            <span class="now_price">¥{{goodsinfo.sell_price}}</span>
          </p>
          <div class="buy_count">购买数量:
            <div class="num_box">
              <input type="button" value="-" @click="buyCount--" :disabled="buyCount<=1">
              <input type="text" v-model="buyCount">
              <input
                type="button"
                value="+"
                @click="buyCount++"
                :disabled="buyCount >= goodsinfo.stock_quantity"
              >
            </div>
          </div>
          <p>
            <mt-button type="primary" size="small">立即购买</mt-button>
            <mt-button type="danger" size="small" @click="addCar">加入购物车</mt-button>
          </p>
        </div>
      </div>
    </div>
    <!-- 商品参数区域 -->
    <div class="mui-card">
      <div class="mui-card-header">商品参数</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p>商品货号:{{goodsinfo.goods_no}}</p>
          <p>库存情况:{{goodsinfo.stock_quantity}}</p>
          <p>上架时间:{{goodsinfo.add_time | dateFormat}}</p>
        </div>
      </div>
      <div class="mui-card-footer">
        <mt-button type="primary" size="large" plain @click="goDesc(id)">图文介绍</mt-button>
        <mt-button type="danger" size="large" plain @click="goComment(id)">商品评论</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
import swiper from "../../components/swiper/";
export default {
  data() {
    return {
      id: this.$route.params.id,
      lunbotu: [], //轮播图的数据
      buyCount: 1, //默认购买数量
      goodsinfo: [], //获取商品的信息
      isball: false //控制小球的隐藏与显示
    };
  },
  components: {
    swiper
  },
  methods: {
    getLunbotu() {
      this.$http.get("api/getthumimages/" + this.id).then(result => {
        if (result.body.status == 0) {
          result.body.message.forEach(element => {
            element.img = element.src;
          });
          this.lunbotu = result.body.message;
        } else {
          Toast("图片获取失败");
        }
      });
    },
    getGoodsInfo() {
      this.$http.get("api/goods/getinfo/" + this.id).then(result => {
        if (result.body.status == 0) {
          this.goodsinfo = result.body.message[0];
        } else {
          Toast("信息获取失败");
        }
      });
    },
    goDesc(id) {
      //编程式导航,到图文介绍
      this.$router.push("/home/goodsdesc/" + this.id);
    },
    goComment(id) {
      //编程式导航,到商品评论
      this.$router.push("/home/goodscomm/" + this.id);
    },
    addCar() {
      //添加到购物车
      this.isball = !this.isball;
      //拼接出一个要存放到购物车的对象
      var goodinfo={id:this.id,count:this.buyCount,price:this.goodsinfo.sell_price,selected:true}
      //调用store中的mutations来将数据放入购物车
      this.$store.commit("addToCar",goodinfo);
    },
    beforeEnter(el) {
      //开始前的位置,el表示动画的标签
      el.style.transform = "translate(0,0)";
    },
    enter(el, done) {
      //动画结束后的位置
      //强制动画刷新
      el.offsetLeft;
      
      //获取小球,徽标的位置
      const ballPosition=this.$refs.ball.getBoundingClientRect();
      const ball_box=document.getElementById("ball_box").getBoundingClientRect();

      const x_ball=ball_box.left-ballPosition.left;
      const y_ball=ball_box.top-ballPosition.top;


      el.style.transform = `translate(${x_ball}px,${y_ball}px)`;
      //设置动画时长，速度
      el.style.transition = "all 0.6s cubic-bezier(.4,-0.3,1,.68)";
      done();     
    },
    afterEnter(el) {
      //动画结束后让flag变回false
      this.isball = !this.isball;
    },
    
  },
  created() {
    this.getLunbotu();
    this.getGoodsInfo();
  }
};
</script>


<style scoped  lang="less">
.homeGoodsInfo {
  background-color: #eee;
  overflow: hidden;
  .ball {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background-color: red;
    position: absolute;
    z-index: 99;
    top: 390px;
    left: 150px;
  }
  .now_price {
    color: red;
    font-size: 16px;
    font-weight: bold;
  }
  .buy_count {
    margin-bottom: 10px;
    display: flex;
    line-height: 40px;
  }
  .num_box {
    margin-left: 10px;
    display: flex;
    height: 40px;
    width: 130px;
    text-align: center;
    input[type="button"] {
      width: 50px;
      height: 100%;
      background-color: #eee;
    }
    input[type="text"] {
      text-align: center;
      line-height: 40px;
    }
  }
  .mui-card-footer {
    display: block;
    button {
      margin: 15px 0;
    }
  }
}
</style>