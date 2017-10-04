<template>
	<div class="shopcar">
		<div class="content">
			<div class="content-left">
				<div class="logo-wrapper">
					<div class="logo" v-bind:class="{'hightlight':totalCount>0}">
						<span class="icon" v-bind:class="{'hightlight':totalCount>0}"></span>
					</div>
				</div>
				<div class="num" v-show="totalCount>0">{{totalCount}}</div>
				<div class="price" v-bind:class="{'hightlight':totalCount>0}">￥{{totalPrice}}元</div>
				<!-- deliveryPrice是下面props传递来的数据所命名的名称 -->
				<div class="descript">另需配送费￥{{deliveryPrice}}元</div>
			</div>
			<div class="content-right" v-bind:class="payClass">{{payDesc}}</div>
		</div>
		<!-- <div class="ball-container">
			<transition name="drap">
				<div v-for="ball in balls" v-show="ball.show" class="ball"></div>
			</transition>
			<div class="inner"></div>
		</div> -->
	</div>
</template>
<script>
	export default {
		// props是实现父子之间数据的传递，seller或者其他的名字，是前面绑定数据绑定数据的名称， 下面要使用驼峰命名法，比如下面的名称是goods.vue前面所绑定上的数据的名称
		// props: ['deliveryPrice','minPrice'],
		props: {
			selectFoods: {
				type: Array,
				default() {
					return [
						{
							price: 10,
							count: 20
						}
					];
				}
			},
			deliveryPrice: {
				type: Number,
				default: 0
			},
			minPrice: {
				type: Number,
				default: 0
			}
		},
		computed: {
			totalPrice() {
				let total = 0;
				this.selectFoods.forEach((food) => {
					total += food.price * food.count;
				});
				return total;
			},
			totalCount() {
				let count = 0;
				this.selectFoods.forEach((food) => {
					count += food.count;
				});
				return count;
			},
			payDesc() {
				if(this.totalPrice === 0) {
					return '￥' + this.minPrice +'原本起送';
				}else if(this.totalPrice < this.minPrice) {
					let cz = this.minPrice - this.totalPrice
					return '还差' + cz + '元'
				}else{
					return '去结算'
				}
			},
			payClass() {
				if(this.totalPrice < this.minPrice) {
					return 'noenough';
				}else{
					return 'enough';
				}
			}
		},
		data() {
			return {
				balls: [
					{
						show: false
					},
					{
						show: false
					},
					{
						show: false
					},
					{
						show: false
					},
					{
						show: false
					}
				]
			}
		}
	}
</script>
<style scoped>
	.shopcar {
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 100;
		width: 100%;
		height: 2.4rem;
	}
	.content {
		display: flex;
		font-size: 0;
		background-color: #141d27;
	}
	.content-left {
		flex: 1;
	}	
	.logo-wrapper {
		display: inline-block;
		position: relative;
		top: -0.3rem;
		margin: 0 0.2rem;
		padding: 0.3rem;
		width: 2.8rem;
		height: 2.8rem;
		box-sizing: border-box;
		vertical-align: top;
		background-color: #141d27;
		border-radius: 50%;
	}
	.logo {
		display: inline-block;
		width: 100%;
		height: 100%;
		border-radius: 50%;
		background-color: #2b343c;
		position: relative;
	}
	.icon {
		display: block;
		width: 50%;
		height: 50%;
		background-color: #ccc;
		border-radius: 50%;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%,-50%);
	}
	.price {
		display: inline-block;
		vertical-align: top;
		line-height: 1.2rem;
		margin-top: 0.7rem;
		box-sizing: border-box;
		padding-right: 0.2rem;
		border-right: 1px solid rgba(255,255,255,0.1);
		font-size: 0.3rem;
		font-weight: 700;
		color: rgba(255,255,255,0.4);
	}
	.num {
		display: inline-block;
		width: 1rem;
		height: 1rem;
		border-radius: 50%;
		background-color: red;
		line-height: 1rem;
		text-align: center;
		color: #fff;
		font-size: 0.3rem;
		position: absolute;
		top: 0;
		left: 2.0rem;
	}
	.descript {
		display: inline-block;
		margin-left: 0.2rem;
		vertical-align: top;
		line-height: 1.2rem;
		font-size: 0.3rem;
		color: rgba(255,255,255,0.4);
		margin-top: 0.7rem;
	}
	.hightlight {
		color: #fff;
	}
	.content-right {
		flex: 0 0 5.25rem;
		width: 5.25rem;
		text-align: center;
		font-size: 0.6rem;
		color: rgba(255,255,255,0.4);
		font-weight: 700;
		line-height: 1.2rem;
		padding-top: 0.7rem;
		background-color:  #2b343c;
	}
	.enough {
		background-color: green;
		color: #fff;
	}
	/*.ball-container {

	}
	.ball {
		position: fixed;
		left: 1.6rem;
		background-color: 1.1rem;
		z-index: 200;
	}
	.drop-enter-active,.drop-leave-active {
		transition: all 0.4s;
	}
	.inner {
		width: 0.8rem;
		height: 0.8rem;
		border-radius: 50%;
		background-color: blue;
		transition: all 0.4s;
	}*/
</style>