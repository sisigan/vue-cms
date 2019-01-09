<template>
    <div class="homeGoodsComm">
        <cmtbox :id="id"></cmtbox>
    </div> 
</template>

<script>
import cmtbox from '../../components/comment/'
export default{
    data(){
        return{
            id: this.$route.params.id,
        }
    },
    components:{
        cmtbox
    }

}

</script>


<style scoped  lang="less">

</style>