<template>
  <div v-if="data">
    <wizard-modal v-if="ulModal.visible" :columnsOptions="ulModal.columnsOptions" :data="ulModal.ulList" @showModal="showUlModal" @onRowDbClick="onUlClick"></wizard-modal>
    <div class="adm-form__item">
      <small class="adm-form__label">Наименование</small>
      <Row :gutter="16" type="flex" align="middle">
        <Col :xs="16" :md="16" :lg="16">
          <Input class="adm-input adm-input--regular wmax360" v-model="data.name" @on-input-change="storeElementData" ></Input>
        </Col>
      </Row>
    </div>
    <div class="adm-form__item">
      <small class="adm-form__label">Телефон</small>
      <Row :gutter="16" type="flex" align="middle">
        <Col :xs="24" :md="22" :lg="22">
          <masked-input inputClass="adm-input adm-input--regular wmax360" :maskProps="{regex: '[0-9()+-]+', placeholder: ''}" v-model="data.phone" @onInputChange="storeElementData"></masked-input>
        </Col>
      </Row>
    </div>
    <div class="adm-form__item">
      <small class="adm-form__label">ИНН</small>
      <Row :gutter="16" type="flex" align="middle">
        <Col :xs="16" :md="16" :lg="16">
          <Input class="adm-input adm-input--regular wmax360" v-model="data.inn" @on-input-change="storeElementData" ></Input>
        </Col>
      </Row>
    </div>
    <div class="adm-form__item">
      <small class="adm-form__label">КПП</small>
      <Row :gutter="16" type="flex" align="middle">
        <Col :xs="24" :md="6" :lg="6">
          <Input class="adm-input adm-input--regular" v-model="data.kpp" @on-input-change="storeElementData" ></Input>
        </Col>
      </Row>
    </div>
    <div class="adm-form__item">
      <small class="adm-form__label">Дата регистрации</small>
      <Row :gutter="16" type="flex" align="middle">
        <Col :xs="24" :md="14" :lg="16">
          <DatePickerMask class="adm-input adm-input--regular wmin120 wmax180" v-model="data.dateReg" @change="storeElementData" clearable type="date" placeholder="дд/мм/гггг" momentFormat="DD/MM/YYYY" maskFormat="dd/mm/yyyy"></DatePickerMask>
        </Col>
      </Row>
    </div>
    <div class="adm-form__item">
      <small class="adm-form__label">ОГРН</small>
      <Row :gutter="16" type="flex" align="middle">
        <Col :xs="24" :md="6" :lg="6">
          <Input class="adm-input adm-input--regular" v-model="data.ogrn" @on-input-change="storeElementData" ></Input>
        </Col>
      </Row>
    </div>
  </div>
</template>

