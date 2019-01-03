<template>
  <div class="comment_box">
    <h3>发表评论</h3>
    <hr>
    <textarea placeholder="请输入内容(最多120个字)" maxlength="120"></textarea>
    <mt-button type="primary" size="large">发表评论</mt-button>
    <div class="cmt-list">
      <div class="cmt-item" v-for="(item,index) in commons" :key="index">
        <div class="cmt-title">第{{index+1}}楼&nbsp;&nbsp;用户:{{item.user_name}}&nbsp;&nbsp;发表时间:{{item.add_time |dateFormat }}</div>
        <div class="cmt-body">{{item.content=="undefined"?"用户很懒,什么都没有留下":item.content}}</div>
      </div>
    </div>
    <mt-button type="danger" size="large" plain>加载更多</mt-button>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
export default {
  data() {
    return {
        pageIndex:1,//默认展示第一页数据
        commons:[],//所有评论数据
    };
  },
  methods: {
    getcomments() {
      this.$http.get("api/getcomments/"+this.id+"?pageindex="+this.pageIndex).then(result => {
        if (result.body.status == 0) {
          this.commons = result.body.message;
        } else {
          Toast("获取评论失败");
        }
      });
    }
  },
  props:['id'],
  created() {
    this.getcomments();
  },
};
</script>


<style scoped  lang="less">
.comment_box {
  h3 {
    font-size: 18px;
  }
  textarea {
    font-size: 14px;
    height: 85px;
    margin: 0;
  }
  .cmt-list {
    margin: 5px 0;
    .cmt-item {
      font-size: 13px;
      .cmt-title {
        background-color: #ccc;
        line-height: 30px;
      }
      .cmt-body {
        line-height: 35px;
        text-indent: 2em;
      }
    }
  }
}
</style>