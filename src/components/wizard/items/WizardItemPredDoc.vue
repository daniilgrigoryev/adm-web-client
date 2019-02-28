<template>
  <div v-if="data">
    <div class="adm-form">
      <div class="my12 adm-form__item">
        <small class="adm-text-small color-gray-medium adm-form__label">Номер документа</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" v-model="data.docNum" @on-input-change="storeElementData" placeholder="Номер документа"></Input>
          </Col>
        </Row>
      </div>
      <div class="my12 adm-form__item">
        <small class="adm-text-small color-gray-medium adm-form__label">Документ удостоверяющий личность:</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Select class="wmax240 wmin180 adm-input adm-input--regular" placeholder="" v-model="data.docTip" clearable @on-change="storeElementData">
              <Option class="wmax360 txt-break-word" v-for="item in tipDocList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
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
