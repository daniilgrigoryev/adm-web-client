<template>
  <aside-template :listSectionNav="[]" title="Редактирование адреса участника" v-if="data">
    <div class="layout-wrap">
      <div class="layout">
        <div class="adm-form">
          <div class="adm-form__container mt0">
            <h2 class="adm-form__headding">Редактирование адреса участника</h2>
            <div class="adm-form__content mt0 px36 py24">
              <div class="adm-form__item">
                <small class="adm-form__label">Страна</small>
                <div class="adm-form__item_content">
                  <Row :gutter="16" type="flex" align="middle">
                    <Col :xs="24" :md="24" :lg="24">
                      <CustomSelect class="adm-input adm-input--regular wmin180" placeholder="Ввод страны" v-model="data.countryCode" filterable clearable @on-change="store">
                        <Option class="" v-for="item in countryList" :value="item.value" :key="item.value">{{item.label }}</Option>
                      </CustomSelect>
                    </Col>
                  </Row>
                </div>
              </div>
              <div v-if="showIfRussia">
                <div class="adm-form__item">
                  <small class="adm-form__label">Регион</small>
                  <div class="adm-form__item_content">
                    <Row :gutter="16" type="flex" align="middle">
                      <Col :xs="24" :md="24" :lg="24">
                        <CustomSelect class="adm-input adm-input--regular wmin180" placeholder="Ввод региона" v-model="data.regionId" filterable clearable @on-change="store">
                          <Option class="" v-for="item in regionsList" :value="item.regionId" :key="item.regionId">{{item.label }}</Option>
                        </CustomSelect>
                      </Col>
                    </Row>
                  </div>
                </div>
                <div class="adm-form__item">
                  <small class="adm-form__label">Район</small>
                  <div class="adm-form__item_content">
                    <Row :gutter="16" type="flex" align="middle">
                      <Col :xs="24" :md="24" :lg="24">
                        <CustomSelect class="adm-input adm-input--regular wmin180" placeholder="Ввод района"  ref="rayon" v-model="data.rayonId" filterable clearable :disabled="!isNotEmptyRegionId()" @on-change="changeRayon">
                          <Option class="" v-for="item in rayonsList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </CustomSelect>
                      </Col>
                    </Row>
                  </div>
                </div>
                <div class="adm-form__item">
                  <small class="adm-form__label">Населенный пункт</small>
                  <div class="adm-form__item_content">
                    <Row :gutter="16" type="flex" align="middle">
                      <Col :xs="24" :md="24" :lg="24">
                        <CustomSelect class="adm-input adm-input--regular wmin180" ref="city" placeholder="Ввод населенного пункта"  v-model="data.cityId" filterable clearable :disabled="!isNotEmptyRegionId() && !isNotEmptyRayonId()" @on-query-change="changeCity" @on-clear="changeCity">
                          <Option class="" v-for="item in citiesList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </CustomSelect>
                      </Col>
                    </Row>
                  </div>
                </div>

                <div class="adm-form__item">
                  <small class="adm-form__label">Улица</small>
                  <div class="adm-form__item_content">
                    <Row :gutter="16" type="flex" align="middle">
                      <Col :xs="24" :md="24" :lg="24">
                        <CustomSelect class="adm-input adm-input--regular" ref="street" placeholder="Ввод улицы" v-model="data.streetId" filterable clearable :disabled="!isNotEmptyRegionId() && !isNotEmptyRayonId() && !isNotEmptyCityId()" @on-query-change="changeStreet" @on-clear="changeStreet">
                          <Option class=" " v-for="item in streetsList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </CustomSelect>
                      </Col>
                    </Row>
                  </div>
                </div>
              </div>
              <div v-if="!showIfRussia">
                <div class="adm-form__item">
                  <small class="adm-form__label">Населенный пункт</small>
                  <div class="adm-form__item_content">
                    <Row :gutter="16" type="flex" align="middle">
                      <Col :xs="24" :md="24" :lg="24">
                        <Input class="adm-input adm-input--regular" placeholder="Ввод населенного пункта"  v-model="data.npunktName" @on-input-change="store" ></Input>
                      </Col>
                    </Row>
                  </div>
                </div>
                <div class="adm-form__item">
                  <small class="adm-form__label">Улица</small>
                  <div class="adm-form__item_content">
                    <Row :gutter="16" type="flex" align="middle">
                      <Col :xs="24" :md="24" :lg="24">
                        <Input class="adm-input adm-input--regular" placeholder="Ввод улицы" v-model="data.streetName" @on-input-change="store" ></Input>
                      </Col>
                    </Row>
                  </div>
                </div>
              </div>
              <div class="small-items-wrap">
                <div class="adm-form__item">
                  <small class="adm-form__label">Дом</small>
                  <div class="adm-form__item_content">
                    <Row :gutter="16" type="flex" align="middle">
                      <Col :xs="24" :md="24" :lg="24">
                        <Input class="adm-input adm-input--regular"  v-model="data.ndom" @on-input-change="store" :maxlength="5"></Input>
                      </Col>
                    </Row>
                  </div>
                </div>
                <div class="adm-form__item">
                  <small class="adm-form__label wmin60 wmax120">Корпус</small>
                  <div class="adm-form__item_content">
                    <Row :gutter="16" type="flex" align="middle">
                      <Col :xs="24" :md="24" :lg="24">
                        <Input class="adm-input adm-input--regular" v-model="data.nkorpus" @on-input-change="store" :maxlength="5"></Input>
                      </Col>
                    </Row>
                  </div>
                </div>
                <div class="adm-form__item">
                  <small class="adm-form__label wmin60">Строение</small>
                  <div class="adm-form__item_content">
                    <Row :gutter="16" type="flex" align="middle">
                      <Col :xs="24" :md="24" :lg="24">
                        <Input class="adm-input adm-input--regular" v-model="data.nstroenie" @on-input-change="store" :maxlength="5"></Input>
                      </Col>
                    </Row>
                  </div>
                </div>
                <div class="adm-form__item">
                  <small class="adm-form__label wmin60">Квартира (офис)</small>
                  <div class="adm-form__item_content">
                    <Row :gutter="16" type="flex" align="middle">
                      <Col :xs="24" :md="24" :lg="24">
                        <Input class="adm-input adm-input--regular" v-model="data.nkvart" @on-input-change="store" :maxlength="5"></Input>
                      </Col>
                    </Row>
                  </div>
                </div>
                <div class="adm-form__item">
                  <small class="adm-form__label wmin60">Индекс</small>
                  <div class="adm-form__item_content">
                    <Row :gutter="16" type="flex" align="middle">
                      <Col :xs="24" :md="24" :lg="24">
                        <Input class="adm-input adm-input--regular" v-model="data.pindex" :disabled="showIfRussia"></Input>
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
    <div class="bot-wrap">
      <Button @click="getPrev" type="text">Отменить изменения</Button>
      <Button @click="save" type="primary" class="ml12">Сохранить</Button>
    </div>
  </aside-template>

