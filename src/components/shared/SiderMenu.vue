<template>
	<Sider class="sider transition  scroll-auto scroll-styled" ref="sider" hide-trigger width="350" collapsible :collapsed-width="0" v-model="isCollapsedLocal">
		<div class="py18 relative h-full scroll-auto">
			<div class="flex-parent flex-parent--column h-full">
				<Icon @click="isCollapsedLocal = true" type="md-close" size="23" class="color-blue-base absolute right mr18 cursor-pointer"/>
				<div class="flex-parent flex-parent--column flex-parent--center-cross">
						<div style="width: 100px; height: 100px; background: #ea221d;">
								<img :src="require('~/assets/images/logo_Madi_white.svg')" alt="">
						</div>
						<b class="my18 product_header adm-text-big color-gray-medium align-center">
								Информационная Система<br>
								Обеспечения Деятельности<br> 
								Московской Административной<br>
								Дорожной Инспекции
						</b>
				</div>
				<small class="adm-btn-small color-dark-lighter mb12 align-center my12 txt-em">Версия 12.2 обновление 12.09.2018г</small>
				<div class="user-wrap">
					<img :src="require('~/assets/images/icons/user-avatar.svg')" class="avatar">
					<p class="name">Имя пользователя</p>
					<p class="rank">Звание, Должность</p>
					<a @click="logout" class='logout'>Выйти из профиля</a>
				</div>
			</div>
		</div>
	</Sider>
</template>


<script>
export default {
  name: "SiderMenu",
  props: {
    isCollapsed: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isCollapsedLocal: this.isCollapsed
    };
  },
  methods: {
    logout() {
      this.$root.logout();
    }
  }
};
</script>

<style lang="scss" scoped>
.sider {
	right: 0;
	top: 0;
	.user-wrap {
		padding-bottom: 200px;
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-top: auto;
		color: #797979;
		.avatar {
			width: 70px;
			height: 70px;
			display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      overflow: hidden;
			background: #ccc;
			margin-bottom: 10px;
		}
		.name {
			font-size: 14px;
			font-weight: 600;
		}
		.rank {

		}
		.logout {
			margin-top: 10px;
		}
	}
}
</style>
