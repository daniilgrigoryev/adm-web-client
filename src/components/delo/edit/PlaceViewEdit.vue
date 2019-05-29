<template>
  <aside-template :listSectionNav="[]" title="Редактирование адреса" v-if="data">
    <div class="layout-wrap">
      <div class="layout">
        <div class="adm-form">
          <div class="adm-form__container mt0">
            <h2 class="adm-form__headding">{{title}}</h2>
            <div class="adm-form__content">
              <div class="adm-form__item">
                <small class="adm-form__label">Регион</small>
                <div class="adm-form__item_content">
                  <Row :gutter="16" type="flex" align="middle">
                    <Col :xs="24" :md="24" :lg="24">
                      <CustomSelect class="adm-input adm-input--regular wmin180" placeholder="Ввод региона"  v-model="data.adr.regionId" filterable clearable @on-change="store">
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
                      <CustomSelect class="adm-input adm-input--regular wmin180" ref="rayon" placeholder="Ввод района"  v-model="data.adr.rayonId" filterable clearable :disabled="!isNotEmptyRegionId()" @on-change="changeRayon">
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
                      <CustomSelect class="adm-input adm-input--regular wmin180" ref="city" placeholder="Ввод населенного пункта"  v-model="data.adr.cityId" filterable clearable :disabled="!isNotEmptyRegionId() && !isNotEmptyRayonId()" @on-clear="changeCity" @on-query-change="changeCity">
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
                      <CustomSelect class="adm-input adm-input--regular wmin180" ref="street"  placeholder="Ввод улицы" v-model="data.adr.streetId" filterable clearable :disabled="!isNotEmptyRegionId() && !isNotEmptyRayonId() && !isNotEmptyCityId()" @on-clear="changeStreet" @on-query-change="changeStreet">
                        <Option class="" v-for="item in streetsList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                      </CustomSelect>
                    </Col>
                  </Row>
                </div>
              </div>


              <div class="small-items-wrap">
                <div class="adm-form__item">
                  <small class="adm-form__label">Дом</small>
                  <div class="adm-form__item_content">
                    <Row :gutter="16" type="flex" align="middle">
                      <Col :xs="24" :md="24" :lg="24">
                        <Input class="adm-input adm-input--regular"  v-model="data.adr.ndom" @on-input-change="store" :maxlength="5"></Input>
                      </Col>
                    </Row>
                  </div>
                </div>
                <div class="adm-form__item">
                  <small class="adm-form__label wmin60 wmax120">Корпус</small>
                  <div class="adm-form__item_content">
                    <Row :gutter="16" type="flex" align="middle">
                      <Col :xs="24" :md="24" :lg="24">
                        <Input class="adm-input adm-input--regular"  v-model="data.adr.nkorpus" @on-input-change="store" :maxlength="5"></Input>
                      </Col>
                    </Row>
                  </div>
                </div>
                <div class="adm-form__item">
                  <small class="adm-form__label wmin60">Строение</small>
                  <div class="adm-form__item_content">
                    <Row :gutter="16" type="flex" align="middle">
                      <Col :xs="24" :md="24" :lg="24">
                        <Input class="adm-input adm-input--regular"  v-model="data.adr.nstroenie" @on-input-change="store" :maxlength="5"></Input>
                      </Col>
                    </Row>
                  </div>
                </div>
                <div class="adm-form__item">
                  <small class="adm-form__label wmin60">Индекс</small>
                  <div class="adm-form__item_content">
                    <Row :gutter="16" type="flex" align="middle">
                      <Col :xs="24" :md="24" :lg="24">
                        <Input class="adm-input adm-input--regular" v-model="data.adr.pindex" disabled></Input>
                      </Col>
                    </Row>
                  </div>
                </div>
              </div>



              <div class="adm-form__item mt24">
                <small class="adm-form__label">Место</small>
                <div class="adm-form__item_content">
                  <Row :gutter="16" type="flex" align="middle">
                    <Col :xs="24" :md="24" :lg="24">
                      <AutoComplete
                        v-model="data.placeName"
                        :data="placesList"
                        class="wmin180 adm-input adm-input--regular wmin180"
                        icon="ios-arrow-down"
                        :filter-method="filterPlace"
                        @on-change="store"
                        placeholder=""
                        clearable>
                      </AutoComplete>
                    </Col>
                  </Row>
                </div>
              </div>


              <div class="adm-form__item">
                <small class="adm-form__label">км, метр</small>
                <div class="adm-form__item_content">
                  <Row :gutter="16" type="flex" align="middle">
                    <Col :xs="24" :md="24" :lg="24">
                      <masked-input inputClass="adm-input adm-input--regular" v-model="data.km" :maskProps="{casing: 'upper', regex: '[0-9]+', placeholder: ''}" @onInputChange="store" ></masked-input>
                    </Col>
                  </Row>
                </div>
              </div>
              <div class="adm-form__item">
                <small class="adm-form__label wmin60">МГО</small>
                <div class="adm-form__item_content">
                  <Row :gutter="16" type="flex" align="middle">
                    <Col :xs="24" :md="24" :lg="24">
                      <Input class="adm-input adm-input--regular" v-model="data.machta" @on-input-change="store" ></Input>
                    </Col>
                  </Row>
                </div>
              </div>
              <div class="adm-form__item">
                <small class="adm-form__label wmin60">МГТ</small>
                <div class="adm-form__item_content">
                  <Row :gutter="16" type="flex" align="middle">
                    <Col :xs="24" :md="24" :lg="24">
                      <Input class="adm-input adm-input--regular" v-model="data.mgt" @on-input-change="store" ></Input>
                    </Col>
                  </Row>
                </div>
              </div>

              <div class="adm-form__item">
                <small class="adm-form__label">Доп. сведения</small>
                <div class="adm-form__item_content">
                  <Row :gutter="16" type="flex" align="middle">
                    <Col :xs="24" :md="24" :lg="24">
                      <Input class="adm-input adm-input--regular" v-model="data.dopSved" @on-input-change="store"></Input>
                    </Col>
                  </Row>
                </div>
              </div>

              <div class="mt24">
                <Row :gutter="16" type="flex" align="middle" >
                  <Col :xs="12" :md="12" :lg="12">
                    <div class="adm-form__item">
                      <small class="adm-form__label">Широта</small>
                      <div class="adm-form__item_content">
                        <Row :gutter="16" type="flex" align="middle">
                          <Col :xs="24" :md="24" :lg="24">
                            <Input class="adm-input adm-input--regular" v-model="data.y" @on-input-change="store" disabled></Input>
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
                            <Input class="adm-input adm-input--regular" v-model="data.x" @on-input-change="store" disabled></Input>
                          </Col>
                        </Row>
                      </div>
                    </div>
                  </Col>
                </Row>
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
    name: "PlaceViewEdit",
    components: {
      AsideTemplate: () => import('~/components/templates/AsideTemplate'),
      MaskedInput: () => import('~/components/shared/MaskedInput'),
    },
    async created() {
      try {
        let current = formStack.getCurrent();
        await this.$store.dispatch('placeViewEditSetCid', current.cid);


        if(funcUtils.isNotEmpty(current.params) && funcUtils.isNotEmpty(current.params.type)) {
          switch (current.params.type) {
            case 'placeSost': {
              this.title = "Редактирование адреса места вынесения";
              break;
            }
            case 'placeNar': {
              this.title = "Редактирование адреса места нарушения";
              break;
            }
          }
        }

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
      this.$store.dispatch('placeViewEditSetCid', null);
      this.$store.dispatch('placeViewEditSetData', null);
    },
    data() {
      return {
        data: null,
        regionsList: null,
        rayonsList: null,
        citiesList: null,
        streetsList: null,
        placesList: [],
        title: 'Редактирование адреса места нарушения / места составления'
      }
    },
    methods: {
      async initData(data) {
        this.data = data;
        this.regionsList = null;
        this.rayonsList = null;
        this.citiesList = null;
        this.streetsList = null;

        if (funcUtils.isEmpty(this.data.placeName)) {
          this.data.placeName = '';
        }

        await this.fillRegionList();
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
      },
      changeRayon() {
        if (!this.isNotEmptyRayonId() && (this.isNotEmptyCityId() && this.isNotEmptyStreetId())) {
          this.$refs.rayon.reset();
        } else if (this.isNotEmptyRayonId()) {
          this.data.adr.cityId = null;
          this.data.adr.streetId = null;
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
          this.data.adr.cityId = null;
          this.data.adr.npunktName = null;
          this.data.adr.streetId = null;
          this.data.adr.streetName = null;
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
          this.data.adr.streetId = null;
          this.data.adr.streetName = null;
        } else if (query.length >= limit) {
          await this.fillStreetList(query);
        } else {
          this.streetsList = null;
        }

        this.store();
      },
      filterPlace(value, option) {
        if (funcUtils.isEmpty(value) || funcUtils.isEmpty(option)) {
          return false;
        }
        return option.toUpperCase().indexOf(value.toUpperCase()) !== -1;
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
              regionId: this.data.adr.regionId
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
              rayonId: this.data.adr.rayonId,
              substr: query
            },
            withSpinner: false
          });
        } else if (this.isNotEmptyRegionId()) {
          eventResponse = await RequestApi.prepareData({
            method: 'getCitiesDictByRegion',
            params: {
              regionId: this.data.adr.regionId,
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
      async fillPlaceList() {
        let eventResponse = await RequestApi.prepareData({
          method: 'getPlaces'
        });
        let placesList = new Set();
        let placesDict = JSON.parse(eventResponse.response).data;
        for (let i = 0; i < placesDict.length; i++) {
          let place = placesDict[i];
          let label;
          if (funcUtils.isNotEmpty(place.PLACE_KOD)) {
            label = place.PLACE_KOD + ', ' + place.PLACE_NAME;
          } else {
            label = place.PLACE_NAME;
          }
          placesList.add(label);
        }
        this.placesList = placesList.toJSON();
      },
      async fillStreetList(query = '') {
        let eventResponse;
        if (this.isNotEmptyCityId()) {
          eventResponse = await RequestApi.prepareData({
            method: 'getStreetsDictByCity',
            params: {
              cityId: this.data.adr.cityId,
              substr: query
            },
            withSpinner: false
          });
        } else if (this.isNotEmptyRayonId()) {
          eventResponse = await RequestApi.prepareData({
            method: 'getStreetsDictByRayon',
            params: {
              rayonId: this.data.adr.rayonId,
              substr: query
            },
            withSpinner: false
          });
        } else if (this.isNotEmptyRegionId()) {
          eventResponse = await RequestApi.prepareData({
            method: 'getStreetsDictByRegion',
            params: {
              regionId: this.data.adr.regionId,
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


