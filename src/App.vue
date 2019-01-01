<template>
  <div id="app">
    <!-- 头部区域 -->
    <mt-header fixed title="Vue项目"></mt-header>
    <!-- 尾部区域 -->
    <nav class="mui-bar mui-bar-tab">
			<router-link class="mui-tab-item" to="/home">
				<span class="mui-icon mui-icon-home"></span>
				<span class="mui-tab-label">首页</span>
			</router-link>
			<router-link class="mui-tab-item" to="/member">
				<span class="mui-icon mui-icon-contact"></span>
				<span class="mui-tab-label">会员</span>
			</router-link>
			<router-link class="mui-tab-item" to="/shopcar">
				<span class="mui-icon mui-icon-extra mui-icon-extra-cart">
					<span class="mui-badge">0</span>
				</span>
				<span class="mui-tab-label">购物车</span>
			</router-link>
			<router-link class="mui-tab-item" to="/search">
				<span class="mui-icon mui-icon-search"></span>
				<span class="mui-tab-label">搜索</span>
			</router-link>
		</nav>

    <!-- 中间组件区域 -->
		<transition>
			<router-view></router-view>
		</transition>
		
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  padding-top: 40px;
  padding-bottom: 60px;
	overflow-x: hidden;
}
.v-enter,
.v-leave-to{
	opacity: 0;
}
.v-enter{
	transform: translateX(100%)
}
.v-leave-to{
		transform: translateX(-100%);
		position:absolute;
}

.v-enter-active,
.v-leave-active{
	transition:all 0.5s ease;
}
</style>
