<template>
  <div v-if="data">
    <div class="adm-form__item">
      <small class="adm-form__label">Вид присутствия</small>
      <Row :gutter="16" type="flex" align="middle">
        <Col>
          <Select class="wmin360 adm-input adm-input--regular" placeholder="" v-model="data.presentVid" clearable @on-change="changePresentVids">
            <Option class="wmin360" v-for="item in presentVidsList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </Col>
      </Row>
    </div>
    <div class="adm-form__item">
      <small class="adm-form__label">Список представителей из дела:</small>
      <Row :gutter="16" type="flex" align="middle">
        <Col :xs="24" :md="14" :lg="16">
          <Select class="adm-input adm-input--regular wmax360" v-model="data.uchastId" :disabled="!data.presentVid" filterable clearable @on-change="storeElementData" placeholder="">
            <Option v-for="item in representList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </Col>
      </Row>
    </div>
  </div>
</template>

<script>
  import RequestApi from "~/assets/js/api/requestApi";

  export default {
    name: "WizardItemPresent",
    props: {
      info: Object
    },
    components: {
    },
    async created() {
      await this.initData();
    },
    data() {
      return {
        data: null,
        presentVidsList: null,
        representList: null
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

        await this.fillPresentVidsList();

        if (this.data.presentVid) {
          await this.fillRepresentList();
        }
      },
      async fillPresentVidsList() {
        let eventResponse = await RequestApi.prepareData({
          method: 'invokeElementMethod',
          params: {
            eCID: this.info.eCID,
            methodName: 'getPresentVids',
            data: null
          }
        });
        let presentVidsList = [];
        let presentVidsDict = JSON.parse(JSON.parse(eventResponse.response).data);
        for (let prop in presentVidsDict) {
          if (presentVidsDict.hasOwnProperty(prop)) {
            presentVidsList.push({
              label: presentVidsDict[prop],
              value: prop
            });
          }
        }
        this.presentVidsList = presentVidsList;
      },
      async fillRepresentList() {
        let eventResponse = await RequestApi.prepareData({
          method: 'invokeElementMethod',
          params: {
            eCID: this.info.eCID,
            methodName: 'getRepresentList',
            data: JSON.stringify({
              status: this.data.status
            })
          }
        });
        let representList = [];
        let representDict = JSON.parse(JSON.parse(eventResponse.response).data);
        for (let i = 0; i < representDict.length; i++) {
          let represent = representDict[i];
          representList.push({
            label: represent.uchastName,
            value: represent.id
          });
        }
        this.representList = representList;
      },
      async changePresentVids() {
        this.data.uchastId = null;
        if (this.data.presentVid) {
          await this.fillRepresentList();
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
