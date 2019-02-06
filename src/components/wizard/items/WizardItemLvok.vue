<template>
  <div>
    {{data}}
  </div>
</template>

<script>
  import * as funcUtils from "../../../assets/js/utils/funcUtils";
  import * as formStack from '../../../assets/js/api/formStack';
  import RequestApi from "../../../assets/js/api/requestApi";

  export default {
    name: "WizardItemLvok",
    props: {
      info: Object
    },
    async created() {
      let eventResponse = await RequestApi.prepareData({
        method: 'getElementData',
        params: {
          eCID: this.info.eCID
        }
      });
      this.data = JSON.parse(eventResponse.response).data;
    },
    data() {
      return {
        data: null
      }
    },
  }
</script>

<style scoped>

</style>
