<template>
  <div v-if="data">
    <Row>
      <Col span="12">
        <div class="adm-form__item">
          <small class="adm-text-small color-gray-medium adm-form__label">Протокол №</small>
          <div class="adm-form__item_content">
            <Row type="flex" align="middle">
              <Col span="18">
                <masked-input inputClass="adm-input adm-input--regular" :maskProps="maskInputProt" v-model="data.docN" @onInputChange="storeElementData"></masked-input>
              </Col>
              <Col span="6">
                <Button @click="createProtNum" type="text" style="outline: 0!important; box-shadow: none" class="py0 px0 mr18 bg-transparent-on-hover">
                  <Icon type="md-key"  class="bg-whte color-gray-light color-blue-on-hover transition" title="Получить уникальный номер" :size="35" />
                </Button>
              </Col>
            </Row>
          </div>
        </div>
      </Col>
      <Col span="12">
        <div class="adm-form__item">
          <small class="adm-text-small color-gray-medium adm-form__label">Дата и время составления</small>
          <div class="adm-form__item_content">
            <DatePickerMask class="adm-input adm-input--regular wmin120 ivu-date-picker" v-model="data.dateSost" @change="storeElementData" clearable type="datetime" placeholder="дд/мм/гггг чч:мм" momentFormat="DD/MM/YYYY HH:mm" maskFormat="dd/mm/yyyy HH:MM"></DatePickerMask>
          </div>
        </div>
      </Col>
    </Row>
  </div>
</template>

<script>
  import * as funcUtils from "../../../../assets/js/utils/funcUtils";
  import * as formStack from '../../../../assets/js/api/formStack';
  import RequestApi from "../../../../assets/js/api/requestApi";
  import DatePickerMask from "~/components/shared/dateTimePicker/DatePickerMask";
  import MaskedInput from "~/components/shared/MaskedInput";

  export default {
    name: "WizardItemProtEvacOne",
    components: {
      DatePickerMask,
      MaskedInput,
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
          regex: '[0-9]+',
          casing: 'upper',
          placeholder: 'номер протокола'
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
      async createProtNum() {
        let eventResponse = await RequestApi.prepareData({
          method: 'invokeElementMethod',
          params: {
            eCID: this.info.eCID,
            methodName: 'createProtNum',
            data: null
          }
        });
        let data = JSON.parse(JSON.parse(eventResponse.response).data);
        if (funcUtils.isEmpty(data)) {
          let error = JSON.parse(eventResponse.response).error.errorMsg;
          alert(error);
        } else {
          this.data = data;

          if (funcUtils.isNotEmpty(data.dateNar)) {
            this.fillStotvSearchInfo();
          }
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

  .adm-form__item{
    display: flex;
    align-items: center;
  }
  .adm-form__label{
    padding: 0;
    min-width: 130px;
    padding-right: 12px;
  }
  .adm-form__item_content{
    width: 100%;
  }
</style>