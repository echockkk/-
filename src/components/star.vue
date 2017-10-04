<template>
	<div class="star" v-bind:class="starType">
		<span v-for="itemClass in itemClasses" v-bind:class="itemClass" class="star-item"></span>
	</div>
</template>

<script>
	const LENGTH = 5;
	const CLS_ON = 'on';
	const CLS_HALF = 'half';
	const CLS_OFF = 'off';
	export default {
		props: {
			size: {
				type: Number
			},
			score: {
				type: Number
			}
		},
		computed: {
			starType() {
				return 'star-' + this.size;
			},
			itemClasses() {
				let result = [];
				let score = Math.floor(this.score*2)/2;
				//判断有没有小数，为了取0.5
				let hasDecimal = score % 1 !== 0;
				let integer = Math.floor(score);
				for(let i=0;i<integer;i++){
					result.push(CLS_ON);
				}
				if(hasDecimal) {
					result.push(CLS_HALF);
				}
				while (result.length < LENGTH) {
					result.push(CLS_OFF);
				}
				return result;
			}
		}
	};
</script>
<style scoped>
	.star .on {
		background: url("../../resource/img/star24_on@2x.png");
	}
	.star .half {
		background: url("../../resource/img/star24_half@2x.png");
	}
	.star .off {
		background: url("../../resource/img/star24_off@2x.png");
	}
	.star .star-item {
		display: inline-block;
		width: 0.5rem;
		height: 0.5rem;
		background-repeat: no-repeat;
		-webkit-background-size: cover;
		background-size: cover;
		margin-right: 0.4rem;
	}
	.star .star-item:last-child {
		margin-right: 0;
	}
</style>