<template>
	<div class="header">
		<div class="content-wrapper">
			<div class="avatar">
			<!-- 在vue中照片的地址不能直接使用src，要使用：src，后面写图片获取的数据的地址就可以了 -->
				<img v-bind:src="seller.avatar">
			</div>
			<div class="content">
				<div class="title">
					<span class="brand"></span>
					<span class="name">{{seller.name}}</span>
				</div>
				<div class="description">
					{{seller.description}}/{{seller.deliveryTime}}分钟送达
				</div>
				<div v-if="seller.supports" class="supports" v-on:click="showDetail">
					<!-- 把下面创建的类名添加上去 -->
					<span class="icon" v-bind:class="classMap[seller.supports[0].type]"></span>
					<span class="text">{{seller.supports[0].description}}</span>
				</div>
			</div>
			<div v-if="seller.supports" class="support-count"  v-on:click="showDetail">
				<span class="count">{{seller.supports.length}}个</span>
				<i class="keyboard_arrow_right">></i>
			</div>
		</div>
		<div class="bullentin-wrapper" v-on:click="showDetail">
			<span class="bulletin-title"></span>
			<span class="bulletin-text">{{seller.bulletin}}</span>
			<i>></i>
		</div>
		<div class="bg">
			<img v-bind:src="seller.avatar">
		</div>
		<!-- css的sticky布局 -->
		<transition name="fade">
			<div class="detail" v-show="detailShow">
				<div class="detail-wrapper clearfixs">
					<div class="detail-main">
						<h1>{{seller.name}}</h1>
						<div class="star-wrap">
						<!-- 星星，使用的是星星组件 -->
							<star v-bind:score="seller.foodScore"></star>
						</div>
						<div class="title">
							<div class="line"></div>
							<div class="text">优惠信息</div>
							<div class="line"></div>
						</div>
						<ul v-if="seller.supports" class="supports">
							<li class="support-item" v-for="(item,index) in seller.supports">
								<span class="icon" v-bind:class="classMap[seller.supports[index].type]"></span>
								<span class="text">{{seller.supports[index].description}}</span>
							</li>
						</ul>
						<div class="title">
							<div class="line"></div>
							<div class="text">商家通告</div>
							<div class="line"></div>
						</div>
						<div class="content">
							<div class="contentt">{{seller.bulletin}}</div>
						</div>
					</div>
				</div>
				<div class="detail-close">
					<i v-on:click="closeDetail">×</i>
				</div>
			</div>
		</transition>
	</div>
</template>

<script>
	import Star from './star.vue'
	export default {
		components: {
			Star
		},
		props: {
			seller: {
				type: Object
			}
		},
		created() {
			// 创建类名
			this.classMap = ['decrease','discount','special','invoice','guarantee']
		},
		data() {
			return {
				detailShow: false
			};
		},
		methods: {
			showDetail(){
				this.detailShow = true
			},
			closeDetail() {
				this.detailShow = false
			}
		}
	}
</script>

