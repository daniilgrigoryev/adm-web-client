<template>
  <div v-if="data" style="margin-bottom: 50px; border-bottom: 1px solid black;">
    <div>
      <span>Дата уведомления</span>
      <input type="date" v-model="data.dateUved" @change="storeElementData" />
    </div>

    <div>
      <span>Дата исполнения</span>
      <input type="date" v-model="data.dateIspoln" @change="storeElementData" />
    </div>
  </div>
</template>

<script>
  import * as funcUtils from "../../../assets/js/utils/funcUtils";
  import * as formStack from '../../../assets/js/api/formStack';
  import RequestApi from "../../../assets/js/api/requestApi";

  export default {
    name: "WizardItemDocPostFinal",
    props: {
      info: Object
    },
    async created() {
      await this.initData();
    },
    data() {
      return {
        data: null
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
