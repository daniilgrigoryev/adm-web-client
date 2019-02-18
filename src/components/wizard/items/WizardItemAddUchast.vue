<template>
  <div v-if="data">
    <Form :label-width="180" label-position="right">
      <Row :gutter="16" type="flex" align="middle">
        <Col>
          <h2 class="adm-text-big color-dark-light my12">Статус участника</h2>
        </Col>
        <Col>
          <Select class="wmax240 wmin180" placeholder="" v-model="data.status" clearable @on-change="changeStatus">
            <Option class="wmax360 txt-break-word" v-for="item in statusList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </Col>
      </Row>
      <FormItem class="my12">
        <small class="adm-text-small color-gray-medium" slot="label">Тип участника:</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Select class="wmax240 wmin180" placeholder="" v-model="data.tip" clearable @on-change="changeTip" :disabled="!data.status">
              <Option class="wmax360 txt-break-word" v-for="item in tipList" :value="item.value" :key="item.value">{{ item.label }}</Option>
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
    name: "WizardItemAddUchast",
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
        tipList: null,
        vidList: null,
        vehsList: null
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

        if (this.data.status) {
          await this.fillTipList();
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
      async fillTipList() {
        let eventResponse = await RequestApi.prepareData({
          method: 'invokeElementMethod',
          params: {
            eCID: this.info.eCID,
            methodName: 'getTipDict',
            data: null
          }
        });
        let tipList = [];
        let tipDict = JSON.parse(JSON.parse(eventResponse.response).data);
        for (let i = 0; i < tipDict.length; i++) {
          let tip = tipDict[i];
          tipList.push({
            label: tip.UCHAST_TIP_NAME,
            value: tip.UCHAST_TIP
          });
        }
        this.tipList = tipList;
      },
      async changeStatus() {
        this.fillTipList();
        this.storeElementData();
      },
      changeTip() {
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
