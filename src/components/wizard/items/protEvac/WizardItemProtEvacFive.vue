<template>
  <div v-if="data">
    <div class="adm-form">
      <div class="adm-form__container">
        <h2 class="adm-form__headding" id="evac">Сведения об эвакуации</h2>
        <div class="adm-form__content">
          <div class="adm-form__item">
            <small class="adm-form__label">Организация эвакуатора</small>
            <div class="adm-form__item_content">
              <Row :gutter="16" type="flex" align="middle">
                <Col :xs="22" :md="22" :lg="22">
                  <Input class="adm-input adm-input--regular" @on-input-change="storeElementData" v-model="data.evacOrgName" ></Input>
                </Col>
              </Row>
            </div>
          </div>
          <div class="adm-form__item">
            <small class="adm-form__label">Представитель</small>
            <div class="adm-form__item_content">
              <Row :gutter="16" type="flex" align="middle">
                <Col :xs="22" :md="22" :lg="22">
                  <Input class="adm-input adm-input--regular" @on-input-change="storeElementData" v-model="data.evacAgentName" ></Input>
                </Col>
              </Row>
            </div>
          </div>
          <div class="adm-form__item">
            <small class="adm-form__label">ГРЗ эвакуатора</small>
            <div class="adm-form__item_content">
              <Row :gutter="16" type="flex" align="middle">
                <Col :xs="22" :md="22" :lg="22">
                  <masked-input inputClass="adm-input adm-input--regular wmax240"  v-model="data.evacRegno"  @onInputChange="storeElementData" placeholder="ГРЗ" :maskProps="{regex: '[a-zA-Zа-яА-Я0-9]+', casing: 'upper', placeholder: ''}"  clearable></masked-input>
                </Col>
              </Row>
            </div>
          </div>
          <div class="adm-form__item">
            <small class="adm-form__label">Штрафстоянка</small>
            <div class="adm-form__item_content">
              <Row :gutter="16" type="flex" align="middle">
                <Col :xs="22" :md="22" :lg="22">
                  <AutoComplete
                    v-model="data.impoundLotName"
                    :data="impoundLotList"
                    class="wmin180 adm-input adm-input--regular"
                    icon="ios-arrow-down"
                    :filter-method="filterImpoundLotList"
                    @on-blur="storeElementData"
                    @on-select="storeElementData"
                    placeholder=""
                    clearable>
                  </AutoComplete>
                </Col>
              </Row>
            </div>
          </div>
          <div class="adm-form__item">
            <small class="adm-form__label">№ акта эвакуации</small>
            <div class="adm-form__item_content">
              <Row :gutter="16" type="flex" align="middle">
                <Col :xs="22" :md="22" :lg="22">
                  <!-- <Input class="adm-input adm-input--regular wmax240" @on-input-change="storeElementData" v-model="data.evacActNumber" ></Input> -->
                  <masked-input inputClass="adm-input adm-input--regular wmax240" v-model="data.evacActNumber" @onInputChange="storeElementData" :maskProps="{regex: '[а-яА-Я0-9\/\-]+', casing: 'upper', placeholder: ''}"  clearable></masked-input>
                </Col>
              </Row>
            </div>
          </div>
          <div class="adm-form__item">
            <small class="adm-form__label">Дата и время составления акта эвакуации</small>
            <div class="adm-form__item_content">
              <Row :gutter="16" type="flex" align="middle">
                <Col :xs="22" :md="22" :lg="22">
                  <DatePickerMask class="adm-input adm-input--regular wmin120 wmax180 ivu-date-picker" v-model="data.evacActTime" @change="storeElementData" clearable type="datetime" placeholder="дд/мм/гггг чч:мм" momentFormat="DD/MM/YYYY HH:mm" maskFormat="dd/mm/yyyy HH:MM"></DatePickerMask>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import * as funcUtils from "~/assets/js/utils/funcUtils";
  import RequestApi from "~/assets/js/api/requestApi";
  import wizardItemProtEvacFiveMethods from "~/components/mixins/prot/wizardItemProtEvacFiveMethods";

  export default {
    name: "WizardItemProtEvacFive",
    mixins: [wizardItemProtEvacFiveMethods],
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
        impoundLotList: null
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
          let error = JSON.parse(eventResponse.response).error;
          this.$store.dispatch('errors/changeContent', {title: error.errorMsg, desc: error.errorDesc,});
        } else {
          await this.fillImpoundLotList();
          this.data = data;
        }
      },
      async fillImpoundLotList() {
        this.impoundLotList = [];
        let eventResponse = await RequestApi.prepareData({
          method: 'invokeElementMethod',
          params: {
            eCID: this.info.eCID,
            methodName: 'getImpoundDict',
            data: null
          }
        });
        let responseData = JSON.parse(JSON.parse(eventResponse.response).data);
        if (responseData && responseData.length) {
          responseData.forEach((item) => {
            this.impoundLotList.push(item.NAME);
          });
        }
      },
      filterImpoundLotList(value, option) {
        if (funcUtils.isEmpty(value) || funcUtils.isEmpty(option)) {
          return false;
        }
        return option.toUpperCase().indexOf(value.toUpperCase()) !== -1;
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

<style scoped>

</style>
