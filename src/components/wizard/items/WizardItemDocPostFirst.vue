<template>
  <div v-if="data">
    <div>
      <span>№ постановления</span>
      <input v-model="data.docN" />
      <button type="button" @click="createNewUIN" style="width: 20px; height: 20px; background: black;"></button>
    </div>

    <div>
      <span>Уникальный номер АПН</span>
      <input v-model="data.apn" />
    </div>

    <div>
      <span>Время вынесения</span>
      <input type="date" v-model="data.dateSost" />
    </div>

    <div>
      <span>Должностное лицо</span>
      <input v-model="inspSostDolz" @change="getSinspList" />
    </div>

    <div>
      <span>Орган</span>
      <input v-model="data.organSostName" />
    </div>

  </div>
</template>

<script>
  import * as funcUtils from "../../../assets/js/utils/funcUtils";
  import * as formStack from '../../../assets/js/api/formStack';
  import RequestApi from "../../../assets/js/api/requestApi";

  export default {
    name: "WizardItemDocPostFirst",
    props: {
      info: Object
    },
    async created() {
      let eventResponse = await RequestApi.prepareData({
        method: 'getElementData',
        params: {
          eCID: this.info.eCID
        }
      });
      this.data = JSON.parse(JSON.parse(eventResponse.response).data);
      if (funcUtils.isNotEmpty(this.data.inspSostName) && funcUtils.isNotEmpty(this.data.inspSostDolz)) {
        this.inspSostDolz = this.data.inspSostName + ', ' + this.data.inspSostDolz;
      }
    },
    data() {
      return {
        data: null,
        inspSostDolz: null
      }
    },
    methods: {
      async getSinspList(e) {
        let isInteger = Number.isInteger(+this.inspSostDolz);
        if (this.inspSostDolz.length === 0 || !isInteger) {
          this.data.inspSostId = null;
          this.data.inspSostKod = null;
          this.data.inspSostName = null;
          this.data.inspSostDolz = null;
          this.data.inspSostRang = null;
          this.inspSostDolz = null;
        } else if (funcUtils.isNotEmpty(this.inspSostDolz) && this.inspSostDolz.length !== 0) {
          let eventResponse = await RequestApi.prepareData({
            method: 'invokeElementMethod',
            params: {
              eCID: this.info.eCID,
              methodName: 'getSinspList',
              data: JSON.stringify({
                inspKod: this.inspSostDolz
              })
            }
          });
          let data = JSON.parse(JSON.parse(eventResponse.response).data);
          if (funcUtils.isNotEmpty(data) && data.length > 0) {
            data = data[0];
            this.data.inspSostId = data.inspId;
            this.data.inspSostKod = data.inspKod;
            this.data.inspSostName = data.inspName;
            this.data.inspSostDolz = data.inspDolz;
            this.data.inspSostRang = data.inspRang;
            this.data.organSostId = data.ogaiId;
            this.data.organSostKod = data.organKod;
            this.data.organSostName = data.ogaiName;
            this.inspSostDolz = data.inspName + ', ' + data.inspDolz;
          } else {
            this.data.inspSostId = null;
            this.data.inspSostKod = null;
            this.data.inspSostName = null;
            this.data.inspSostDolz = null;
            this.data.inspSostRang = null;
            this.inspSostDolz = null;
          }
        }
      },
      async createNewUIN() {
        let eventResponse = await RequestApi.prepareData({
          method: 'invokeElementMethod',
          params: {
            eCID: this.info.eCID,
            methodName: 'createNewUIN',
            data: null
          }
        });
        this.data = JSON.parse(JSON.parse(eventResponse.response).data);
      }
    }
  }
</script>

<style scoped>

</style>
