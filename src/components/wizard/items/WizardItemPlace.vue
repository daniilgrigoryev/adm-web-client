<template>
	<div>
		<Form :label-width="180" label-position="right">
			<FormItem class="my12">
				<small class="adm-text-small color-gray-medium" slot="label">{{title}}</small>
				<Row :gutter="16" type="flex" align="middle">
					<Col :xs="24" :md="14" :lg="16">
					<Input v-model="fullAddress" disabled type="textarea" :autosize="{minRows: 2,maxRows: 5}"></Input>
					</Col>
					<Col :xs="24" :md="14" :lg="8">
					<a href="#" @click="showPlaceModal(true)" class="link color-blue-base adm-txt-regular txt-underline-on-hover block">Адресный справочник</a>
					</Col>
				</Row>
			</FormItem>
		</Form>
	
		<div v-if="data && placeModal.visible" class="modal dolz" style="position: absolute; background: black; color: white; z-index: 99; top: 0; left: 0; right: 0; bottom: 0;">
			<button type="button" @click="showPlaceModal(false)" style="width: 20px; height: 20px; background: white;"></button>
	
			<div>
				<div>
					<span>Страна</span>
	
					<span>Код</span>
					<input v-model="data.adr.countryCode" disabled="true" />
	
					<span>Название</span>
					<input v-model="data.adr.countryName" disabled="true" />
				</div>
	
				<div>
					<span>Регион</span>
	
					<Select v-model="data.adr.regionId" filterable clearable @on-change="changeRegion">
	                <Option class="wmax360 txt-break-word" v-for="item in regionsList" :value="item.regionId" :key="item.regionId">{{ item.value + ', ' + item.label }}</Option>
	              </Select>
				</div>
	
				<div>
					<span>Район</span>
	
					<Select v-model="data.adr.rayonId" filterable clearable :disabled="!isNotEmptyRegionId()" @on-change="changeRayon">
	                <Option class="wmax360 txt-break-word" v-for="item in rayonsList" :value="item.value" :key="item.value">{{ item.label }}</Option>
	              </Select>
				</div>
	
				<div>
					<span>Населенный пункт</span>
	
					<Select v-model="data.adr.cityId" filterable clearable :disabled="!isNotEmptyRegionId() || !isNotEmptyRayonId" @on-clear="changeCity" remote :remote-method="changeCity">
	                <Option class="wmax360 txt-break-word" v-for="item in citiesList" :value="item.value" :key="item.value">{{ item.label }}</Option>
	              </Select>
				</div>
	
				<div>
					<span>Дорога</span>
	
					<Select v-model="data.roadId" filterable clearable @on-query-change="changeRoad" @on-clear="changeRoad">
	                <Option class="wmax360 txt-break-word" v-for="item in roadsList" :value="item.value" :key="item.value">{{ item.label }}</Option>
	              </Select>
				</div>
	
				<div>
					<span>МГО</span>
	
					<input v-model="data.machta" @change="storeElementData" />
				</div>
	
				<div>
					<span>МГТ</span>
	
					<input v-model="data.mgt" @change="storeElementData" />
				</div>
	
				<div>
					<span>км, метр</span>
	
					<input v-model="data.km" @change="storeElementData" />
				</div>
	
				<div>
					<span>Место</span>
	
					<Select v-model="data.placeId" filterable clearable @on-query-change="changePlace" @on-clear="changePlace">
	                <Option class="wmax360 txt-break-word" v-for="item in placesList" :value="item.value" :key="item.value">{{ item.label }}</Option>
	              </Select>
				</div>
	
				<div>
					<span>Улица</span>
	
					<Select v-model="data.adr.streetId" filterable clearable :disabled="!isNotEmptyRegionId() || !isNotEmptyRayonId()" @on-clear="changeStreet" remote :remote-method="changeStreet">
	                <Option class="wmax360 txt-break-word" v-for="item in streetsList" :value="item.value" :key="item.value">{{ item.label }}</Option>
	              </Select>
				</div>
	
				<div>
					<span>Дом</span>
	
					<input v-model="data.adr.ndom" @change="storeElementData" />
				</div>
	
				<div>
					<span>Корпус</span>
	
					<input v-model="data.adr.nkorpus" @change="storeElementData" />
				</div>
	
				<div>
					<span>Строение</span>
	
					<input v-model="data.adr.nstroenie" @change="storeElementData" />
				</div>
	
				<div>
					<span>Почтовый индекс</span>
	
					<input v-model="data.adr.pindex" disabled="true" />
				</div>
	
				<div>
					<span>Дополнительные сведения</span>
	
					<input v-model="data.dopSved" @change="storeElementData" />
				</div>
	
				<div>
					<span>Широта</span>
	
					<input v-model="data.y" @change="storeElementData" />
				</div>
	
				<div>
					<span>Долгота</span>
	
					<input v-model="data.x" @change="storeElementData" />
				</div>
			</div>
	
			<div style="margin: 20px 0 20px 0;">
				<Checkbox v-model="data.placeTip1" @on-change="changePlaceTip('placeTip1')"></Checkbox>
	
				<Checkbox v-model="data.placeTip2" @on-change="changePlaceTip('placeTip2')"></Checkbox>
	
				<Checkbox v-model="data.placeTip3" @on-change="changePlaceTip('placeTip3')"></Checkbox>
	
				<Checkbox v-model="data.placeTip4" @on-change="changePlaceTip('placeTip4')"></Checkbox>
	
				<Checkbox v-model="data.placeTip5" @on-change="changePlaceTip('placeTip5')"></Checkbox>
	
				<Checkbox v-model="data.placeTip6" @on-change="changePlaceTip('placeTip6')"></Checkbox>
	
				<Checkbox v-model="data.placeTip7" @on-change="changePlaceTip('placeTip7')"></Checkbox>
	
				<Checkbox v-model="data.placeTip8" @on-change="changePlaceTip('placeTip8')"></Checkbox>
			</div>
	
			<div style="margin-top: 50px;" v-if="showDopAddress">
				<div>
					<span>Дорога</span>
	
					<Select v-model="data.dopRoadId" filterable clearable @on-query-change="changeDopRoad" @on-clear="changeDopRoad">
	                <Option class="wmax360 txt-break-word" v-for="item in dopRoadsList" :value="item.value" :key="item.value">{{ item.label }}</Option>
	              </Select>
				</div>
	
				<div>
					<span>МГО</span>
	
					<input v-model="data.dopMachta" @change="storeElementData" />
				</div>
	
				<div>
					<span>МГТ</span>
	
					<input v-model="data.dopMgt" @change="storeElementData" />
				</div>
	
				<div>
					<span>км, метр</span>
	
					<input v-model="data.dopKm" @change="storeElementData" />
				</div>
	
				<div>
					<span>Место</span>
	
					<!--<input v-model="data.dopPlaceId" @change="changeDopPlace" />-->
	
					<Select v-model="data.dopPlaceId" filterable clearable @on-query-change="changeDopPlace" @on-clear="changeDopPlace">
	                <Option class="wmax360 txt-break-word" v-for="item in dopPlacesList" :value="item.value" :key="item.value">{{ item.label }}</Option>
	              </Select>
				</div>
	
				<div>
					<span>Улица</span>
	
					<Select v-model="data.adrDop.streetId" filterable clearable :disabled="!isNotEmptyRegionId() || !isNotEmptyRayonId()" @on-clear="changeDopStreet" remote :remote-method="changeDopStreet">
	                <Option class="wmax360 txt-break-word" v-for="item in dopStreetsList" :value="item.value" :key="item.value">{{ item.label }}</Option>
	              </Select>
				</div>
	
				<div>
					<span>Дом</span>
	
					<input v-model="data.adrDop.ndom" @change="storeElementData" />
				</div>
	
				<div>
					<span>Корпус</span>
	
					<input v-model="data.adrDop.nkorpus" @change="storeElementData" />
				</div>
	
				<div>
					<span>Строение</span>
	
					<input v-model="data.adrDop.nstroenie" @change="storeElementData" />
				</div>
	
				<div>
					<span>Почтовый индекс</span>
	
					<input v-model="data.adr.pindex" disabled="true" />
				</div>
	
				<div>
					<span>Дополнительные сведения</span>
	
					<input v-model="data.dopDopSved" @change="storeElementData" />
				</div>
			</div>
	
			<button type="button" @click="save" style="width: 20px; height: 20px; background: red;"></button>
		</div>
	
	</div>
