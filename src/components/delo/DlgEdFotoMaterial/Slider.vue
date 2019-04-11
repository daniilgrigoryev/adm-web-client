<template>
	<div class="gallery__wrap">
		<div class="gallery__active-item">
			<img :src="acitveGalleryItem" alt="">
		</div>
		<div class="slider">
			<button v-if="photos.length > slideShow" class="arrow prev" @click="prev()"><</button>
			<div class="gallery__items" :style="'transform: translateX(-' + (117 * leftSlideIndex) +  'px)'">
				<div v-for="image in photos" :key="image.id" @click="acitveGalleryItem = image" class="gallery__item">
					<img alt="img" @load="checkPic($event.target)" :src="image"/>
				</div>
			</div>
			<button v-if="photos.length > slideShow" class="arrow next" @click="next()">></button>
		</div>
	</div>
</template>

<script>
import $ from "jquery";


export default {
	props: {
		photos: {
			type: Array,
		},
	},
	data() {
		return {
			leftSlideIndex: 0,
			slideShow: 3,
			acitveGalleryItem: null,
		}
	},
	watch: {
		photos(newValue) {
			this.acitveGalleryItem = newValue.getFirst();
		}
	},
	methods: {
		checkPic(imageDomEl) {
			let setAttr;
			let naturalWidth = imageDomEl.naturalWidth;
			let naturalHeight = imageDomEl.naturalHeight;
			let pic = $(imageDomEl).css({'height': 'auto', 'width': 'auto'});
			let wrap = pic.parent();

			if (naturalHeight < wrap.height()) {
				// wrap.css('height', naturalHeight + 20);
				return;
			}
			let picAspect = naturalHeight / naturalWidth;
			let wrapAspect = wrap.height() / wrap.width();

			pic.css({'max-width': '100%', 'max-height': '100%'});
			if (picAspect < 1) {
				setAttr = (wrapAspect <= picAspect) ? 'height' : 'width';
			} else { // portrait + square
				setAttr = (wrapAspect >= picAspect) ? 'height' : 'width';
			}
			pic.css(setAttr, '100%');
			if (pic.width() > naturalWidth) {
				pic.css('width', naturalWidth);
			}
			if (pic.height() > naturalHeight) {
				pic.css('height', naturalHeight);
			}
		},
		prev() {
			if (this.leftSlideIndex) {
				this.leftSlideIndex -= 1;
			}
		},
		next() {
			if ((this.leftSlideIndex + this.slideShow) < this.photos.length) {
				this.leftSlideIndex += 1;
			}
		},
	},
}
</script>

<style lang="scss" scoped>
	.gallery__wrap {
		.gallery__active-item {
			height: 300px;
			display: flex;
			align-items: center;
			justify-content: center;
			margin-bottom: 20px;
			img {
				max-width: 100%;
				width: 100%;
				max-height: 100%;
			}
		}
		.slider {
			padding: 0 12px;
			position: relative;
			width: 365px;
			overflow: hidden;
			display: flex;
			justify-content: center;
			.arrow {
				position: absolute;
				top: 0;
				bottom: 0;
				margin: auto;
				left: 0;
				border-radius: 50%;
				width: 18px;
				height: 18px;
				background: #2d8cf0;
				color: #ffffff;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 14px;
				font-weight: 700;
				z-index: 3;
				&.next {
					left: auto;
					right: 0;
				}
			}
			.gallery__items {
				display: grid;
				grid-auto-columns: 105px;
				grid-auto-flow: column;
				grid-gap: 12px;
				transition: .3s ease;
				width: 330px;
				.gallery__item {
					width: 100%;
					display: flex;
					align-items: center;
					justify-content: center;
					height: 100px;
					cursor: pointer;
					overflow: hidden;
					border-radius: 5px;
					border: 2px solid transparent;
					transition: .3s ease;
					&:hover {
						border-color: #2d8cf0;
					}
					img {
						height: auto !important;
					}
				}
			}
		}
	}
</style>

