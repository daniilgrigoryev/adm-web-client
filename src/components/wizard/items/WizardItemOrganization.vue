<template>
  <div v-if="data">
    <Form :label-width="200" abel-position="right">
      <FormItem class="my12">
        <small class="adm-text-small color-gray-medium" slot="label">Название организации</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :sm="6" :md="6" :lg="16">
            <Input v-model="data.name" @on-change="storeElementData" placeholder="Enter something..."></Input>
          </Col>
        </Row>
      </FormItem>
      <FormItem class="my12">
        <small class="adm-text-small color-gray-medium" slot="label">ИНН</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :sm="6" :md="6" :lg="16">
            <Input v-model="data.inn" @on-change="storeElementData" placeholder="Enter something..."></Input>
          </Col>
        </Row>
      </FormItem>
      <FormItem class="my12">
        <small class="adm-text-small color-gray-medium" slot="label">ИНН кем выдан</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :sm="6" :md="6" :lg="16">
            <Input v-model="data.innKemVydan" @on-change="storeElementData" placeholder="Enter something..."></Input>
          </Col>
        </Row>
      </FormItem>
      <FormItem class="my12">
        <small class="adm-text-small color-gray-medium" slot="label">ОГРН</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :sm="6" :md="6" :lg="16">
            <Input v-model="data.ogrn" @on-change="storeElementData" placeholder="Enter something..."></Input>
          </Col>
        </Row>
      </FormItem>
      <FormItem class="my12">
        <small class="adm-text-small color-gray-medium" slot="label">КПП</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :sm="6" :md="6" :lg="16">
            <Input v-model="data.kpp" @on-change="storeElementData" placeholder="Enter something..."></Input>
          </Col>
        </Row>
      </FormItem>
      <FormItem class="my12">
        <small class="adm-text-small color-gray-medium" slot="label">ОКПО</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :sm="6" :md="6" :lg="16">
            <Input v-model="data.okpo" @on-change="storeElementData" placeholder="Enter something..."></Input>
          </Col>
        </Row>
      </FormItem>
      <FormItem class="my12">
        <small class="adm-text-small color-gray-medium" slot="label">Дата регистрации Юр. лица</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :sm="6" :md="6" :lg="16">
            <Input v-model="data.dateReg" @on-change="storeElementData" placeholder="Enter something..."></Input>
          </Col>
        </Row>
      </FormItem>
      <FormItem class="my12">
        <small class="adm-text-small color-gray-medium" slot="label">Тип ЮЛ</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :sm="6" :md="6" :lg="16">
            <Select class="wmax240 wmin180" placeholder="" v-model="data.tip" filterable clearable @on-clear="storeElementData" @on-change="storeElementData">
              <Option v-for="item in tipULList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </Col>
        </Row>
      </FormItem>
      <FormItem class="my12">
        <small class="adm-text-small color-gray-medium" slot="label">Форма собственности</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :sm="6" :md="6" :lg="16">
            <Select class="wmax240 wmin180" placeholder="" v-model="data.fsobstKod" filterable clearable @on-clear="storeElementData" @on-change="storeElementData">
              <Option v-for="item in formSobstvList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </Col>
        </Row>
      </FormItem>
      <FormItem class="my12">
        <small class="adm-text-small color-gray-medium" slot="label">ОПФ</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :sm="6" :md="6" :lg="16">
            <Select class="wmax240 wmin180" placeholder="" v-model="data.orgformKod" filterable clearable @on-clear="storeElementData" @on-change="storeElementData">
              <Option v-for="item in orgFormList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </Col>
        </Row>
      </FormItem>
      <FormItem class="my12">
        <small class="adm-text-small color-gray-medium" slot="label">Ведомство</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :sm="6" :md="6" :lg="16">
            <Select class="wmax240 wmin180" v-model="data.vedomstvoId" filterable clearable @on-clear="storeElementData" @on-change="storeElementData">
              <Option v-for="item in vedomstList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </Col>
        </Row>
      </FormItem>
    </Form>
  </div>
</template>

<script>
  import * as funcUtils from "../../../assets/js/utils/funcUtils";
  import * as formStack from '../../../assets/js/api/formStack';
  import RequestApi from "../../../assets/js/api/requestApi";

  export default {
    name: "WizardItemOrganization",
    props: {
      info: Object
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
        vedomstList: null
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