</template>

<script>
import * as funcUtils from "../../../assets/js/utils/funcUtils";
import * as formStack from '../../../assets/js/api/formStack';
import RequestApi from "../../../assets/js/api/requestApi";

export default {
	name: "WizardItemPlace",
	props: {
		info: Object,
		title: String
	},
	async created() {
		await this.initData();
	},
	data() {
		return {
			data: null,
			fullAddress: null,
			placeModal: {
				visible: false
			},
			regionsList: null,
			rayonsList: null,
			citiesList: null,
			streetsList: null,
			roadsList: null,
			placesList: null,
			dopStreetsList: null,
			dopRoadsList: null,
			dopPlacesList: null
		}
	},
	computed: {
		showDopAddress() {
			let res = false;
			if (this.data) {
				res = this.data.placeTip5 === true || this.data.placeTip6 === true || this.data.placeTip8 === true;
			}
			return res;
		}
	},
	methods: {
		async getData() {
			let eventResponse = await RequestApi.prepareData({
				method: 'getElementData',
				params: {
					eCID: this.info.eCID
				}
			});
			let data = JSON.parse(JSON.parse(eventResponse.response).data);
			return data;
		},
		async initData() {
			let data = await this.getData();
			if (this.placeModal.visible) {
				data['placeTip1'] = data['placeTip1'] == 1 ? true : false;
				data['placeTip2'] = data['placeTip2'] == 1 ? true : false;
				data['placeTip3'] = data['placeTip3'] == 1 ? true : false;
				data['placeTip4'] = data['placeTip4'] == 1 ? true : false;
				data['placeTip5'] = data['placeTip5'] == 1 ? true : false;
				data['placeTip6'] = data['placeTip6'] == 1 ? true : false;
				data['placeTip7'] = data['placeTip7'] == 1 ? true : false;
				data['placeTip8'] = data['placeTip8'] == 1 ? true : false;

				this.data = data;

				await this.fillRegionList();
				await this.fillRayonList();
				if (funcUtils.isNotEmpty(this.data.adr.cityId)) {
					await this.fillCityList();
				}
				await this.fillRoadList();
				await this.fillPlaceList();
				if (funcUtils.isNotEmpty(this.data.adr.streetId)) {
					await this.fillStreetList();
				}

				if (this.showDopAddress) {
					await this.fillDopRoadList();
					await this.fillDopPlaceList();
					if (funcUtils.isNotEmpty(this.data.adrDop.streetId)) {
						await this.fillDopStreetList();
					}
				}
			}

			this.fullAddress = data.placeFull;
		},

		async changeRegion() {
			this.rayonsList = null;
			this.citiesList = null;
			this.streetsList = null;
			this.data.adr.rayonId = null;
			this.data.adr.cityId = null;
			this.data.adr.streetId = null;

			await this.fillRayonList();

			this.storeElementData();
		},
		changeRayon() {
			this.citiesList = null;
			this.streetsList = null;
			this.data.adr.cityId = null;
			this.data.adr.streetId = null;

			this.storeElementData();
		},
		async changeCity(query) {
			let limit;
			if (this.isNotEmptyRayonId()) {
				limit = 1;
			} else if (this.isNotEmptyRegionId()) {
				limit = 2;
			}
			if ((funcUtils.isEmpty(query) || query.length === 0)) {
				this.citiesList = null;
				this.streetsList = null;
				this.data.adr.cityId = null;
				this.data.adr.streetId = null;
			} else if (query.length > limit) {
				await this.fillCityList(query);
			}

			this.storeElementData();
		},
		async changeStreet(query) {
			let limit;
			if (this.isNotEmptyCityId()) {
				limit = 1;
			} else if (this.isNotEmptyRayonId()) {
				limit = 2;
			} else if (this.isNotEmptyRegionId()) {
				limit = 3;
			}
			if ((funcUtils.isEmpty(query) || query.length === 0)) {
				this.streetsList = null;
				this.data.adr.streetId = null;
			} else if (query.length > limit) {
				await this.fillStreetList(query);
			}

			this.storeElementData();
		},
		changePlace(query) {
			if ((funcUtils.isEmpty(query) || query.length === 0)) {
				this.data.placeId = null;
			}
			this.storeElementData();
		},
		changeRoad(query) {
			if ((funcUtils.isEmpty(query) || query.length === 0)) {
				this.data.roadId = null;
			}
			this.storeElementData();
		},

		async changeDopStreet(query) {
			let limit;
			if (this.isNotEmptyCityId()) {
				limit = 1;
			} else if (this.isNotEmptyRayonId()) {
				limit = 2;
			} else if (this.isNotEmptyRegionId()) {
				limit = 3;
			}
			if ((funcUtils.isEmpty(query) || query.length === 0)) {
				this.dopStreetsList = null;
				this.data.adrDop.streetId = null;
			} else if (query.length > limit) {
				await this.fillDopStreetList(query);
			}

			this.storeElementData();
		},
		changeDopPlace(query) {
			if ((funcUtils.isEmpty(query) || query.length === 0)) {
				this.data.dopPlaceId = null;
			}
			this.storeElementData();
		},
		changeDopRoad(query) {
			if ((funcUtils.isEmpty(query) || query.length === 0)) {
				this.data.dopRoadId = null;
			}
			this.storeElementData();
		},
		async changePlaceTip(placeTip) {
			let val = this.data[placeTip];
			if (placeTip === 'placeTip5' || placeTip === 'placeTip6' || placeTip === 'placeTip8') {
				this.data['placeTip1'] = false;
				this.data['placeTip2'] = false;
				this.data['placeTip3'] = false;
				this.data['placeTip4'] = false;
				this.data['placeTip7'] = false;
				this.clearDopAddress();

				if (val) {
					this.data['placeTip5'] = placeTip === 'placeTip5' ? val : false;
					this.data['placeTip6'] = placeTip === 'placeTip6' ? val : false;
					this.data['placeTip8'] = placeTip === 'placeTip8' ? val : false;

					if (funcUtils.isEmpty(this.dopStreetsList) && funcUtils.isEmpty(this.dopPlacesList)) {
						await this.fillDopRoadList();
						await this.fillDopPlaceList();
					}
				}
			} else if (placeTip !== 'placeTip5' && placeTip !== 'placeTip6' && placeTip !== 'placeTip8' && this.showDopAddress) {
				this.data['placeTip5'] = false;
				this.data['placeTip6'] = false;
				this.data['placeTip8'] = false;
				this.clearDopAddress();
			}

			this.storeElementData();
		},
		clearDopAddress() {
			this.data.adrDop.streetId = null;
			this.data.dopRoadId = null;
			this.data.dopPlaceId = null;
			this.data.dopMachta = null;
			this.data.dopMgt = null;
			this.data.dopKm = null;
			this.data.adrDop.ndom = null;
			this.data.adrDop.nkorpus = null;
			this.data.adrDop.nstroenie = null;
			this.data.dopDopSved = null;
		},

		async fillRegionList() {
			let eventResponse = await RequestApi.prepareData({
				method: 'invokeElementMethod',
				params: {
					eCID: this.info.eCID,
					methodName: 'getRegionDict',
					data: null
				}
			});
			let regionsList = [];
			let regionsDict = JSON.parse(JSON.parse(eventResponse.response).data);
			for (let i = 0; i < regionsDict.length; i++) {
				let region = regionsDict[i];
				regionsList.push({
					label: region.REGION_NAME,
					value: region.RESP_KOD,
					regionId: region.REGION_ID,
				});
			}
			this.regionsList = regionsList;
		},
		async fillRayonList() {
			if (this.isNotEmptyRegionId()) {
				let eventResponse = await RequestApi.prepareData({
					method: 'invokeElementMethod',
					params: {
						eCID: this.info.eCID,
						methodName: 'getRayonDict',
						data: JSON.stringify({
							regionId: this.data.adr.regionId
						})
					}
				});
				let rayonsList = [];
				let rayonsDict = JSON.parse(JSON.parse(eventResponse.response).data);
				for (let i = 0; i < rayonsDict.length; i++) {
					let rayon = rayonsDict[i];
					rayonsList.push({
						label: rayon.name,
						value: rayon.id
					});
				}
				this.rayonsList = rayonsList;
			}
		},
		async fillCityList(query = '') {
			let eventResponse;
			if (this.isNotEmptyRayonId()) {
				eventResponse = await RequestApi.prepareData({
					method: 'invokeElementMethod',
					params: {
						eCID: this.info.eCID,
						methodName: 'getCitiesDictByRayon',
						data: JSON.stringify({
							rayonId: this.data.adr.rayonId,
							substr: query
						})
					},
					withSpinner: false
				});
			} else if (this.isNotEmptyRegionId()) {
				eventResponse = await RequestApi.prepareData({
					method: 'invokeElementMethod',
					params: {
						eCID: this.info.eCID,
						methodName: 'getStreetsDictByRegion',
						data: JSON.stringify({
							regionId: this.data.adr.regionId,
							substr: query
						})
					},
					withSpinner: false
				});
			}

			if (eventResponse) {
				let citiesList = [];
				let citiesDict = JSON.parse(JSON.parse(eventResponse.response).data);
				for (let i = 0; i < citiesDict.length; i++) {
					let citi = citiesDict[i];
					if (funcUtils.isNotEmpty(this.data.adr.cityId) && citi.id != this.data.adr.cityId) {
						continue;
					}
					citiesList.push({
						label: citi.name,
						value: citi.id
					});
				}
				this.citiesList = citiesList;
			}
		},
		async fillRoadList() {
			let eventResponse = await RequestApi.prepareData({
				method: 'invokeElementMethod',
				params: {
					eCID: this.info.eCID,
					methodName: 'getRoads',
					data: null
				}
			});
			let roadsList = [];
			let roadsDict = JSON.parse(JSON.parse(eventResponse.response).data);
			for (let i = 0; i < roadsDict.length; i++) {
				let road = roadsDict[i];
				roadsList.push({
					label: road.NAME,
					value: road.ID
				});
			}
			this.roadsList = roadsList;
		},
		async fillPlaceList() {
			let eventResponse = await RequestApi.prepareData({
				method: 'invokeElementMethod',
				params: {
					eCID: this.info.eCID,
					methodName: 'getPlaces',
					data: null
				}
			});
			let placesList = [];
			let placesDict = JSON.parse(JSON.parse(eventResponse.response).data);
			for (let i = 0; i < placesDict.length; i++) {
				let place = placesDict[i];
				let label;
				if (funcUtils.isNotEmpty(place.PLACE_KOD)) {
					label = place.PLACE_KOD + ', ' + place.PLACE_NAME;
				} else {
					label = place.PLACE_NAME;
				}
				placesList.push({
					label: label,
					value: place.PLACE_ID
				});
			}
			this.placesList = placesList;
		},
		async fillStreetList(query = '') {
			let eventResponse;
			if (this.isNotEmptyCityId()) {
				eventResponse = await RequestApi.prepareData({
					method: 'invokeElementMethod',
					params: {
						eCID: this.info.eCID,
						methodName: 'getStreetsDictByCity',
						data: JSON.stringify({
							cityId: this.data.adr.cityId,
							substr: query
						})
					},
					withSpinner: false
				});
			} else if (this.isNotEmptyRayonId()) {
				eventResponse = await RequestApi.prepareData({
					method: 'invokeElementMethod',
					params: {
						eCID: this.info.eCID,
						methodName: 'getStreetsDictByRayon',
						data: JSON.stringify({
							rayonId: this.data.adr.rayonId,
							substr: query
						})
					},
					withSpinner: false
				});
			} else if (this.isNotEmptyRegionId()) {
				eventResponse = await RequestApi.prepareData({
					method: 'invokeElementMethod',
					params: {
						eCID: this.info.eCID,
						methodName: 'getStreetsDictByRegion',
						data: JSON.stringify({
							regionId: this.data.adr.regionId,
							substr: query
						})
					},
					withSpinner: false
				});
			}

			if (eventResponse) {
				let streetsList = [];
				let streetsDict = JSON.parse(JSON.parse(eventResponse.response).data);
				for (let i = 0; i < streetsDict.length; i++) {
					let street = streetsDict[i];
					if (funcUtils.isNotEmpty(this.data.adr.streetId) && street.id != this.data.adr.streetId) {
						continue;
					}
					streetsList.push({
						label: street.name,
						value: street.id
					});
				}
				this.streetsList = streetsList;
			}
		},

		async fillDopRoadList() {
			let eventResponse = await RequestApi.prepareData({
				method: 'invokeElementMethod',
				params: {
					eCID: this.info.eCID,
					methodName: 'getRoads',
					data: null
				}
			});
			let roadsList = [];
			let roadsDict = JSON.parse(JSON.parse(eventResponse.response).data);
			for (let i = 0; i < roadsDict.length; i++) {
				let road = roadsDict[i];
				roadsList.push({
					label: road.NAME,
					value: road.ID
				});
			}
			this.dopRoadsList = roadsList;
		},
		async fillDopPlaceList() {
			let eventResponse = await RequestApi.prepareData({
				method: 'invokeElementMethod',
				params: {
					eCID: this.info.eCID,
					methodName: 'getPlaces',
					data: null
				}
			});
			let placesList = [];
			let placesDict = JSON.parse(JSON.parse(eventResponse.response).data);
			for (let i = 0; i < placesDict.length; i++) {
				let place = placesDict[i];
				placesList.push({
					label: place.PLACE_NAME,
					value: place.PLACE_ID
				});
			}
			this.dopPlacesList = placesList;
		},
		async fillDopStreetList(query = '') {
			let eventResponse;
			if (this.isNotEmptyCityId()) {
				eventResponse = await RequestApi.prepareData({
					method: 'invokeElementMethod',
					params: {
						eCID: this.info.eCID,
						methodName: 'getStreetsDictByCity',
						data: JSON.stringify({
							cityId: this.data.adr.cityId,
							substr: query
						})
					},
					withSpinner: false
				});
			} else if (this.isNotEmptyRayonId()) {
				eventResponse = await RequestApi.prepareData({
					method: 'invokeElementMethod',
					params: {
						eCID: this.info.eCID,
						methodName: 'getStreetsDictByRayon',
						data: JSON.stringify({
							rayonId: this.data.adr.rayonId,
							substr: query
						})
					},
					withSpinner: false
				});
			}

			if (eventResponse) {
				let streetsList = [];
				let streetsDict = JSON.parse(JSON.parse(eventResponse.response).data);
				for (let i = 0; i < streetsDict.length; i++) {
					let street = streetsDict[i];
					if (funcUtils.isNotEmpty(this.data.adrDop.streetId) && street.id != this.data.adrDop.streetId) {
						continue;
					}
					streetsList.push({
						label: street.name,
						value: street.id
					});
				}
				this.dopStreetsList = streetsList;
			}
		},

		async showPlaceModal(visible) {
			this.placeModal.visible = visible;

			let methodName;
			if (visible) {
				methodName = 'start';
				this.initData();
			} else {
				methodName = 'cancel';
				this.clearComponent();
			}
			let eventResponse = await RequestApi.prepareData({
				method: 'invokeElementMethod',
				params: {
					eCID: this.info.eCID,
					methodName: methodName,
					data: null
				}
			});
		},
		async save() {
			let eventResponse = await RequestApi.prepareData({
				method: 'invokeElementMethod',
				params: {
					eCID: this.info.eCID,
					methodName: 'save',
					data: null
				}
			});
			let response = JSON.parse(JSON.parse(eventResponse.response).data);
			if (response) {
				this.placeModal.visible = false;
				this.clearComponent();
				this.$emit('updateComponents', response);
			}
		},
		clearComponent() {
			this.data = null;
			this.regionsList = null;
			this.rayonsList = null;
			this.citiesList = null;
			this.roadsList = null;
			this.placesList = null;
			this.dopStreetsList = null;
			this.dopRoadsList = null;
			this.dopPlacesList = null;
		},
		isNotEmptyRegionId() {
			return funcUtils.isNotEmpty(this.data.adr.regionId);
		},
		isNotEmptyCityId() {
			return funcUtils.isNotEmpty(this.data.adr.cityId);
		},
		isNotEmptyRayonId() {
			return funcUtils.isNotEmpty(this.data.adr.rayonId);
		},
		storeElementData() {
			let copyData = JSON.parse(JSON.stringify(this.data));
			copyData['placeTip1'] = copyData['placeTip1'] ? 1 : null;
			copyData['placeTip2'] = copyData['placeTip2'] ? 1 : null;
			copyData['placeTip3'] = copyData['placeTip3'] ? 1 : null;
			copyData['placeTip4'] = copyData['placeTip4'] ? 1 : null;
			copyData['placeTip5'] = copyData['placeTip5'] ? 1 : null;
			copyData['placeTip6'] = copyData['placeTip6'] ? 1 : null;
			copyData['placeTip7'] = copyData['placeTip7'] ? 1 : null;
			copyData['placeTip8'] = copyData['placeTip8'] ? 1 : null;

			this.$emit('storeElementData', {
				eCID: this.info.eCID,
				data: copyData
			});
		},
	}
}
</script>

<style scoped>

</style>
