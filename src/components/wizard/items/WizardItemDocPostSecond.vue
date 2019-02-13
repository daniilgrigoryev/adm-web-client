<template>
  <div v-if="data" style="margin-bottom: 50px; border-bottom: 1px solid black;">
    <div>
      <span>Время нарушения</span>
      <input type="date" v-model="data.dateNar" @change="changeDateNar" />
    </div>

    <div>
      <span>п.НПА нарушения</span>

      <Select v-model="data.pnpaId" clearable filterable @on-change="storeElementData">
        <Option v-for="item in pnpaList" :value="item.id" :key="item.id">{{ item.value + ', ' + item.label }}</Option>
      </Select>
    </div>

    <div>
      <span>Статья ответственности</span>

      <Select v-model="data.stotvId" clearable filterable :disabled="!data.dateNar" @on-clear="changeStotvSearchInfo" @on-change="changeStotvSearchInfo">
        <Option v-for="item in stotvSearchInfoList" :value="item.id" :key="item.id">{{ item.value + ', ' + item.label }}</Option>
      </Select>
    </div>

    <div>
      <span>КБК</span>

      <Select v-model="data.kbk" clearable filterable :disabled="!data.stotvId" @on-clear="storeElementData" @on-change="storeElementData">
        <Option v-for="item in KBKSearchInfoList" :value="item.id" :key="item.id">{{ item.value + ', ' + item.label }}</Option>
      </Select>
    </div>


  </div>
</template>

<script>
  import * as funcUtils from "../../../assets/js/utils/funcUtils";
  import * as formStack from '../../../assets/js/api/formStack';
  import RequestApi from "../../../assets/js/api/requestApi";

  export default {
    name: "WizardItemDocPostSecond",
    props: {
      info: Object
    },
    async created() {
      await this.initData();
    },
    data() {
      return {
        data: null,
        pnpaList: null,
        stotvSearchInfoList: null,
        KBKSearchInfoList: null,
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

        await this.fillPnpaList();

        if (this.data.dateNar) {
          this.fillStotvSearchInfo();
        }
        if (this.data.stotvId) {
          this.fillKBKSearchInfo();
        }
      },
      async fillPnpaList() {
        let eventResponse = await RequestApi.prepareData({
          method: 'invokeElementMethod',
          params: {
            eCID: this.info.eCID,
            methodName: 'getPnpaDict',
            data: null
          }
        });
        let pnpaList = [];
        let pnpaDict = JSON.parse(JSON.parse(eventResponse.response).data);
        for (let i = 0; i < pnpaDict.length; i++) {
          let pnpa = pnpaDict[i];
          pnpaList.push({
            label: pnpa.PNPA_NAME,
            value: pnpa.PNPA_KOD,
            id: pnpa.PNPA_ID
          });
        }
        this.pnpaList = pnpaList;
      },
      async fillStotvSearchInfo() {
        let eventResponse = await RequestApi.prepareData({
          method: 'invokeElementMethod',
          params: {
            eCID: this.info.eCID,
            methodName: 'getStotvSearchInfo',
            data: JSON.stringify({
              date: this.data.dateNar
            })
          }
        });
        let stotvSearchInfoList = [];
        let stotvSearchInfoDict = JSON.parse(JSON.parse(eventResponse.response).data);
        for (let i = 0; i < stotvSearchInfoDict.length; i++) {
          let stotvSearchInfo = stotvSearchInfoDict[i];
          stotvSearchInfoList.push({
            label: stotvSearchInfo.stotvName,
            value: stotvSearchInfo.stotvKod,
            id: stotvSearchInfo.stotvId
          });
        }
        this.stotvSearchInfoList = stotvSearchInfoList;
      },
      async fillKBKSearchInfo() {
        let eventResponse = await RequestApi.prepareData({
          method: 'invokeElementMethod',
          params: {
            eCID: this.info.eCID,
            methodName: 'getKBKSearchInfo',
            data: JSON.stringify({
              stotvId: this.data.stotvId
            })
          }
        });
        let KBKSearchInfoList = [];
        let KBKSearchInfoDict = JSON.parse(JSON.parse(eventResponse.response).data);
        for (let i = 0; i < KBKSearchInfoDict.length; i++) {
          let KBKSearchInfo = KBKSearchInfoDict[i];
          KBKSearchInfoList.push({
            label: KBKSearchInfo.kbkName,
            value: KBKSearchInfo.kbk,
            id: KBKSearchInfo.id
          });
        }
        this.KBKSearchInfoList = KBKSearchInfoList;
      },
      changeDateNar() {
        this.stotvSearchInfoList = null;
        if (funcUtils.isNotEmpty(this.data.dateNar)) {
          this.fillStotvSearchInfo();
        }

        this.storeElementData();
      },
      changeStotvSearchInfo() {
        this.KBKSearchInfoList = null;
        if (funcUtils.isNotEmpty(this.data.stotvId)) {
          this.fillKBKSearchInfo();
        }

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
