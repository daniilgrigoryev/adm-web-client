<template>
  <div v-if="data">
  </div>
</template>

<script>
  import * as funcUtils from "../../../../assets/js/utils/funcUtils";
  import * as formStack from '../../../../assets/js/api/formStack';
  import RequestApi from "../../../../assets/js/api/requestApi";

  export default {
    name: "WizardItemProtEvacOne",
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
        let data = JSON.parse(JSON.parse(eventResponse.response).data);
        if (funcUtils.isEmpty(data)) {
          let error = JSON.parse(eventResponse.response).error.errorMsg;
          alert(error);
        } else {
          this.data = data;
        }
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
