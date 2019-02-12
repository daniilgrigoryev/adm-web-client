<template>
  <div v-if="data" style="margin-bottom: 50px; border-bottom: 1px solid black;">

    <div>

      <div>
        <span>{{title}}</span>
        <input v-model="fullAddress" disabled="true" />
        <button type="button" @click="showAddressModal(true)" style="width: 20px; height: 20px; background: black;"></button>
      </div>

    </div>

    <div v-if="addressModal.visible" class="modal dolz" style="width: 50vw; height: 50vh; position: absolute; background: black; color: white; z-index: 2;">
      <button type="button" @click="showAddressModal(false)" style="width: 20px; height: 20px; background: white;"></button>

      <div>
        <span>Страна</span>

        <span>Код</span>
        <input v-model="data.countryCode" disabled="true" />

        <span>Название</span>
        <input v-model="data.countryName" disabled="true" />
      </div>

      <div>
        <span>Регион</span>

        <Select v-model="data.regionId" filterable clearable @on-change="changeRegion">
          <Option v-for="item in regionsList" :value="item.regionId" :key="item.regionId">{{ item.value + ', ' + item.label }}</Option>
        </Select>
      </div>

      <div>
        <span>Район</span>

        <Select v-model="data.rayonId"
                filterable
                clearable
                :disabled="!isNotEmptyRegionId()"
                @on-change="changeRayon">
          <Option v-for="item in rayonsList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </div>

      <div>
        <span>Населенный пункт</span>

        <Select v-model="data.cityId"
                filterable
                clearable
                :disabled="!isNotEmptyRegionId() || !isNotEmptyRayonId"
                @on-clear="changeCity"
                remote
                :remote-method="changeCity">
          <Option v-for="item in citiesList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </div>

      <div>
        <span>Улица</span>

        <Select v-model="data.streetId"
                filterable
                clearable
                :disabled="!isNotEmptyRegionId() || !isNotEmptyRayonId()"
                @on-clear="changeStreet"
                remote
                :remote-method="changeStreet">
          <Option v-for="item in streetsList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </div>

      <div>
        <span>Дом</span>

        <input v-model="data.ndom" @change="storeElementData" />
      </div>

      <div>
        <span>Корпус</span>

        <input v-model="data.nkorpus" @change="storeElementData" />
      </div>

      <div>
        <span>Строение</span>

        <input v-model="data.nstroenie" @change="storeElementData" />
      </div>

      <div>
        <span>Почтовый индекс</span>

        <input v-model="data.pindex" disabled="true" />
      </div>

      <div>
        <span>Дополнительные сведения</span>

        <input v-model="data.dopSved" @change="storeElementData" />
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
        regionsList: null,
        rayonsList: null,
        citiesList: null,
        streetsList: null,
        fakeRegionKod: null
      }
    },
    methods: {
      async initData() {
        let eventResponse = await RequestApi.prepareData({
          method: 'getElementData',
          params: {
            eCID: this.info.eCID
          }
        });
        this.data = JSON.parse(JSON.parse(eventResponse.response).data);

        await this.fillRegionList();
        await this.fillRayonList();
        if (funcUtils.isNotEmpty(this.data.cityId)) {
          await this.fillCityList();
        }
        if (funcUtils.isNotEmpty(this.data.streetId)) {
          await this.fillStreetList();
        }
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
      showAddressModal(visible) {
        this.addressModal.visible = visible;
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

<style scoped>

</style>
