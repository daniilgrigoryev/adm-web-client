<template>
  <div v-if="data">
    <div class="adm-form__item">
      <small class="adm-form__label">Дело №</small>
      <div class="adm-form__item_content">
        <Row type="flex" align="middle">
          <Col span="10">
            <masked-input :autofocus="true" inputClass="adm-input adm-input--regular wmin120" :value="data.deloN" :maskProps="maskInputProt" @onInputChange="storeElementData"></masked-input>
          </Col>
          <Col span="6">
            <Button @click="createNewDeloNum" type="text" style="outline: 0!important; box-shadow: none; padding: 0 5px;" class=" bg-transparent-on-hover color-blue-on-hover color-gray-light transition color-blue-on-focus">
              <Icon type="md-key" title="Получить уникальный номер" :size="30" />
            </Button>
          </Col>
        </Row>
      </div>
    </div>
    <div class="adm-form__item">
      <small class="adm-form__label">Протокол №</small>
      <div class="adm-form__item_content">
        <Row type="flex" align="middle">
          <Col span="10">
            <masked-input inputClass="adm-input adm-input--regular wmin120" :maskProps="maskInputProt" v-model="data.docN" @onInputChange="storeElementData"></masked-input>
          </Col>
          <Col span="6">
            <Button @click="createProtNum" type="text" style="outline: 0!important; box-shadow: none; padding: 0 5px;" class=" bg-transparent-on-hover color-blue-on-hover color-gray-light transition color-blue-on-focus">
              <Icon type="md-key" title="Получить уникальный номер" :size="30" />
            </Button>
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
  import * as funcUtils from "../../../../assets/js/utils/funcUtils";
  import * as formStack from '../../../../assets/js/api/formStack';
  import RequestApi from "../../../../assets/js/api/requestApi";
  import DatePickerMask from "~/components/shared/dateTimePicker/DatePickerMask";
  import MaskedInput from "~/components/shared/MaskedInput";
  import wizardItemProtOneMethods from "~/components/mixins/prot/wizardItemProtOneMethods";

  export default {
    name: "WizardItemProtApnOne",
    mixins: [wizardItemProtOneMethods],
    components: {
      DatePickerMask,
      MaskedInput,
    },
    props: {
      info: Object
    },
    async created() {
      await this.initData();
      document.querySelector("input").focus();
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
          let error = JSON.parse(eventResponse.response).error.errorMsg;
          alert(error);
        } else {
          this.data = data;
        }
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
