<template>
  <div v-if="data">
    <div class="adm-form">
      <div class="adm-form__container mt6">
        <h2 class="adm-form__headding" >Лицо в отношении которого заводится дело (ЛВОК)</h2>
        <div class="adm-form__item">
          <small class="adm-form__label">Статус</small>
          <Row :gutter="16" type="flex" align="middle">
            <Col>
              <Select class="wmax240 wmin180 adm-input adm-input--regular" placeholder="" v-model="data.status" clearable @on-change="changeStatus">
                <Option class="wmax360 " v-for="item in statusList" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </Col>
          </Row>
        </div>
        <div class="adm-form__item">
          <small class="adm-form__label">Гражданство:</small>
          <Row :gutter="16" type="flex" align="middle">
            <Col :xs="24" :md="14" :lg="16">
              <Select class="adm-input adm-input--regular wmin180" v-model="data.gragdKod" filterable clearable @on-change="storeElementData"  placeholder="">
                <Option class="wmax360 " v-for="item in gragdanstvoList" :value="item.value" :key="item.value">{{item.label }}</Option>
              </Select>
            </Col>
          </Row>
        </div>
        <div class="adm-form__item">
          <small class="adm-form__label">ФИО:</small>
          <Row :gutter="16" type="flex" align="middle">
            <Col :xs="24" :md="14" :lg="16">
              <Input class="adm-input adm-input--regular" v-model="data.lvokName" disabled></Input>
            </Col>
          </Row>
        </div>
        <div class="adm-form__item">
          <small class="adm-form__label">Место рождения</small>
          <Row :gutter="16" type="flex" align="middle">
            <Col :xs="24" :md="14" :lg="16">
              <Select class="adm-input adm-input--regular wmax240 wmin180" placeholder="" v-model="data.birthMestoKod" filterable clearable @on-change="storeElementData">
                <Option class="wmax360 " v-for="item in birthList" :value="item.value" :key="item.value">{{item.label }}</Option>
              </Select>
            </Col>
          </Row>
        </div>
        <div class="adm-form__item">
          <small class="adm-form__label">Присутствие ЛВОКа:</small>
          <Row :gutter="16" type="flex" align="middle">
            <Col :xs="24" :md="14" :lg="16">
              <Select class="adm-input adm-input--regular wmin180" v-model="data.presentType" :disabled="!data.status" filterable clearable @on-change="storeElementData" placeholder="">
                <Option class="wmax360 " v-for="item in presenceTypeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import RequestApi from "~/assets/js/api/requestApi";

  export default {
    name: "WizardItemLvok2025",
    props: {
      info: Object
    },
    async created() {
      await this.initData();
    },
    data() {
      return {
        data: null,
        statusList: null,
        birthList: null,
        gragdanstvoList: null,
        presenceTypeList: null
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
        await this.fillBirthList();
        await this.fillGragdanstvoList();

        if (this.data.status) {
          await this.fillPresenceTypeList();
        }
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
      async fillPresenceTypeList() {
        let eventResponse = await RequestApi.prepareData({
          method: 'invokeElementMethod',
          params: {
            eCID: this.info.eCID,
            methodName: 'getPresenceTypeDict',
            data: JSON.stringify({
              status: this.data.status
            })
          }
        });
        let presenceTypeList = [];
        let presenceTypeDict = JSON.parse(JSON.parse(eventResponse.response).data);
        for (let i = 0; i < presenceTypeDict.length; i++) {
          let presenceType = presenceTypeDict[i];
          presenceTypeList.push({
            label: presenceType.name,
            value: presenceType.id
          });
        }
        this.presenceTypeList = presenceTypeList;
      },
      async fillBirthList() {
        let eventResponse = await RequestApi.prepareData({
          method: 'invokeElementMethod',
          params: {
            eCID: this.info.eCID,
            methodName: 'getBirthMestoDictionary',
            data: null
          }
        });
        let birthList = [];
        let birthDict = JSON.parse(JSON.parse(eventResponse.response).data);
        for (let i = 0; i < birthDict.length; i++) {
          let birth = birthDict[i];
          birthList.push({
            label: birth.BIRTH_MESTO,
            value: birth.BIRTH_MESTO_KOD
          });
        }
        this.birthList = birthList;
      },
      async fillGragdanstvoList() {
        let eventResponse = await RequestApi.prepareData({
          method: 'invokeElementMethod',
          params: {
            eCID: this.info.eCID,
            methodName: 'getGragdanstvoDictionary',
            data: null
          }
        });
        let gragdanstvoList = [];
        let gragdanstvoDict = JSON.parse(JSON.parse(eventResponse.response).data);
        for (let i = 0; i < gragdanstvoDict.length; i++) {
          let gragdanstvo = gragdanstvoDict[i];
          gragdanstvoList.push({
            label: gragdanstvo.GRAGD_NAME,
            value: gragdanstvo.GRAGD_KOD
          });
        }
        this.gragdanstvoList = gragdanstvoList;
      },
      async changeStatus() {
        this.data.presentType = null;
        if (this.data.status) {
          await this.fillPresenceTypeList();
        }
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
