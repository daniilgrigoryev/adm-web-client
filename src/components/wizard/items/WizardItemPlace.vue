<template>
	<div>
		<div class="adm-form__item">
			<small class="adm-form__label">{{title}}</small>
			<div class="adm-form__item_content">
				<Row :gutter="16" type="flex" align="middle">
					<Col :xs="22" :md="22" :lg="22">
						<Input class="adm-input adm-input--regular" v-model="fullAddress" disabled></Input>
					</Col>
					<Col :xs="2" :md="2" :lg="2">
						<Button @click="showPlaceModal(true)" type="text" style="outline: 0!important; box-shadow: none; padding: 0;" class=" bg-transparent-on-hover color-blue-on-hover color-gray-light transition color-blue-on-focus">
							<Icon type="ios-bookmarks-outline" class=" " title="адресный справочник" :size="30" />
						</Button>
					</Col>
				</Row>
			</div>
		</div>
		<div v-if="data && placeModal.visible" class="address-modal" @click="outside">
			<div class="adm-form" ref="bodyModal">
				<Button type="text" ref="closeButton"  @click="showPlaceModal(false)" class="close-modal">
					<Icon type="md-close" size="40" class="color-blue-base cursor-pointer"/>
				</Button>
				<div class="adm-form__container">
					<h2 class="adm-form__headding">{{title}}</h2>
					<div class="adm-form__content">
						<div class="adm-form__item">
							<small class="adm-form__label">Регион</small>
							<div class="adm-form__item_content">
							<Row :gutter="16" type="flex" align="middle">
								<Col :xs="24" :md="24" :lg="24">
								<Select class="adm-input adm-input--regular wmin180" placeholder="Ввод региона"  v-model="data.adr.regionId" filterable clearable @on-change="storeElementData">
									<Option class="" v-for="item in regionsList" :value="item.regionId" :key="item.regionId">{{item.label }}</Option>
								</Select>
								</Col>
							</Row>
							</div>
						</div>
						<div class="adm-form__item">
							<small class="adm-form__label">Район</small>
							<div class="adm-form__item_content">
							<Row :gutter="16" type="flex" align="middle">
								<Col :xs="24" :md="24" :lg="24">
								<Select class="adm-input adm-input--regular wmin180" ref="rayon" placeholder="Ввод района"  v-model="data.adr.rayonId" filterable clearable :disabled="!isNotEmptyRegionId()" @on-change="changeRayon">
									<Option class="" v-for="item in rayonsList" :value="item.value" :key="item.value">{{ item.label }}</Option>
								</Select>
								</Col>
							</Row>
							</div>
						</div>
						<div class="adm-form__item">
							<small class="adm-form__label">Населенный пункт</small>
							<div class="adm-form__item_content">
							<Row :gutter="16" type="flex" align="middle">
								<Col :xs="24" :md="24" :lg="24">
								<Select class="adm-input adm-input--regular wmin180" ref="city" placeholder="Ввод населенного пункта"  v-model="data.adr.cityId" filterable clearable :disabled="!isNotEmptyRegionId() && !isNotEmptyRayonId()" @on-query-change="changeCity" @on-clear="changeCity">
									<Option class="" v-for="item in citiesList" :value="item.value" :key="item.value">{{ item.label }}</Option>
								</Select>
								</Col>
							</Row>
							</div>
						</div>
						<div class="adm-form__item">
							<small class="adm-form__label">Улица</small>
							<div class="adm-form__item_content">
							<Row :gutter="16" type="flex" align="middle">
								<Col :xs="24" :md="24" :lg="24">
								<Select class="adm-input adm-input--regular wmin180" ref="street" placeholder="Ввод улицы"  v-model="data.adr.streetId" filterable clearable :disabled="!isNotEmptyRegionId() && !isNotEmptyRayonId() && !isNotEmptyCityId()" @on-query-change="changeStreet" @on-clear="changeStreet">
									<Option class="" v-for="item in streetsList" :value="item.value" :key="item.value">{{ item.label }}</Option>
								</Select>
								</Col>
							</Row>
							</div>
						</div>
						<div class="flex-parent flex-parent--center-cross flex-parent--space-between-main">
              <div class="adm-form__item">
                <small class="adm-form__label">Дом</small>
                <div class="adm-form__item_content">
                  <Row :gutter="16" type="flex" align="middle">
                    <Col :xs="24" :md="24" :lg="24">
                      <Input class="adm-input adm-input--regular wmin60 wmax60" v-model="data.adr.ndom" @on-input-change="storeElementData" :maxlength="5"></Input>
                    </Col>
                  </Row>
                </div>
              </div>
              <div class="adm-form__item">
                <small class="adm-form__label wmax60 wmin60">Корпус</small>
                <div class="adm-form__item_content">
                  <Row :gutter="16" type="flex" align="middle">
                    <Col :xs="24" :md="24" :lg="24">
                      <Input class="adm-input adm-input--regular wmin60 wmax60" v-model="data.adr.nkorpus" @on-input-change="storeElementData" :maxlength="5"></Input>
                    </Col>
                  </Row>
                </div>
              </div>
              <div class="adm-form__item">
                <small class="adm-form__label  wmax60 wmin60">Строение</small>
                <div class="adm-form__item_content">
                  <Row :gutter="16" type="flex" align="middle">
                    <Col :xs="24" :md="24" :lg="24">
                      <Input class="adm-input adm-input--regular wmin60 wmax60" v-model="data.adr.nstroenie" @on-input-change="storeElementData" :maxlength="5"></Input>
                    </Col>
                  </Row>
                </div>
              </div>
							<div class="adm-form__item">
							<small class="adm-form__label  wmax60 wmin60">Индекс</small>
							<div class="adm-form__item_content">
								<Row :gutter="16" type="flex" align="middle">
								<Col :xs="24" :md="24" :lg="24">
									<Input class="adm-input adm-input--regular wmax240" v-model="data.adr.pindex" disabled ></Input>
								</Col>
								</Row>
							</div>
							</div>
						</div>
						<div class="adm-form__item ">
							<small class="adm-form__label">Место</small>
							<div class="adm-form__item_content">
							<Row :gutter="16" type="flex" align="middle">
								<Col :xs="24" :md="24" :lg="24">
								<Select class="adm-input adm-input--regular wmin180" placeholder="Ввод места"  v-model="data.placeId" filterable clearable @on-query-change="changePlace" @on-clear="changePlace">
									<Option class="" v-for="item in placesList" :value="item.value" :key="item.value">{{ item.label }}</Option>
								</Select>
								</Col>
							</Row>
							</div>
						</div>
						<div class="flex-parent flex-parent--center-cross">
              <div class="adm-form__item">
                <small class="adm-form__label">км, метр</small>
                <div class="adm-form__item_content">
                  <Row :gutter="16" type="flex" align="middle">
                    <Col :xs="24" :md="24" :lg="24">
                      <masked-input inputClass="adm-input adm-input--regular" v-model="data.km" :maskProps="{casing: 'upper', regex: '[0-9]+', placeholder: ''}" @onInputChange="storeElementData" ></masked-input>
                    </Col>
                  </Row>
                </div>
              </div>
              <div class="adm-form__item">
                <small class="adm-form__label wmin60">МГО</small>
                <div class="adm-form__item_content">
                  <Row :gutter="16" type="flex" align="middle">
                    <Col :xs="24" :md="24" :lg="24">
                      <Input class="adm-input adm-input--regular" v-model="data.machta" @on-input-change="storeElementData" ></Input>
                    </Col>
                  </Row>
                </div>
              </div>
              <div class="adm-form__item">
                <small class="adm-form__label wmin60">МГТ</small>
                <div class="adm-form__item_content">
                  <Row :gutter="16" type="flex" align="middle">
                    <Col :xs="24" :md="24" :lg="24">
                      <Input class="adm-input adm-input--regular" v-model="data.mgt" @on-input-change="storeElementData" ></Input>
                    </Col>
                  </Row>
                </div>
              </div>
            </div>
            <div class="adm-form__item">
              <small class="adm-form__label">Доп. сведения</small>
              <div class="adm-form__item_content">
                <Row :gutter="16" type="flex" align="middle">
                  <Col :xs="24" :md="24" :lg="24">
                    <Input class="adm-input adm-input--regular" v-model="data.dopSved" @on-input-change="storeElementData"></Input>
                  </Col>
                </Row>
              </div>
            </div>
            <Row :gutter="16" type="flex" align="middle" >
              <Col :xs="12" :md="12" :lg="12">
                <div class="adm-form__item">
                  <small class="adm-form__label">Широта</small>
                  <div class="adm-form__item_content">
                    <Row :gutter="16" type="flex" align="middle">
                      <Col :xs="24" :md="24" :lg="24">
                        <Input class="adm-input adm-input--regular" v-model="data.y" @on-input-change="storeElementData" disabled></Input>
                      </Col>
                    </Row>
                  </div>
                </div>
              </Col>
              <Col :xs="12" :md="12" :lg="12">
                <div class="adm-form__item">
                  <small class="adm-form__label">Долгота</small>
                  <div class="adm-form__item_content">
                    <Row :gutter="16" type="flex" align="middle">
                      <Col :xs="24" :md="24" :lg="24">
                        <Input class="adm-input adm-input--regular" v-model="data.x" @on-input-change="storeElementData" disabled></Input>
                      </Col>
                    </Row>
                  </div>
                </div>
              </Col>
						</Row>
						</div>
						<div class="button-wrap">
							<Button @click="save" type="text" class="adm-btn adm-btn-regular color-blue-base adm-btn-border txt-uppercase save-place">Сохранить</Button>
						</div>
					</div>
				</div>
			</div>
  </div>
