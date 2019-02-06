<template>
	<div>
		<button type="button" @click="getPrev">Назад</button>
	
		<div class="wmax1280 mx-auto">
			<div class="flex-parent flex-parent--center-cross flex-parent--space-between-main">
				<div class="flex-parent flex-parent--center-cross mr64">
					<div class="icon-main mx12 my6">
						<img src='../../assets/images/burger.svg'>
					</div>
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
			</div>
		</div>
		<div class="bg-white">
			<div class="wmax1280 mx-auto">
				<Table ref="selection" :columns="columnsOption" :data="rowsData" size="small" height="400"></Table>
			</div>
		</div>
	</div>
</template>


<style lang="scss">

</style>


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
					width: 50,
					render: (h, params) => {
						return h('Icon', {
							props: {
								size: 20,
								type: 'ios-eye'
							}
						});
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
			rowsData: [{
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
	}
}
</script>
