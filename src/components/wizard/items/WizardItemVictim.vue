<template>
  <div v-if="data">
    <div class="adm-form__item">
      <small class="adm-form__label">Тип участника</small>
      <CustomSelect class="wmax360 wmin180 adm-input adm-input--regular" placeholder="" v-model="data.tip" clearable @on-change="storeElementData">
        <Option class="wmax360" v-for="item in tipList" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </CustomSelect>
    </div>
  </div>
</template>

<script>
  import RequestApi from "~/assets/js/api/requestApi";

  export default {
    name: "WizardItemVictim",
    props: {
      info: Object
    },
    components: {
    },
    async created() {
      await this.initData();
      await this.fillTipList();
    },
    data() {
      return {
        data: null,
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
        this.data.tip = null;
        await this.storeElementData();
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
