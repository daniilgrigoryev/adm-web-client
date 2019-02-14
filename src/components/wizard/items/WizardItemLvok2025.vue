<template>
  <div v-if="data">
    <Form :label-width="180" label-position="right">
      <Row :gutter="16" type="flex" align="middle">
        <Col>
          <h2 class="adm-text-big color-dark-light my12">Лицо в отношении которого заводится дело (ЛВОК)</h2>
        </Col>
        <Col>
          <Select class="wmax240 wmin180" disabled placeholder="" v-model="data.status" clearable @on-change="changeStatus">
            <Option class="wmax360 txt-break-word" v-for="item in statusList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </Col>
      </Row>
      <FormItem class="my12">
        <small class="adm-text-small color-gray-medium" slot="label">Гражданство:</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Select v-model="data.gragdKod" filterable clearable @on-change="storeElementData" class="wmin180" placeholder="">
              <Option class="wmax360 txt-break-word" v-for="item in gragdanstvoList" :value="item.value" :key="item.value">{{ item.value + ', ' + item.label }}</Option>
            </Select>
          </Col>
        </Row>
      </FormItem>
      <FormItem class="my12">
        <small class="adm-text-small color-gray-medium" slot="label">ФИО:</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input v-model="data.lvokName" disabled @on-input-change="changeFIO" placeholder="Enter something..."></Input>
          </Col>
        </Row>
      </FormItem>
      <FormItem class="my12">
        <small class="adm-text-small color-gray-medium" slot="label">Место рождения</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Select class="wmax240 wmin180" placeholder="" v-model="data.birthMestoKod" filterable clearable @on-change="storeElementData">
              <Option class="wmax360 txt-break-word" v-for="item in birthList" :value="item.value" :key="item.value">{{ item.value + ', ' + item.label }}</Option>
            </Select>
          </Col>
        </Row>
      </FormItem>
      <FormItem class="my12">
        <small class="adm-text-small color-gray-medium" slot="label">Присутствие ЛВОКа:</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Select v-model="data.presentType" :disabled="!data.status" filterable clearable @on-change="storeElementData" class="wmin180" placeholder="">
              <Option class="wmax360 txt-break-word" v-for="item in presenceTypeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
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
        this.storeElementData();
      },
      changeFIO() {
        let fioLength = 0;
        let fioArr = this.data.lvokName.split(' ');
        this.data.lvokName = '';
        for (let i = 0; i < fioArr.length && fioLength < 3; i++) {
          let express = /^[а-яА-ЯёЁ]+$/;
          let item = fioArr[i];
          if (item.length > 0 && express.test(item)) {
            switch (fioLength) {
              case 0:
              {
                this.data.lvokName += item;
                break;
              }
              case 1:
              {
                this.data.lvokName += ' ' + item;
                break;
              }
              case 2:
              {
                this.data.lvokName += ' ' + item;
                break;
              }
            }
            fioLength++;
          }
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
