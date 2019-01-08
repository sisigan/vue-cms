<template>
  <div class="swiper_box">
    <mt-swipe :auto="4000">
      <mt-swipe-item v-for="(item,index) in lunbotuList" :key="index">
        <img :src="item.img" alt :class="{'full':isfull}">
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>

<script>
export default {
    props:["lunbotuList","isfull"]
};
</script>


<style scoped  lang="less">
.swiper_box {
  .mint-swipe {
    text-align: center;
    height: 200px;
    img {
      height: 100%;
    }
  }
}
.full{
   width: 100%;
}
</style>