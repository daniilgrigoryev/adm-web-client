<template>
  <div v-if="data">

    <div>
      <span>Страна</span>

      <span>Код</span>
      <input v-model="data.adr.countryCode" disabled="true" />

      <span>Название</span>
      <input v-model="data.adr.countryName" disabled="true" />
    </div>

    <div>
      <span>Регион</span>

      <input v-model="data.adr.regionKod" />

      <Select v-model="data.adr.regionKod" filterable>
        <Option v-for="item in regionsList" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
    </div>

    <div>
      <span>Район</span>

      <Select v-model="data.adr.rayonId" filterable>
        <Option v-for="item in rayonsList" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
    </div>

    <div>
      <span>Населенный пункт</span>

      <Select v-model="data.adr.city_id" filterable>
        <Option v-for="item in citiesList" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
    </div>

    <div>
      <span>Дорога</span>

      <Select v-model="data.adr.roadId" filterable>
        <Option v-for="item in streetsList" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
    </div>

    <div>
      <span>МГО</span>

      <input v-model="data.machta" />
    </div>

    <div>
      <span>МГТ</span>

      <input v-model="data.mgt" />
    </div>

    <div>
      <span>км, метр</span>

      <input v-model="data.km" />
    </div>

    <div>
      <span>Место</span>

      <Select v-model="data.adr.placeId" filterable>
        <Option v-for="item in streetsList" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
    </div>

    <div>
      <span>Улица</span>

      <Select v-model="data.adr.street_id" filterable>
        <Option v-for="item in streetsList" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
    </div>

    <div>
      <span>Дом</span>

      <input v-model="data.adr.ndom" />
    </div>

    <div>
      <span>Корпус</span>

      <input v-model="data.adr.nkorpus" />
    </div>

    <div>
      <span>Строение</span>

      <input v-model="data.adr.nstroenie" />
    </div>

    <div>
      <span>Почтовый индекс</span>

      <input v-model="data.adr.pindex" disabled="true" />
    </div>

    <div>
      <span>Дополнительные сведения</span>

      <input v-model="data.dopDopSved" />
    </div>

    <div>
      <span>Широта</span>

      <input v-model="data.y" />
    </div>

    <div>
      <span>Долгота</span>

      <input v-model="data.x" />
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
      info: Object
    },
    async created() {
      await this.initData();
    },
    data() {
      return {
        data: null,
        regionsList: null,
        rayonsList: null,
        citiesList: null,
        streetsList: null
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

        eventResponse = await RequestApi.prepareData({
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
            value: region.REGION_ID.toString()
          });
        }
        this.regionsList = regionsList;

        eventResponse = await RequestApi.prepareData({
          method: 'invokeElementMethod',
          params: {
            eCID: this.info.eCID,
            methodName: 'getRayonDict',
            data: JSON.stringify({
              regionId: this.data.adr.regionKod || null
            })
          }
        });
        let rayonsList = [];
        let rayonsDict = JSON.parse(JSON.parse(eventResponse.response).data);
        for (let i = 0; i < rayonsDict.length; i++) {
          let region = rayonsDict[i];
          rayonsList.push({
            label: region.name,
            value: region.id.toString()
          });
        }
        this.rayonsList = rayonsList;

        eventResponse = await RequestApi.prepareData({
          method: 'invokeElementMethod',
          params: {
            eCID: this.info.eCID,
            methodName: 'getCitiesDictByRegion',
            data: JSON.stringify({
              regionId: this.data.adr.regionKod || null,
              substr: null
            })
          }
        });
        let citiesList = [];
        let citiesDict = JSON.parse(JSON.parse(eventResponse.response).data);
        for (let i = 0; i < citiesDict.length; i++) {
          let citi = citiesDict[i];
          citiesList.push({
            label: citi.name,
            value: citi.id.toString()
          });
        }
        this.citiesList = citiesList;

        eventResponse = await RequestApi.prepareData({
          method: 'invokeElementMethod',
          params: {
            eCID: this.info.eCID,
            methodName: 'getStreetsDictByRegion',
            data: JSON.stringify({
              regionId: this.data.adr.regionKod || null,
              substr: null
            })
          }
        });
        let streetsList = [];
        let streetsDict = JSON.parse(JSON.parse(eventResponse.response).data);
        for (let i = 0; i < streetsDict.length; i++) {
          let street = streetsDict[i];
          streetsList.push({
            label: street.name,
            value: street.id.toString()
          });
        }
        this.streetsList = streetsList;
      },
      async changeRegion() {
        let eventResponse = await RequestApi.prepareData({
          method: 'invokeElementMethod',
          params: {
            eCID: this.info.eCID,
            methodName: 'getRayonDict',
            data: JSON.stringify({
              regionId: this.data.adr.regionKod || null
            })
          }
        });
        let rayonsList = [];
        let rayonsDict = JSON.parse(JSON.parse(eventResponse.response).data);
        for (let i = 0; i < rayonsDict.length; i++) {
          let region = rayonsDict[i];
          rayonsList.push({
            label: region.name,
            value: region.id.toString()
          });
        }
        this.rayonsList = rayonsList;
        this.storeElementData();
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
