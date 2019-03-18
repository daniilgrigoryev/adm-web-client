<template>
  <div v-if="data" class="wmax940 mx-auto">


    <div class="amd-title amd-title--sticky px36 py24 bg-white-light">
      <div class="flex-parent flex-parent--space-between-main flex-parent--center-cross">
        <div class="flex-parent flex-parent--center-cross">
          <Button @click="getPrev" type="text" style="outline: 0!important;" class="py0 px0 mr18 bg-transparent-on-hover" title="вернуться назад">
            <Icon type="ios-arrow-dropleft" class="bg-whte color-gray-light color-blue-on-hover transition" :size="35" />
          </Button>
          <b class="adm-text-big color-dark-lighter">Редактирование адреса</b>
        </div>
        <Button type="text" style="outline: 0!important;" class="px0 py0 cursor-pointer">
          <img src='../../../assets/images/wiki.svg' class="wmax-none">
        </Button>
      </div>
    </div>

    <div class="adm-form">
      <div class="adm-form__container mt6 py24 px36">
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
                 <Input class="adm-input adm-input--regular" v-model="data.npunktName" @on-input-change="store" ></Input>
                  <!-- <Select class="adm-input adm-input--regular wmin180" v-model="data.cityId" filterable clearable :disabled="!isNotEmptyRegionId() && !isNotEmptyRayonId()" @on-clear="changeCity" remote :remote-method="changeCity">
                    <Option class="txt-break-word" v-for="item in citiesList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                  </Select> -->
                </Col>
              </Row>
            </div>
          </div>

          <div class="adm-form__item">
            <small class="adm-text-small color-gray-medium adm-form__label">Улица</small>
            <div class="adm-form__item_content">
              <Row :gutter="16" type="flex" align="middle">
                <Col :xs="24" :md="24" :lg="24">
                  <Input class="adm-input adm-input--regular" v-model="data.streetName" @on-input-change="store" ></Input>
                </Col>
              </Row>
            </div>
          </div>

          <!-- <div class="adm-form__item">
            <small class="adm-text-small color-gray-medium adm-form__label">Улица</small>
            <div class="adm-form__item_content">
              <Row :gutter="16" type="flex" align="middle">
                <Col :xs="24" :md="24" :lg="24">
                  <Select class="adm-input adm-input--regular wmin180" v-model="data.streetId" filterable clearable :disabled="!isNotEmptyRegionId() && !isNotEmptyRayonId() && !isNotEmptyCityId()" @on-clear="changeStreet" remote :remote-method="changeStreet">
                    <Option class="wmax360 txt-break-word" v-for="item in streetsList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                  </Select>
                </Col>
              </Row>
            </div>
          </div> -->
        </div>

        <div v-if="!showIfRussia">
          <div class="adm-form__item">
            <small class="adm-text-small color-gray-medium adm-form__label">Населенный пункт</small>
            <div class="adm-form__item_content">
              <Row :gutter="16" type="flex" align="middle">
                <Col :xs="24" :md="24" :lg="24">
                  <Input class="adm-input adm-input--regular" v-model="data.npunktName" @on-input-change="store" ></Input>
                </Col>
              </Row>
            </div>
          </div>
          <div class="adm-form__item">
            <small class="adm-text-small color-gray-medium adm-form__label">Улица</small>
            <div class="adm-form__item_content">
              <Row :gutter="16" type="flex" align="middle">
                <Col :xs="24" :md="24" :lg="24">
                  <Input class="adm-input adm-input--regular" v-model="data.streetName" @on-input-change="store" ></Input>
                </Col>
              </Row>
            </div>
          </div>
        </div>



        <div class="flex-parent flex-parent--center-cross">
          <div class="adm-form__item">
            <small class="adm-text-small color-gray-medium adm-form__label">Дом</small>
            <div class="adm-form__item_content">
              <Row :gutter="16" type="flex" align="middle">
                <Col :xs="24" :md="24" :lg="24">
                  <Input class="adm-input adm-input--regular wmax60" v-model="data.ndom" @on-input-change="store" ></Input>
                </Col>
              </Row>
            </div>
          </div>
          <div class="adm-form__item ml18">
            <small class="adm-text-small color-gray-medium adm-form__label wmin60 wmax60">Корпус</small>
            <div class="adm-form__item_content">
              <Row :gutter="16" type="flex" align="middle">
                <Col :xs="24" :md="24" :lg="24">
                  <Input class="adm-input adm-input--regular wmax60" v-model="data.nkorpus" @on-input-change="store" ></Input>
                </Col>
              </Row>
            </div>
          </div>
          <div class="adm-form__item ml18">
            <small class="adm-text-small color-gray-medium adm-form__label wmin60">Строение</small>
            <div class="adm-form__item_content">
              <Row :gutter="16" type="flex" align="middle">
                <Col :xs="24" :md="24" :lg="24">
                  <Input class="adm-input adm-input--regular wmax60" v-model="data.nstroenie" @on-input-change="store" ></Input>
                </Col>
              </Row>
            </div>
          </div>
          <div class="adm-form__item ml18">
            <small class="adm-text-small color-gray-medium adm-form__label wmin60">Квартира</small>
            <div class="adm-form__item_content">
              <Row :gutter="16" type="flex" align="middle">
                <Col :xs="24" :md="24" :lg="24">
                  <Input class="adm-input adm-input--regular wmax60" v-model="data.nkvart"></Input>
                </Col>
              </Row>
            </div>
          </div>
          <div class="adm-form__item ml18">
            <small class="adm-text-small color-gray-medium adm-form__label wmin60 wmax60">Индекс</small>
            <div class="adm-form__item_content">
              <Row :gutter="16" type="flex" align="middle">
                <Col :xs="24" :md="24" :lg="24">
                  <Input class="adm-input adm-input--regular" v-model="data.pindex" disabled></Input>
                </Col>
              </Row>
            </div>
          </div> 
        </div>


        <!-- <div class="flex-parent flex-parent--center-cross">

        </div> -->
      </div>

      <div class="flex-parent flex-parent--center-cross flex-parent--end-main px36 my24">
        <Button @click="getPrev" type="text" class="adm-btn adm-btn-small bg-transparent">Отменить изменения</Button>
        <Button @click="save" type="text" class="adm-btn adm-btn-regular color-blue-base adm-btn-border txt-uppercase">Сохранить</Button>
      </div>
    </div>
  </div>
