<template>
    <Sider class="sider transition" ref="sider" hide-trigger width="350" collapsible :collapsed-width="0" v-model="isCollapsed">
        <div class="py18 relative h-full">
            <div class="flex-parent flex-parent--column h-full">
                <Icon @click="isCollapsed = true" type="md-close" size="23" class="color-blue-base absolute right mr18 cursor-pointer"/>
                <div class="flex-parent flex-parent--column flex-parent--center-cross">
                    <div style="width: 100px; height: 100px;" class="bg-red"></div>
                    <b class="my18 product_header adm-text-big color-gray-medium align-center">
                        Информационная Система<br>
                        Обеспечения Деятельности<br> 
                        Московской Административной<br>
                        Дорожной Инспекции
                    </b>
                </div>
                <ul>
                    <li>
                        <a href="#" class="flex-parent flex-parent--center-cross py18 sider__menu-link active-link">
                            <div class="bg-red mx18" style="width: 40px; height: 40px;">
                                <img src="" alt="">
                            </div>
                            <span class="adm-txt-regular color-gray-medium">Административная практика</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" class="flex-parent flex-parent--center-cross py18 sider__menu-link">
                            <div class="bg-red mx18" style="width: 40px; height: 40px;">
                                <img src="" alt="">
                            </div>
                            <span class="adm-txt-regular color-gray-medium">Обращения граждан</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" class="flex-parent flex-parent--center-cross py18 sider__menu-link">
                            <div class="bg-red mx18" style="width: 40px; height: 40px;">
                                <img src="" alt="">
                            </div>
                            <span class="adm-txt-regular color-gray-medium">Эвакуация</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" class="flex-parent flex-parent--center-cross py18 sider__menu-link">
                            <div class="bg-red mx18" style="width: 40px; height: 40px;">
                                <img src="" alt="">
                            </div>
                            <span class="adm-txt-regular color-gray-medium">Эвакуация</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" class="flex-parent flex-parent--center-cross py18 sider__menu-link">
                            <div class="bg-red mx18" style="width: 40px; height: 40px;">
                                <img src="" alt="">
                            </div>
                            <span class="adm-txt-regular color-gray-medium">Пункт 4</span>
                        </a>
                    </li>
                    <hr class='txt-hr mx18'>
                    <li>
                        <a href="#" class="flex-parent flex-parent--center-cross py18 sider__menu-link">
                            <div class="bg-red mx18" style="width: 40px; height: 40px;">
                                <img src="" alt="">
                            </div>
                            <span class="adm-txt-regular color-gray-medium">Справочник</span>
                        </a>
                    </li>
                </ul>
                <div class="flex-parent flex-parent--column flex-parent--center-main align-center mx-auto my-auto mb18">
                    <div style="width: 50px; height: 50px;" class="bg-red mx-auto round-full txt-truncate">
                        <img src="" alt="">
                    </div>
                    <p class="adm-txt-regular color-gray-medium my18">Имя пользователя</p>
                    <a @click="logout" class='link color-blue-base adm-btn-small txt-underline-on-hover'>Выйти из профиля</a>
                </div>
            </div>
        </div>
    </Sider>
</template>


<script>
export default {
    name: 'SiderMenu',
    props: {
        isCollapsed: {
            type: Boolean,
            default: false
        }
    },
	computed: {
		menuitemClasses () {
			return [
				'menu-item',
				this.isCollapsed ? 'collapsed-menu' : ''
			]
		}
    },
    methods: {
      logout() {
        this.$root.logout();
      },
    }
}
</script>
