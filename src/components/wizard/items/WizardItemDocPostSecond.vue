<template>
  <div v-if="data">
    <div class="adm-form">
      <Row :gutter="16" type="flex" align="middle">
        <Col>
          <h2 class="adm-text-big color-dark-light my12">Нарушение</h2>
        </Col>
      </Row>
      <div class="my12 adm-form__item">
        <small class="adm-text-small color-gray-medium adm-form__label">Время нарушения</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <DatePickerMask class="adm-input adm-input--regular wmin120 wmax180" v-model="data.dateNar" @change="changeDateNar" clearable type="time" placeholder="чч:мм" momentFormat="HH:mm" maskFormat="HH:MM"></DatePickerMask>
          </Col>
        </Row>
      </div>
      <div class="my12 adm-form__item">
        <small class="adm-text-small color-gray-medium adm-form__label">п.НПА нарушения</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Select class="adm-input adm-input--regular wmax240 wmin180" placeholder="" v-model="data.pnpaId" clearable filterable @on-change="storeElementData">
              <Option class="wmax360 txt-break-word" v-for="item in pnpaList" :value="item.id" :key="item.id">{{ item.value + ', ' + item.label }}</Option>
            </Select>
          </Col>
        </Row>
      </div>
      <div class="my12 adm-form__item">
        <small class="adm-text-small color-gray-medium adm-form__label">Статья ответственности</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Select class="adm-input adm-input--regular wmax240 wmin180" placeholder="" v-model="data.stotvId" clearable filterable :disabled="!data.dateNar" @on-clear="changeStotvSearchInfo" @on-change="changeStotvSearchInfo">
              <Option class="wmax360 txt-break-word" v-for="item in stotvSearchInfoList" :value="item.id" :key="item.id">{{ item.value + ', ' + item.label }}</Option>
            </Select>
          </Col>
        </Row>
      </div>
      <div class="my12 adm-form__item">
        <small class="adm-text-small color-gray-medium adm-form__label">КБК</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Select class="adm-input adm-input--regular wmax240 wmin180" placeholder="" v-model="data.kbk" clearable filterable :disabled="!data.stotvId" @on-clear="storeElementData" @on-change="storeElementData">
              <Option class="wmax360 txt-break-word" v-for="item in KBKSearchInfoList" :value="item.id" :key="item.id">{{ item.value + ', ' + item.label }}</Option>
            </Select>
          </Col>
        </Row>
      </div>
    </div>
  </div>
</template>

<script>
  import * as funcUtils from "../../../assets/js/utils/funcUtils";
  import * as formStack from '../../../assets/js/api/formStack';
  import RequestApi from "../../../assets/js/api/requestApi";
  import DatePickerMask from "~/components/shared/DatePickerMask";

  export default {
    name: "WizardItemDocPostSecond",
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
      async fillKBKSearchInfo() {
        let eventResponse = await RequestApi.prepareData({
          method: 'invokeElementMethod',
          params: {
            eCID: this.info.eCID,
            methodName: 'getKBKSearchInfo',
            data: JSON.stringify({
              stotvId: this.data.stotvId
            })
          }
        });
        let KBKSearchInfoList = [];
        let KBKSearchInfoDict = JSON.parse(JSON.parse(eventResponse.response).data);
        for (let i = 0; i < KBKSearchInfoDict.length; i++) {
          let KBKSearchInfo = KBKSearchInfoDict[i];
          KBKSearchInfoList.push({
            label: KBKSearchInfo.kbkName,
            value: KBKSearchInfo.kbk,
            id: KBKSearchInfo.id
          });
        }
        this.KBKSearchInfoList = KBKSearchInfoList;
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
