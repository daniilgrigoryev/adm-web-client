<template>
  <div v-if="data">
    <div class="absolute bg-white z5 px36 py12" style="top: 0; bottom: 0; right: 0; left: 0;">
      <div class="adm-form">
        <div class="my12 adm-form__item">
          <small class="adm-text-small color-gray-medium adm-form__label">Код страны</small>
          <Row :gutter="16" type="flex" align="middle">
            <Col :xs="24" :md="14" :lg="16">
              <Input class="adm-input adm-input--regular" v-model="data.countryCode" disabled ></Input>
            </Col>
          </Row>
        </div>
        <div class="my12 adm-form__item">
          <small class="adm-text-small color-gray-medium adm-form__label">Название</small>
          <Row :gutter="16" type="flex" align="middle">
            <Col :xs="24" :md="14" :lg="16">
              <Input class="adm-input adm-input--regular" v-model="data.countryName" disabled ></Input>
            </Col>
          </Row>
        </div>
        <div class="my12 adm-form__item">
          <small class="adm-text-small color-gray-medium adm-form__label">Регион</small>
          <Row :gutter="16" type="flex" align="middle">
            <Col :xs="24" :md="14" :lg="16">
              <Select class="adm-input adm-input--regular wmax240 wmin180" v-model="data.regionId" filterable clearable @on-change="changeRegion">
                <Option class="wmax360 txt-break-word" v-for="item in regionsList" :value="item.regionId" :key="item.regionId">{{ item.value + ', ' + item.label }}</Option>
              </Select>
            </Col>
          </Row>
        </div>

        <div class="my12 adm-form__item">
          <small class="adm-text-small color-gray-medium adm-form__label">Район</small>
          <Row :gutter="16" type="flex" align="middle">
            <Col :xs="24" :md="14" :lg="16">
              <Select class="adm-input adm-input--regular wmax240 wmin180" v-model="data.rayonId" filterable clearable :disabled="!isNotEmptyRegionId()" @on-change="changeRayon">
                <Option class="wmax360 txt-break-word" v-for="item in rayonsList" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </Col>
          </Row>
        </div>

        <div class="my12 adm-form__item">
          <small class="adm-text-small color-gray-medium adm-form__label">Населенный пункт</small>
          <Row :gutter="16" type="flex" align="middle">
            <Col :xs="24" :md="14" :lg="16">
              <Select class="adm-input adm-input--regular wmax240 wmin180" v-model="data.cityId" filterable clearable :disabled="!isNotEmptyRegionId() && !isNotEmptyRayonId()" @on-clear="changeCity" remote :remote-method="changeCity">
                <Option class="wmax360 txt-break-word" v-for="item in citiesList" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </Col>
          </Row>
        </div>

        <div class="my12 adm-form__item">
          <small class="adm-text-small color-gray-medium adm-form__label">Улица</small>
          <Row :gutter="16" type="flex" align="middle">
            <Col :xs="24" :md="14" :lg="16">
              <Select class="adm-input adm-input--regular wmax240 wmin180" v-model="data.streetId" filterable clearable :disabled="!isNotEmptyRegionId() && !isNotEmptyRayonId() && !isNotEmptyCityId()" @on-clear="changeStreet" remote :remote-method="changeStreet">
                <Option class="wmax360 txt-break-word" v-for="item in streetsList" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </Col>
          </Row>
        </div>

        <div class="my12 adm-form__item">
          <small class="adm-text-small color-gray-medium adm-form__label">Дом</small>
          <Row :gutter="16" type="flex" align="middle">
            <Col :xs="24" :md="14" :lg="16">
              <Input class="adm-input adm-input--regular" v-model="data.ndom" @on-input-change="store" ></Input>
            </Col>
          </Row>
        </div>

        <div class="my12 adm-form__item">
          <small class="adm-text-small color-gray-medium adm-form__label">Корпус</small>
          <Row :gutter="16" type="flex" align="middle">
            <Col :xs="24" :md="14" :lg="16">
              <Input class="adm-input adm-input--regular" v-model="data.nkorpus" @on-input-change="store" ></Input>
            </Col>
          </Row>
        </div>

        <div class="my12 adm-form__item">
          <small class="adm-text-small color-gray-medium adm-form__label">Строение</small>
          <Row :gutter="16" type="flex" align="middle">
            <Col :xs="24" :md="14" :lg="16">
              <Input class="adm-input adm-input--regular" v-model="data.nstroenie" @on-input-change="store" ></Input>
            </Col>
          </Row>
        </div>

        <div class="my12 adm-form__item">
          <small class="adm-text-small color-gray-medium adm-form__label">Почтовый индекс</small>
          <Row :gutter="16" type="flex" align="middle">
            <Col :xs="24" :md="14" :lg="16">
              <Input class="adm-input adm-input--regular" v-model="data.pindex" disabled ></Input>
            </Col>
          </Row>
        </div>

        <div class="my12 adm-form__item">
          <small class="adm-text-small color-gray-medium adm-form__label">Дополнительные сведения</small>
          <Row :gutter="16" type="flex" align="middle">
            <Col :xs="24" :md="14" :lg="16">
              <Input class="adm-input adm-input--regular" v-model="data.dopSved" @on-input-change="store"  type="textarea" :autosize="{minRows: 2,maxRows: 5}"></Input>
            </Col>
          </Row>
        </div>

        <Row :gutter="16" type="flex" align="middle" justify="start">
          <Col :xs="24" :md="14" :lg="17">
            <div class="flex-parent flex-parent--end-main">
              <Button @click="getPrev" type="text">Назад</Button>
              <Button @click="save" type="primary" class="mb12">Сохранить</Button>
            </div>
          </Col>
        </Row>
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
        regionsList: null,
        rayonsList: null,
        citiesList: null,
        streetsList: null,
      }
    },
    methods: {
      async initData(data) {
        this.data = data;

        await this.fillRegionList();
        await this.fillRayonList();
        await this.fillCityList();
        await this.fillStreetList();
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

<style scoped>

</style>
