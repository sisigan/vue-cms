<template>
  <div class="homePhotolist">
    <!-- 顶部滑动条 -->
    <div id="slider" class="mui-slider">
      <div
        id="sliderSegmentedControl"
        class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted"
      >
        <div class="mui-scroll">
          <a
            :class="{'mui-control-item' : true, 'mui-active': index == 0}"
            v-for="(item,index) in allcate"
            :key="item.id"
            @click="getphotolistid(item.id)"
          >{{item.title}}</a>
        </div>
      </div>
    </div>
    <!-- 图片加载区域 -->
    <ul class="Photo_list">
      <router-link v-for="item in list" :key="item.id" tag="li" :to="'/home/photoinfo/'+item.id">
        <img v-lazy="item.img_url">
        <div class="info">
          <h1 class="info-title">{{item.title}}</h1>
          <div class="info-body">{{ item.zhaiyao }}</div>
        </div>
      </router-link>
    </ul>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
import mui from "../../lib/mui/js/mui.min.js";

export default {
  data() {
    return {
      allcate: [], //分类数据
      list: [] //图片数据
    };
  },
  methods: {
    getallcate() {
      //获取全部分类
      this.$http.get("api/getimgcategory").then(result => {
        if (result.body.status == 0) {
          this.allcate = result.body.message;
        } else {
          Toast("获取分类列表失败");
        }
         this.getphotolistid( this.allcate[0].id);
      });
    },
    getphotolistid(cateid) {
      //根分类ID获取图片列表信息
      this.$http.get("api/getimages/" + cateid).then(result => {
        if (result.body.status == 0) {
          this.list = result.body.message;
        } else {
          Toast("获取图片失败");
        }
      });
    }
  },
  created() {
    this.getallcate(); 
  },
  mounted() {
    //内存中的模板已经挂载到页面后(操作元素)
    mui(".mui-scroll-wrapper").scroll({
      deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
  }
};
</script>


<style scoped  lang="less">
.homePhotolist {
  .Photo_list {
      margin: 0;
      padding: 10px;
      margin-bottom: 0;
    li {
        background-color: #ccc;
      list-style: none;
      text-align: center;
      margin-bottom: 10px;
      box-shadow: 0 0 9px #999;
      position: relative;
      img{
          width: 100%;
          vertical-align: middle;
      }
      img[lazy="loading"] {
        //懒加载样式
        width: 40px;
        height: 300px;
        margin: auto;
      }
      .info{
        color:#fff;
        text-align: left;
        position: absolute;
        bottom: 0;
        background-color: rgba(0,0,0,0.4);
        max-height: 85px;
        .info-title{
          font-size: 14px;
        }
        .info-body{
          font-size: 13px;
        }
      }
    }
  }
}
</style>