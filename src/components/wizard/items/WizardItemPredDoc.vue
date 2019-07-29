<template>
  <div v-if="data">
    <div v-if="isNotEmptyParentNode && lvokDeloDocsList.length" class="adm-form__item">
      <small class="adm-form__label">Список документов из дела</small>
      <Row :gutter="16" type="flex" align="middle">
        <Col :xs="24" :md="14" :lg="16">
          <CustomSelect class="wmax360 wmin180 adm-input adm-input--regular" placeholder="" v-model="data.docId" filterable clearable @on-change="changeDocLVOK" @on-enter="changeDocLVOK">
            <Option class="wmax360 " v-for="item in lvokDeloDocsList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </CustomSelect>
        </Col>
      </Row>
    </div>
    <div class="adm-form__item">
      <small class="adm-form__label">Тип документа</small>
      <Row :gutter="16" type="flex" align="middle">
        <Col :xs="24" :md="14" :lg="16">
          <CustomSelect class="wmax360 wmin180 adm-input adm-input--regular" :disabled="data.docId !== null" placeholder="" v-model="data.docTip" filterable clearable @on-change="changeDocTip" @on-enter="changeDocTip">
            <Option class="wmax360 " v-for="item in tipDocList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </CustomSelect>
        </Col>
      </Row>
    </div>
    <div class="adm-form__item">
      <small class="adm-form__label">Серия и номер</small>
      <Row :gutter="16" type="flex" align="middle">
        <Col :xs="24" :md="14" :lg="16">
           <masked-input ref="docNum" inputClass="adm-input adm-input--regular wmax360 wmin180" :disabled="data.docId !== null" v-model="data.docNum" :maskProps="maskDocNum" clearable @onInputChange="storeElementData"></masked-input>
        </Col>
      </Row>
    </div>
    <div class="adm-form__item">
      <small class="adm-form__label">Дата выдачи</small>
      <Row :gutter="16" type="flex" align="middle">
      <Col :xs="24" :md="14" :lg="22">
        <DatePickerMask class="adm-input adm-input--regular wmin120 wmax180" :disabled="data.docId !== null" v-model="data.vuDateVyd" @change="storeElementData" clearable type="date" placeholder="дд/мм/гггг" momentFormat="DD/MM/YYYY" maskFormat="dd/mm/yyyy"></DatePickerMask>
        </Col>
      </Row>
    </div>
    <div class="adm-form__item">
      <small class="adm-form__label">Кем выдан</small>
      <Row :gutter="16" type="flex" align="middle">
        <Col :xs="24" :md="14" :lg="22">
          <masked-input inputClass="adm-input adm-input--regular wmax360 wmin180" :disabled="data.docId !== null" v-model="data.vuOgaiVydName" :maskProps="{regex: '[а-яА-Я0-9 .-]+', casing: 'upper', placeholder: ''}" clearable @onInputChange="storeElementData"></masked-input>
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
        lvokDeloDocsList: [],
        tipDocList: null
      }
    },

    computed: {
      maskDocNum() {
        let numDocTip = parseInt(this.data.docTip);
        switch (numDocTip) {
          case 3: { // Военный билет
            return {
              regex: '[А-Я0-9]{2} [0-9]{7}',
              casing: 'upper',
              placeholder: '',
            }
          }
          case 5: { // Паспорт РФ
            return {
              regex: '[0-9]{2} [0-9]{2} [0-9]{6}',
              casing: 'upper',
              placeholder: ''
            }
          }
          case 7:   // Загранпаспорт
          case 8: { // Вид на жительство
            return {
              regex: '[0-9]{2} [0-9]{7}',
              casing: 'upper',
              placeholder: ''
            }
          }
          case 9: { // ВУ
            return {
              regex: '[0-9]{2} [А-Я0-9]{2} [0-9]{6}',
              casing: 'upper',
              placeholder: ''
            }
          }
          case 104: { // Международное ВУ
            return {
              regex: '[0-9]{2} [A-Z]{2} [0-9]{6}',
              casing: 'upper',
              placeholder: ''
            }

          }
          default:
            return {
              regex: '[0-9A-Za-zА-Яа-я]+',
              placeholder: ''
            }
        }
      },
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
      async changeDocLVOK(e) {
        if (funcUtils.isEmpty(e)) {
          this.data.docId = null;
        }
        await this.storeElementData();
      },
      async changeDocTip() {
        await this.$nextTick();
        if (this.$refs.docNum) {
          this.$refs.docNum.$forceUpdate();
          this.$refs.docNum.init();
        }
        this.data.docNum = null;
        await this.storeElementData();
      },
      async storeElementData() {
        if (this.data.docNum) {
          this.data.docNum = this.data.docNum.replace(/\s+/g, '');
        }
        return new Promise((resolve, reject) => {
          this.$emit('storeElementData', {
            eCID: this.info.eCID,
            data: this.data,
            resolve: resolve
          });
        });
      },
    }
  }
</script>

<style scoped>

</style>