</template>

<script>
import * as funcUtils from "../../../assets/js/utils/funcUtils";
import RequestApi from "../../../assets/js/api/requestApi";

export default {
	name: "WizardItemPlace",
	components: {
    MaskedInput: () => import('~/components/shared/MaskedInput')
  },
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
		}
	},
	methods: {
		outside(e) {
			if (e.target.contains(this.$refs.bodyModal)) {
				this.showPlaceModal(false)
			}
		},
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
        this.data = data;
        this.regionsList = null;
        this.rayonsList = null;
        this.citiesList = null;
        this.streetsList = null;

        await this.fillRegionList();
        await this.fillRoadList();
        await this.fillPlaceList();
        if (this.isNotEmptyRegionId()) {
          await this.fillRayonList();
        }
        if ((this.isNotEmptyRegionId() && this.isNotEmptyCityId()) || this.isNotEmptyRayonId()) {
          await this.fillCityList();
        }
        if ((this.isNotEmptyRegionId() && this.isNotEmptyStreetId()) || this.isNotEmptyRayonId() || this.isNotEmptyCityId()) {
          await this.fillStreetList();
        }
			}

			this.fullAddress = data.placeFull;
		},
		async changeRayon() {
      if (!this.isNotEmptyRayonId() && (this.isNotEmptyCityId() && this.isNotEmptyStreetId())) {
        this.$refs.rayon.reset();
      } else if (this.isNotEmptyRayonId()) {
        this.data.adr.cityId = null;
        this.data.adr.streetId = null;
        this.$refs.city.reset();
        this.$refs.street.reset();
      }

      this.storeElementData();
		},
		async changeCity(query) {
      let limit;
      if (this.isNotEmptyRayonId()) {
        limit = 0;
      } else if (this.isNotEmptyRegionId()) {
        limit = 1;
      }
      if ((funcUtils.isEmpty(query) || query.length === 0)) {
        this.data.adr.cityId = null;
        this.data.adr.streetId = null;
      } else if (query.length >= limit) {
        await this.fillCityList(query);
      } else {
        this.citiesList = null;
      }

      this.storeElementData();
		},
		async changeStreet(query) {
      let limit;
      if (this.isNotEmptyCityId()) {
        limit = 0;
      } else if (this.isNotEmptyRayonId()) {
        limit = 1;
      } else if (this.isNotEmptyRegionId()) {
        limit = 2;
      }
      if ((funcUtils.isEmpty(query) || query.length === 0)) {
        this.data.adr.streetId = null;
      } else if (query.length >= limit) {
        await this.fillStreetList(query);
      } else {
        this.streetsList = null;
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
						methodName: 'getCitiesDictByRegion',
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
    isNotEmptyStreetId() {
      return funcUtils.isNotEmpty(this.data.adr.streetId);
    },
		storeElementData() {
			let copyData = JSON.parse(JSON.stringify(this.data));
			this.$emit('storeElementData', {
				eCID: this.info.eCID,
				data: copyData
			});
		},
	}
}
</script>

<style lang="scss" scoped>
	.address-modal {
		position: fixed;
		width: 100vw;
		height: 100vh;
		background: rgba(0, 0, 0, 0.5);
		display: flex;
		align-items: center;
		flex-direction: column;
		justify-content: center;
		z-index: 920;
		top: 0;
		left: 0;
		.adm-form__container {
			border: none;
		}
		.adm-form {
			min-width: 800px;
			position: relative;
			.adm-form__label {
				min-width: 140px;
			}
			.adm-form__headding {
				display: flex;
				height: 50px;
				align-items: center;
				font-size: 18px;
				text-align: center;
				font-weight: 600;
				margin: 0;
			}
			.close-modal {
				position: absolute;
				padding: 0;
				background: #fff;
				top: -15px;
				right: -22px;
				z-index: 5;
				transition: .3s ease;
					opacity: .7;
				&:hover {
					opacity: 1;
				}
			}
			.button-wrap {
				display: flex;
				justify-content: flex-end;
				padding: 0 20px 20px 20px;
				.save-place {
					margin-left: auto;
					transition: .3s ease;
					&:hover {
						background: #57a3f3;
						color: #ffffff;
					}
				}
			}
		}
	}
  .adm-form__item_content{
    width: 100%;
  }
</style>