</template>

<script>
  import * as funcUtils from "../../../assets/js/utils/funcUtils";
  import * as formStack from '../../../assets/js/api/formStack';
  import RequestApi from "../../../assets/js/api/requestApi";

  export default {
    name: "AddressViewEdit",
    async created() {
      try {
        let current = formStack.getCurrent();
        await this.$store.dispatch('addressViewEditSetCid', current.cid);

        let eventResponse = await RequestApi.prepareData({
          method: 'restore'
        });
        let data = JSON.parse(eventResponse.response).data;

        await this.initData(data);
      } catch (e) {
        alert(e.message);
      }
    },
    destroyed() {
      this.$store.dispatch('addressViewEditSetCid', null);
      this.$store.dispatch('addressViewEditSetData', null);
    },
    data() {
      return {
        data: null,
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
      async initData(data) {
        this.data = data;

        await this.fillCountryList();
        await this.fillRegionList();
        await this.fillRayonList();
        await this.fillCityList();
        await this.fillStreetList();
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

        this.store();
      },
      async changeRegion() {
        this.rayonsList = null;
        this.citiesList = null;
        this.streetsList = null;
        this.data.rayonId = null;
        this.data.cityId = null;
        this.data.streetId = null;

        await this.fillRayonList();

        this.store();
      },
      changeRayon() {
        this.citiesList = null;
        this.streetsList = null;
        this.data.cityId = null;
        this.data.streetId = null;

        this.store();
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

        this.store();
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

        this.store();
      },

      async fillCountryList() {
        let eventResponse = await RequestApi.prepareData({
          method: 'getCountryDict'
        });
        let countryList = [];
        let countryDict = JSON.parse(eventResponse.response).data;
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
          method: 'getRegionDict'
        });
        let regionsList = [];
        let regionsDict = JSON.parse(eventResponse.response).data;
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
            method: 'getRayonDict',
            params: {
              regionId: this.data.regionId
            }
          });
          let rayonsList = [];
          let rayonsDict = JSON.parse(eventResponse.response).data;
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
            method: 'getCitiesDictByRayon',
            params: {
              rayonId: this.data.rayonId,
              substr: query
            },
            withSpinner: false
          });
        } else if (this.isNotEmptyRegionId()) {
          eventResponse = await RequestApi.prepareData({
            method: 'getCitiesDictByRegion',
            params: {
              regionId: this.data.regionId,
              substr: query
            },
            withSpinner: false
          });
        }

        if (eventResponse) {
          let citiesList = [];
          let citiesDict = JSON.parse(eventResponse.response).data;
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
            method: 'getStreetsDictByCity',
            params: {
              cityId: this.data.cityId,
              substr: query
            },
            withSpinner: false
          });
        } else if (this.isNotEmptyRayonId()) {
          eventResponse = await RequestApi.prepareData({
            method: 'getStreetsDictByRayon',
            params: {
              rayonId: this.data.rayonId,
              substr: query
            },
            withSpinner: false
          });
        } else if (this.isNotEmptyRegionId()) {
          eventResponse = await RequestApi.prepareData({
            method: 'getStreetsDictByRegion',
            params: {
              regionId: this.data.regionId,
              substr: query
            },
            withSpinner: false
          });
        }

        if (eventResponse) {
          let streetsList = [];
          let streetsDict = JSON.parse(eventResponse.response).data;
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

      async save() {
        let eventResponse = await RequestApi.prepareData({
          method: 'save'
        });
        if (eventResponse.response) {
          let error = JSON.parse(eventResponse.response).error;
          alert(error.errorMsg);
        } else {
          this.getPrev();
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
      async store() {
        let eventResponse = await RequestApi.prepareData({
          method: 'store',
          params: {
            data: this.data
          }
        });
        if (eventResponse.response) {
          let data = JSON.parse(eventResponse.response).data;
          await this.initData(data);
        }
      },
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

<style scoped lang="scss">
  .adm-form-content{

  }
  .adm-form__item{
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-top: 12px;
    // outline: 1px solid red;
    padding-bottom: 12px;
    // min-height: 90px;
  }
  .adm-form__label{
    padding: 0;
    padding-right: 12px;
    min-width: 130px;
  }
  .adm-form__item_content{
    width: 100%;
  }
</style>
