<template>
  <div v-if="data">
    <div class="adm-form">
      <div class="adm-form__container">
        <h2 class="adm-form__headding">Нарушение</h2>
        <div class="adm-form__item">
          <small class="adm-form__label">Дата и время нарушения</small>
          <Row :gutter="16" type="flex" align="middle">
            <Col :xs="24" :md="14" :lg="16">
              <DatePickerMask class="adm-input adm-input--regular wmin120 wmax180" v-model="data.dateNar" @change="changeDateNar" clearable type="datetime" placeholder="дд/мм/гггг чч:мм" momentFormat="DD/MM/YYYY HH:mm" maskFormat="dd/mm/yyyy HH:MM"></DatePickerMask>
            </Col>
          </Row>
        </div>
        <div class="adm-form__item">
          <small class="adm-form__label">п.НПА нарушения</small>
          <Row :gutter="16" type="flex" align="middle">
            <Col :xs="24" :md="14" :lg="16">
              <Select class="adm-input adm-input--regular wmax240 wmin180" placeholder="" v-model="data.pnpaId" clearable filterable @on-change="storeElementData">
                <Option class="wmax360 " v-for="item in pnpaList" :value="item.id" :key="item.id">{{ item.value + ', ' + item.label }}</Option>
              </Select>
            </Col>
          </Row>
        </div>
        <div class="adm-form__item">
          <small class="adm-form__label">Статья ответственности</small>
          <Row :gutter="16" type="flex" align="middle">
            <Col :xs="24" :md="14" :lg="16">
              <Select class="adm-input adm-input--regular wmax240 wmin180" placeholder="" v-model="data.stotvId" clearable filterable :disabled="!data.dateNar" @on-clear="changeStotvSearchInfo" @on-change="changeStotvSearchInfo">
                <Option class="wmax360 " v-for="item in stotvSearchInfoList" :value="item.id" :key="item.id">{{ item.value + ', ' + item.label }}</Option>
              </Select>
            </Col>
          </Row>
        </div>
        <div class="adm-form__item">
          <small class="adm-form__label">КБК</small>
          <Row :gutter="16" type="flex" align="middle">
            <Col :xs="24" :md="14" :lg="16">
              <Select class="adm-input adm-input--regular wmax240 wmin180" placeholder="" v-model="data.kbk" clearable filterable :disabled="!data.stotvId" @on-change="storeElementData">
                <Option class="wmax360 " v-for="item in KBKSearchInfoList" :value="item.id" :key="item.id">{{ item.value + ', ' + item.label }}</Option>
              </Select>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import * as funcUtils from "../../../assets/js/utils/funcUtils";
  import * as formStack from '../../../assets/js/api/formStack';
  import RequestApi from "../../../assets/js/api/requestApi";
  import DatePickerMask from "~/components/shared/dateTimePicker/DatePickerMask";
  import wizardItemDocPostSecondMethods from "~/components/mixins/post/wizardItemDocPostSecondMethods.js";

  export default {
    name: "WizardItemDocPostSecond",
    mixins: [wizardItemDocPostSecondMethods],
    components: {
      DatePickerMask
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
        let data = JSON.parse(JSON.parse(eventResponse.response).data);
        if (funcUtils.isEmpty(data)) {
          let error = JSON.parse(eventResponse.response).error.errorMsg;
          alert(error);
        } else {
          await this.fillPnpaList();

          this.data = data;

          if (funcUtils.isNotEmpty(data.dateNar)) {
            this.fillStotvSearchInfo();
          }
        }

        if (funcUtils.isNotEmpty(this.data.stotvId)) {
          this.fillKBKSearchInfo();
        }
      },

      changeDateNar() {
        this.stotvSearchInfoList = null;
        this.data.stotvId = null;
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
