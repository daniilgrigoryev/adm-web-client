<template>
  <div v-if="data">
    <div class="adm-form__item">
      <small class="adm-text-small color-gray-medium adm-form__label">Пункт НПА</small>
      <div class="adm-form__item_content">
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="24" :lg="24">
            <Select class="adm-input adm-input--regular wmin180" placeholder="" v-model="data.pnpaId" clearable filterable @on-change="storeElementData">
              <Option class="txt-break-word" v-for="item in pnpaList" :value="item.id" :key="item.id">{{ item.value + ', ' + item.label }}</Option>
            </Select>
          </Col>
        </Row>
      </div>
    </div>
    <div class="adm-form__item">
      <small class="adm-text-small color-gray-medium adm-form__label">Статья КРФоАП</small>
      <div class="adm-form__item_content">
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="24" :lg="24">
            <Select class="adm-input adm-input--regular wmin180" placeholder="" v-model="data.stotvId" clearable filterable :disabled="!data.dateNar" @on-change="storeElementData">
              <Option class="txt-break-word" v-for="item in stotvSearchInfoList" :value="item.id" :key="item.id">{{ item.value + ', ' + item.label }}</Option>
            </Select>
          </Col>
        </Row>
      </div>
    </div>
    <div class="adm-form__item">
      <small class="adm-text-small color-gray-medium adm-form__label">Фактические сведения</small>
      <div class="adm-form__item_content">
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="24" :lg="24">
            <Input class="adm-input adm-input--regular" @on-input-change="storeElementData" v-model="data.factSved" ></Input>
          </Col>
        </Row>
      </div>
    </div>
  </div>
</template>

<script>
  import * as funcUtils from "../../../../assets/js/utils/funcUtils";
  import * as formStack from '../../../../assets/js/api/formStack';
  import RequestApi from "../../../../assets/js/api/requestApi";

  export default {
    name: "WizardItemProtEvacFour",
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
      },
       async fillPnpaList() {
        let eventResponse = await RequestApi.prepareData({
          method: 'invokeElementMethod',
          params: {
            eCID: this.info.eCID,
            methodName: 'getPnpaDict',
            data: null
          }
        });
        let pnpaList = [];
        let pnpaDict = JSON.parse(JSON.parse(eventResponse.response).data);
        for (let i = 0; i < pnpaDict.length; i++) {
          let pnpa = pnpaDict[i];
          pnpaList.push({
            label: pnpa.PNPA_NAME,
            value: pnpa.PNPA_KOD,
            id: pnpa.PNPA_ID
          });
        }
        this.pnpaList = pnpaList;
      },
      async fillStotvSearchInfo() {
        let eventResponse = await RequestApi.prepareData({
          method: 'invokeElementMethod',
          params: {
            eCID: this.info.eCID,
            methodName: 'getStotvSearchInfo',
            data: JSON.stringify({
              date: this.data.dateNar
            })
          }
        });
        let stotvSearchInfoList = [];
        let stotvSearchInfoDict = JSON.parse(JSON.parse(eventResponse.response).data);
        for (let i = 0; i < stotvSearchInfoDict.length; i++) {
          let stotvSearchInfo = stotvSearchInfoDict[i];
          stotvSearchInfoList.push({
            label: stotvSearchInfo.stotvName,
            value: stotvSearchInfo.stotvKod,
            id: stotvSearchInfo.stotvId
          });
        }
        this.stotvSearchInfoList = stotvSearchInfoList;
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
