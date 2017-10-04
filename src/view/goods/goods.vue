<template>
	<div>
		<div class="goods">
		<!-- ref的使用注意，这是1与2的区别，1使用的是v-el -->
			<div class="menu-wrapper" ref="menuWrapper">
				<!-- ref:表示的是定义对象 -->
				<ul>
				<!-- currentIndex === index表示的是判断条件，如果下面获取的currentIndex的值等于index的话，那么是true则给元素绑定current类名，否则不绑定此类名 -->
					<li v-for="(item,index) in goods" class="menu-item" v-bind:class="{'current':currentIndex === index}" v-on:click="selectMenu(index,$event)">
						<span class="text">
							<span v-show="item.type>0" class="icon" v-bind:class="classMap[item.type]"></span>{{item.name}}
						</span>
					</li>
				</ul>
			</div>
			<div class="food-wrapper" ref="foodWrapper">
				<ul>
					<li v-for="(item,index) in goods" class="food-list food-list-hook">
						<h1 class="title">{{item.name}}</h1>
						<ul>
							<li v-for="food in item.foods" class="food-item">
								<div class="icon">
									<img v-bind:src="food.icon">
								</div>
								<div class="content">
									<h2 class="name">{{food.name}}</h2>
									<p class="desc" v-if="food.description">{{food.description}}</p>
									<div class="extra">
										<span>月售{{food.sellCount}}</span>
										<span>好评率{{food.rating}}%</span>
									</div>
									<div class="price">
										<span>￥{{food.price}}</span>
										<span v-if="food.oldPrice">￥{{food.oldPrice}}</span>
									</div>
									<div class="carcontrol-wrapper">
									<!-- 这个地方的food是给carcontrol.vue这个文件使用的数据 -->
										<carcontrol v-bind:food="food"></carcontrol>
									</div>
								</div>
							</li>
						</ul>
					</li>
				</ul>
			</div>

		</div>
		<shopcar v-bind:select-foods="selectFoods" v-bind:delivery-price="seller.deliveryPrice" v-bind:min-price="seller.minPrice"></shopcar>
	</div>
</template>
<script>
	import BScroll from 'better-scroll';
	import shopcar from '../../components/shopcar.vue';
	import carcontrol from '../../components/carcontrol.vue';
	const ERR_OK = 0;
	export default {
		// props是实现父子之间数据的传递，seller或者其他的名字，是前面绑定数据绑定数据的名称，下面要使用驼峰命名法
		props: ['seller'],
		components: {
			shopcar,
			carcontrol
		},
		data() {
			return {
				//一开始数据为空，当组件被调用的时候，后台数据会被返回
				goods: [],
				listHeight: [],
				scrollY: 0
			}
		},
		computed: {
			currentIndex() {
				for(let i = 0 ; i< this.listHeight.length; i++){
					let height1 = this.listHeight[i];
					let height2 = this.listHeight[i+1];
					// 判断时候是最后一个元素，或者是否是在两次高度之间，如果是，则返回i，如果不是则返回0，则把前面currentIndex传入到class类中
					if(!height2 || this.scrollY>=height1&&this.scrollY<height2){
						return i;
					}
				}
				return 0;
			},
			selectFoods() {
				let foods = [];
				this.goods.forEach((good) => {
					good.foods.forEach((food) => {
						if(food.count) {
							foods.push(food);
						}
					})
				});
				return foods;
			}
		},
		created() {
			this.classMap = ['decrease','discount','special','invoice','guarantee']
			// 通过钩子函数，获取mock数据
			this.$http.get('/api/goods').then((response) => {
				response= response.body;
				if(response.errno === ERR_OK) {
					this.goods = response.goods;
					//渲染dom
					this.$nextTick(() => {
						this._initScroll();
						// 使元素调用此方法，即渲染到页面中去
						this._calculateHeight();
					})
				}
			});
		},
		methods: {
			_initScroll() {
				// this.$refs['menuWrapper']表示的是获取对象,
				this.menuScroll = new BScroll(this.$refs['menuWrapper'],{
					// 下面表示接受了这个参数可点击，
					click: true
				})
				this.foodScroll = new BScroll(this.$refs['foodWrapper'],{
					// 作用是检测滚动的位置
					probeType: 3,
					click: true
				});
				// foodScroll发生滚动时，位置变化，pos表示的是位置，pos.y表示的是在垂直方向上发生的变化
				this.foodScroll.on("scroll",(pos) => {
					// 表示的是在垂直方向上滚动多少
					this.scrollY = Math.abs(Math.round(pos.y));
				});
			},
			_calculateHeight() {
				// 获取元素
				let foodList = this.$refs['foodWrapper'].getElementsByClassName('food-list-hook');
				// 定义高度
				let height = 0;
				// 把高度的变化塞入listHeight中
				this.listHeight.push(height);
				for(let i = 0 ; i <foodList.length;i++){
					let item = foodList[i];
					// 表示的是可视区域高度的累加，即每一块foodList的高度
					height += item.clientHeight;
					// 将高度塞入listHeight中
					this.listHeight.push(height);
				}
			},
			selectMenu(index,event) {
				// 避免pc端点击出现两次
				if(!event._constructed){
					return;
				}
				let foodList = this.$refs['foodWrapper'].getElementsByClassName('food-list-hook');
				// 获取foodList的第几个元素
				let el = foodList[index];
				// 300ms滑到第几个元素
				this.foodScroll.scrollToElement(el,300);
				console.log(index)
			}
		}
	}
