<template>
	<div class="layout">
		<button type="button" @click="getPrev">Назад</button>
		<Layout class="layout--inner h-full wmax1280 mx-auto">
           <Sider class="sider" ref="side1" hide-trigger width="350" collapsible :collapsed-width="0" v-model="isCollapsed">
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
							<a href='#Links' class='link color-blue-base adm-btn-small txt-underline-on-hover'>Выйти из профиля</a>
						</div>
					</div>
			   </div>
            </Sider>
			<Layout class="layout--inner">
				<div class="header">
					<Row type="flex" align="middle" justify="space-between">
						<Col>
							<div class="flex-parent flex-parent--center-cross mr64">
								<!-- <Icon @click.native="collapsedSider" type="md-menu" size="24" class="mx12 cursor-pointer"></Icon> -->
								<Button type="text" style="outline: 0!important;" class="icon-main px0 py0 mx12 my6 cursor-pointer" @click.native="collapsedSider">
									<img src='../../assets/images/burger.svg' class="wmax-none">
								</Button>
								<div>
									<h1 class="adm-h2 color-gray-medium txt-uppercase">Исод Мади</h1>
								</div>
							</div>
						</Col>
						<Col>
							<Menu mode="horizontal" active-name="1" class="header-menu">
								<div class="grid">
									<MenuItem name="1" class="header-menu__item">Административный учет</MenuItem>
									<MenuItem name="2" class="header-menu__item">Возбудить дело</MenuItem>
									<MenuItem name="3" class="header-menu__item">Учет спецпродукции</MenuItem>
									<MenuItem name="4" class="header-menu__item">Состояние выгрузки</MenuItem>
									<MenuItem name="5" class="header-menu__item">Обработка документов</MenuItem>
									<MenuItem name="6" class="header-menu__item">Почтовые реестры</MenuItem>
								</div>
							</Menu>
						</Col>
					</Row>
				</div>
				<div class="bg-gray-faint">
					<div class="wmax1280 mx-auto px36 py18">
						<Form inline label-position="top">
							<Row :gutter="8">
								<Col :xs="24" :sm="24" :md="24" :lg="12">
									<Row type="flex" :gutter="8" align="bottom">
										<Col :xs="24" :sm="24" :md="24" :lg="8">
											<FormItem class="w-full" label="">
												<Input placeholder="Номер дела"></Input>
											</FormItem>
										</Col>
										<Col :xs="24" :sm="24" :md="24" :lg="8">
											<FormItem class="w-full">
												<div slot="label">Дата заведения дела</div>
												<Select placeholder="Выбрать">
													<Option value="1">За текущий год</Option>
													<Option value="1">За периуд</Option>
												</Select>
											</FormItem>
										</Col>
										<Col :xs="24" :sm="24" :md="24" :lg="8">
											<FormItem class="w-full">
												<Input placeholder="ГРЗ автомобил"></Input>
											</FormItem>
										</Col>
									</Row>
								</Col>
								<Col :xs="24" :sm="24" :md="24" :lg="12">
									<FormItem class="w-full">
										<div slot="label">Документ прикрепленный к делу</div>
										<Row type="flex" :gutter="8">
											<Col :lg="12">
												<Select placeholder="Выбрать">
													<Option value="1">Не выбранно</Option>
													<Option value="1">Водительское удостоверение</Option>
													<Option value="1">Временное разрешение</Option>
													<Option value="1">Опред. о возбуждении дела</Option>
													<Option value="1">Постановление</Option>
													<Option value="1">Протокол</Option>
													<Option value="1">Постановление квитанция</Option>
													<Option value="1">Прекращено</Option>
												</Select>
											</Col>
											<Col :lg="12">
												<Input placeholder="Номер документа"></Input>
											</Col>
										</Row>
									</FormItem>
								</Col>
							</Row>
							<Row :gutter="8">
								<Col :xs="24" :sm="24" :md="24" :lg="12">
									<FormItem class="w-full">
										<div slot="label">Физическое лицо - ЛВОК</div>
										<Row type="flex">
											<Col :xs="24" :sm="24" :md="24" :lg="8">
												<Input placeholder="Фамилия"></Input>
											</Col>
											<Col :xs="24" :sm="24" :md="24" :lg="1">
											<div class="align-center">/</div>
											</Col>
											<Col :xs="24" :sm="24" :md="24" :lg="6">
												<Input placeholder="Имя"></Input>
											</Col>
											<Col :xs="24" :sm="24" :md="24" :lg="1">
												<div class="align-center">|</div>
											</Col>
											<Col :xs="24" :sm="24" :md="24" :lg="8">
												<Input placeholder="Отчество"></Input>
											</Col>
										</Row>
									</FormItem>
								</Col>
								<Col :xs="24" :sm="24" :md="24" :lg="12">
									<FormItem class="w-full">
										<div slot="label">Стадия дела</div>
										<Row type="flex" :gutter="8">
											<Col :lg="12">
												<Select placeholder="Выбрать">
													<Option value="1">Возбужденно</Option>
													<Option value="1">Рассмотрение</Option>
													<Option value="1">Обжалование</Option>
													<Option value="1">Пересмотр</Option>
													<Option value="1">Исполнение</Option>
													<Option value="1">Исполненно</Option>
													<Option value="1">Прекращено</Option>
												</Select>
											</Col>
											<Col :lg="12">
												<Input placeholder="По статье"></Input>
											</Col>
										</Row>
									</FormItem>
								</Col>
							</Row>
							<Row :gutter="8">
								<Col :xs="24" :sm="24" :md="24" :lg="12">
									<FormItem class="w-full">
										<div slot="label">Юридическое лицо - ЛВОК</div>
										<Row type="flex">
											<Col :lg="12">
												<Input placeholder="Название организации"></Input>
											</Col>
										</Row>
									</FormItem>
								</Col>
								<Col :xs="24" :sm="24" :md="24" :lg="12">
									<FormItem class="w-full">
										<div slot="label">Номер УПИ</div>
										<Row type="flex" :gutter="8">
											<Col :lg="12">
												<Input placeholder="Номер УПИ"></Input>
											</Col>
										</Row>
									</FormItem>
								</Col>
							</Row>
						</Form>
						<div class="flex-parent flex-parent--end-main">
							<a href='#Links' class='link color-blue-base adm-btn-small txt-underline-on-hover'>Больше параметров</a>
						</div>
					</div>
				</div>
				<div class="bg-white">
					<div class="wmax1280 mx-auto">
						<Table ref="selection" :columns="columnsOption" :data="rowsData" size="large" :stripe="false" :border="false" height="400"></Table>
					</div>
				</div>
			</Layout>
		</Layout>
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
			columnsOption: [{
					title: ' ',
					key: 'status',
					width: 140,
					render: (h, params) => {
						const row = params.row;
						const color = row.status === 1 ? 'primary' : row.status === 2 ? 'success' : 'error';
						const text = row.status === 1 ? 'Working' : row.status === 2 ? 'Success' : 'Ошибка';

						return h('Tag', {
							props: {
								type: 'dot',
								color: color
							}
						}, text);
					}
				},
				{
					title: 'Номер дела',
					key: 'dealNum',
					minWidth: 120,
					ellipsis: true,
					tooltip: true,
					renderHeader: (h, params) => {
						return h('h4', params.column.title)
					}
				},
				{
					title: 'Дело по статье',
					key: 'dealArticle',
					minWidth: 120,
					ellipsis: true,
					tooltip: true,
					renderHeader: (h, params) => {
						return h('h4', params.column.title)
					}
				},
				{
					title: 'ЛВОК',
					key: 'lvok',
					minWidth: 120,
					ellipsis: true,
					tooltip: true,
					renderHeader: (h, params) => {
						return h('h4', {
							class: 'adm-h4',
						}, params.column.title)
					}
				},
				{
					title: 'ГРЗ автомобиля',
					key: 'grz',
					minWidth: 120,
					ellipsis: true,
					tooltip: true,
					renderHeader: (h, params) => {
						return h('h4', params.column.title)
					}
				},
				{
					title: 'Документы по делу',
					key: 'docsDeal',
					minWidth: 120,
					ellipsis: true,
					tooltip: true,
					renderHeader: (h, params) => {
						return h('h4', params.column.title)
					}
				},
			],
			rowsData: [
			  {
					dealNum: '8765',
					dealArticle: '12.3 ч5',
					lvok: 'Иванов Иван Иванович',
					grz: 'E459TС 50',
					docsDeal: '86975860098'
				},
				{
					dealNum: '8765',
					dealArticle: '12.3 ч5',
					lvok: 'Иванов Иван Иванович',
					grz: 'E459TС 50',
					docsDeal: '86975860098'
				},
				{
					dealNum: '8765',
					dealArticle: '12.3 ч5',
					lvok: 'Иванов Иван Иванович',
					grz: 'E459TС 50',
					docsDeal: '86975860098'
				},
				{
					dealNum: '8765',
					dealArticle: '12.3 ч5',
					lvok: 'Иванов Иван Иванович',
					grz: 'E459TС 50',
					docsDeal: '86975860098'
				},
				{
					dealNum: '8765',
					dealArticle: '12.3 ч5',
					lvok: 'Иванов Иван Иванович',
					grz: 'E459TС 50',
					docsDeal: '86975860098'
				},
				{
					dealNum: '8765',
					dealArticle: '12.3 ч5',
					lvok: 'Иванов Иван Иванович',
					grz: 'E459TС 50',
					docsDeal: '86975860098'
				},
				{
					dealNum: '8765',
					dealArticle: '12.3 ч5',
					lvok: 'Иванов Иван Иванович',
					grz: 'E459TС 50',
					docsDeal: '86975860098'
				},
				{
					dealNum: '8765',
					dealArticle: '12.3 ч5',
					lvok: 'Иванов Иван Иванович',
					grz: 'E459TС 50',
					docsDeal: '86975860098'
				},
				{
					dealNum: '8765',
					dealArticle: '12.3 ч5',
					lvok: 'Иванов Иван Иванович',
					grz: 'E459TС 50',
					docsDeal: '86975860098'
				},
				{
					dealNum: '8765',
					dealArticle: '12.3 ч5',
					lvok: 'Иванов Иван Иванович',
					grz: 'E459TС 50',
					docsDeal: '86975860098'
				},
				{
					dealNum: '8765',
					dealArticle: '12.3 ч5',
					lvok: 'Иванов Иван Иванович',
					grz: 'E459TС 50',
					docsDeal: '86975860098'
				},
				{
					dealNum: '8765',
					dealArticle: '12.3 ч5',
					lvok: 'Иванов Иван Иванович',
					grz: 'E459TС 50',
					docsDeal: '86975860098'
				},
				{
					dealNum: '8765',
					dealArticle: '12.3 ч5',
					lvok: 'Иванов Иван Иванович',
					grz: 'E459TС 50',
					docsDeal: '86975860098'
				},
				{
					dealNum: '8765',
					dealArticle: '12.3 ч5',
					lvok: 'Иванов Иван Иванович',
					grz: 'E459TС 50',
					docsDeal: '86975860098'
				},
				{
					dealNum: '8765',
					dealArticle: '12.3 ч5',
					lvok: 'Иванов Иван Иванович',
					grz: 'E459TС 50',
					docsDeal: '86975860098'
				},
				{
					dealNum: '8765',
					dealArticle: '12.3 ч5',
					lvok: 'Иванов Иван Иванович',
					grz: 'E459TС 50',
					docsDeal: '86975860098'
				}
			],
			isCollapsed: false
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
