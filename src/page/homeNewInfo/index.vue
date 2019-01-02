<template>
    <div class="homeNewInfo">
        <h3 class="title">{{newInfoList.title}}</h3>
        <p class="subtitle">
            <span>发表时间:{{newInfoList.add_time |dateFormat }}</span>
            <span>点击:{{newInfoList.click}}次</span>
        </p>
        <hr>
        <div class="content" v-html="newInfoList.content">

        </div>

    </div>
</template>

<script>
import { Toast } from "mint-ui";
export default{
    data(){
        return{
            //获取地址中传递过来的id值
            id:this.$route.params.id,
            newInfoList:[],
        }
    },
    methods:{
        getNewInfo(){
            this.$http.get('api/getnew/'+this.id).then(result=>{
                if(result.body.status==0){
                    this.newInfoList=result.body.message[0]
                }else{
                    Toast("获取数据失败");
                }
            });
        }
    },
    created(){
        this.getNewInfo();
    }
}

</script>


<style   lang="less">
.homeNewInfo{
    padding: 0 4px;
    .title{
        font-size: 16px;
        text-align: center;
        margin:10px 0;
        color:red;
    }
    .subtitle{
        font-size: 13px;
        color:#226aff;
        display: flex;
        justify-content: space-between;
    }
    .content{
        img{
            width: 100%;
        }
    }
}
</style>