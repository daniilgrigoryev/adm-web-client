<template>
  <div v-if="data">
    <div v-if="!isNotEmptyParentNode" class="adm-form__item">
      <small class="adm-form__label">Дело №</small>
      <div class="adm-form__item_content">
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <masked-input :disabled="data.deloN !== null" :autofocus="true" inputClass="adm-input adm-input--regular wmin120" :value="data.deloN" :maskProps="maskInputProt" @onInputChange="storeElementData"></masked-input>
          </Col>
        </Row>
      </div>
    </div>
    <div class="adm-form__item">
      <small class="adm-form__label">Протокол №</small>
      <div class="adm-form__item_content">
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <masked-input inputClass="adm-input adm-input--regular wmin120" :maskProps="maskInputProt" v-model="data.docN" @onInputChange="storeElementData"></masked-input>
          </Col>
        </Row>
      </div>
    </div>
    <div class="adm-form__item">
      <small class="adm-form__label">Дата и время составления</small>
      <div class="adm-form__item_content">
        <DatePickerMask class="adm-input adm-input--regular wmin120 wmax180 ivu-date-picker" v-model="data.dateSost" @change="storeElementData" clearable type="datetime" placeholder="дд/мм/гггг чч:мм" momentFormat="DD/MM/YYYY HH:mm" maskFormat="dd/mm/yyyy HH:MM"></DatePickerMask>
      </div>
    </div>
  </div>
</template>

<script>
  import * as funcUtils from "~/assets/js/utils/funcUtils";
  import RequestApi from "~/assets/js/api/requestApi";
  import wizardItemProtOneMethods from "~/components/mixins/prot/wizardItemProtOneMethods";

  export default {
    name: "WizardItemProtOne",
    mixins: [wizardItemProtOneMethods],
    components: {
      DatePickerMask: () => import('~/components/shared/dateTimePicker/DatePickerMask'),
      MaskedInput: () => import('~/components/shared/MaskedInput'),
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
        maskInputProt: {
          regex: '[а-яА-Я0-9]+',
          casing: 'upper',
          placeholder: ''
        },
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
        let data = JSON.parse(JSON.parse(eventResponse.response).data);
        if (funcUtils.isEmpty(data)) {
          let error = JSON.parse(eventResponse.response).error;
          this.$store.dispatch('errors/changeContent', {title: error.errorMsg, desc: error.errorDesc,});
        } else {
          this.data = data;
        }
      },
      async storeElementData() {
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

<style lang="scss" scoped>
  h2.title {
    font-weight: 700;
    font-size: 20px;
    text-align: center;
    margin: 30px;
  }
  .adm-form__item_content{
    width: 100%;
  }
</style>
