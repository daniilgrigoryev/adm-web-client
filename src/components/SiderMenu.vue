<template>
    <Sider class="sider transition  scroll-auto scroll-styled" ref="sider" hide-trigger width="350" collapsible :collapsed-width="0" v-model="isCollapsed">
        <div class="py18 relative h-full scroll-auto">
            <div class="flex-parent flex-parent--column h-full">
                <Icon @click="isCollapsed = true" type="md-close" size="23" class="color-blue-base absolute right mr18 cursor-pointer"/>
                <div class="flex-parent flex-parent--column flex-parent--center-cross">
                    <div style="width: 100px; height: 100px;" class="bg-red-faint"></div>
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
                            <div class="bg-red-faint mx18" style="width: 40px; height: 40px;">
                                <img src="" alt="">
                            </div>
                            <span class="adm-txt-regular color-gray-medium">Административная практика</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" class="flex-parent flex-parent--center-cross py18 sider__menu-link">
                            <div class="bg-red-faint mx18" style="width: 40px; height: 40px;">
                                <img src="" alt="">
                            </div>
                            <span class="adm-txt-regular color-gray-medium">Обращения граждан</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" class="flex-parent flex-parent--center-cross py18 sider__menu-link">
                            <div class="bg-red-faint mx18" style="width: 40px; height: 40px;">
                                <img src="" alt="">
                            </div>
                            <span class="adm-txt-regular color-gray-medium">Эвакуация</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" class="flex-parent flex-parent--center-cross py18 sider__menu-link">
                            <div class="bg-red-faint mx18" style="width: 40px; height: 40px;">
                                <img src="" alt="">
                            </div>
                            <span class="adm-txt-regular color-gray-medium">Эвакуация</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" class="flex-parent flex-parent--center-cross py18 sider__menu-link">
                            <div class="bg-red-faint mx18" style="width: 40px; height: 40px;">
                                <img src="" alt="">
                            </div>
                            <span class="adm-txt-regular color-gray-medium">Пункт 4</span>
                        </a>
                    </li>
                    <hr class='txt-hr mx18'>
                    <li>
                        <a href="#" class="flex-parent flex-parent--center-cross py18 sider__menu-link">
                            <div class="bg-red-faint mx18" style="width: 40px; height: 40px;">
                                <img src="" alt="">
                            </div>
                            <span class="adm-txt-regular color-gray-medium">Справочник</span>
                        </a>
                    </li>
                </ul>
                
                <small class="adm-btn-small color-dark-lighter mb12 align-center my12 txt-em">Версия 12.2 обновление 12.09.2018г</small>

                <div class="flex-parent flex-parent--column flex-parent--center-main align-center mx-auto my-auto mb18">
                    <div style="width: 50px; height: 50px;" class="bg-blue-light mx-auto round-full txt-truncate">
                        <img src="../assets/images/police.svg" style="fill: #fff;" alt="">
                    </div>
                    <p class="adm-txt-regular color-dark-lighter mt12">Имя пользователя</p>
                    <small class="adm-btn-small color-dark-lighter mb12">Звание, Должность</small>
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
