<template>
  <div v-if="data">
    <div class="adm-form__item">
      <small class="adm-form__label">Предъявленный документ</small>
      <Row :gutter="16" type="flex" align="middle">
        <Col :xs="24" :md="14" :lg="16">
           <masked-input inputClass="adm-input adm-input--regular wmax360 wmin180" :disabled="data.docId !== null" v-model="data.docNum" :maskProps="{casing: 'upper', regex: '[a-zA-Zа-яА-Я0-9]+', placeholder: ''}" clearable @onInputChange="storeElementData"></masked-input>
        </Col>
      </Row>
    </div>
    <div class="adm-form__item">
      <small class="adm-form__label">Тип документа:</small>
      <Row :gutter="16" type="flex" align="middle">
        <Col :xs="24" :md="14" :lg="16">
          <Select class="wmax360 wmin180 adm-input adm-input--regular" :disabled="data.docId !== null" placeholder="" v-model="data.docTip" filterable clearable @on-change="storeElementData">
            <Option class="wmax360 " v-for="item in tipDocList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </Col>
      </Row>
    </div>
    <div class="adm-form__item">
      <small class="adm-form__label">Дата выдачи:</small>
      <Row :gutter="16" type="flex" align="middle">
      <Col :xs="24" :md="14" :lg="22">
        <DatePickerMask class="adm-input adm-input--regular wmin120 wmax180" :disabled="data.docId !== null" v-model="data.vuDateVyd" @change="storeElementData" clearable type="date" placeholder="дд/мм/гггг" momentFormat="DD/MM/YYYY" maskFormat="dd/mm/yyyy"></DatePickerMask>
        </Col>
      </Row>
    </div>
    <div class="adm-form__item">
      <small class="adm-form__label">Кем выдан:</small>
      <Row :gutter="16" type="flex" align="middle">
        <Col :xs="24" :md="14" :lg="22">
          <masked-input inputClass="adm-input adm-input--regular wmax360 wmin180" :disabled="data.docId !== null" v-model="data.vuOgaiVydName" :maskProps="{casing: 'upper', placeholder: ''}" clearable @onInputChange="storeElementData"></masked-input>
        </Col>
      </Row>
    </div>
    <div v-if="isNotEmptyParentNode" class="adm-form__item">
      <small class="adm-form__label">Список документов ЛВОКа из дела:</small>
      <Row :gutter="16" type="flex" align="middle">
        <Col :xs="24" :md="14" :lg="16">
          <Select class="wmax360 wmin180 adm-input adm-input--regular" placeholder="" v-model="data.docId" filterable clearable @on-change="changeDocLVOK">
            <Option class="wmax360 " v-for="item in lvokDeloDocsList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </Col>
      </Row>
    </div>
  </div>
</template>

<script>
  import * as funcUtils from "~/assets/js/utils/funcUtils";
  import RequestApi from "~/assets/js/api/requestApi";

  export default {
    name: "WizardItemPredDoc",
    components: {
      MaskedInput: () => import('~/components/shared/MaskedInput'),
      DatePickerMask: () => import('~/components/shared/dateTimePicker/DatePickerMask')
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
    computed: {
      isNotEmptyParentNode() {
        return funcUtils.isNotEmpty(this.info.parentNode);
      },
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
      changeDocLVOK(e) {
        if (funcUtils.isEmpty(e)) {
          this.data.docId = null;
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
