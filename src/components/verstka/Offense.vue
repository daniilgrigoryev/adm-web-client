<template>
    <div class="bg-blue-thin">
     <div class="wmax1920 mx-auto">
        <div class="flex-parent flex-parent--center-main flex-parent--center-cross scroll-hidden" style="min-height: calc(100vh - 66px);">
            <div style="max-width: 1120px;">
                <div class="mb30 ml6 my30">
                    <h1 class="adm-h1 color-gray-medium">Переход</h1>
                    <h3 class="adm-h3 color-gray-medium">в подсистемы МАДИ</h3>
                </div>
                <div class="flex-parent flex-parent--wrap flex-parent--center-cross">
                    <Card class="card my6 mx6 wmin360 col round-bold px12 py12 cursor-pointer card-practique">
                        <h3 class="card__title adm-h3 color-gray-medium" style="line-height: 24px;">
                            Административная<br> 
                            практика
                        </h3>
                        <p class="card__description adm-text-small color-gray-medium my12">
                            Административная <br>
                            ответственность за соблюдение <br>  
                            правил ПДД
                        </p>
                        <div class="card__version adm-text-small">v.0.37</div>
                    </Card>
                    <Card class="card my6 mx6 wmin360 col round-bold px12 py12 cursor-pointer card-man">
                        <h3 class="card__title adm-h3 color-gray-medium" style="line-height: 24px;">
                            Обращения граждан
                        </h3>
                        <p class="card__description adm-text-small color-gray-medium my12">
                            Документооброт по по ведению <br>
                            документов обращений
                        </p>
                        <div class="card__version adm-text-small">v.0.37</div>
                    </Card>
                    <Card class="card my6 mx6 wmin360 col round-bold px12 py12 cursor-pointer card-practique">
                        <h3 class="card__title adm-h3 color-gray-medium" style="line-height: 24px;">
                            Эвакуация
                        </h3>
                        <p class="card__description adm-text-small color-gray-medium my12">
                            Ведение документооборота <br>
                            по эвакуации ТС
                        </p>
                        <div class="card__version adm-text-small">v.0.37</div>
                    </Card>
                    <Card class="card my6 mx6 wmin360 col round-bold px12 py12 cursor-pointer card-practique">
                        <h3 class="card__title adm-h3 color-gray-medium" style="line-height: 24px;">
                            Карточка-ссылка 
                        </h3>
                        <p class="card__description adm-text-small color-gray-medium my12">
                            Здесь короткое описание <br>
                            назначения модуля
                        </p>
                        <div class="card__version adm-text-small">v.0.37</div>
                    </Card>
                    <Card class="card my6 mx6 wmin360 col round-bold px12 py12 cursor-pointer card-practique">
                        <h3 class="card__title adm-h3 color-gray-medium" style="line-height: 24px;">
                            Карточка-ссылка 
                        </h3>
                        <p class="card__description adm-text-small color-gray-medium my12">
                            Здесь короткое описание <br>
                            назначения модуля
                        </p>
                        <div class="card__version adm-text-small">v.0.37</div>
                    </Card>
                    <Card class="card my6 mx6 wmin360 col round-bold px12 py12 cursor-pointer card-practique">
                        <h3 class="card__title adm-h3 color-gray-medium" style="line-height: 24px;">
                            Карточка-ссылка 
                        </h3>
                        <p class="card__description adm-text-small color-gray-medium my12">
                            Здесь короткое описание <br>
                            назначения модуля
                        </p>
                        <div class="card__version adm-text-small">v.0.37</div>
                    </Card>
                </div>
            </div>
        </div>
      </div>
    </div>
</template>


<script>
import * as funcUtils from "../../assets/js/utils/funcUtils";
import * as formStack from '../../assets/js/api/formStack';
import RequestApi from "../../assets/js/api/requestApi";
import { mapGetters } from 'vuex';

export default {
	data() {
		return {
			isCollapsed: true
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
		getPrev() {
			try {
				formStack.toPrev({
					vm: this
				});
			} catch (e) {
				alert(e.message);
			}
		},
		collapsedSider () {
			this.$refs.side1.toggleCollapse();
		}
	}
}
</script>
