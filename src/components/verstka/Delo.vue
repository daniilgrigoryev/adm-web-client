<template>
	<div class="layout h-full">
		<button type="button" @click="getPrev">Назад</button>
		<Layout class="layout--inner h-full wmax1280 mx-auto">
           <Sider class="sider transition " ref="side1" hide-trigger width="350" collapsible :collapsed-width="0" v-model="isCollapsed">
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
								<a href="#" class="flex-parent flex-parent--center-cross py18 menu-link active-link">
									<div class="bg-red mx18" style="width: 40px; height: 40px;">
										<img src="" alt="">
									</div>
									<span class="adm-txt-regular color-gray-medium">Административная практика</span>
								</a>
							</li>
							<li>
								<a href="#" class="flex-parent flex-parent--center-cross py18 menu-link">
									<div class="bg-red mx18" style="width: 40px; height: 40px;">
										<img src="" alt="">
									</div>
									<span class="adm-txt-regular color-gray-medium">Обращения граждан</span>
								</a>
							</li>
							<li>
								<a href="#" class="flex-parent flex-parent--center-cross py18 menu-link">
									<div class="bg-red mx18" style="width: 40px; height: 40px;">
										<img src="" alt="">
									</div>
									<span class="adm-txt-regular color-gray-medium">Эвакуация</span>
								</a>
							</li>
							<li>
								<a href="#" class="flex-parent flex-parent--center-cross py18 menu-link">
									<div class="bg-red mx18" style="width: 40px; height: 40px;">
										<img src="" alt="">
									</div>
									<span class="adm-txt-regular color-gray-medium">Эвакуация</span>
								</a>
							</li>
							<li>
								<a href="#" class="flex-parent flex-parent--center-cross py18 menu-link">
									<div class="bg-red mx18" style="width: 40px; height: 40px;">
										<img src="" alt="">
									</div>
									<span class="adm-txt-regular color-gray-medium">Пункт 4</span>
								</a>
							</li>
							<hr class='txt-hr mx18'>
							<li>
								<a href="#" class="flex-parent flex-parent--center-cross py18 menu-link">
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
							<a href='#Links' class='link color-blue-base adm-btn-small txt-underline-on-hover'>Выйти из профиля</a>
						</div>
					</div>
 					
			   </div>
            </Sider>
			<Layout class="layout--inner">
				<div class="flex-parent flex-parent--center-cross flex-parent--space-between-main">
					<div class="flex-parent flex-parent--center-cross mr64">
						<!-- <Icon @click.native="collapsedSider" type="md-menu" size="24" class="mx12 cursor-pointer"></Icon> -->
						<Button type="text" style="outline: 0!important;" class="icon-main px0 py0 mx12 my6 cursor-pointer" @click.native="collapsedSider">
							<img src='../../assets/images/burger.svg' class="wmax-none">
						</Button>
						<div>
							<h1 class="adm-h2 color-gray-medium txt-uppercase">Исод Мади</h1>
						</div>
					</div>
					<Menu mode="horizontal" active-name="1">
						<MenuItem name="1"> Административный учет
						</MenuItem>
						<MenuItem name="2"> Возбудить дело
						</MenuItem>
						<MenuItem name="3"> Учет спецпродукции
						</MenuItem>
						<MenuItem name="3"> Состояние выгрузки
						</MenuItem>
						<MenuItem name="3"> Обработка документов
						</MenuItem>
						<MenuItem name="3"> Почтовые реестры
						</MenuItem>
					</Menu>
				</div>
				<div class="px36 py24">
					<div class="my12">
						<span class="adm-h2 color-gray-medium">Дело № </span>
						<span class="adm-h1 color-gray-medium">1258</span>
					</div>
					<div class="my6">
						<span class="adm-txt-regular color-gray-medium">06.12.19</span>
						<span class="adm-txt-regular color-gray-medium">открыто</span>
					</div>
					<div class="mt24">
						<b class="adm-text-big color-gray-medium">Статья дела</b>
						<p class="adm-txt-regular color-gray-medium">Описание нарушения по указанной статье и подпунту статьи. Описание нарушения по указанной статье и подпунту статьи.Описание нарушения по указанной статье и подпунту статьи.Описание нарушения по указанной статье и подпунту статьи.</p>
					</div>
				</div>
				<div>
					<Row>
						<Col :xs="24" :sm="8" :md="8" :lg="8">
							<ul class="tree">
								<li>
									<a href="#" class="flex-parent flex-parent--wrap tree__link border-t border-b border--gray-faint py12">
										<div class="bg-red ml18" style="width: 40px; height: 40px;">
											<img src="" alt="">
										</div>
										<div class="col mx18">
											<div class="flex-parent flex-parent--space-between-main">
												<p class="adm-txt-regular color-dark-base txt-break-word">Возбуждение дела</p>
												<i class="adm-txt-regular color-blue-base txt-break-word">12.05.2019</i>
											</div>
											<p class="adm-text-big color-dark-base txt-bold txt-break-word">1234343</p>
											<small class="adm-text-small color-dark-base txt-break-word">по статье 12.5 ч5</small>
										</div>
									</a>
								</li>
								<li>
									<a href="#" class="flex-parent flex-parent--wrap tree__link border-t border-b border--gray-faint py12">
										<div class="bg-red ml18" style="width: 40px; height: 40px;">
											<img src="" alt="">
										</div>
										<div class="col mx18">
											<div class="flex-parent flex-parent--space-between-main">
												<p class="adm-txt-regular color-dark-base txt-break-word">Постановление</p>
												<i class="adm-txt-regular color-blue-base txt-break-word">12.05.2019</i>
											</div>	
											<p class="adm-text-big color-dark-base txt-bold txt-break-word">173648594739504826492</p>
										</div>
									</a>
								</li>
								<li>
									<a href="#" class="flex-parent flex-parent--wrap tree__link border-t border-b border--gray-faint py12">
										<div class="bg-red ml18" style="width: 40px; height: 40px;">
											<img src="" alt="">
										</div>
										<div class="col mx18">
											<div class="flex-parent flex-parent--space-between-main">
												<p class="adm-txt-regular color-dark-base txt-break-word">Штраф</p>
												<i class="adm-txt-regular color-blue-base txt-break-word">12.05.2019</i>
											</div>	
											<p class="adm-text-big color-red txt-break-word">500 ₽</p>
										</div>
									</a>
								</li>
								<li>

									<a href="#" class="flex-parent flex-parent--wrap tree__link border-t border-b border--gray-faint py12">
										<div class="bg-red ml18" style="width: 40px; height: 40px;">
											<img src="" alt="">
										</div>
										<div class="col mx18">
											<div class="flex-parent flex-parent--space-between-main">
												<p class="adm-txt-regular color-dark-base txt-break-word">Почтовое уведомление</p>
												<i class="adm-txt-regular color-blue-base txt-break-word">12.05.2019</i>
											</div>
											<p class="adm-text-big color-dark-base txt-bold txt-break-word">Последний статус</p>

											<ul class="tree__inner">
												<li>
													<a href="#" class="flex-parent flex-parent--center-cross flex-parent--wrap py12  border-b border--gray-light">
														<div class="bg-red mx12" style="width: 10px; height: 13px;">
															<img src="" alt="">
														</div>
														<div class="col">
															<p class="adm-text-big color-dark-base txt-break-word">Передано в доставку по России</p>
															<i class="adm-txt-regular color-blue-base txt-break-word">12.10.2018 - 05:15</i>
														</div>
													</a>
												</li>
												<li>
													<a href="#" class="flex-parent flex-parent--center-cross flex-parent--wrap py12">
														<div class="bg-red mx12" style="width: 10px; height: 13px;">
															<img src="" alt="">
														</div>
														<div class="col">
															<p class="adm-text-big color-dark-base txt-break-word">Передано в доставку по России</p>
															<i class="adm-txt-regular color-blue-base txt-break-word">12.10.2018 - 05:15</i>
														</div>
													</a>
												</li>
											</ul>


											<a class="link block adm-btn-regular txt-underline my6" href="">
												<span>Показать историю обработки</span>
												<Icon type="md-arrow-dropdown" size="18"/>
												<!-- <Icon type="md-arrow-dropup" size="18"/> -->
											</a>
										</div>
									</a>
								</li>
								<li>
									<a href="#" class="flex-parent flex-parent--wrap tree__link border-t border-b border--gray-faint py12">
										<div class="bg-red ml18" style="width: 40px; height: 40px;">
											<img src="" alt="">
										</div>
										<div class="col mx18">
											<div class="flex-parent flex-parent--space-between-main">
												<p class="adm-txt-regular color-dark-base">Штраф</p>
												<i class="adm-txt-regular color-blue-base">12.05.2019</i>
											</div>	
											<p class="adm-text-big color-green">500 ₽</p>
										</div>
									</a>
								</li>

								<hr class="txt-hr my0">

								<li>
									<a href="#" class="flex-parent flex-parent--wrap tree__link border-t border-b border--gray-faint py12">
										<div class="bg-red ml18" style="width: 40px; height: 40px;">
											<img src="" alt="">
										</div>
										<div class="col mx18">
											<div class="flex-parent flex-parent--space-between-main">
												<p class="adm-txt-regular color-dark-base">Лицо в отношении которого ведется дело</p>
											</div>	
											<p class="adm-text-big color-dark-base txt-bold">Константиновский К. Н.</p>
											<small class="adm-text-small color-dark-base">12 мая 1984 г.р.</small>
										</div>
									</a>
								</li>
								<li>
									<a href="#" class="flex-parent flex-parent--wrap tree__link border-t border-b border--gray-faint py12">
										<div class="bg-red ml18" style="width: 40px; height: 40px;">
											<img src="" alt="">
										</div>
										<div class="col mx18">
											<div class="flex-parent flex-parent--space-between-main">
												<p class="adm-txt-regular color-dark-base">Паспорт</p>
											</div>	
											<p class="adm-text-big color-dark-base txt-bold">4567 875943</p>
											<small class="adm-text-small color-dark-base">Выдан 05.10.2007</small>
										</div>
									</a>
								</li>
								<li>
									<a href="#" class="flex-parent flex-parent--wrap tree__link border-t border-b border--gray-faint py12">
										<div class="bg-red ml18" style="width: 40px; height: 40px;">
											<img src="" alt="">
										</div>
										<div class="col mx18">
											<div class="flex-parent flex-parent--space-between-main">
												<p class="adm-txt-regular color-dark-base">Транспортное средство</p>
											</div>	
											<p class="adm-text-big color-dark-base txt-bold">К980КВ 98</p>
											<small class="adm-text-small color-dark-base">Хендай Соната</small>
										</div>
									</a>
								</li>
								<li>
									<a href="#" class="flex-parent flex-parent--wrap tree__link border-t border-b border--gray-faint py12">
										<div class="bg-red ml18" style="width: 40px; height: 40px;">
											<img src="" alt="">
										</div>
										<div class="col mx18">
											<div class="flex-parent flex-parent--space-between-main">
												<p class="adm-txt-regular color-dark-base">Постановление</p>
												<i class="adm-txt-regular color-blue-base">12.05.2019</i>
											</div>	
											<p class="adm-text-big color-green">500 ₽</p>
											<p class="adm-text-big color-red">500 ₽</p>
											<p class="adm-text-big color-dark-base txt-bold">1234343</p>
											<small class="adm-text-small color-dark-base">по статье 12.5 ч5</small>
											<a class="link block adm-btn-regular txt-underline my6" href="">
												<span>Показать историю обработки</span>
												<Icon type="md-arrow-dropdown" size="18"/>
												<!-- <Icon type="md-arrow-dropup" size="18"/> -->
											</a>
										</div>
									</a>
								</li>
							</ul>
						</Col>
						<Col :xs="24" :sm="16" :md="16" :lg="16">
							<p>some</p>
						</Col>
					</Row>
				</div>

			</Layout>
		</Layout>
	</div>
</template>

<style>

</style>

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
