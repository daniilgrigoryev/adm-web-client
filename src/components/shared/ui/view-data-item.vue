<template>
	<div class="item" :class="classes">
		<div v-if="icon" class="item__icon">
			<img :src="icon" alt="">
		</div>
		<small class="item__label">{{label}}</small>
		<p class="item__value" :class="{'color-dark-base' : value, 'color-gray-medium' : !value}">{{value ? value: "Нет информации"}}</p>
	</div>
</template>

<script>
export default {
	props: {
		label: {
			type: String,
		},
		value: {
			type: [String, Number],
		},
		icon: {
			type: String,
		},
		classes: {
			type: String,
		},
	},

}
</script>

<style lang="scss" scoped>
	@import "scss/variables.scss";
	.item {
		// &:not(:last-child){
		// 	margin-bottom: 10px;
		// }
		display: grid;
		grid-gap: 0px;
		// border: 1px solid #000;
		margin: 5px 0;
		position: relative;
		padding-left: 60px;

		.item__icon {
			// filter: grayscale(90%);
			position: absolute;
			left: 0;
			top: 0;
			width: 40px;
			height: 40px;
			padding: 5px;
			display: flex;
			align-items: center;
			justify-content: center;
			img {
				max-width: 100%;
				max-height: 100%;
			}
		}
		.item__label {
			font-size: 14px;
			line-height: 22px;
			color: $dark-lighter;
		}
		.item__value {
			font-size: 16px;
			letter-spacing: 0.1px;
			line-height: 26px;
			font-weight: 600;
			// color: $dark-base;
		}
	}
</style>
