<template>
  <div v-if="data" style="margin-bottom: 50px; border-bottom: 1px solid black;">
    <div>
      <span>Номер документа</span>

      <input v-model="data.docNum" @change="storeElementData" />
    </div>

    <div>
      <span>Тип документа</span>

      <Select v-model="data.docTip" clearable @on-change="changeTipDoc">
        <Option v-for="item in tipDocList" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
    </div>
  </div>
</template>

<script>
  import * as funcUtils from "../../../assets/js/utils/funcUtils";
  import * as formStack from '../../../assets/js/api/formStack';
  import RequestApi from "../../../assets/js/api/requestApi";

  export default {
    name: "WizardItemPredDoc",
    props: {
      info: Object
    },
    async created() {
      await this.initData();
    },
    data() {
      return {
        data: null,
        tipDocList: null
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

        await this.fillTipDocList();
      },
      async fillTipDocList() {
        let eventResponse = await RequestApi.prepareData({
          method: 'invokeElementMethod',
          params: {
            eCID: this.info.eCID,
            methodName: 'getDocTipPredDictionary',
            data: null
          }
        });
        let tipDocList = [];
        let tipDocDict = JSON.parse(JSON.parse(eventResponse.response).data);
        for (let i = 0; i < tipDocDict.length; i++) {
          let tipDoc = tipDocDict[i];
          tipDocList.push({
            label: tipDoc.DOC_TIP_NAME,
            value: tipDoc.DOC_TIP
          });
        }
        this.tipDocList = tipDocList;
      },
      changeTipDoc() {
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
