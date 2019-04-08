<template>
  <div v-if="data">
    <div class="adm-form__item">
      <small class="adm-form__label">Номер документа</small>
      <Row :gutter="16" type="flex" align="middle">
        <Col :xs="24" :md="14" :lg="16">
          <!-- <Input class="adm-input adm-input--regular" :disabled="data.docId" v-model="data.docNum" @on-input-change="storeElementData" placeholder="Номер документа"></Input> -->
           <masked-input inputClass="adm-input adm-input--regular wmax360 wmin180" v-model="data.docNum" :maskProps="{casing: 'upper', regex: '[a-zA-Zа-яА-Я0-9]+', placeholder: ''}" @onInputChange="storeElementData" :disabled="data.docId"></masked-input>
        </Col>
      </Row>
    </div>
    <div class="adm-form__item">
      <small class="adm-form__label">Документ удостоверяющий личность:</small>
      <Row :gutter="16" type="flex" align="middle">
        <Col :xs="24" :md="14" :lg="16">
          <Select class="wmax360 wmin180 adm-input adm-input--regular" :disabled="data.docId" placeholder="" v-model="data.docTip" clearable @on-change="storeElementData">
            <Option class="wmax360 txt-break-word" v-for="item in tipDocList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </Col>
      </Row>
    </div>
    <div class="adm-form__item">
      <small class="adm-form__label">Список документов ЛВОКа из дела:</small>
      <Row :gutter="16" type="flex" align="middle">
        <Col :xs="24" :md="14" :lg="16">
          <Select class="wmax360 wmin180 adm-input adm-input--regular" placeholder="" v-model="data.docId" clearable @on-change="storeElementData">
            <Option class="wmax360 txt-break-word" v-for="item in lvokDeloDocsList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </Col>
      </Row>
    </div>
  </div>
</template>

<script>
  import * as funcUtils from "../../../assets/js/utils/funcUtils";
  import * as formStack from '../../../assets/js/api/formStack';
  import RequestApi from "../../../assets/js/api/requestApi";
  import MaskedInput from "~/components/shared/MaskedInput";

  export default {
    name: "WizardItemPredDoc",
    components: {
      MaskedInput
    },
    props: {
      info: Object
    },
    async created() {
      await this.initData();
    },
    data() {
      return {
        data: null,
        lvokDeloDocsList: null,
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
        await this.fillLvokDeloDocsList();
      },
      async fillLvokDeloDocsList() {
        let eventResponse = await RequestApi.prepareData({
          method: 'invokeElementMethod',
          params: {
            eCID: this.info.eCID,
            methodName: 'getLvokDeloDocs',
            data: null
          }
        });
        let lvokDeloDocsList = [];
        let lvokDeloDocsDict = JSON.parse(JSON.parse(eventResponse.response).data);
        for (let i = 0; i < lvokDeloDocsDict.length; i++) {
          let lvokDeloDoc = lvokDeloDocsDict[i];
          lvokDeloDocsList.push({
            label: lvokDeloDoc.name,
            value: lvokDeloDoc.id
          });
        }
        this.lvokDeloDocsList = lvokDeloDocsList;
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
