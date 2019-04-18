<template>
  <div v-if="data">
    <div class="adm-form__item">
      <small class="adm-form__label">Статус</small>
      <div class="adm-form__item_content">
        <Row type="flex" align="middle">
          <Col span="10">
            <Select class="wmax360 wmin180 adm-input adm-input--regular" placeholder="" v-model="data.status" clearable @on-change="changeStatus">
              <Option class="wmax360 " v-for="item in statusList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </Col>
          <Col span="6">
            <Button @click="copyOwner" :disabled="data.status !== 1 && data.status !== 3" type="text" style="outline: 0!important; box-shadow: none; padding: 0 5px;" class=" bg-transparent-on-hover color-blue-on-hover color-gray-light transition color-blue-on-focus">
              <Icon type="md-key" title="Скопировать данные владельца" :size="30" />
            </Button>
          </Col>
        </Row>
      </div>
    </div>
    <div class="adm-form__item">
      <small class="adm-form__label">Тип участника:</small>
      <Select class="wmax360 wmin180 adm-input adm-input--regular" placeholder="" v-model="data.tip" clearable @on-change="storeElementData">
        <Option class="wmax360" v-for="item in tipList" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
    </div>
  </div>
</template>

<script>
  import RequestApi from "~/assets/js/api/requestApi";

  export default {
    name: "WizardItemLvok",
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
        tipList: null
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
        await this.fillTipList();
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
      async copyOwner() {
        let eventResponse = await RequestApi.prepareData({
          method: 'invokeElementMethod',
          params: {
            eCID: this.info.eCID,
            methodName: 'copyOwner',
            data: null
          }
        });
        let cids = JSON.parse(JSON.parse(eventResponse.response).data);
        if (cids) {
          this.$emit('updateComponents', cids);
        }
      },
      async changeStatus() {
        await this.fillTipList();
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
