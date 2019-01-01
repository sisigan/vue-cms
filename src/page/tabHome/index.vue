<template>
  <div class="tabHome">
    <!-- 轮播图   -->
    <mt-swipe :auto="4000">
      <mt-swipe-item v-for="(item,index) in lunbotuList" :key="index">
          <img :src="item.img" alt="">
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>

<script>
    import {Toast} from 'mint-ui'

    export default{
        data(){
            return{
                lunbotuList:[]//保存轮播图的数组
            }
        },
        created(){
            this.getLunbotu()
        },
        methods:{
            getLunbotu(){//获取轮播图数据的方法
                this.$http.get('http://www.lovegf.cn:8899/api/getlunbo').then(result=>{
                    if(result.body.status==0){
                        this.lunbotuList=result.body.message
                    }else{
                        Toast("加载轮播图失败")
                    }
                })

            }
        }
    }
</script>


<style scoped lang="less">
    .tabHome{
        .mint-swipe{
            height: 200px;
            img{
                width: 100%;
                height: 100%;
            }
        }
    }

</style>