</script>

<style scoped>
	.goods {
		position: absolute;
		width: 100%;
		top: 8.7rem;
		bottom: 2.4rem;
		display: flex;
		overflow: hidden;
	}
	.menu-wrapper {
		flex: 0 0 4.0rem;
		width: 4.0rem;
		background-color: #f3f5f7;
	}
	.menu-item {
		display: table;
		width: 100%;
		height: 2.7rem;
		font-size: 0.6rem; 
		font-weight: 200;
		line-height: 0.7rem;
		border-bottom: 1px solid rgba(7,17,27,0.1);
	}
	.menu-wrapper .current {
		position: relative;
		margin-top: -1px;
		background-color: #fff;
		font-weight: 700;
		border-bottom: 0;
	}
	.menu-item:last-child {
		border-bottom: 0;
	}
	.menu-wrapper .decrease{
		background: url('../../../resource/img/decrease_1@2x.png') no-repeat;
	}
	.menu-wrapper .discount {
		background: url('../../../resource/img/discount_1@2x.png') no-repeat;
	}
	.menu-wrapper .special{
		background: url('../../../resource/img/special_1@2x.png') no-repeat;
	}
	.menu-wrapper .invoice {
		background: url('../../../resource/img/invoice_1@2x.png') no-repeat;
	}
	.menu-wrapper .guarantee {
		background: url('../../../resource/img/guarantee_1@2x.png') no-repeat;
	}
	.menu-item .text {
		display: table-cell;
		margin: 0 auto;
		vertical-align: middle;
		padding: 0 0.3rem;
		text-align: center;
	}
	.menu-wrapper .icon {
		display: inline-block;
		width: 0.5rem;
		height: 0.5rem;
		-webkit-background-size: cover;
		background-size: cover;
		vertical-align: top;
	}
	.food-wrapper {
		flex: 1;
		background-color: #fff;
	}
	.food-list .title {
		background-color: #f3f5f7;
		height: 1.3rem;
		font-size: 0.6rem;
		border-left: 1px solid #d9dde1;
		color: rgb(147,153,159);
		line-height: 1.3rem;
		padding-left: 0.7rem;
	} 
	.food-item>div {
		display: inline-block;
		vertical-align: top;
	}
	.food-item {
		display: flex;
		padding: 0.9rem 0;
		margin: 0 0.9rem;
		border-bottom: 1px solid rgba(7,17,27,0.1);
	}
	.food-list .food-item:last-child {
		border-bottom: 0;
	}
	.food-item .icon {
		width: 3.2rem;
		height: 3.2rem;
		border-radius: 0.1rem;
		overflow: hidden;
		margin-right: 0.5rem;
	}
	.food-item .icon img {
		width: 100%;
	}
	.food-item .content {
		flex: 1;
		position: relative;
	}
	.carcontrol-wrapper {
		position: absolute;
		right: 0;
		bottom: 0;
	}
	.food-item .content .name {
		font-size: 0.7rem;
		line-height: 0.7rem;
		margin-top: 0.1rem;
		margin-bottom: 0.4rem;
	}
	.food-item .content .desc {
		font-size: 0.5rem;
		line-height: 0.8rem;
		color: rgb(147,153,159);
		margin-bottom: 0.4rem;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
	}
	.food-item .content .extra {
		margin-bottom: 0;
		font-size: 0.5rem;
		color: rgb(147,153,159);
		margin-bottom: 0.4rem;
		line-height: 0.5rem;
	}
	.food-item .content .price span:first-child {
		font-size: 0.5rem;
		font-weight: 700;
		line-height: 1.2rem;
		margin-right: 0.4rem;
		color: red;
	}
	.food-item .content .price span:nth-child(2) {
		font-size: 0.5rem;
		line-height: 0.7rem;
		color: rgb(147,153,159);

	}
</style>