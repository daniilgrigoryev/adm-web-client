<template>
  <div v-if="data">
    <div class="adm-form__item">
      <small class="adm-form__label">Дата и время нарушения</small>
      <div class="adm-form__item_content">
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <DatePickerMask class="adm-input adm-input--regular wmin120 wmax180 ivu-date-picker" v-model="data.dateNar" @change="storeElementData" clearable type="datetime" placeholder="дд/мм/гггг чч:мм" momentFormat="DD/MM/YYYY HH:mm" maskFormat="dd/mm/yyyy HH:MM"></DatePickerMask>
          </Col>
        </Row>
      </div>
    </div>
    <slot></slot>
    <div class="adm-form__item">
      <small class="adm-form__label">Пункт НПА</small>
      <div class="adm-form__item_content">
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="22" :lg="22">
            <CustomSelect class="adm-input adm-input--regular wmin180" placeholder="" v-model="data.pnpaId" clearable filterable @on-change="storeElementData" @on-enter="storeElementData" :filterMethod="filterStotv">
              <Option class="" v-for="item in pnpaList" :value="item.id" :key="item.id">{{ item.value + ', ' + item.label }}</Option>
            </CustomSelect>
          </Col>
        </Row>
      </div>
    </div>
    <div class="adm-form__item">
      <small class="adm-form__label">Статья КРФоАП</small>
      <div class="adm-form__item_content">
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="22" :lg="22">
            <CustomSelect class="adm-input adm-input--regular wmin180" placeholder="" v-model="data.stotvId" clearable filterable @on-change="changeStotvSearchInfo" @on-enter="changeStotvSearchInfo" :filterMethod="filterStotv">
              <Option class="" v-for="item in stotvSearchInfoList" :value="item.id" :key="item.id">{{ item.value + ', ' + item.label }}</Option>
            </CustomSelect>
          </Col>
        </Row>
      </div>
    </div>
    <div class="adm-form__item" v-if="KBKSearchInfoList">
      <small class="adm-form__label">КБК</small>
      <Row :gutter="16" type="flex" align="middle">
        <Col :xs="24" :md="14" :lg="16">
          <CustomSelect class="adm-input adm-input--regular wmax240 wmin180" placeholder="" v-model="data.kbk" clearable filterable :disabled="!data.stotvId" @on-change="storeElementData" @on-enter="storeElementData">
            <Option class="wmax360 " v-for="item in KBKSearchInfoList" :value="item.value" :key="item.value">{{ item.value + ', ' + item.label }}</Option>
          </CustomSelect>
        </Col>
      </Row>
    </div>
    <div class="adm-form__item">
      <small class="adm-form__label">Фактические сведения</small>
      <div class="adm-form__item_content">
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="22" :lg="22">
            <AutoComplete
              v-model="data.factSved"
              :data="factSvedList"
              class="wmin180 adm-input adm-input--regular"
              icon="ios-arrow-down"
              :filter-method="filterfactSvedList"
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
      <small class="adm-form__label">Признание вины</small>
      <Row :gutter="16" type="flex" align="middle">
        <Col :xs="24" :md="14" :lg="16">
          <CustomSelect class="adm-input adm-input--regular wmax240 wmin180" placeholder="" v-model="data.guiltAdmissionType" clearable filterable @on-change="storeElementData" @on-enter="storeElementData">
            <Option class="wmax360 " v-for="item in guiltAdmissionDictionaryList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </CustomSelect>
        </Col>
      </Row>
    </div>
    <div class="adm-form__item">
      <small class="adm-form__label">Пояснения нарушителя</small>
      <div class="adm-form__item_content">
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="22" :md="22" :lg="22">
            <Input class="adm-input adm-input--regular" v-model="data.violatorClarification" @on-input-change="storeElementData"  :maxlength="255" clearable></Input>
          </Col>
        </Row>
      </div>
    </div>
    <div class="adm-form__item">
      <small class="adm-form__label">Пояснения должностного лица</small>
      <div class="adm-form__item_content">
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="22" :md="22" :lg="22">
            <Input class="adm-input adm-input--regular" v-model="data.officialClarification" @on-input-change="storeElementData"  :maxlength="255" clearable></Input>
          </Col>
        </Row>
      </div>
    </div>
    <list-items-docs :items="data.inculpatoryEvidencesList" title="Список доказательств виновности" @change="storeElementData"></list-items-docs>
    <!-- <list-items-docs :items="data.exculpatoryEvidencesList" title="Список доказательств невиновности" :disabledFields="{ quantity: true }" @change="storeElementData"></list-items-docs> -->
  </div>
</template>

<script>
  import * as funcUtils from "~/assets/js/utils/funcUtils";
  import RequestApi from "~/assets/js/api/requestApi";
  import wizardItemDocPostSecondMethods from "~/components/mixins/post/wizardItemDocPostSecondMethods.js";

  export default {
    name: "WizardItemDocPostSecond",
    mixins: [wizardItemDocPostSecondMethods],
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
          this.$store.dispatch('errorsModal/changeContent', {title: error.errorMsg, desc: error.errorDesc,});
        } else {
          await this.fillPnpaList();
          await this.fillStotvSearchInfo();
          await this.fillFactSved();
          await this.fillGuiltAdmissionDictionary();
          this.data = data;
        }

        if (funcUtils.isNotEmpty(this.data.stotvId)) {
          this.fillKBKSearchInfo();
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

<style scoped>

</style>
