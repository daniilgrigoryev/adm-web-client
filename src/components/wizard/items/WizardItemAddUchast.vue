<template>
  <div v-if="data">
    <div class="adm-form__item">
      <small class="adm-form__label">Статус участника</small>
      <Row :gutter="16" type="flex" align="middle">
        <Col :xs="24" :md="14" :lg="16">
        <CustomSelect class="adm-input adm-input--regular wmax360 wmin180" placeholder="" v-model="data.status" clearable @on-change="changeStatus" @on-enter="changeStatus">
          <Option class="wmax360" v-for="item in statusList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </CustomSelect>
        </Col>
      </Row>
    </div>
    <div class="adm-form__item">
      <small class="adm-form__label">Вид</small>
      <Row :gutter="16" type="flex" align="middle">
        <Col :xs="24" :md="14" :lg="16">
          <CustomSelect class="adm-input adm-input--regular wmax360 wmin180" placeholder="" v-model="data.vid" clearable @on-change="changeVid" @on-enter="changeVid">
            <Option class="wmax360" v-for="item in vidList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </CustomSelect>
        </Col>
      </Row>
    </div>
    <div class="adm-form__item" v-if="vehsList && vehsList.length > 0">
      <small class="adm-form__label">Список ТС</small>
      <Row :gutter="16" type="flex" align="middle">
        <Col :xs="24" :md="14" :lg="16">
          <CustomSelect class="adm-input adm-input--regular wmax360 wmin180" placeholder="" v-model="data.vehsId" clearable @on-change="storeElementData" @on-enter="storeElementData">
            <Option class="wmax360" v-for="item in vehsList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </CustomSelect>
        </Col>
      </Row>
    </div>
    <div class="adm-form__item" v-if="tipList && tipList.length > 0">
      <small class="adm-form__label">Тип участника</small>
      <Row :gutter="16" type="flex" align="middle">
        <Col :xs="24" :md="14" :lg="16">
          <CustomSelect class="adm-input adm-input--regular wmax360 wmin180" placeholder="" v-model="data.tip" clearable @on-change="storeElementData" @on-enter="storeElementData" :disabled="!data.status">
            <Option class="wmax360" v-for="item in tipList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </CustomSelect>
        </Col>
      </Row>
    </div>
  </div>
</template>

<script>
  import RequestApi from "~/assets/js/api/requestApi";
  import * as funcUtils from "~/assets/js/utils/funcUtils";

  export default {
    name: "WizardItemAddUchast",
    props: {
      info: Object,
      title: String
    },
    components: {
    },
    async created() {
      await this.initData();
    },
    data() {
      return {
        data: null,
        statusList: null,
        tipList: null,
        vidList: null,
        tipVidList: null,
        vehsList: null,
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

        await this.fillStatusList();
        await this.fillTipVidList();
        await this.fillVidList();
        await this.fillTipList();
        await this.fillVehsList();
      },
      async fillStatusList() {
        let eventResponse = await RequestApi.prepareData({
          method: 'invokeElementMethod',
          params: {
            eCID: this.info.eCID,
            methodName: 'getStatusDict',
            data: null
          }
        });
        let statusList = [];
        let statusDict = JSON.parse(JSON.parse(eventResponse.response).data);
        for (let i = 0; i < statusDict.length; i++) {
          let status = statusDict[i];
          statusList.push({
            label: status.UCHAST_STATUS_NAME,
            value: status.UCHAST_STATUS
          });
        }
        this.statusList = statusList;
      },
      async fillVidList() {
        let eventResponse = await RequestApi.prepareData({
          method: 'invokeElementMethod',
          params: {
            eCID: this.info.eCID,
            methodName: 'getVidDict',
            data: null
          }
        });
        let vidList = [];
        let vidDict = JSON.parse(JSON.parse(eventResponse.response).data);
        for (let i = 0; i < vidDict.length; i++) {
          let vid = vidDict[i];
          vidList.push({
            label: vid.UCHAST_VID_NAME,
            value: vid.UCHAST_VID
          });
        }
        this.vidList = vidList;
      },
      async fillTipList() {
        let tipList = [];
        if (funcUtils.isNotEmpty(this.data.status)) {
          let eventResponse = await RequestApi.prepareData({
            method: 'invokeElementMethod',
            params: {
              eCID: this.info.eCID,
              methodName: 'getTipDict',
              data: JSON.stringify({
                status: this.data.status
              })
            }
          });
          let tipDict = JSON.parse(JSON.parse(eventResponse.response).data);
          for (let i = 0; i < tipDict.length; i++) {
            let tip = tipDict[i];
            if (this.tipVidList.includes(tip.UCHAST_TIP)) {
              tipList.push({
                label: tip.UCHAST_TIP_NAME,
                value: tip.UCHAST_TIP
              });
            }
          }
        }
        this.tipList = tipList;
      },
      async fillTipVidList() {
        let eventResponse = await RequestApi.prepareData({
          method: 'invokeElementMethod',
          params: {
            eCID: this.info.eCID,
            methodName: 'getTipVidDictionary',
            data: null
          }
        });
        let tipVidList = [];
        let tipVidDict = JSON.parse(JSON.parse(eventResponse.response).data);
        for (let i = 0; i < tipVidDict.length; i++) {
          let tipVid = tipVidDict[i];
          if (this.data.vid === tipVid.UCHAST_VID && funcUtils.isNotEmpty(tipVid.UCHAST_TIP)) {
            tipVidList.push(tipVid.UCHAST_TIP);
          }
        }
        this.tipVidList = tipVidList;
      },
      async fillVehsList() {
        let eventResponse = await RequestApi.prepareData({
          method: 'invokeElementMethod',
          params: {
            eCID: this.info.eCID,
            methodName: 'getVehsList',
            data: null
          }
        });
        let vehsList = [];
        if (eventResponse.response) {
          let vehsDict = JSON.parse(JSON.parse(eventResponse.response).data);
          for (let i = 0; i < vehsDict.length; i++) {
            let vehs = vehsDict[i];
            vehsList.push({
              label: vehs.regno,
              value: vehs.id
            });
          }
        }
        this.vehsList = vehsList;
      },
      async changeStatus() {
        await this.storeElementData();
        this.data.tip = null;
        this.data.vid = null;
        await this.fillTipVidList();
        await this.fillTipList();
      },
      async changeVid() {
        await this.storeElementData();
        this.data.tip = null;
        await this.fillTipVidList();
        await this.fillTipList();
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
