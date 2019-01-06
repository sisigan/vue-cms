<template>
  <div class="homePhotoinfo">
    <h1>{{photoinfos.title}}</h1>
    <p class="subtitle">
      <span>发表时间:{{photoinfos.add_time |dateFormat}}</span>
      <span>点击:{{photoinfos.click}}次</span>
    </p>
    <hr>
    <!-- 缩略图 -->
    <div class="thumbs">
      <img class="preview-img" v-for="(item, index) in list" :src="item.src" height="100" @click="$preview.open(index, list)" :key="index">
    </div>
    <!-- 图片内容区域 -->
    <div class="content" v-html="photoinfos.content"></div>
    <!-- 评论 -->
    <comment-box :id="id"></comment-box>
  </div>
</template>

<script>

import comment from "../../components/comment/";
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      id: this.$route.params.id, //从路由中获取到的图片id
      photoinfos: {},//图片详情
      list:[],//缩略图详情
    };
  },
  methods: {
    getPhotoInfo() {
      //获取图片详情
      this.$http.get("api/getimageInfo/" + this.id).then(result => {
        if (result.body.status == 0) {
          this.photoinfos = result.body.message[0];
        } else {
          Toast("获取图片详情失败");
        }
      });
    },
    getthumbs(){//获取缩略图详情
        this.$http.get("api/getthumimages/" + this.id).then(result => {
        if (result.body.status == 0) {
            result.body.message.forEach(element => {
                element.w=600;
                element.h=400;
            });
          this.list = result.body.message;
        } else {
          Toast("获取缩略图详情失败");
        }
      });
    }
  },
  created() {
    this.getPhotoInfo();
    this.getthumbs();
  },
  components: {
    "comment-box": comment
  }
};
</script>


<style scoped  lang="less">
.homePhotoinfo {
  padding: 5px;
  h1 {
    color: #26a2ff;
    font-size: 15px;
    text-align: center;
    margin: 15px 0;
  }
  .subtitle {
    display: flex;
    justify-content: space-between;
    font-size: 13px;
  }
  .content {
    font-size: 13px;
    line-height: 30px;
  }
  .thumbs{
    img{
      margin:10px;
      box-shadow: 0 0 8px #999;
    }
  }
}
</style>