<script>
  import * as funcUtils from "~/assets/js/utils/funcUtils";
  import RequestApi from "~/assets/js/api/requestApi";

  export default {
    name: "WizardItemOrganization",
    components: {
      WizardModal: () => import('~/components/wizard/items/WizardModal'),
    },
    props: {
      info: Object,
      title: String
    },
    async created() {
      await this.initData();
    },
    data() {
      return {
        data: null,
        formSobstvList: null,
        orgFormList: null,
        tipULList: null,
        vedomstList: null,
        ulModal: {
          visible: false,
          ulList: null,
          srcList: null,
          columnsOptions:
            [
              {
                title: 'Название организации',
                key: 'name',
                minWidth: 120,
                ellipsis: true,
                sortable: 'custom',
                filterable: true,
                tooltip: true,
                renderHeader: (h, params) => {
                  return h('h4', params.column.title)
                }
              },
              {
                title: 'ИНН',
                key: 'inn',
                minWidth: 120,
                ellipsis: true,
                sortable: 'custom',
                filterable: true,
                tooltip: true,
                renderHeader: (h, params) => {
                  return h('h4', params.column.title)
                }
              },
              {
                title: 'ОГРН',
                key: 'ogrn',
                minWidth: 120,
                ellipsis: true,
                sortable: 'custom',
                filterable: true,
                tooltip: true,
                renderHeader: (h, params) => {
                  return h('h4', params.column.title)
                }
              },
              {
                title: 'ОКПО',
                key: 'okpo',
                minWidth: 120,
                ellipsis: true,
                sortable: 'custom',
                filterable: true,
                tooltip: true,
                renderHeader: (h, params) => {
                  return h('h4', params.column.title)
                }
              },
              {
                title: 'КПП',
                key: 'kpp',
                minWidth: 120,
                ellipsis: true,
                sortable: 'custom',
                filterable: true,
                tooltip: true,
                renderHeader: (h, params) => {
                  return h('h4', params.column.title)
                }
              },
              {
                title: 'Адрес',
                key: 'streetName',
                minWidth: 120,
                ellipsis: true,
                sortable: 'custom',
                filterable: true,
                tooltip: true,
                renderHeader: (h, params) => {
                  return h('h4', params.column.title)
                }
              }
            ]
        }
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

        await this.fillFormSobstvList();
        await this.fillOrgFormList();
        await this.fillTipULList();
        await this.fillVedomstList();
      },
      async fillFormSobstvList() {
        let eventResponse = await RequestApi.prepareData({
          method: 'invokeElementMethod',
          params: {
            eCID: this.info.eCID,
            methodName: 'getFormSobstvDictionary',
            data: null
          }
        });
        let formSobstvList = [];
        let formSobstvDict = JSON.parse(JSON.parse(eventResponse.response).data);
        for (let i = 0; i < formSobstvDict.length; i++) {
          let formSobstv = formSobstvDict[i];
          formSobstvList.push({
            label: formSobstv.FSOBST_NAME,
            value: formSobstv.FSOBST_KOD
          });
        }
        this.formSobstvList = formSobstvList;
      },
      async fillOrgFormList() {
        let eventResponse = await RequestApi.prepareData({
          method: 'invokeElementMethod',
          params: {
            eCID: this.info.eCID,
            methodName: 'getOrgFormDictionary',
            data: null
          }
        });
        let orgFormList = [];
        let orgFormDict = JSON.parse(JSON.parse(eventResponse.response).data);
        for (let i = 0; i < orgFormDict.length; i++) {
          let orgForm = orgFormDict[i];
          orgFormList.push({
            label: orgForm.ORGFORM_NAME,
            value: orgForm.ORGFORM_KOD
          });
        }
        this.orgFormList = orgFormList;
      },
      async fillTipULList() {
        let eventResponse = await RequestApi.prepareData({
          method: 'invokeElementMethod',
          params: {
            eCID: this.info.eCID,
            methodName: 'getTipULDictionary',
            data: null
          }
        });
        let tipULList = [];
        let tipULDict = JSON.parse(JSON.parse(eventResponse.response).data);
        for (let i = 0; i < tipULDict.length; i++) {
          let tipUL = tipULDict[i];
          tipULList.push({
            label: tipUL.TIP_UL_NAME,
            value: i
          });
        }
        this.tipULList = tipULList;
      },
      async fillVedomstList() {
        let eventResponse = await RequestApi.prepareData({
          method: 'invokeElementMethod',
          params: {
            eCID: this.info.eCID,
            methodName: 'getVedomstDictionary',
            data: null
          }
        });
        let vedomstList = [];
        let vedomstDict = JSON.parse(JSON.parse(eventResponse.response).data);
        for (let i = 0; i < vedomstDict.length; i++) {
          let vedomst = vedomstDict[i];
          vedomstList.push({
            label: vedomst.VED_NAME,
            value: vedomst.VED_ID
          });
        }
        this.vedomstList = vedomstList;
      },

      async searchUlByName() {
        if (funcUtils.isNotEmpty(this.data.name) && this.data.name.length > 2) {
          let eventResponse = await RequestApi.prepareData({
            method: 'invokeElementMethod',
            params: {
              eCID: this.info.eCID,
              methodName: 'getUlList',
              data: JSON.stringify({
                name: this.data.name,
                inn: null,
              })
            }
          });
          let ulList = JSON.parse(JSON.parse(eventResponse.response).data);
          if (ulList.length > 0) {
            this.ulModal.ulList = ulList;
            this.ulModal.visible = true;
          }
        }
      },
      async searchUlByInn() {
        let express = /^\d{10}$/;
        if (funcUtils.isNotEmpty(this.data.inn) && express.test(this.data.inn)) {
          let eventResponse = await RequestApi.prepareData({
            method: 'invokeElementMethod',
            params: {
              eCID: this.info.eCID,
              methodName: 'getUlList',
              data: JSON.stringify({
                name: null,
                inn: this.data.inn,
              })
            }
          });
          let ulList = JSON.parse(JSON.parse(eventResponse.response).data);
          if (ulList.length > 0) {
            this.ulModal.ulList = ulList;
            this.ulModal.visible = true;
          }
        }
      },

      showUlModal(visible) {
        this.ulModal.visible = visible;
        this.ulModal.ulList = null;
      },

      async onUlClick(data) {
        this.data.id = data.ulId;
        this.data.name = data.name;
        this.data.inn = data.inn;
        this.data.ogrn = data.ogrn;
        this.data.kpp = data.kpp;
        this.data.okpo = data.okpo;
        this.ulModal.visible = false;
        this.ulModal.ulList = null;
        await this.storeElementData();
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
