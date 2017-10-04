<template>
	<div class="carcontrol">
		<transition name="move">
			<div class="car-decrease" v-on:click="increa" v-show="food.count>0"><span>-</span></div>
		</transition>
		<div class="car-count" v-show="food.count>0">{{food.count}}</div>
		<div class="car-increase" v-on:click="addCar"><span>+</span></div>
	</div>
</template>
<script>
	import Vue from 'vue';
	export default {
		props: {
			// 这个地方的food是前面的父组件传递过来的数据
			food: {
				type: Object
			}
		},
		created() {
			// console.log(this.food)
		},
		methods: {
			addCar(event) {
				if(!event._constructed) {
					return;
				}
				if(!this.food.count) {
					// 添加count属性
					Vue.set(this.food,'count',1)
				}else{
					this.food.count++;
					// console.log(1)
				}
			},
			increa() {
				if(!event._constructed) {
					return;
				}
				if(this.food.count>0){
					this.food.count--;
				}
			}
		}
	}
</script>
<style scoped>
	.carcontrol {
		font-size: 0;
		width: 2.9rem;
		height: 0.9rem;
		position: relative;
	}
	.carcontrol>div {
		display: inline-block;
		background: blue;
		border-radius: 50%;
		width: 0.75rem;
		height: 0.75rem;
		text-align: center;
		border: 1px solid blue;
	}
	.carcontrol .car-increase {
		position: absolute;
		top: 0;
		right: 0;
	}
	.carcontrol .car-count {
		background-color: #fff;
		width: 1.2rem;
		border: 0;
		text-align: center;
		font-size: 0.5rem;
		color: #000;
		border-radius: 0;
	}
	.carcontrol>div span {
		font-size:  0.7rem;
		color: #000;
		line-height: 0.75rem;
	}
	.carcontrol .car-increase span {
		color: #fff;
	}
	.carcontrol .car-decrease {
		background-color: #fff;
		color: #000;
	}
	/*减少的动画效果*/
	/*这里是进入之前和出去之后的状态，而原来标签内时表示的是进入之后和出去之前的状态，也就是最终的状态*/
	.move-enter,.move-leave-active {
		opacity: 0;
		transform: translate3d(2.6rem,0,0);
	}
	.move-enter-active,.move-leave-active {
		transition: all 0.4s linear;
	}
</style>