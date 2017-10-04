<template>
  <div id="app">
  	<header-nav :seller="seller"></header-nav>
  	<div class="content">
		<ul>
			<li><router-link to='/goods'>商品</router-link></li>
			<li><router-link to='/ratings'>评论</router-link></li>
			<li><router-link to='/seller'>商家</router-link></li>
		</ul>
	</div>
    <router-view v-bind:seller="seller"></router-view>
  </div>
</template>

<script>
	import HeaderNav from './components/header.vue'
	const ERR_OK = 0;
	export default {
		name: 'app',
		components: {
			HeaderNav
		},
		data() {
			return {
				// 与下面获取的seller数据关联起来
				seller: {}
			};
		},
		//钩子函数，写的ajax请求，
		created() {
			this.$http.get('/api/seller').then((response) => {
				// 返回的是一个object对象
				response = response.body;
				if(response.errno === ERR_OK){
					// 获取seller数据
					this.seller = response.seller;
					console.log(this.seller)
				}
			})
		}
	}
</script>

<style scoped>
	#app {
	  font-family: 'Avenir', Helvetica, Arial, sans-serif;
	  -webkit-font-smoothing: antialiased;
	  -moz-osx-font-smoothing: grayscale;
	}
	.content ul {
		list-style: none;
		width: 100%;
		display: flex;
	}
	.content ul li {
		float: left;
		height: 2.0rem;
		flex: 1;
	}
	.isActiveo li:first-child a,.isActivetw li:nth-child(2) a,.isActiveth li:nth-child(3) a{
		color: rgb(240,20,20);
	}
	.content ul li  a {
		display: block;
		width: 100%;
		font-size: 0.7rem;
		text-align: center;
		line-height: 2.0rem;
		color: rgb(77,85,93);
	}
	.content ul li .router-link-active {
		color: rgb(240,20,20);
	}
</style>