</template>

<script>
  import * as funcUtils from "~/assets/js/utils/funcUtils";
  import * as formStack from '~/assets/js/api/formStack';
  import RequestApi from "~/assets/js/api/requestApi";

  export default {
    name: "AddressViewEdit",
    components: {
      AsideTemplate: () => import('~/components/templates/AsideTemplate'),
      MaskedInput: () => import('~/components/shared/MaskedInput'),
    },
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
        this.$store.dispatch('errors/changeContent', {title: e.message,});
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
        this.countryList = null;
        this.regionsList = null;
        this.rayonsList = null;
        this.citiesList = null;
        this.streetsList = null;

        await this.fillCountryList();
        if (this.isNotEmptyContryCode()) {
          await this.fillRegionList();
        }
        if (this.isNotEmptyRegionId()) {
          await this.fillRayonList();
        }
        if (this.showIfRussia) {
          if ((this.isNotEmptyRegionId() && this.isNotEmptyCityId()) || this.isNotEmptyRayonId()) {
            await this.fillCityList();
          }
          if ((this.isNotEmptyRegionId() && this.isNotEmptyStreetId()) || this.isNotEmptyRayonId() || this.isNotEmptyCityId()) {
            await this.fillStreetList();
          }
        }
      },
      async changeRayon() {
        if (!this.isNotEmptyRayonId() && (this.isNotEmptyCityId() && this.isNotEmptyStreetId())) {
          this.$refs.rayon.reset();
        } else if (this.isNotEmptyRayonId()) {
          this.data.cityId = null;
          this.data.streetId = null;
          this.$refs.city.reset();
          this.$refs.street.reset();
        }

        this.store();
      },
      async changeCity(query) {
        let limit;
        if (this.isNotEmptyRayonId()) {
          limit = 0;
        } else if (this.isNotEmptyRegionId()) {
          limit = 1;
        }
        if ((funcUtils.isEmpty(query) || query.length === 0)) {
          this.data.cityId = null;
          this.data.npunktName = null;
          this.data.streetId = null;
          this.data.streetName = null;
        } else if (query.length >= limit) {
          await this.fillCityList(query);
        } else {
          this.citiesList = null;
        }

        this.store();
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
          this.data.streetId = null;
          this.data.streetName = null;
        } else if (query.length >= limit) {
          await this.fillStreetList(query);
        } else {
          this.streetsList = null;
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
        await this.store();
        let eventResponse = await RequestApi.prepareData({
          method: 'save'
        });
        if (eventResponse.response) {
          let error = JSON.parse(eventResponse.response).error;
          this.$store.dispatch('errors/changeContent', {title: error.errorMsg, desc: error.errorDesc,});
        } else {
          this.getPrev();
        }
      },
      isNotEmptyContryCode() {
        return funcUtils.isNotEmpty(this.data) && funcUtils.isNotEmpty(this.data.countryCode);
      },
      isNotEmptyRegionId() {
        return funcUtils.isNotEmpty(this.data) && funcUtils.isNotEmpty(this.data.regionId);
      },
      isNotEmptyCityId() {
        return funcUtils.isNotEmpty(this.data) && funcUtils.isNotEmpty(this.data.cityId);
      },
      isNotEmptyRayonId() {
        return funcUtils.isNotEmpty(this.data) && funcUtils.isNotEmpty(this.data.rayonId);
      },
      isNotEmptyStreetId() {
        return funcUtils.isNotEmpty(this.data) && funcUtils.isNotEmpty(this.data.streetId);
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
          this.$store.dispatch('errors/changeContent', {title: e.message,});
        }
      },
    }
  }
</script>

<style lang="scss" scoped>
  .small-items-wrap {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    .adm-form__item {
      grid-template-columns: 84px 80px;
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
</style>

