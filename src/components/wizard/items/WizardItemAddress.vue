<template>
  <div>
    <div class="adm-form__item">
      <small class="adm-text-small color-gray-medium adm-form__label">{{title}}</small>
      <Row :gutter="16" type="flex" align="middle">
        <Col :xs="22" :md="22" :lg="22">
          <Input class="adm-input adm-input--regular" v-model="fullAddress" disabled :autosize="{minRows: 2,maxRows: 5}"></Input>
        </Col>
        <Col :xs="2" :md="2" :lg="2">
          <Button @click="showAddressModal(true)" type="text" style="outline: 0!important; box-shadow: none" class=" bg-transparent-on-hover color-blue-on-hover color-gray-light transition color-blue-on-focus color-blue-on-hover color-gray-light transition color-blue-on-focus">
            <Icon type="ios-bookmarks-outline" class="bg-whte" title="Адресный справочник" :size="35" />
          </Button>
        </Col>
      </Row>
    </div>
    <div v-if="data && addressModal.visible" class="address-modal">
      <div class="adm-form" ref="bodyModal">
        <Button type="text" ref="closeButton"  @click="showAddressModal(false)" class="close-modal">
					<Icon type="md-close" size="40" class="color-blue-base cursor-pointer"/>
				</Button>
        <div class="adm-form__container">
					<h2 class="adm-text-big color-dark-light adm-form__headding">{{title}}</h2>
           <div class="adm-form__content mt0 px36 py24">
            <div class="adm-form__item">
              <small class="adm-text-small color-gray-medium adm-form__label">Страна</small>
              <div class="adm-form__item_content">
                <Row :gutter="16" type="flex" align="middle">
                  <Col :xs="24" :md="24" :lg="24">
                    <Select class="adm-input adm-input--regular wmin180" v-model="data.countryCode" filterable clearable @on-change="changeCountry">
                      <Option class="txt-break-word" v-for="item in countryList" :value="item.value" :key="item.value">{{item.label }}</Option>
                    </Select>
                  </Col>
                </Row>
              </div>
            </div>
            <div v-if="showIfRussia">
              <div class="adm-form__item">
                <small class="adm-text-small color-gray-medium adm-form__label">Регион</small>
                <div class="adm-form__item_content">
                  <Row :gutter="16" type="flex" align="middle">
                    <Col :xs="24" :md="24" :lg="24">
                      <Select class="adm-input adm-input--regular wmin180" v-model="data.regionId" filterable clearable @on-change="changeRegion">
                        <Option class="txt-break-word" v-for="item in regionsList" :value="item.regionId" :key="item.regionId">{{item.label }}</Option>
                      </Select>
                    </Col>
                  </Row>
                </div>
              </div>
              <div class="adm-form__item">
                <small class="adm-text-small color-gray-medium adm-form__label">Район</small>
                <div class="adm-form__item_content">
                  <Row :gutter="16" type="flex" align="middle">
                    <Col :xs="24" :md="24" :lg="24">
                      <Select class="adm-input adm-input--regular wmin180" v-model="data.rayonId" filterable clearable :disabled="!isNotEmptyRegionId()" @on-change="changeRayon">
                        <Option class="txt-break-word" v-for="item in rayonsList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                      </Select>
                    </Col>
                  </Row>
                </div>
              </div>
              <div class="adm-form__item">
                <small class="adm-text-small color-gray-medium adm-form__label">Населенный пункт</small>
                <div class="adm-form__item_content">
                  <Row :gutter="16" type="flex" align="middle">
                    <Col :xs="24" :md="24" :lg="24">
                      <Select class="adm-input adm-input--regular wmin180" v-model="data.cityId" filterable clearable :disabled="!isNotEmptyRegionId() && !isNotEmptyRayonId()" @on-clear="changeCity" remote :remote-method="changeCity">
                        <Option class="txt-break-word" v-for="item in citiesList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                      </Select>
                    </Col>
                  </Row>
                </div>
              </div>

              <div class="adm-form__item">
                <small class="adm-text-small color-gray-medium adm-form__label">Улица</small>
                <div class="adm-form__item_content">
                  <Row :gutter="16" type="flex" align="middle">
                    <Col :xs="24" :md="24" :lg="24">
                      <Select class="adm-input adm-input--regular" v-model="data.streetId" filterable clearable :disabled="!isNotEmptyRegionId() && !isNotEmptyRayonId() && !isNotEmptyCityId()" @on-clear="changeStreet" remote :remote-method="changeStreet">
                        <Option class=" txt-break-word" v-for="item in streetsList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                      </Select>
                    </Col>
                  </Row>
                </div>
              </div>

            </div>
            <div v-if="!showIfRussia">
              <div class="adm-form__item">
                <small class="adm-text-small color-gray-medium adm-form__label">Населенный пункт</small>
                <div class="adm-form__item_content">
                  <Row :gutter="16" type="flex" align="middle">
                    <Col :xs="24" :md="24" :lg="24">
                      <Input class="adm-input adm-input--regular" v-model="data.npunktName" @on-input-change="storeElementData" ></Input>
                    </Col>
                  </Row>
                </div>
              </div>
              <div class="adm-form__item">
                <small class="adm-text-small color-gray-medium adm-form__label">Улица</small>
                <div class="adm-form__item_content">
                  <Row :gutter="16" type="flex" align="middle">
                    <Col :xs="24" :md="24" :lg="24">
                      <Input class="adm-input adm-input--regular" v-model="data.streetName" @on-input-change="storeElementData" ></Input>
                    </Col>
                  </Row>
                </div>
              </div>
            </div>
            <div class="small-items-wrap">
              <div class="adm-form__item">
                <small class="adm-text-small color-gray-medium adm-form__label">Дом</small>
                <div class="adm-form__item_content">
                  <Row :gutter="16" type="flex" align="middle">
                    <Col :xs="24" :md="24" :lg="24">
                      <Input class="adm-input adm-input--regular"  v-model="data.ndom" @on-input-change="storeElementData" :maxlength="5"></Input>
                    </Col>
                  </Row>
                </div>
              </div>
              <div class="adm-form__item">
                <small class="adm-text-small color-gray-medium adm-form__label wmin60 wmax120">Корпус</small>
                <div class="adm-form__item_content">
                  <Row :gutter="16" type="flex" align="middle">
                    <Col :xs="24" :md="24" :lg="24">
                      <Input class="adm-input adm-input--regular wmax60"  v-model="data.nkorpus" @on-input-change="storeElementData" :maxlength="5"></Input>
                    </Col>
                  </Row>
                </div>
              </div>
              <div class="adm-form__item">
                <small class="adm-text-small color-gray-medium adm-form__label wmin60">Строение</small>
                <div class="adm-form__item_content">
                  <Row :gutter="16" type="flex" align="middle">
                    <Col :xs="24" :md="24" :lg="24">
                      <Input class="adm-input adm-input--regular wmax60"  v-model="data.nstroenie" @on-input-change="storeElementData" :maxlength="5"></Input>
                    </Col>
                  </Row>
                </div>
              </div>
              <div class="adm-form__item">
                <small class="adm-text-small color-gray-medium adm-form__label wmin60">Квартира</small>
                <div class="adm-form__item_content">
                  <Row :gutter="16" type="flex" align="middle">
                    <Col :xs="24" :md="24" :lg="24">
                      <Input class="adm-input adm-input--regular wmax60" v-model="data.nkvart" @on-input-change="storeElementData" :maxlength="5"></Input>
                    </Col>
                  </Row>
                </div>
              </div>
              <div class="adm-form__item">
                <small class="adm-text-small color-gray-medium adm-form__label wmin60">Индекс</small>
                <div class="adm-form__item_content">
                  <Row :gutter="16" type="flex" align="middle">
                    <Col :xs="24" :md="24" :lg="24">
                      <Input class="adm-input adm-input--regular" v-model="data.pindex" disabled style="width: 72px;"></Input>
                    </Col>
                  </Row>
                </div>
              </div> 
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import * as funcUtils from "../../../assets/js/utils/funcUtils";
  import * as formStack from '../../../assets/js/api/formStack';
  import RequestApi from "../../../assets/js/api/requestApi";

  export default {
    name: "WizardItemAddress",
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
        addressModal: {
          visible: false
        },
        countryList: null,
        regionsList: null,
        rayonsList: null,
        citiesList: null,
        streetsList: null,
      }
    },
    computed: {
      showIfRussia() {
        return this.data.countryCode === '1100' || funcUtils.isEmpty(this.data.countryCode);
      },
    },
    methods: {
      outside(e) {
        if (e.target.contains(this.$refs.bodyModal)) {
          this.showAddressModal(false)
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
        if (this.addressModal.visible) {
          this.data = data;

          await this.fillCountryList();
          await this.fillRegionList();
          await this.fillRayonList();
          await this.fillCityList();
          await this.fillStreetList();
        }

        this.fullAddress = data.adrFull;
      },

      async changeCountry() {
        this.regionsList = null;
        this.rayonsList = null;
        this.citiesList = null;
        this.streetsList = null;
        this.data.regionId = null;
        this.data.rayonId = null;
        this.data.cityId = null;
        this.data.streetId = null;

        this.storeElementData();
      },
      async changeRegion() {
        this.rayonsList = null;
        this.citiesList = null;
        this.streetsList = null;
        this.data.rayonId = null;
        this.data.cityId = null;
        this.data.streetId = null;

        await this.fillRayonList();

        this.storeElementData();
      },
      changeRayon() {
        this.citiesList = null;
        this.streetsList = null;
        this.data.cityId = null;
        this.data.streetId = null;

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
          this.data.cityId = null;
          this.data.streetId = null;
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
          this.data.streetId = null;
        } else if (query.length > limit) {
          await this.fillStreetList(query);
        }

        this.storeElementData();
      },

      async fillCountryList() {
        let eventResponse = await RequestApi.prepareData({
          method: 'invokeElementMethod',
          params: {
            eCID: this.info.eCID,
            methodName: 'getCountryDict',
            data: null
          }
        });
        let countryList = [];
        let countryDict = JSON.parse(JSON.parse(eventResponse.response).data);
        for (let i = 0; i < countryDict.length; i++) {
          let country = countryDict[i];
          countryList.push({
            label: country.NAME,
            value: country.CODE
          });
        }
        this.countryList = countryList;
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
                regionId: this.data.regionId
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
                rayonId: this.data.rayonId,
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
                regionId: this.data.regionId,
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
            if (funcUtils.isNotEmpty(this.data.cityId) && citi.id != this.data.cityId) {
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
      async fillStreetList(query = '') {
        let eventResponse;
        if (this.isNotEmptyCityId()) {
          eventResponse = await RequestApi.prepareData({
            method: 'invokeElementMethod',
            params: {
              eCID: this.info.eCID,
              methodName: 'getStreetsDictByCity',
              data: JSON.stringify({
                cityId: this.data.cityId,
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
                rayonId: this.data.rayonId,
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
                regionId: this.data.regionId,
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
            if (funcUtils.isNotEmpty(this.data.streetId) && street.id != this.data.streetId) {
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

      isNotEmptyRegionId() {
        return funcUtils.isNotEmpty(this.data.regionId);
      },
      isNotEmptyCityId() {
        return funcUtils.isNotEmpty(this.data.cityId);
      },
      isNotEmptyRayonId() {
        return funcUtils.isNotEmpty(this.data.rayonId);
      },
      async showAddressModal(visible) {
        this.addressModal.visible = visible;

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
          this.addressModal.visible = false;
          this.clearComponent();
          this.$emit('updateComponents', response);
        }
      },
      clearComponent() {
        this.data = null;
        this.regionsList = null;
        this.rayonsList = null;
        this.citiesList = null;
        this.streetsList = null;
      },

      storeElementData() {
        this.$emit('storeElementData', {
          eCID: this.info.eCID,
          data: this.data
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
      min-width: 1000px;
      max-width: 1000px;
      position: relative;
      .small-items-wrap {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        .adm-form__item {
          grid-template-columns: 100px 60px;
          &:first-child {
            grid-template-columns: 150px 60px;
          }
          .adm-form__label {
            max-width: 100%;
            width: auto;
            padding-right: 7px;
          }
        }
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
  .adm-form__item{
    // display: flex;
    flex-direction: row;
    align-items: center;
  }
  .adm-form__label{
    padding: 0;
    min-width: 130px;
    padding-right: 12px;
  }
  .adm-form__item_content{
    width: 100%;
  }
</style>
