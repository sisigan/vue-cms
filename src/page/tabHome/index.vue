<template>
  <div class="tabHome">
    <!-- 轮播图   -->
    <swiper :lunbotuList="lunbotuList" :isfull="true"></swiper>
    <!-- 六宫格 -->
    <ul class="mui-table-view mui-grid-view mui-grid-9">
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/newList">
          <img src="../../assets/images/menu1.png">
          <div class="mui-media-body">新闻资讯</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/photolist">
          <img src="../../assets/images/menu2.png">
          <div class="mui-media-body">图片分享</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/goodslist">
          <img src="../../assets/images/menu3.png">
          <div class="mui-media-body">商品购买</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="#">
          <img src="../../assets/images/menu4.png">
          <div class="mui-media-body">留言反馈</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="#">
          <img src="../../assets/images/menu5.png">
          <div class="mui-media-body">视频专区</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="#">
          <img src="../../assets/images/menu6.png">
          <div class="mui-media-body">联系我们</div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import swiper from "../../components/swiper/"
import { Toast } from "mint-ui";

export default {
  data() {
    return {
      lunbotuList: [] //保存轮播图的数组
    };
  },
  created() {
    this.getLunbotu();
  },
  components:{
      swiper
  },
  methods: {
    getLunbotu() {
      //获取轮播图数据的方法
      this.$http.get("api/getlunbo").then(result => {
        if (result.body.status == 0) {
          this.lunbotuList = result.body.message;
        } else {
          Toast("加载轮播图失败");
        }
      });
    }
  }
};
</script>


<style scoped lang="less">
.tabHome {
  
  .mui-grid-view.mui-grid-9 {
    background-color: #fff;
    .mui-table-view-cell {
      border: none;
      img{
          width: 60px;
          height: 60px;
      }
      .mui-media-body{
          font-size: 14px;
      }
    }
  }
}
</style>
