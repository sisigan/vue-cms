<template>
  <div class="comment_box">
    <h3>发表评论</h3>
    <hr>
    <textarea placeholder="请输入内容(最多120个字)" maxlength="120" v-model="msg"></textarea>
    <mt-button type="primary" size="large" @click="postmsg">发表评论</mt-button>
    <div class="cmt-list">
      <div class="cmt-item" v-for="(item,index) in commons" :key="index">
        <div class="cmt-title">第{{index+1}}楼&nbsp;&nbsp;用户:{{item.user_name}}&nbsp;&nbsp;发表时间:{{item.add_time |dateFormat }}</div>
        <div class="cmt-body">{{item.content=="undefined"?"用户很懒,什么都没有留下":item.content}}</div>
      </div>
    </div>
    <mt-button type="danger" size="large" plain @click="getmostload">加载更多</mt-button>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
export default {
  data() {
    return {
        pageIndex:1,//默认展示第一页数据
        commons:[],//所有评论数据
        msg:"",//评论输出的内容
    };
  },
  methods: {
    getcomments() {
      this.$http.get("api/getcomments/"+this.id+"?pageindex="+this.pageIndex).then(result => {
        if (result.body.status == 0) {//拼接上一页与下一页数据
          this.commons = this.commons.concat(result.body.message);
        } else {
          Toast("获取评论失败");
        }
      });
    },
    getmostload(){//改变pageIndex,再次调用getcomments
      this.pageIndex++;
      this.getcomments();
    },
    postmsg(){//点击评论发表
      //校验发表内容是否为空
      if(this.msg.trim().length===0){
        return Toast("发表评论不为空");
      }
      this.$http.post("api/postcomment/"+this.id,{content:this.msg.trim()})
      .then(result=>{
        if(result.body.status == 0){//评论添加成功
          var cmt ={user_name:"用户",add_time:Date.now,content:this.msg.trim()};
          this.commons.unshift(cmt);
          this.msg="";
          // this.msg="";//清空评论内容
          // this.commons=[];//清空评论数据
          // this.pageIndex=1;//重置到第一页
          // this.getcomments();//调用getcomments
        }else{
          Toast("评论添加失败");
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