<style scoped>
	.header {
		color: #fff;
		position: relative;
		overflow: hidden;
		background-color: rgba(7,17,27,0.5);
	}
	.header .bg {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: -10;
		filter: blur(10px);
	}
	.header .bg img {
		width: 100%;
		height: 100%;
	}
	.content-wrapper {
		position: relative;
		padding: 1.2rem 0.6rem 0.6rem 1.2rem;
	}
	.content-wrapper>div {
		vertical-align: top;
	}
	.content-wrapper .avatar,.content-wrapper .content {
		display: inline-block;
	}
	.avatar {
		width: 3.2rem;
		height: 3.2rem;
		border-radius: 0.1rem;
		overflow: hidden;
	}
	.avatar img {
		width: 100%;
	}
	.content-wrapper .content {
		margin-left: 0.8rem;
	}
	.content-wrapper .content .title span {
		font-size: 0.8rem;
		line-height: 0.9rem;
		font-weight: bold;
		vertical-align: top;
	}
	.content-wrapper .content .title {
		margin: 0.1rem 0 0.4rem 0;
	}
	.content-wrapper .content .title .brand {
		width: 1.5rem;
		height: 0.9rem;
		margin-right: 0.3rem;
		display: inline-block;
		background: url('../../resource/img/brand@2x.png') no-repeat;
		-webkit-background-size: cover;
		background-size: cover;
	}
	
	.content-wrapper .content .description {
		font-size: 0.6rem;
		font-weight: 200;
		line-height: 0.6rem;
		margin-bottom: 0.5rem;
	}
	.content-wrapper .content .supports .text {
		font-size: 0.5rem;
		font-weight: 200;
		line-height: 0.6rem;
	}
	.content-wrapper .content .supports span {
		vertical-align: top;
	}
	/*不同类名不同的背景图*/
	.content-wrapper .content .supports .decrease,.detail-main ul li .decrease {
		background: url('../../resource/img/decrease_1@2x.png') no-repeat;
	}
	.content-wrapper .content .supports .discount,.detail-main ul li .discount {
		background: url('../../resource/img/discount_1@2x.png') no-repeat;
	}
	.content-wrapper .content .supports .special,.detail-main ul li .special{
		background: url('../../resource/img/special_1@2x.png') no-repeat;
	}
	.content-wrapper .content .supports .invoice,.detail-main ul li .invoice {
		background: url('../../resource/img/invoice_1@2x.png') no-repeat;
	}
	.content-wrapper .content .supports .guarantee,.detail-main ul li .guarantee {
		background: url('../../resource/img/guarantee_1@2x.png') no-repeat;
	}
	.content-wrapper .content .supports .icon {
		display: inline-block;
		width: 0.6rem;
		height: 0.6rem;
		margin-right: 0.2rem;
		margin-bottom: 0.1rem;
		background-size: cover;
		-webkit-background-size: cover;
	}
	.support-count {
		position: absolute;
		right: 0.6rem;
		bottom: 0.5rem;
		padding: 0 0.4rem;
		height: 1.2rem;
		line-height: 1.2rem;
		border-radius: 0.7rem;
		background-color: rgba(0,0,0,0.2);
	}
	.support-count  .count {
		font-size: 0.5rem;
	}
	.support-count i {
		font-size: 0.35rem;
		margin-left: 0.1rem;
	}
	.bullentin-wrapper {
		font-size: 0.5rem;
		height: 1.4rem;
		line-height: 1.4rem;
		background-color: rgba(7,17,25,0.2);
	}
	.bullentin-wrapper span {
		vertical-align: middle;
	}
	.bullentin-wrapper .bulletin-title {
		display: inline-block;
		width: 1.1rem;
		height: 0.6rem;
		background: url('../../resource/img/bulletin@2x.png') no-repeat;
		-webkit-background-size: cover;
		background-size: cover;
		margin-left: 0.6rem;
		margin-right: 0.2rem;
	}
	.bullentin-wrapper .bulletin-text {
		display: inline-block;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		width: 80%;
	}
	.detail {
		position: fixed;
		top: 0;
		left: 0;
		z-index: 100;
		width: 100%;
		height: 100%;
		overflow: auto;
		/*最终状态，即进入后的状态*/
		background-color: rgba(7,17,27,0.8);
		/*只对ios有作用，安卓没作用，背景模糊*/
		backdrop-filter: blur(10px);
		transition: all 0.5s;
	}
	.fade-enter,.fade-leave-active {
		/*进入之前，和离开之后状态*/
		opacity: 0;
		background-color: rgba(7,17,27,0);
	}
	.fade-enter-active,.fade-leave-active {
		/*在进入之后就，离开之前*/
		transition: all 0.5s;
	}
	
	.detail-wrapper {
		min-height: 100%;
	}
	.detail-main {
		padding-top: 3.2rem;
		padding-bottom: 3.2rem;
	}
	.detail-close {
		font-size: 1.6rem;
		text-align: center;
		position: relative;
		height: 1.6rem;
		width: 1.6rem;
		margin: -3.2rem auto 0 auto;
		clear: both;
	}
	.detail-main h1 {
		font-size: 0.8rem;
		font-weight: 700;
		color: rgb(255,255,255);
		line-height: 0.8rem;
		margin-bottom: 0.8rem;
		text-align: center;
	}
	.star-wrap {
		margin-bottom: 1.4rem;
		text-align: center;
	}
	.detail-main .title {
		width: 80%;
		display: flex;
		margin: 0 auto;
		margin-bottom: 1.2rem;
	}
	.detail-main .title .line {
		flex: 1;
		position: relative;
		top: -0.3rem;
		border-bottom: 0.025rem solid rgba(255,255,255,0.2);
	}
	.detail-main .title .text {
		padding: 0 0.6rem;
		font-size: 0.7rem;
		font-weight: 700;
	}
	.detail-main ul {
		width: 80%;
		margin: 0 auto;
		margin-bottom: 1.4rem;
	}
	.detail-main ul li {
		padding-left: 0.6rem;
		margin-bottom: 0.6rem;
	}
	.detail-main ul li:last-child {
		margin-bottom: 0
	}
	.detail-main ul li>span {
		vertical-align: middle;
	}
	.detail-main ul li .icon {
		display: inline-block;
		width: 0.8rem;
		height: 0.8rem;
		-webkit-background-size: cover;
		background-size: cover;
		margin-right: 0.3rem;
	}
	.detail-main ul li .text {
		font-size: 0.6rem;
		line-height: 0.6rem;
		color: rgb(255,255,255);
		font-weight: 200;
	}
	.detail-main .content {
		width: 80%;
		margin: 0 auto;
	}
	.detail-main .content .contentt {
		padding: 0 0.6rem;
		font-size: 0.6rem;
		line-height: 1.2rem;
		font-weight: 200;
		color: rgb(255,255,255);
	}
</style>